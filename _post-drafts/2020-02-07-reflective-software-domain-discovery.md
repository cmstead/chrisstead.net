---
layout: post
title:  "Reflective Software Domain Discovery"
date:   2020-02-07 00:00:00 -8:00
categories: domain-driven-design software-development agile tdd refactoring
---

I originally set out to write a blog post about Domain-Driven Design (DDD) which could give people a clear path to go from no understanding to, well... some understanding. I'm not an expert, but I feel I have started to come to grips with what DDD is, and how to make the ideas which underpin it to work for me and my team.

Nevertheless, that topic, even simplified, is a lot to try to fit into a single blog post.  DDD can be highly technical, take the "Blue Book" ("Domain-Driven Design: Tackling Complexity...", Evans) as an example. Many people struggle to finish Eric's book simply because it is dense and highly technical. All the same, there is a tremendous amount of value packed into the volume.

Instead, I'd like to try and back into the idea of designing software around a problem domain by assuming you already have software which solves a problem, but isn't centered around the domain, within the source code itself.

Before we even explore what a domain might even be, I'd like to touch on some approaches for simply making your source code and, ultimately, your software better. These approaches will draw you closer to domain-driving your code as a by-product.

## Making Source Code Better ##

As we dive into this section, I want to point out, source code is not the same as software. Even if you ship software built in an interpreted language, the code you write must be converted into a form that the computer can consume and use as instructions.

Since source code is not a program, and not executable, it must be for people. High-level languages like Java, C#, Javascript, Python, Lisp, etc. are all written with the express purpose of being English-like. This choice was made to meet the needs of people. So...

**Source code is documentation for people.**

### Editing Source Documents (Refactoring) ###

Source documents are designed to be read. If they can be written and read, they can be edited, like a book or article. What we will explore here is how we can better edit our source documents to make them better suited for people. This act of editing the source documents is referred to as "refactoring" which is how we will approach editing our source code.

#### Organizing Code for Reading ####

One of the simplest things you can do in your source code is organize it for reading. Without changing names, extracting code to other documents, or other types of changes, you can still organize code to be more readable.  The key things to look for in making the text in a document more readable are:

- White space
- Grouping lines
- Ordering groups

Humans typically read by scanning, so by making the document more scannable you will make it more readable. This means, the most effective way to make a big impact on your code without any drastic measures is to use white space effectively.

**White Space**

White space is the space in your document between characters and lines. People tend to visually group ideas together, so using white space effectively will provide a visual cue that lines, or ideas go together, even if they didn't actually change location in the document.

Take the following code:

```javascript
function fizzBuzz(value){
  let result='';
  if(value%3===0)
    result+='Fizz';
  if(value%5===0)
    result+='Buzz';
  return result!==''?result:value;
}
```

This is just a solution to the classic FizzBuzz problem. Even such a small piece of code as this starts to feel like a wall of text when white space is not considered, and used effectively.  Let's have a look at the same code, using white space to improve readability.

```javascript
function fizzBuzz(value) {
  let result = '';

  if (value % 3 === 0)
    result += 'Fizz';

  if (value % 5 === 0)
    result += 'Buzz';

  return result !== ''
    ? result
    : value;
}
```

Though you may or may not agree with the new lines in the ternary expression at the end of the function, the second example is likely much more pleasing to your eye. The conditionals are clearly visually grouped, variables live on their own, and the return expression is obvious at the bottom of the function.  It might as well be an entirely new piece of code, but all I did was add white space for formatting.

This formatting will come into play in the next section.

**Grouping Lines**

Although FizzBuzz is a relatively short bit of code
