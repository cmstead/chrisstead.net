---
layout: post
title:  "Refactoring from Imperative to Functional"
date:   2015-11-18 08:00:25 -0800
categories:
    - Coding
    - Design Patterns
    - Functional Programming
    - General Blogging
    - Javascript
---
{% raw %}
I was talking with a coworker one day pretty recently and I had a pretty sizeable revelation, people think I write code the way I do from the get-go. It's actually really hard to look at the final output in a code block and understand how someone might have arrived at that solution.  Even when the code is completely obvious, it might not have been obvious how the original problem was solved.

I tend to write in a very terse, functional style. I prefer declarative functions over long, tedious loops and conditionals. This style is not something you are born with and it is definitely not always the first thing to come out.  I have been in situations where I KNOW I have the answer in my head, but I just can't quite spit it out, so I take the long way around, then come back and do some cleanup.

My goal with this post is to expose what this kind of code surgery looks like on a problem which doesn't seem to be reducible. Along the way I will introduce a variety of helper functions.  These functions should not be cut and pasted. Instead they are intended for use in a library or shared module.  Most (though not all) can actually be found in my <a href="http://cmstead.github.io/JFP/" target="_blank">JFP library</a>, which saves the work of creating and refining these small abstractions for yourself.  For the purpose of illuminating what is actually happening as I identify work, I will carry all added code forward.  This is for your convenience as reference material.  At the end, I will break apart the code and show which pieces are actually kept in the core source code.

Let's start off with a function that takes an array and sums over all numbers which are either a multiple of 3 or 5.  This can be done in about 15 lines including whitespace, so it's a pretty tight little function.  This is actually pretty representative of code I see in the wild.

```javascript
    function sumMultiplesOf3And5 (list) {
        var total = 0,
            index = 0;
        
        if (typeof list === 'object' && Object.prototype.toString.call(list) === '[object Array]') {
            for (index; index < list.length; index++) {
                if (list[index] % 3 === 0 || list[index] % 5 === 0) {
                    total += list[index];
                }
            }
        }
        
        return total;
    }
```

This is pretty straightforward.  We take in a list, prepare a variable for the total and one for the index, then we test that the list is actually an array.  Finally, we iterate over each element, perform a modulus test and then add any matching values. It's short, but there is a lot to digest on each line.  One of the first things we can do to simplify the code is strip that top conditional out.  Let's create a helper function and sanitize our data instead of wrapping everything in a big conditional.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }
    
    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (values[index] % 3 === 0 || values[index] % 5 === 0) {
                total += values[index];
            }
        }
        
        return total;
    }
```

That's already a lot easier to digest.  Keep in mind, since this is refactoring, some steps show an immediate impact while others will make the code worse before it gets better. In this case, we actually made a nice impact.  Now we have a sanitary array we can perform safe operations on each time.  In a standard imperative language, we would probably stop here and call it a day. This, however, is Javascript. We can do better!

Let's pull the modulus check up into helper functions.  It is not going to be immediately obvious why we would want to do this bit of work, since it seems to just confuse the matter, but it will make sense all in due time.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (equal(0, mod(values[index], 3)) || equal(0, mod(values[index], 5))) {
                total += values[index];
            }
        }
        
        return total;
    }
```

Now our checks are wrapped up in functions which will make our lives much, much easier.  For now, it ends up being a little more typing.  That's alright, though.  When our checks are made with functions, it exposes repeated code we might not have seen before.  We are actually making a check against 0 twice.  This is something we can abstract away with pure functions.  Let's add a simple compose function and create a new function we can use more freely.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(list) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            checkModulus = compose(equal.bind(null, 0), mod),
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (checkModulus(values[index], 3) || checkModulus(values[index], 5)) {
                total += values[index];
            }
        }
        
        return total;
    }
```

Now we have a nice little function we can pass our value and modulus base into and get a boolean result.  This gives us a more declarative way of performing our check.  Here's where we are going to first introduce two functions many people associate with functional programming: map and reduce. The mapping and reduction we are going to do will be so small it's almost a direct manipulation of single values, but it gives us a way to find new pieces to pull up and out.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            checkModulus = compose(equal.bind(null, 0), mod),
            modValues = [3, 5],
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (modValues.map(checkModulus.bind(null, values[index])).reduce(or, false)) {
                total += values[index];
            }
        }
        
        return total;
    }
```

Now we are actually performing a map across our modValues array and a reduce on the result.  By performing this behavior inline, inside an if condition, it's not very clear what we are doing or why.  This kind of behavior is great for naming and pulling out of our core code.  Really, this is a long, confusing way of asking a question: is the value a multiple of 3 or 5?

Let's stop beating around the bush and just ask the question.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            total = 0,
            index = 0;
        
        for (index; index < values.length; index++) {
            if (isValueAcceptable(values[index])) {
                total += values[index];
            }
        }
        
        return total;
    }
