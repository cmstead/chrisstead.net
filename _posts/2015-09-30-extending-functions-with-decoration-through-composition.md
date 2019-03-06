---
layout: post
title:  "Extending Functions with Decoration through Composition"
date:   2015-09-30 09:00:25 -0700
categories: Coding, Design Patterns, Foundation, Functional Programming, Javascript, SOLID
---
{% raw %}
In object oriented design, the decorator pattern is commonly used to extend and enhance classes so they perform some new or more refined functionality. In functional programming it is possible to decorate functions as well. The decoration must follow a few rules, but the result is a very powerful technique to enhance functions statically and at run time.

At the core of functional decoration is function composition. Composition is a straightforward practice that relies on pure functions which take a predictable input and output.  A trivial example is something like the following:

```javascript
function add (a, b) {
    return a + b;
}

function square (x){
    return x * x;
}

// Composing the two functions:
var squaredSum = square(add(1, 2)); // 9
```

This is so foundational to what we know of math and computing there is actually a special notation in mathematics to compose functions this way. It's common to see this kind of thing annotated as <em>f &compfn; g</em>.

I was trying to think of a toy problem that could be used to demonstrate the kind of power we can get from function composition, but then it dawned on me.  A great example of real powerful decoration through composition can be demonstrated through a very common problem in statistics: Computing x-bar for a set of data points.

We actually already have almost everything we need to do it.  Let's create a divide function to round out the basic functions we will need to compute x-bar.

```javascript
function divide (a, b) {
    return a / b;
}
```

That's it. Let's do some statistics.

The first thing we are going to need to compute x-bar is a simple mean.  This is typically referred to as an average in daily life.  We're all pretty familiar with taking a basic average: take the sum of all values and divide by the number of values.  Let's build the simpleMean function.

```javascript
// We need to sum all values, so let's start there.
function sum (valueList){
    return valueList.reduce(add, 0);
}

// Now we have everything we need to create simpleMean
function simpleMean (valueList){
    return divide(sum(valueList), valueList.length);
}
```

SimpleMean is our first big example of function decoration through composition. As it turns out the line gets rather fuzzy when dealing with composition and decoration.  The important distinction to make is when a function is decorated, the new function will honor the original function contract.  What we can see here is sum takes a list and returns an integer.  SimpleMean also takes a list and returns an integer.  Most importantly, simpleMean wraps up the behavior of sum with another function to extend the behavior of sum without modifying or duplicating it.

Let's dig a little deeper into our statistical function and create a new function that normalizes the values in our list using the simpleMean function and map.  It's really important to note that normalize values is a composite function but it is not a decorated function.  Although we are using simpleMean to create our new function, the resulting contract does not adhere to the original simpleMean contract.

```javascript
function normalizeValues (valueList) {
    var mean = simpleMean(valueList);
    return valueList.map(add.bind(null, -mean));
}
```

By creating this new function, we are now ready to start piecing together our final function which will provide x-bar.  X-bar is the sum of the squares of normalized values. We have our normalized values, so let's get to squaring and summing!

```javascript
// Please note we're decorating our sum function with
// a squaring function.
function sumSquares (valueList){
    return sum(valueList.map(square));
}

function computeXBar (valueList){
    return sumSquares(normalizeValues(valueList));
}
```

The power we are ultimately seeing here is something that comes out of strong composition and an adherence to the contracts of our functions to produce richer and richer behaviors with only one or two lines at a time.  The important thing to note while looking at these functions is the extremely limited use of variables. By building functions through composing and decorating functions, state is eliminated and the spaces where bugs and incorrect logic is reduced to the smallest footprint.

As you work on new systems of behaviors, think about what your goal is and break it down into small, easy to understand steps which can be composed to create a powerful, easy-to-understand function which avoids state and provides fast, crisp, high-quality behavior.
{% endraw %}
    