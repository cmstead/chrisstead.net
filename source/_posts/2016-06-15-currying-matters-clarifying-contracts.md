---
layout: post
title:  "Currying Matters: Clarifying Contracts"
date:   2016-06-15 09:00:06 -0700
categories:
    - Coding
    - Design Patterns
    - Functional Programming
    - Javascript
---
{% raw %}
Function contracts are a tricky thing.  Ultimately what they define is an API for your application, but they also define how you write your internal behaviors. This balancing act can either lead to clear, well written code, or it can quickly devolve into ball of tangled string.

Walking the clean code, clean API line can seem to be a daunting task. It's common to hear people say this is precisely what Classical OOD is built for. By maintaining state, methods can accept partial requirements and allowing the developer to build their behavior in time.  I argue this kind of state management leads to extra cognitive load as the developer is required to keep track of the managed state.  By currying and clearly exposed intent, incremental behavior building becomes a trivial task done in a reliable set of steps.  It also leads to better program design and behavior determinism, making testing much easier to reason about.

<h3>A Small Example</h3>

Let's have a look at a slice function as an example.  It's common to want to call slice on arguments objects and arrays alike.  This means we have to vary our behavior for each different behavior.  Instead of showing example of different usages, I'm going to jump to a general slice implementation similar to what was written in JFP v2.x.

```javascript
    function slice(start, values, end) {
        var cleanEnd = pickEnd(end, values.length);
        return Array.prototype.slice.call(values, start, cleanEnd);
    }
```

This function makes use of a convenience function which we will continue to use throughout this post.  Here is the implementation of pickEnd.

```javascript
    function isInt(value) {
        return typeof value === 'number' && value === Math.floor(value);
    }

    function pickEnd(end, valueLength) {
        return isInt(end) ? end : valueLength;
    }
```

Let's have a look at how we might accomplish a few simple tasks using our original slice function.  We will create a function which will slice an arguments object or copy an array, a function which will drop the first three elements in an array and, finally, a function which will capture the elements from an array from indices 1 to 3.

```javascript
    var argumentsToArray = slice.bind(null, 0);
    var dropFirstThree = slice.bind(null, 3);

    function takeFrom1to3 (values){
        return slice(1, values, 3);
    }
```

As we can see, using our slice function forces us to either bind arguments, or actually wrap the entire behavior in a function.  This kind of inconsistency makes our slice implementation difficult to use.  There must be a better way!

<h3>Currying The Slice</h3>

The application inconsistencies in our new code leads me to believe we need a better solution.  When dealing with a single function API, currying can, often, be illuminating regarding argument order and function implementation.  At the very least we might land on a first uniform, stable application. Let's have a look at what currying is and how we can apply it to our existing function.

Formal currying is defined as converting a function of multiple arguments to a series of on-argument functions.  This means currying a function of 3 elements would go a little like this:

```javascript
    function lambda (a, b, c) {
        return op(a, b, c);
    }
    
    function lambda (a) {
        return function (b) {
            return function (c) {
                return op(a, b, c);
            };
        };
    }
```

If we apply this formal definition to our function, it will produce a new series of functions which are called in order.  This means each function progressively accumulates information about execution state without needing any external management system or object.  Let's take a look at a formal currying of slice.

```javascript
    function slice (start){
        return function (values) {
            return function (end) {
                var cleanEnd = pickEnd(end, values.length);
                return Array.prototype.slice.call(values, start, cleanEnd);
            };
        };
    }
```

If we use this new definition of slice, we will need to revise the implementation of our functions.  Let's dig in and see how currying makes application more uniform.

```javascript
    var argumentsToArray = function (values) { return slice(0)(values)(); }; 
    var dropFirstThree = function (values) { return slice(3)(values)(); }
    var takeFrom1to3 = function (values) { return slice(1)(values)(3); };
```

Although we have to wrap each new function in an anonymous wrapper, we now have complete uniformity in how we apply slice.  With this uniformity, we can now, safely, reorganize code and guarantee code depending on our API won't break.

<h3>Three Arg Monte</h3>

Since each of our derivative functions only take an array as an argument, we can fiddle with the inner workings so long as we don't alter the output.  Suppose we swap the order of the output functions, capturing values at different stages of execution.  It is, in fact, no different than if we had reordered the parameter list in the original function, but without the pesky .bind() bit.

Let's take our curried function and move our end parameter up the chain, next to the start parameter.  This means our function series will always take a start and end value, which makes our values parameter the last argument.  Let's see the resulting reorganization.

```javascript
    function slice (start){
        return function (end) {
            return function (values) {
                var cleanEnd = pickEnd(end, values.length);
                return Array.prototype.slice.call(values, start, cleanEnd);
            };
        };
    }
```

With this new parameter order, we actually move the values parameter to the correct position; in other words, we can apply all of our indices first and take the values argument last, leaving us in a position which is correct for creating a variety of novel behaviors directly.

```javascript
    var argumentsToArray = slice(0)();
    var dropFirstThree = slice(3)();
    var takeFrom1to3 = slice(1)(3);
```

Our application of slice has remained uniform, while allowing us to exclude the anonymous function wrapper for all three applications.  This is definitely closer to what we really meant to say at the beginning.  If only we could get rid of that required second call.

<h3>Collapsing The Calls</h3>

Now that we have found a parameter order which serves us the best, let's get rid of the extra function call.  It is useful for takeFrom1to3, but it actually makes the application of slice for argumentsToArray and dropFirstThree unnecessarily complicated since we call a function with no argument.  We want to eliminate confusion where possible.

Since curried functions can be expanded from multiple argument functions, what's to stop us from reversing the process?  Moreover, it is reasonable to collapse only the parameters we want at a given level.  Let's reverse the currying process for start and end and see what we get.

```javascript
    function slice(start, end) {
        return function (values) {
            var cleanEnd = pickEnd(end, values.length);
            return Array.prototype.slice.call(values, start, cleanEnd);
        };
    }
```

Slice has been collapsed back into a function which captures our indices early and applies them, lazily, to the final argument as we need execution to complete.  This means we can actually get the uniformity we saw in earlier reorganizations, with the API sanity of a well-defined function, which happens to optionally take an extra argument after a start index.  This is probably best viewed in an example.

```javascript
    var argumentsToArray = slice(0);
    var dropFirstThree = slice(3);
    var takeFrom1to3 = slice(1, 3);
```

Throughout the process, all three of our derivative functions have only ever taken a values argument, but the application of our deeper=level function has brought us to a point where the contract is most sensible for flexible application and reuse.  Better yet, each of the slice applications expresses the intent more closely since only the indices we intend to use are used at application time.

<h3>API Clarity, At Last</h3>

Someone said, recently, on Twitter that what most people call currying is actually partial application.  As it turns out this is only partially true.  The line between currying and partial application is so blurred, I am inclined to argue that partial application is merely a special case of the more general form of function currying.

Moreover, currying is not a one-way street.  Instead, it is a tool to help us identify better ways to express our programs through expanding and collapsing arguments.  By better understanding how currying works, we can actually experiment with different configurations of our functions, ideally, without overhauling contracts, types and the like.

When used with intent and care, currying enables us to create functions which have sane, meaningful and expressive contracts while also providing the flexibility to fluidly apply a general-purpose function in a variety of different situations.  In other words, if your function contract stinks, maybe it's time to apply a little currying and make your code awesome!
{% endraw %}
    