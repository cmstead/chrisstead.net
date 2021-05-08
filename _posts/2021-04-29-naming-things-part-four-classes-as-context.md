---
layout: post
title:  "Naming Things, Part 4: Classes as Context"
date:   2021-04-29 00:00:00 -0800
categories: programming human-centered-source design names
---
>This is part 4 of a multi-part series on naming things. [part three will be useful](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html)

Names are pesky little beasts. No single name exists without context<sup>1</sup>. This can be a disadvantage when names are unclear, abbreviated, or accidentally related to the surrounding context. On the other hand, if we understand that all names exist within some context, we can more carefully select the intention both of the name and the surrounding context for the name itself.

Long names can be a smell and, as we explored in a previous post<sup>2</sup>, we can do a little back of the envelope exploration and uncover a possible **_theme_** for the work being described in our source. Once we have identified a thematic word<sup>3</sup> or phrase, we can lift that aspect from the current name and use it to contextualize the source at a higher level.<!--more-->

In other words, where we were able to lift context from a variable name and use it to contextualize work within a function, we can also lift context from a method, or property and use it to contextualize all of the work within our class.

## Contextual Class Names ##

When last we saw our code sample, it had gone from a collection of language syntax and magic values to a function with context built into the name. Just as a reminder, here's where we left it:

```javascript
function throwIfBoxTooFull(addedWidgets, maximumWidgetCount){
  const tooManyWidgets = addedWidgets.length > maximumWidgetCount;

  if(tooManyWidgets) {
    throw new Error('Exceeded widget max');
  }
}
```

The body of our function largely expresses our intent, though in a future post, we will look at capturing the essence of our comparison and building a language structure around it to finish our abstraction of function constituents<sup>4</sup>.

Near the end of part three, we uncovered the primary theme of our function is the box. Given the widgets are incidental, regarding whether a box is too full -- a box could really hold anything -- our **_object of interest_** is most likely the box<sup>5</sup>.

The name of our function -- which could, just as easily, be a method -- provides us with everything we need to capture and lift the contextual element. This lifting would produce a transformation like the following:

`throwIfBoxTooFull` -> `Box` (object of interest), `throwIfTooFull` (contextualized method)

This **_contextual lifting_** arms us with everything we need to build our new class:

```javascript
class Box {

  throwIfTooFull(addedWidgets, maximumWidgetCount) {
    const tooManyWidgets = addedWidgets.length > maximumWidgetCount;

    if(tooManyWidgets) {
      throw new Error('Exceeded widget max');
    }
  }

}
```

## Understanding What We're Reading ##

It's worth noting that we can continue to make sense of the method name, i.e. `throwIfTooFull` even with the explicit "box" constituent removed. This is because our class definition carries a broader context which we naturally associate with other aspects of what we are reading.

For the sake of maintaining a shared vocabulary, we can call this **_source anaphora_**. This means we take the previously declared context or object of interest, and apply it to future, related communication. **_Anaphora_**<sup>6</sup> is the core of how humans make sense of what may otherwise be unclear<sup>7</sup>.

This behavior of recalling context is what makes a refactoring from method parameters to properties a meaningful choice. By looking back to the first naming post, we have values we can insert here, so our refactoring follows:

```javascript
class Box {

  addedWidgets = [];
  maximumWidgetCount = 6;

  throwIfTooFull() {
    const tooManyWidgets = this.addedWidgets.length > this.maximumWidgetCount;

    if(tooManyWidgets) {
      throw new Error('Exceeded widget max');
    }
  }

}
```

In this example, all of the names which reside within the `Box` class are contextualized by the class name. We interpret this code in the following way:

- `addedWidgets` -- widgets added to the box
- `maximumWidgetCount` -- maximum count of widgets that fit in the box
- `throwIfTooFull` -- throw (an error) if the box is too full
- `tooManyWidgets` -- too many widgets in the box

There is a clear sense of the relation between the widgets we are concerned with and the box which contains them. Even the variables within the method maintain a connection to the broader context of the box, though the connection is likely carried through binding rather than source anaphora.

## Wrapping Things Up ##

By lifting context to higher levels as is appropriate, we can start to capitalize on the way people interpret natural language, making our code both more explicit regarding intent, while reducing the need to be explicit at each line.

Another interesting phenomenon emerges, which is caused through the broadening of our context. Some methods, properties, and variables may become less clear, even seeming like a non-sequitur in the larger document. This smell may be an indicator that either, we have lifted the wrong context, or these source constituents are misplaced, and may belong elsewhere. Though worth noting, this "wrong context" smell is something best left to be explored in the future.

At this point, our context-lifting journey has largely come to an end, though there is always more to discover and learn as you work through your source code. Look for context clues. Lift shared context into higher-level structures. As this refactoring work is done, your code should become clearer and more obviously related to the problem space. Experiments are worthwhile, so if you discover your code clarity is suffering, you can always fall back to an earlier position and reevaluate.

Happy naming!

**_References_**

1. Why Worry About Names? [http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/04/27/why-worry-about-names.html](http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/04/27/why-worry-about-names.html)
2. Naming Things Part 3: Using Methods for Context [http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html)
3. The meaning of "word" in this case is intentionally vague, because it is likely more familiar to the reader. In reality what we will uncover will be more reflective of a morpheme, which encapsulates something about our source, and problem domain. (morpheme: [https://en.wikipedia.org/wiki/Morpheme](https://en.wikipedia.org/wiki/Morpheme))
4. Constituent [https://en.wikipedia.org/wiki/Constituent_(linguistics)](https://en.wikipedia.org/wiki/Constituent_(linguistics))
5. Understanding of natural language and what is meant (at face value) by an utterance is known as semantics, which we will explore in another post. (semantics: [https://en.wikipedia.org/wiki/Semantics](https://en.wikipedia.org/wiki/Semantics))
6. Anaphora [https://en.wikipedia.org/wiki/Anaphora_(linguistics)](https://en.wikipedia.org/wiki/Anaphora_(linguistics))
7. Understanding language in context is explored in the linguistic discipline of pragmatics. [https://en.wikipedia.org/wiki/Pragmatics](https://en.wikipedia.org/wiki/Pragmatics)
