---
layout: post
title:  "Naming Things Part the Second, or Simple Expressions"
date:   2021-03-15 00:00:00 -0800
categories: programming human-centered-source design names
---

>This is part two of a herminyherm-part series on naming things. [Part one might be useful for you](http://chrisstead.net/programming/human-centered-source/design/names/2021/02/22/naming-things-part-the-first-magic-primitives.html)<sup>1</sup>.

Though naming primitives<sup>1</sup> is a nice way to start spotting repeated values in your code, I believe naming really starts coming into its own when you start naming simple expressions. This can serve as the foundation for the actual communication work your source code will do for the next developer.

I've found, in my wanderings through other people's code, that naming simple expressions tells me a lot about what is really happening in the source code itself. Some of the earliest wins I have gotten were related to names I have applied to conditional blocks, and flow control more generally.

Suppose we came across this code in a source document somewhere:

```javascript
if(addedWidgets.length > maximumWidgetsPerBox) {
  throw new Error('Exceeded widget max');
}
```

Yes, this is the code from part 1. (See how the first post was useful?)

Anyway, when we read the conditional, it is interpretable. However, if you are just a little tired, a little distracted, or, really, a little anything other than on your perfect game, the first pass over these three lines still reads like a wall of text.

So, why is that??

It turns out that when people who speak a language like English, which is read from left-to-right, they tend to scan the left-hand side of the document, looking for things that are interesting.

This scanning, according to the Nielson Norman Group, will generally [pick up about 11 characters](https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/)<sup>2</sup> from the left-side of the screen. This means that they will see `if(addedWid`.

Yikes.

They know there is a conditional there. Let's start from the d and see what they see as they scan across: `dgets.lengt`.

Hmmm.

In 21 characters, the reader now knows there is a conditional involving something about widgets and, length. (Side note: Let's be honest, a native speaker will likely infer the full word after the dot is length.)

In the end, in order to understand the conditional, and anything about it, they would have to read all the way to the end to have enough context to know whether this is the code they are looking for.

What we have done is ask the user to slow down and read the entire document in order to find the one thing that is important to them within the context of the problem they are solving.

## Supporting Scanning ##

Ideally our code would be **_context-rich_**, AND support **_scanning_**. I would argue that the current state of the conditional really doesn't do either particularly well. This is a place where naming can really come into its own.

Let's start off and just lift our condition, and give it a name. Any name will do, really. I just want to see if it looks better with a name.


```javascript
const condition = addedWidgets.length > maximumWidgetsPerBox;

if(condition) {
  throw new Error('Exceeded widget max');
}
```

Aha! Like magic my eye stopped getting hung up on the if statement and discovered an error is being thrown. That's a really big deal!

I would contend that `condition` is a TERRIBLE variable name, but now we know there is some condition where, when met, an error about exceeding the widget max, whatever that means. We also know, if we are really interested in the details of the condition, we can read them. If the condition is NOT what we care about, we can move on.

This kind of abstraction building is the way people actually communicate. We don't just have a single monolithic abstraction. Instead we **_chunk_**<sup>5</sup> things and give them names. It's easier to remember the chunk than the details, and that chunk can be incorporated into a larger chunk if needed.

## Naming That Thing ##

Hopefully you agree that `condition` is not a good variable name because I am about to go rename it.

If we read the entire conditional expression, we will see we're comparing the `addedWidgets` length and the `maximumWidgetsPerBox` value. This gives us a great first meaningful name for our variable.  How about this:

```javascript
const exceededWidgetsPerBox = addedWidgets.length > maximumWidgetsPerBox;

if(exceededMaxWidgetsPerBox) {
  throw new Error('Exceeded widget max');
}
```

My rename only took a few seconds, but I tried to pack in all of the context I had at the moment. What I ended up with is something that should jump out when scanned (`if(exceeded`), and provide increasing context as the reader scans across for more information (`dMaxWidgets`).

What we ended up with is a name that scans better and says a lot about what is happening in our code. Anyone in the future should be able to quickly understand what this code is doing and, more importantly, WHY it is doing what it is doing.

It's worth noting, not every variable name will pop out this easily, but that's okay. You can always **_iterate_** toward a better name as appropriate. Perhaps `exceeded` isn't great and you decided to go with `tooManyWidgetsInBox`. This change might be a more meaningful **_signpost_**<sup>3</sup> for your reader.

## Code Signposts ##

Signposts are embedded bits of context which help someone find their way. I borrowed the notion of _signposts_<sup>3</sup> from interface design and Peter Morville's notion of **_findability_**<sup>4</sup>. This notion of signposts can be found in many well designed interfaces -- signposts help you find your way to the thing you care about.

I'll even borrow an analogy. Imagine you are at a store, looking for something. Many large-name stores have signs up, indicating what is in a given aisle. This kind of information surfacing technique makes it easier to locate items you are shopping for.

We can do the same thing in our code. By creating context-rich names, bound to the **_local lexical context_** of our code, we provide readers with an indication they have found what they are looking for, or not.

This kind of **_micro-design_** concern is what makes code feel obvious and effortless when you read it. The notion that you will carry every symbol you come across in your head is unreasonable. By chunking ideas, especially ideas which are familiar, we provide our reader with a way to find their way through our code with less effort, saving them the feeling of a scrambled brain at the end of the day.

## Closing Up ##

This kind of chunking small ideas into small, named _abstractions_ provides a tremendously powerful tool when refactoring your code. We changed nothing significant about the outward behavior, we simply said a lot more about it in our source document.

A name _refactoring_ is probably one of the biggest bang-for-buck tools you can have in your toolkit. Many popular editors have automated refactoring built in, or there is a plugin. This means it should be a couple of keystrokes and you are on with your day.

Something that commonly happens when I start doing this kind of refactoring work is, I extract one expression, which reveals another small abstraction, and another, and another. This kind of rabbit hole is especially magical given the speed at which I can extract values and give them names.

The next time you find yourself reading a line full of operators and chained expressions, consider adding a name in there. You might just save your own skin in the future.

_References_

1. "Naming Things Part the First, Or Magic Primitives" ([http://chrisstead.net/programming/human-centered-source/design/names/2021/02/22/naming-things-part-the-first-magic-primitives.html](http://chrisstead.net/programming/human-centered-source/design/names/2021/02/22/naming-things-part-the-first-magic-primitives.html))
2. "First 2 Words: A Signal for the Scanning Eye" ([https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/](https://www.nngroup.com/articles/first-2-words-a-signal-for-scanning/))
3. "Signposts: Helping Users Navigate Content" ([https://www.webdesignerdepot.com/2010/06/signposts-helping-users-navigate-content/](https://www.webdesignerdepot.com/2010/06/signposts-helping-users-navigate-content/))
4. "Ambient Findability: What We Find Changes Who We Become" ([https://www.amazon.com/Ambient-Findability-What-Changes-Become/dp/0596007655](https://www.amazon.com/Ambient-Findability-What-Changes-Become/dp/0596007655))
5. "Chunking (Psychology)" ([https://en.wikipedia.org/wiki/Chunking_(psychology)](https://en.wikipedia.org/wiki/Chunking_(psychology)))
