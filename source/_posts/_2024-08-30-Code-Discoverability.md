---
title: "Code Discoverability"
date: 2024-08-30 10:21:44
categories:
    - Code Quality
    - Onboarding
    - Code Ergonomics
    - Testing
tags:
    - Code Quality
    - Onboarding
    - Code Ergonomics
    - Testing
---
Over the last couple of years I did a lot of observing and thinking. Prior to now, I started really getting into the weeds about some pretty technical ideas. Technical skill is really important, but there is something else that will really make you, your team, and your company outstanding - code discoverability. I heard someone use the phrase "developer ergonomics" and think discoverability is one of the most important aspects of a healthy ergonomic landscape.

## What is Discoverability?

> Discoverability is the structure and organization of your code, project, and architecture that facilitates quick discovery and smooth navigation for members of the development team.

What this means is your goal, as a team member, is to structure the code, the project, and the architecture in such a way that current, or future teammates can quickly navigate through the codebase in order to build, enhance, troubleshoot, and update the software without needing to read and understand each line of code in the project.

This does not mean someone is not required to read any code at all. A substantial portion of the job of a programmer working on a brownfield project is reading the code. To be clear, every greenfield project becomes brownfield very quickly, so it's every programmers job to read. On the other hand, if you find that your teammates are struggling to navigate the project source, you may have an ergonomic problem on your hands.

We are going to explore, at a high level, what kinds of tools and skills can be applied in order to improve code discoverability, and enhance developer ergonomics in your project.

## Familiarity

One of the greatest things you can do for yourself and the people who come afterward is build in familiarity. The software world is much more stable than it was 20 years ago. Many of the preferred structural patterns and development practices have changed very little. Although someone might argue they haven't evolved to their maximal efficiency or what have you, but evolution tends not to work that way. Instead they have evolved to the point where things are robust enough to withstand the demands of most common software development needs. Let's look at the high-level considerations which can make or break a first experience with your project.

### Structure

Stucture is a pretty broad brush, so let's sort out what we mean. For the sake of this post, when I say structure, I mean to talk about things which are not actually part of the implementation details. Structure is the types and locations of different files and folders which house the implementation of your project. In other words, where do you put your files, why, and what does that mean?

I can't get too specific here because there are a variety of common languages and frameworks which provide structures that offer ease of use when you adhere to them. Instead, let's start with the assumption you are using one of these commonly understood tools. If this assumption is true, my first bit of advice is unless you have a damn good reason, follow framework and stack convention. My second bit of advice is, you almost never have a good reason to vary from convention.

Here's an example:

I worked with someone who advocated for changing the file structure in our project to something considered non-standard. We were working in Express.js, and the proposal was to stop using the convention of controllers, services, models, etc. and name everything with concept headings, then cram all the pieces together under those headings. At the time I didn't have a good argument against this. I am a fan of domain driven design and this, on the surface, seemed to adhere to the principles.

There is one major problem I can see clearly in hindsight. By putting the domain concepts at the very top, someone who is already familiar with Express is going to spend a lot more time tracking down the pieces of our software because they are going to be hidden away under concepts with which they haven't yet built a fluency. If we stick with the idea of leaving the concepts of controllers, services, and models at the top level, that new person will immediately feel more confident with what they are seeing. If they open controllers and see a bunch of domain language, they will be able to digest the domain independently from the concepts they already know.

### Patterns

Once we start thinking about the implementation of our solution, and we have structured our files/modules/classes in a way that adheres to common practice, we will want to think about the patterns we use to logically structure our solution, and what they convey to someone as they read and write software day to day.

I want to go on record as saying, I have been "that guy". I have thought my approach from some esoteric place was superior to the common convention. It might have been superior in some alternative universe, but I was sacrificing discoverability at the alter of cleverness. Don't be old me.

There are a large number of patterns in software development universe and they are designed to solve different sorts of problems. The biggest issue we typically encounter is that developers don't know their patterns. That's okay, it's an opportunity for learning. With that in mind, though, even if a new team member doesn't know their patterns very well, having intentionally developed, patterned code will stand out to them all the same. For example, using factories instead of a giant switch statement blob will clarify what you intend to do.

Tim Ottinger talks about noise to signal, and that's exactly what patterns are all about. They are increasing the signal about what you mean and reducing the noise of reading through potentially hundreds of lines of code that is unrelated to the problem at hand. One of my absolute favorite examples of a signal boosting patterns is the facade. The facade pattern is designed to take one or more api surfaces and trim it down to what is really important for the program at hand. It can hide a bunch of sins, but that's okay. It gives you an opportunity to separate the immediate signal from the broader noise which really needs some refactoring love.

## Context and Coherence

Context is a deep topic and has books written about it. Consider this as a primer to consider whether you are serving the people well who come after you. Good code is well maintained and functional. Great code tells a story with a step-down granularity. What does the file name tell you? What do the tests tell you? What do the function names tell you? What does this line tell you? Are they all coherent? This coherence with intentional context clues will help speed development as new development is done. This does not mean you should sit and navel gaze eternally to come up with the perfect names and tests that will tell the whole story from the get go. Context and coherence are the editors razor you can use to cut away the noise and increase the signal throughout the software implementation.

### Names

Names say a lot about your code. How you name your variables, methods, modules, classes, and even files can tell someone whether they are on the right track or not. Having a useful name for something in the code can offer insights into what someone can expect out of the code. Here are some examples of variable names:

```
let g: Grammar;
const f = (c, k) => c.write(k);
let b = {
    n: '',
    ad: ''
};
```

Though these are not copied directly from any particular codebase, I have seen almost exactly this code in more than one project. Using names like `g`, `f`, `c`, `b`, `n`, and `ad` make your code opaque and add extra noise. Even if you have types attached to these variables, when you see something like `g.validate(foo)` you have no clue what `g` actually is, or what it means to validate `foo` without doing a lot of hovering for type hints, scrolling up to look at where `g` is set, and figuring out where g was first initialized, or not. And then there's `f`. If you come from a math background, you will see `f` and immediately interpret it as "function". The problem is a mathematical function is "pure" meaning it is data-in, data-out. In this case, `f` actually has a side effect of some sort - it writes. These names are inscrutable.

Let's consider this instead:

```
let grammarInstance: Grammar;
const writeNewKey = (contentModel, key) => contentModel.write(key);
let baseRecord = {
    name: '',
    address: ''
};
```

Although this may not be perfect, we at least have some sense of what we are in for when we start interacting with the code. This is because each of the names provides a clear context clue as to what it means and how you might use it. This provides developers with a variety of other tools that come along for the ride. If they want to know where contentModel is used, they can search for it. If they understand what a base record means (they may not) they know where to find one. If they are buried in the code somewhere, they can still read what is written and it can be sensibly interpreted.

### Types



### Tests

## Avoid

### Cleverness

### Unusual Constructions

### Not Invented Here
