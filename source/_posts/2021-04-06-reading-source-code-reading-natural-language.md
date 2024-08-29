---
layout: post
title:  "Reading Source Code, Reading Natural Language"
date:   2021-04-06 00:00:00 -0800
categories:
  - programming
  - software-linguistics
  - research
---

In a previous blog post<sup>1</sup> I talked about an article claiming that reading source code was not like reading natural language. The original post referred to an article from "Science Daily"<sup>2</sup>, however there were far too many details missing, so I could only speculate on what the research said, how it was conducted, etc.

Last night I looked up a writeup on the original study<sup>3</sup>, and I found it to be rather disappointing. Though I haven't used an functional magnetic resonance imaging (fMRI) device for any purpose, let alone the purposes of mapping brain activity, I can (and will) use other evidence to propose the founding notion of their study was flawed. This foundational flaw, in my opinion, invalidates the discovery which was done.

Let's explore.<!--more-->

## Sample Code and Control Writing Sample ##

There has been extensive research and mapping done on the brain when someone is reading a natural language passage. I will opt to skip providing a reference for this since a simple search will turn up a tremendous amount of information presented by psycholinguists, and cognitive scientists.

The known mapping of language and brain activity is what was used as a basis for the study done for the paper I referenced earlier<sup>3</sup>. Of course, the issue at hand is they did not generate their own control for their study. By simply assuming that their work was representative of an acceptable comparison to other natural language mapping, they simply used existing maps.

Now, if we review their source code, we can see the task which was presented to the subjects of the study:

```
public static void main(String[] args) {
  String word = "Hello";
  String result = new String();

  for (int j = word.length() - 1; j >= 0; j--)
    result = result + word.charAt(j);

  System.out.println(result);
}
```

The source, as presented above, is presented as closely as possible to the text which was used in the study according to the paper, including the lack of syntax highlighting. We will return to the highlighting issue later.

The stated goal of the subjects was to read this text and declare what the outcome would be. Of course, determining the outcome of a program is not the same as simply reading a selection of natural language. Let's consider the following passage:

>In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.

Though the supplied text is from "The Hobbit", and is evocative of fantastic imagery, there is no expectation that we need to do any computational evaluation of this text. In fact, there is no computation to be done. Instead this is simply text which describes a scene.

Suppose, instead, our sample text were more like the following:

>Sally is three times as old as Billy. Billy will be half Sally's age in a year. How old is Billy?

Now, let's suppose the subjects were asked to supply a computational result to this question. Would their brain activity match that of the person reading the selection from "The Hobbit"? Almost certainly not.

Why?

There is a computation expectation set in the second text selection which is not there in the first. Though the second selection is natural language, there is a mathematical component which demands that someone evaluate the text beyond just simply reading it. In fact there is an answer which would be considered correct.

I would argue, without control text like our age problem, the research is not representative of a person in an equivalent natural language setting. The computational nature of the selected text is critical for ensuring we are accurately comparing equivalent activity mapping.

## Representative Source Code ##

Suppose we were to select source code which represents well-abstracted computation, which is typically how people process talking about things like making a sandwich, or replacing a light bulb, we might have source which would look like the following:

```
public static void reverseAndPrintAWord(String word) {
  String reversedWord = reverseWord(word);

  printToScreen(reversedWord);
}
```

This text is significantly less computational in nature, and reflects the kind of code people might encounter in the wild, especially as a professional developer. Of course, someone might say this text is too trivial to be representative of reading source code, however, it is source code which represents computation which will be done.

In this case, if someone were asked to state what this code does, even with a very limited background in programming, they would likely say it reverses a word and prints it to the screen. Although this is source code, it is more akin to natural language than the more computationally complex source taken from the original paper.

In fact, even without syntax highlighting there is sufficient information here that the noise at the front of the function definition, `public static void`, could be ignored, even by a novice programmer.

I'm not confident that this would map to the same centers of the brain as natural language, but the presence of clear natural language in the source code leads me to believe the language centers are much more likely to be triggered.

## Syntax Highlighting and Code Semantics##