```

By pulling our check up and out, we can ask if a value is acceptable. Now we are speaking in a more natural language. We want to sum multiples of 3 and 5 so we only want to work with acceptable values. Now we have a new problem, we have to wade through a loop and a conditional structure to actually see what we are looking for. Fortunately, Javascript has a built-in function for handling this kind of operation: filter.  Filtering can be read as "I want to take this list of items and only keep the acceptable ones." Let's filter our values.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            multiples = values.filter(isValueAcceptable),
            total = 0,
            index = 0;
        
        for (index; index < multiples.length; index++) {
            total += multiples[index];
        }
        
        return total;
    }
```

Now we're really cooking. we've eliminated the last conditional block around our data management.  We have one ternary left for assigning the values variable, but we'll deal with that later.  For now, let's get rid of our remaining loop.  When we are performing an action like iterating over a list and summing the values, we can convert that to a reduction.  Reduce is useful for lots of different purposes, but here we are going to use it at its most foundational.  Let's create an add function and reduce our list, adding all the values together.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function add (a, b) {
        return a + b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return baseValues.map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var values = isArray(list) ? values : [],
            isValueAcceptable = isMultipleOf.bind(null, [3, 5]),
            multiples = values.filter(isValueAcceptable);
                
        return multiples.reduce(add, 0);
    }
```

Reduce helped us eliminate a few bits of waste from our function.  First, we removed the loop structure and just declared the objective of our function directly. Second, we eliminated the need for an accumulator variable and an index variable. This reduces the cognitive footprint of our function since we no longer need to keep track of the variables we are using in our function. Now that we have done all of this work, let's do a little final cleanup by adding a sanitizeArray function and chaining our filter and reduce operations. This will give us our final code sample.

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function add (a, b) {
        return a + b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sanitizeArray (value) {
        return isArray(value) ? value : [];
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return sanitizeArray(baseValues).map(checkModulus.bind(null, value)).reduce(or);
    }

    function sumMultiplesOf3And5 (list) {
        var isValueAcceptable = isMultipleOf.bind(null, [3, 5]);
        return sanitizeArray(list).filter(isValueAcceptable).reduce(add, 0);
    }
```

As you can see, this code is actually significantly longer than our original example.  It might make functional programming actually seem like a longer path to walk than simply writing everything inline.  This would definitely be true, except that much of this code can, and should, be pulled into a library and abstracted away from our core code.  Let's pull the general-use code out into its own sample block.

<h3>Library Code - Should exist in one place</h3>

```javascript
    function isArray (value) {
        return typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]';
    }

    function equal (a, b) {
        return a === b;
    }

    function add (a, b) {
        return a + b;
    }

    function mod (value, base) {
        return value % base;
    }

    function or (a, b) {
        return Boolean(a) || Boolean(b);
    }

    function compose (fnA, fnB) {
        return function () {
            var args = Array.prototype.slice.call(arguments, 0);
            return fnA(fnB.apply(null, args));
        }
    }

    function sanitizeArray (value) {
        return isArray(value) ? value : [];
    }

    function isMultipleOf (baseValues, value) {
        var checkModulus = compose(equal.bind(null, 0), mod);
        return sanitizeArray(baseValues).map(checkModulus.bind(null, value)).reduce(or);
    }
```

All of these functions are built for reuse.  We should not have to rewrite or abstract these out again.  This also means, as we come across other code which uses these behaviors, we can immediately perform a drop-in replacement and get a big mess moved out of our way.  Now, let's do a side-by-side comparison of our original function and what our final product look like.

<h3>Original Function</h3>

```javascript
    function sumMultiplesOf3And5 (list) {
        var total = 0,
            index = 0;
        
        if (typeof list === 'object' && Object.prototype.toString.call(list) === '[object Array]') {
            for (index; index < list.length; index++) {
                if (list[index] % 3 === 0 || list[index] % 5 === 0) {
                    total += list[index];
                }
            }
        }
        
        return total;
    }
```

<h3>Final Refactored Product</h3>

```javascript
    function sumMultiplesOf3And5 (list) {
        var isValueAcceptable = isMultipleOf.bind(null, [3, 5]);
        return sanitizeArray(list).filter(isValueAcceptable).reduce(add, 0);
    }

    // Or if you prefer:

    function sumMultiplesOf3And5 (list) {
        return sanitizeArray(list).filter(isMultipleOf.bind(null, [3, 5])).reduce(add, 0);
    }
```

This is what we arrive at when we really strip out the repeated code.  There's almost nothing left!

By cleaning up our code, and preferring functional abstractions, we can strip away a tremendous amount of clutter and leave the essence of our intent.  We can practically read the last function as a sentence: "To sum multiples of 3 and 5, sanitize provided list, filter for multiples of 3 and 5, then add all values together, starting with 0." This is how we would solve the problem if we were to talk it through, so we should write our code the same way. This is how I refactor to functional code. How do you do it?
{% endraw %}
    