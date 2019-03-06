---
layout: post
title:  "What the Heck is a Functor?"
date:   2015-08-26 09:00:26 -0700
categories: Coding, Foundation, Functional Programming, Javascript
---
{% raw %}
With functional programming ideas becoming more popular in languages not known for functional practices, words that are understood in functional and mathematics worlds are starting to surface in discussions outside of academia and in business solutions circles. One word people like to throw around is "functor."

What the heck is a functor?

It turns out a functor is just a function that maps one set to another set. That's really it. Functors come in a variety of forms, but they all, at the most abstract level, do the same thing. The particulars of how the mapping happens is what makes your function a solution to a distinct problem. To start off, let's have a look at a mathematical functor and the underlying logic, then we can turn that into code.  I promise this will be gentle.

<blockquote>
&Phi;() is a one-to-one, onto function that maps x -> 3x.

A = { 1, 2, 3, 4 }
B = { 3, 6, 9, 12 }

&Phi;(A) = { 3, 6, 9, 12 } = B

=> &Phi;(A) = B

&Phi;(S) can be represented by the function f(x) = 3x
</blockquote>

Sooo mathy.

Fortunately, Javascript can easily convert this into something that is a little less symbolic and a little more like what we might do in our day-to-day lives. Let's take a look at a Javascript equivalent of performing the same operation. Incidentally, we are going to use the map function to accomplish our goal. Let's have a look:

```javascript
function multiply (a, b) {
    return a * b;
}

[1, 2, 3, 4].map(multiply.bind(null, 3));
// [3, 6, 9, 12]
```
{% endraw %}
    