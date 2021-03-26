---
layout: post
title:  "Naming Things Part 3: Using Methods for Context"
date:   2021-03-25 00:00:00 -0800
categories: programming human-centered-source design names
---

>This is part three of a multi-part series on naming things. [Part two will be useful](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/15/naming-things-part-the-second-simple-expressions.html)<sup>1</sup>.

When looking for the right name for something you can end up with a pretty long name. In part 2, we looked at capturing conditional context by extracting a simple expression, but the name was pretty long.

Long names can be problematic for code **_scannability_**. We can work to move the most important words to the front of the variable name, but once a name gets long enough, it begins to contribute to the wall of text we are working so hard to reduce.

We can actually see this with the first name example in our sample code.

```javascript
const exceededWidgetsPerBox = addedWidgets.length > maximumWidgetsPerBox;

if(exceededMaxWidgetsPerBox) {
  throw new Error('Exceeded widget max');
}
```

The name `exceededMaxWidgetsPerBox` is really long, and actually reduces the ability for someone to scan past it. There is actually **_a noted reduction in focus, and deep absorption of information_**<sup>2</sup>, due to online reading habits. This not only affects the way we absorb information in books, but it can also impact the way we absorb source code.

## Binding ##

Since our job involves absorbing and using information quickly to make decisions, it is best if we can present relevant information quickly, and capitalize on the way people absorb language. This means, however, we need to look deeper into how we would improve the code in order to help retain engagement, and speed information seeking behaviors.

Linguistics offers insight into how people process context-heavy language. **_Binding_**<sup>3</sup> is the way that people associate context from a larger communicated **_theme_**<sup>4</sup> to support indefinite pronouns like: it, them, he, she, etc.

Example:
>Linda bought lunch at her favorite restaurant.

The contextual object of this sentence is Linda. Every indefinite pronoun refers back to the original object, i.e. Linda. We can use this to our advantage, as long as we are aware of what the thematic object is in our variable name.

## Identifying a Thematic Object ##

Let's consider our sample source, again, and look for ideas which are repeated. Repeated ideas are typically indicative of a contextual theme, which can help to drive names.

```javascript
const exceededWidgetsPerBox = addedWidgets.length > maximumWidgetsPerBox;

if(exceededMaxWidgetsPerBox) {
  throw new Error('Exceeded widget max');
}
```

I can see objects we can consider as thematic:

- widgets
- box

There are also descriptive concepts which can help us refine our discovery:

- box size (`maximumWidgetsPerBox`)
- box is too full (`exceededWidgetsPerBox`)
- widget count (`addedWidgets.length`)
- adding widgets to a collection (`addedWidgets`)

It seems as though widgets are a general set of any added widgets since we are counting the number which are there, and comparing the count to some other pre-set size. Also, the box seems to be distinct and definite, since it has a defined size, and carrying capacity.

Given our discovery, the thematic object is likely the box, and the widgets are, perhaps, part of a larger programmatic theme. Let's use our identified theme to create a new context.

## Contextualizing With Functions and Methods ##

Since we have landed on the box as the broader contextual idea, we can use this to create a new contextual marker. Much like in a sentence, any function or method will provide an intended context, or theme for the behavior. 

By choosing a name for a method that captures our theme, we can reduce the length of our variable names, and use human language processing to our advantage to make our code clearer, and easier to scan.

```javascript
function throwIfBoxTooFull(addedWidgets, maximumWidgetCount){
  const tooManyWidgets = addedWidgets.length > maximumWidgetCount;

  if(tooManyWidgets) {
    throw new Error('Exceeded widget max');
  }
}
```

With this first pass, we have now lifted the idea of a box, and its size out of the local variable names, and created an implicit context which carries through the local block context. By knowing the **_focus_**<sup>5</sup> is the box, our widget discussion is contained completely within that particular context.

## Reading Code Aloud ##

At this point we can revisit the discussion from Dr. Felienne Hermans, regarding **_code phonology_**<sup>6</sup>, and we can start to unify the way this code might be read aloud. We have common markers for written language here, so it might be reasonable to interpret this code as follows:

>Throw an error if the box is too full. If there are too many widgets the error should be 'Exceeded widget max'.

This reading comes almost directly out of the definition of the function. There is, of course, an assumption of idiom around "throw" meaning "throw an error". Otherwise, our phrasing actually makes the same thematic assumption, because of binding, that our code does.

The fact that we can map the expression of intent to our code in a meaningful way provides a clear path for the next developer to start unwinding the indent of the work which was done.

## What's Next ##

Although this process may seem a little bulky, when you are looking at your code it is pretty common to have a theme jump out at you. The analytical breakdown above is simply to demonstrate how a thematic object can be selected from a section of your code. In practice, it's often preferable to choose a best first guess for a name, and then iterate toward a better option as you discover more.

Our code snippet started with a rather long variable name in the mix. Though long variable names may be an indication of several things, when the subject is short and simple, it is often the case that the variable name, not the value, is actually doing too much work. Using the concept of binding, we can extract context and provide it implicitly through the name of a function or method.

It's reasonable to assume this function is not isolated in a file, with only one reference to a box, or widgets. This same binding concept can be carried through to classes and namespaces, which we will look at in the future. It is important to note, the farther any named theme is from a variable, the less room you have to shift meaning.

With the concept of binding, we can offload the localized work of maintaining context and shift it to a higher-level abstraction. This kind linguistic abstraction provides direct insight into **_Dijkstra's_**<sup>7</sup> comment about abstraction:

>The purpose of abstraction is not to be vague, but to create a new semantic level in which one can be absolutely precise.

**_References_**

1. "Naming Things Part the Second, or Simple Expressions" [http://chrisstead.net/programming/human-centered-source/design/names/2021/02/22/naming-things-part-the-first-magic-primitives.html](http://chrisstead.net/programming/human-centered-source/design/names/2021/02/22/naming-things-part-the-first-magic-primitives.html)
2. "Serious reading takes a hit from online scanning and skimming, researchers say" [https://www.washingtonpost.com/local/serious-reading-takes-a-hit-from-online-scanning-and-skimming-researchers-say/2014/04/06/088028d2-b5d2-11e3-b899-20667de76985_story.html](https://www.washingtonpost.com/local/serious-reading-takes-a-hit-from-online-scanning-and-skimming-researchers-say/2014/04/06/088028d2-b5d2-11e3-b899-20667de76985_story.html)
3. "Binding" [https://en.wikipedia.org/wiki/Binding_(linguistics)](https://en.wikipedia.org/wiki/Binding_(linguistics))
4. "Topic and comment" [https://en.wikipedia.org/wiki/Topic_and_comment](https://en.wikipedia.org/wiki/Topic_and_comment)
5. "Focus" [https://en.wikipedia.org/wiki/Focus_(linguistics)](https://en.wikipedia.org/wiki/Focus_(linguistics))
6. "Code Phonology" [https://www.felienne.com/archives/5947](https://www.felienne.com/archives/5947)
7. "Edsger Dijkstra" [https://en.wikipedia.org/wiki/Edsger_W._Dijkstra](https://en.wikipedia.org/wiki/Edsger_W._Dijkstra)
