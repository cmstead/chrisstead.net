---
layout: post
title:  "Why Worry About Names?"
date:   2021-04-27 00:00:00 -0800
categories:
    - programming
    - software-linguistics
    - human-centered-source
    - design
---
In every brownfield project I have ever worked on -- and I have worked on a fair few -- there is a common pattern I find. Developers either name their variables incomprehensibly, or they avoid using variables at all. Chains of function calls and expressions which stream across the screen and off the right side are the norm.

This is in no way an indictment of the developers who were working on the code. In fact, I assume they applied their knowledge in the best way they knew how at the time they were developing. Often developers are not armed with the knowledge they need to write stable software, or coherent source code.

Eric Evans addressed this problem from one side in his book, _Domain Driven Design_, as he talks about going to where the users are to uncover the way they talk about the work they do. He defines things like **_bounded context_**, and **_ubiquitous language_** (which is an extension of a **_lexicon_**), and late in the book he covers ways to incorporate those discoveries into the software being built.

The challenge is, there is an assumption of incremental discovery, however, incorporation can happen late. This means software can either languish in development limbo as discovery is done, or it can go off the rails early, which makes it difficult to recover.

What we really need is a tool **right now** which helps us iterate toward a better solution while we do the context and language discovery which needs to be done.<!--more-->

## What's In a Name? ##

Names in natural language are things like banana, fork, Bob, and Millicent. We designate a name for people, places, and things in order to be specific about who or what we are talking about. These names are, for our purposes, abstractions over a much more complicated topic.

"Banana" provides a lot of context:

A fruit
Thick skin
Starchy
Sweet
Yellow
Gets brown spots as it goes through ripening

There is a lot we know about a banana empirically without having any deeper technical knowledge at all. We don't need to know about any botanical classifications, potassium content, radioactivity, or the fact that the common banana comes from a monoculture. In fact, if you started listing those items first, many people would give you a strange look.

Somehow, this kind of technical language manages to worm its way into our source code. Rather than revealing the things we need to understand what we are abstracting, we encode the technical underpinnings into a name. Instead of a name like `veryRipeBanana`, we get names like `softFruitWithBrownSpots`. That is, if we get a name.

Sometimes we just get this:

```javascript
this.eat(new Fruit({
    characteristics: ['soft', 'brown spots', 'starchy', 'radioactive'],
    classification: 'edible'
}));
```

Though we know something about the action (eat) and something about the food (fruit) there is a lot we lose. Often names in our code are treated like names in natural language: as nouns meant for simply declaring something exists.

## Names aren't Names ##

**_Names are carriers of the value and intent we communicate to the reader._**

Instead of thinking of names as nouns (Ralph, Jenny, cucumber, EmpireStateBuilding), we can reframe them as parts of a larger written work. Source code is both a set of instructions for program execution, and communication to the developers who interact with it. This means names are not simply nouns, verbs, adjectives, and the like. Names are best considered as meaningful phrases which should be sensible within the larger document context.

If we consider names, first, within the context of what they are naming, we can communicate a significant amount of information to the reader. Functions can carry information when they are written as verb phrases. The same can be said for object properties which can be given noun phrase names reflect some aspect of a larger whole. Local variables can also do this kind of communication work by reflecting the outcome of work done, or reflecting the intermediate state of a larger algorithm.

Each name we choose provides broader insight into the software as a whole. This means we can use what we know of the real world and the problem at hand to bake context deep into the source of our software.

Since living software is an evolving thing, we will learn new things about the problem we are solving as we work. This learning process will lead to discovering names which more closely reflect the history and intent of the software we create.

Names make source documents human documents.

## Names are Cumulative ##

No single name in source code actually lives alone. Even if our software is simply the definition of a single variable in a Python file, `my_name = "Chris"` there is still the real world which informs us of what this program does. When the source code increases in size and complexity, names actually provide context which leads to better recall of both the language used in the documents, as well as the surrounding real-world context.

This context-driven recall is a noted phenomenon studied by linguists and cognitive scientists. There are several factors which come into play, two of which we can use immediately -- context and frequency of use. When we center the names and language in our source documents around the words we use when talking about the problem, we bake in the ability for people to quickly recall and use domain knowledge which is related to the problem our software solves.

What this means is, each file name, class or module name, method or function name, variable, and **_thematic group_**<sup>1</sup> we create leads us, and other developers, toward understanding the problem rather than simply the nuts and bolts of an algorithm. Moreover, the more we consider what the document communicates, the faster programmers will be able to gather information from reading it.

## Names are Language ##

One of the most important things we can impart with a name is the ability to read code aloud and talk about it like humans. The natural state of human communication is spoken language. We learn language first this way. Written language is an invention which, historically, acts as a symbol representing other types of human communication -- speech, gesture, and expression. This takes us full circle to natural language.

If we consider the following code:

```
const finalTrs = trs.filter(x => x.id > 5);
```

We get no new information by reading it aloud. In fact it is written in such a way that reading it aloud might actually make it harder to understand than simply reading it silently, as a collection symbols.

If we write code this way instead:

```
const lastFakeRequirementId = 5;
const isRealRequirement = requirement => requirement.id > lastFakeRequirementId;

const realTestRequirements = allTestRequirements.filter(isRealRequirement);
```

The code becomes longer, but it also communicates the information we need to know in order to quickly spin up on the local context and understand why choices were made. This kind of naming leans heavily into the thing people understand best: natural language.

## So, Why Worry About Names? ##

Those of us who worry about names do so because names are language. Names communicate what bare programming language symbols cannot: problem domain, context, a shared lexicon, and history.

High quality names are much like good writing -- they tell a story. We will not always get names right on the first pass, but that's okay. As we learn, we can update our names to form a better picture. We can capture discoveries as we have them, and communicate the why, instead of how, to people as our code base grows.

Names alone are not software, but they make the software source more human.

**_References_**

1. Thematic Grouping [http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html](http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html)
