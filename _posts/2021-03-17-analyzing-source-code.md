---
layout: post
title:  "Analyzing Source Code: Textemes and Contextemes"
date:   2021-03-16 00:00:00 -0800
categories: source-code-analysis software-linguistics
---

Several months ago I started a journey to learn about where linguistics and source code meet.
I came across a few opinion pieces stating that programming languages aren't actually languages, and they can't be approached with linguistic rules. I've already [responded to a couple of the posts I read](http://chrisstead.net/programming/programming-languages/software/development/linguistics/2021/03/03/the-language-of-software.html)<sup>1</sup>. However, I plan to carry my thoughts further both in blog posts, and elsewhere as opportunities permit.

The reason this matters is, I have learned quite a lot since the end of last year. Two topics which are core to the study of linguistics are morphology, and syntax. Each of these is particularly geared toward spoken language, but it has given rise to a number of interesting ideas. Particularly, there is a morphological notion of a morpheme, and a syntactic notion of a syntactic phrase.

A **_morpheme_**<sup>2</sup> is a linguistic unit, specifically related to a single "word"\* used to convey information. A **_syntactic phrase_**<sup>3</sup> is a group of "words"\* as a structure which provides some meaning. These two ideas provide the building blocks for analyzing and understanding language.

While morphemes and syntactic phrases are useful for analyzing human language as used either on the hoof, so to speak, or through captured phonetic texts, they are less useful for analyzing and understanding what is happening in a pure text document like source code.

Fortunately, there are linguists who have done significant work on written texts and have devised new terms we can use to better understand source code which actually does reflect the communication of human understanding. Two such words have come from their work: texteme and contexteme.

## The Texteme ##

Linguistically, the **_texteme_**<sup>4</sup> is a unit of text which has meaning, especially with relation to other units of text. Generally this is useful for people who specialize in translating texts, and may not represent even a single complete idea.

For our purposes, however, given the clear syntactic underpinning that all programming languages have, a texteme is less interesting as an analytic tool for the language itself, but instead the smallest unit of source code which captures novel meaning.

Consider the following code:

```javascript
function valueOrDefault(testValue, defaultValue) {
  // the implementation is unimportant
}
```

Given the syntactic rules for JavaScript, there are a number of tokens which each carry meaning for the interpreter. We can list them off easily. Excluding symbolic characters, we have:
- `function` - keyword
- `valueOrDefault` - identifier
- `testValue` - identifier
- `defaultValue` - identifier.

These, however, don't carry much meaning with regard to the human reading them. I would argue there are two textemes which can be interpreted in two ways:

1. `function valueOrDefault` and `(testValue, defaultValue)`
2. `function` and `valueOrDefault(testValue, defaultValue)`

Let's evaluate what we can understand from each analytic pair.

The first pair:

The first texteme `function valueOrDefault` clearly indicates that `valueOrDefault` is defined as a function. The subsequent texteme carries some ambiguity. On its own `(testValue, defaultValue)` can be:

1. A parameter list
2. An argument list
3. A parenthetical expression

The first two are very similar in nature, so they lean into the larger phrase: a function definition. Number three is troublesome because of its divergence from the theme. There is a clear bifurcation in meaning here.

The second pair:

The first texteme `function` states a function is being declared. The second texteme `valueOrDefault(testValue, defaultValue)` is interpretable as either:

1. A function call
2. Part of a function definition

These two reside in a similar theme. When paired with the function keyword they clearly align with the intent.

I prefer the second analytic outcome as it helps inform us the intent of the author. Since we are, ultimately, analyzing communication, anything we can do to cast out noise will be useful when reconstructing meaning and intent.

## The Contexteme ##

The notion of a **_contexteme_**<sup>5</sup> is built upon the idea of a texteme. A contexteme is a category of meanings which arise from a group of textemes. This texteme grouping, however, is not simply a randomly selected set of textemes, but rather a collected set from within a given selection of text.

Consider the following code:

```javascript
const user = await getUserByEmail(userEmail);
const userId = user.id;
```

We can select either of the lines above and parcel out the textemes which help identify meaning in the code sample. There is a distinct difference between the first and second lines, however, when it comes to contextualizing outcomes.

Working backward, line 2 is representative, exclusively, of a concrete data outcome. This line takes a known value, and produces a derivative value based on the original. This derivational action has a single contextual interpretation. Since a contexteme is a category, this category would contain a single item: `const userId = user.id`

Line 1, on the other hand line 1, though a little noisy, represents an unknown outcome. Realistically, we have three predictable behaviors, none of which are explicit here:

1. We get a concrete user back
2. We get no user back
3. An error occurs

This means our first line is actually a contexteme with two concrete members, and a side effect member:

It can be read as `const user = `
- concrete user object
- null or undefined
- execution incomplete: error

Each of these outcomes represents a real contextual value in the programmer's mind, but with regard to the larger code sample, we can see that only the first element was accounted for. Of course, we are not currently considering a larger body of text with a contexteme, but a collection of contextemes could be more semantically, and/or pragmatically valuable for capturing both program execution outcomes, as well as reconstructing the mental model which was held by the programmer at the time of authorship.

**_Notes_**

- \* "Word(s)" is not actually correct for describing morphemes and syntactic phrases, but for the purpose of conveying a sense of these foundational ideas, they are close enough for the casual reader.

**_References_**

1. "The Language of Software" [http://chrisstead.net/programming/programming-languages/software/development/linguistics/2021/03/03/the-language-of-software.html](http://chrisstead.net/programming/programming-languages/software/development/linguistics/2021/03/03/the-language-of-software.html)
2. "Morpheme" [https://en.wikipedia.org/wiki/Morpheme](https://en.wikipedia.org/wiki/Morphemelink)
3. "Phrase" [https://en.wikipedia.org/wiki/Phrase](https://en.wikipedia.org/wiki/Phrase)
4. "Texteme" [https://www.wordsense.eu/texteme/](https://www.wordsense.eu/texteme/)
5. "Etnologiska Studier, Issue 30: Literature Among the Cuna Indians" [Searchable in Google Books, pg. 70-71](https://books.google.com/books?id=Lg8YAQAAMAAJ&pg=PA70&lpg=PA70&dq=contexteme&source=bl&ots=8PhpeR5Aax&sig=ACfU3U32gnV5nSMjF2z3vmDiCsjCBIVCeQ&hl=en&sa=X&ved=2ahUKEwik_cSexrbvAhXLB50JHc-ZAN8Q6AEwA3oECAQQAw#v=onepage&q=contexteme&f=false)
