---
layout: post
title:  "The Language of Software"
date:   2021-03-03 00:00:00 -0800
categories:
  - programming
  - programming-languages
  - software
  - development
  - linguistics
---

I read an article the other day (which I will not cite, due to unsupported claims) that stated reading source code is not like reading language. They cite this [article on an MIT study](https://www.sciencedaily.com/releases/2020/12/201215131236.htm) which states that reading code is not like reading language.

I also read an opinion piece not so long ago that states programming languages are not languages and cannot be treated as such. Though they are not languages in the anthropological sense, they may still function as languages within the context of communicating information about a problem, and a solution.

Regarding each of these articles on their own, I only have more questions. Nevertheless, I plan to ask them here, and explore a different idea regarding what the language of software might actually be.<!--more-->

## MIT Neuroscientists and Programming ##

A very brief summary of the findings by the MIT neuroscience team goes a little like this:

When people read source code, it does not activate the language center of the brain. By the same token, reading source code also does not activate the same centers of the brain used for solving puzzles, working on mathematics, or solving other logic puzzles. They say programming may map to a unique set of neural pathways in the brain.

I have several questions about this study which were not answered in the article. Among them, the answers I am most interested in are these:

1. What is a common test text used to map language onto the brain?
2. What was the test text used while mapping source code onto the brain?

For instance, is something like the following considered language or math?

> In three years, Janet will be twice Bobby's age. Bobby is half as old as Pat. Pat is 2. How old is Janet?

This sample text is clearly English. It follows common rules, and adheres to all of the things a fluent English speaker might expect in writing. On the other hand, this language is clearly describing a logical/mathematical problem.

Is this text more like programming, math, or language? How would it map in the brain? (Someone get me an fMRI machine, STAT!)

On the other hand, if we consider Python code written like the following:

```python
if(age_is_over_21):
  print("Drink up!")
else:
  print("Have a Coke!")
```

For someone who is not versed in Python, this might seem a little mysterious. On the other hand, for someone who is comfortable programming in Python, this is a trivial behavior, which can nearly be read directly.

Is this code closer to language, than, say, something like this?

```python
if(person.age >= 21):
  print("Drink up!")
else:
  print("Have a Coke!")
```

I would argue that the first bit of code carries more human context than the second. Did the MIT researchers use code more like the first or second? Would it matter?

To round this out, consider the following joke:

An engineer is going to the store, and their spouse says "while you're there, please pick up a loaf of bread, and if they have eggs, get a dozen."

The engineer returns with twelve loaves of bread.

"Why did you buy so many loaves of bread?" asks their spouse.

"They had eggs."

If we look at this from a programming perspective, the joke might look like this:

```python
def get_loaves_of_bread(store_has_eggs):
  one_loaf = 1
  one_dozen = 12

  return one_dozen if store_has_eggs else one_loaf
```

Where does language leave off and programming pick up?

## Opinion Piece -- Programming Languages Aren't Languages ##

The claim made by the opinion piece is that programming languages aren't languages.

If we consider programming languages phonologically, there is no correlation between how people talk about code, and what is represented in the source document. Fair.

Programming languages cannot be someone's first language. By the very fact that programming languages have no inherent phonology -- sign languages have a representation which is accepted as phonological in nature -- then a programming language cannot function as a first language. Also a fair point.

The complaint I draw my greatest concern from is that human languages evolve and programming languages remain static. In other words, programming languages have a defined set of rules which are preordained and all programs will look the same.

This notion of a language only being living if it reaches beyond the rules which exist today feels disingenuous. Suppose we were to say English is only correct if all usage only considered existing rules and words. No new words, or novel constructions are allowed.

This would feel strange, to say the least.

Now if we were to consider any programming language which is in use today, it seems reasonable that we should consider, not only, the core rules, but the larger community working with the language, building novel software, and, most importantly, creating new libraries and frameworks which fully extend or change the interactions we have with the core language altogether.

All of a sudden, a programming language feels like it could easily be a living language as well.

## A Language for Software ##

What if, however, we consider a different, broader definition for language?

I claim a language is a means by which people can convey information through a communication channel.

This broadened definition of language is rather unorthodox as it can introduce things like Morse code into the realm of language. Moreover, this means that programming cannot be a FIRST language, due to lack of a phonology, but it CAN be a second language. However, I don't think it excludes any languages which are currently considered languages.

Would this language, be incomplete, or, somehow, lesser than a given human language?

I would argue the answer to this question is actually no. Like any other language devised by people, programming languages (and their ecosystems) are fully formed, and sufficient to address and communicate about anything they must. There is no single word for cloud, but it can be modeled. Is that not the same as translating idiomatically from one language to another?

Of course, the big looming question is, why? Why concern ourselves with whether a programming language is a language, or simply a logical construct?

Ultimately, it resolves to the discussion of modeling human problems. If a programming language is not ACTUALLY a language, then it seems it would be insufficient for modeling human problems and concerns. It also means there is no living aspect of the language, and its ecosystem.

We know the latter is false. Ecosystems for popular programming languages tend to be large, shifting, living entities. Even if the underlying rules of the language stay static -- spoiler, they don't -- the ecosystem itself actually evolves the way we think about, and talk about, solving problems for people.

Let's look at the idea that a programming language could be insufficient to model human problems and concerns. In reality, is this not the same for our first languages?

Given any problem which is sufficiently complicated that we care to describe it in detail, we often struggle to convey the experience we are having. In fact, human language is so woefully 
hamstrung, when finding ways to model logical systems, that we had to invent new languages -- programming languages -- to do that work.

## Software Language as Human Language ##

Ultimately, we land back in the realm of human language devised to describe and communicate about human concerns. We created programming languages to help us communicate better about human problems and, over time, human systems grew up around these programming languages.

I believe, once this growth and development occurs, we outgrow a simple programming language. Instead what we have is a *software language*. This software language, because of the natural development by people over time, is a living human language much like any other language we use day to day.

For software developers, this software language is one we use nearly as frequently as we do our first, or current general language. The development of this new organic language use leads to things we can discover about the problems we care to solve, and it also tells us quite a bit about the local culture using their chosen software language.

This notion of software language seems to hold when we look at code. It's quite common to hear someone say "oh, that looks like something Jill wrote". There is a linguistic thumbprint there -- an idiolect that is actually distinguishable by other folks we interact with regularly.

In the end, all of this amounts to an inflection point. Before the point of inflection, we can discuss technical work, refactoring, testing, logical approach, but after that point of inflection we must begin to talk about human concern. There is a meta-structure to source code that emerges over time, and the more we lean into humanizing the code we write, the more accurately it will describe the world we are interested in interacting with. That meta-structure is the very thing I care to explore. Maybe you'll want to explore it with me.