The subjects of the study were presented with source code written in black and white, and asked to interpret it. This is, once again, not representative of the way that professional programmers work in daily life. It is most common to see a professional programmer working in a specialized source code editor, or an Integrated Development Environment (IDE).

If we consider code which is highlighted as it is in an IDE, we would be presented with the following:

```java
public static void main(String[] args) {
  String word = "Hello";
  String result = new String();

  for (int j = word.length() - 1; j >= 0; j--)
    result = result + word.charAt(j);

  System.out.println(result);
}
```

This coloring reduced **_cognitive load_**<sup>4</sup> for the reader, which means there are **_semantic markers_**<sup>4</sup> which are presented in highlighted code which the subjects of the study were not given. These semantic markers provide insight into how to best read and comprehend the source code provided.

Moreover, if we were to review our abstracted source code, adding syntax highlighting, we can see the compiler-related information at the beginning of the sample can be easily ignored and skipped, allowing the reader to jump quickly to the semantically rich function name.

```java
public static void reverseAndPrintAWord(String word) {
  String reversedWord = reverseWord(word);

  printToScreen(reversedWord);
}
```

Although a novice programmer may still read the leading `public static void` copy, they are likely to ignore it, knowing they are tasked with understanding the behavior within the body of the method, which `public static void` is not part of.

## Conclusion ##

Though the study has merit regarding mapping the way someone interprets source code which is computationally rich, it is not, in my estimation, a representative study on whether reading source code is, actually, like reading natural language.

Perhaps the researchers would consider employing a professional developer with experience writing well-abstracted code if they chose to revisit the study. In all likelihood, there is little money in the research being done, so this paper, and those like it, are likely to stand as a testament that programmers reading code are not reading like they would had they encountered natural language.

Nevertheless, linguistically, I would contend there are significant gaps in the foundational assumptions made before conducting the study. I don't have evidence that well-abstracted source code would actually trigger the same centers in the brain as natural language, nor do I have the means to support or reject a hypothesis regarding brain activity. Moreover, I don't have any means to define a quantitative analysis of what it means to for code to be well-abstracted. Nevertheless, I to believe there is sufficient evidence in existing academic studies by cognitive scientists and linguists to show this study was not well-formed.

### Addendum ###

There is an article about a small (~20 person) MIT study<sup>6</sup>, which nominally resolves some of my concerns, however, I'm uncertain that, even still, their study sufficiently considered the abstractions people have built in around names and words, especially when considering a scratch program which uses visual representations of meaning, which have no intrinsic linguistic value whatsoever. I'm concerned that there isn't a deeper consideration for what well abstracted code might look like and whether code might more closely model natural language when abstracted in a similar fashion to natural language.

**_References_**

1. "The Language of Software" [http://chrisstead.net/programming/programming-languages/software/development/linguistics/2021/03/03/the-language-of-software.html](http://chrisstead.net/programming/programming-languages/software/development/linguistics/2021/03/03/the-language-of-software.html)
2. "To the brain, reading computer code is not the same as reading language" [https://www.sciencedaily.com/releases/2020/12/201215131236.htm](https://www.sciencedaily.com/releases/2020/12/201215131236.htm)
3. "Understanding Understanding Source Code With Functional Magnetic Resonance Imaging" (PDF) [https://www.cs.cmu.edu/~ckaestne/pdf/icse14_fmri.pdf](https://www.cs.cmu.edu/~ckaestne/pdf/icse14_fmri.pdf)
4. "Cognitive Load Theory" (PDF) [http://ndl.ethernet.edu.et/bitstream/123456789/31186/1/125.John%20Sweller.pdf](http://ndl.ethernet.edu.et/bitstream/123456789/31186/1/125.John%20Sweller.pdf)
5. "Semantic markers" [https://link.springer.com/article/10.1007%2FBF02380291](https://link.springer.com/article/10.1007%2FBF02380291)
6. "Is computer code a language or math? MIT study uses brain scans for answers" [https://bigthink.com/mind-brain/coding-language-brain](https://bigthink.com/mind-brain/coding-language-brain)
