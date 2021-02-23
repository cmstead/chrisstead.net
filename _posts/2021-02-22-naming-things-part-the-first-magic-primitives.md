---
layout: post
title:  "Naming Things Part the First, or Magic Primitives"
date:   2021-02-22 00:00:00 -0800
categories: programming human-centered-source design names
---

Something I learned about years ago, and I continually preach is names. I could (and likely will) write at length about the hows and whys. I will, however, begin with a short story.

## Story Time ##

I worked with a couple of other developers who, in my estimation, are some of the finest damn folks I've had the pleasure of working with. During our time together we explored a number of ideas, and ran lots of experiments. One of these experiments was applying the "Seven Stages of Naming" as designed by Arlo Belshee, and run through our own personal filters.

We chose to work on the Tennis Kata, which, if you're not familiar with it, is a wall of text, a couple of simple tests, and the rules: refactor the code, don't break the tests.

This left us a lot of room to experiment, so we went for it. We did silly things like the following:

```javascript
score = 2;
```

Refactored to:

```javascript
const two = 2;
score = two;
```

This kind of change might seem silly on first pass, but once we went through and gave every integer we found a name, we discovered that a pattern emerged. We could actually see things being reused ALL OVER THE CODE.

Once that happened, we were able to start teasing the code apart in ways that helped us to make real, meaningful progress in the kata.

And we broke no tests.

## Real Code ##

If you've written lots of code, and I have written far too much code, you are bound to create a lot of primitive values. They just kind of pop up. An error message here, a maximum retry value there. All of these things add up to a bunch of primitive values, and that fact, by itself isn't bad, it's just a fact of life.

The question is, is your source code actually paying for itself?

Not all primitives are made equal, and 2 may not be the same 2 used somewhere else.  It's the same number, but there is real, human context that led to the use of 2.

In the Tennis Kata, 2 ended up being a score. In your code, it could be the maximum number of times a user can retry their password before they are locked out. Both are 2, but they are not the same number at all.

Apples and oranges, or tennis and logins, if you will.

Let's consider the following code:

```javascript
if(addedWidgets.length > 6) {
  throw new Error('Exceeded widget max');
}
```

There is a little context here. Apparently 6 is a widget max, but in what way? Why is there a maximum? There's just not enough information in this code to understand what is really happening.

This standalone primitive is called a _magic number_. It's magic because it does something important, but without any sense of why, or how.

## Humans and Language ##

We all assume that everyone looks at, and understands the words we use in the same way we do. It's not a conscious assumption, it's just the only way we can communicate without carrying the heavy burden of defining every word for every conversation.

What really happens is, people are really good at using context to help infer meaning in the bigger picture. This means, the more context someone has the more likely they are to understand what is being communicated to them.

It turns out that programmers work the same way.

Surprise! Programmers are humans!

Think about the times you've been working somewhere deep in the code, and you end up flipping back through half a dozen files to piece together context for what you're doing. Again.

I find myself doing it the most when I am trying to remember what some data looks like. The form of anything that is more complicated than a primitive value is likely to slip my mind while I'm looking at something else.

We can combat this: give things meaningful names. Everywhere. All the time.

The more you give values meaningful names, the easier it is to rebuild context when you're fifteen layers into that yak you're shaving.

## Real Code (Reprise) ##

I'm going to take the code from above...

```javascript
// This was the code in case you forgot, like I do
if(addedWidgets.length > 6) {
  throw new Error('Exceeded widget max');
}
```

Now, I'm going to just name the number, and the picture will immediately become clearer.

```javascript
const maximumWidgetsPerBox = 6;

if(addedWidgets.length > maximumWidgetsPerBox) {
  throw new Error('Exceeded widget max');
}
```

With this new piece of human-centered information, the picture comes into focus. We are counting the number of widgets being packed into a box! OF COURSE going over the max would cause an error.

You can't fit 7 widgets in a 6 widget box!

And just like that we told an entire story about the software we are building.

## Wrapping It Up ##

Naming is something that can be done on a small or large scale, and this is only the first step. This may, in fact, not be the best name for our number, but it's definitely better than no name at all.

I challenge you, after reading this, go back to the code you are working on, and every time you see a magic number (or magic string, boolean, etc.) extract it and give it a name. You can do it in place, by hand, or you can use an automated refactoring tool, if you have one handy.

As you look at your code, and start naming things, ask yourself "what would I like to know about this if I were reading this for the first time?" The answer is the variable name.

Happy naming!
