---
layout: post
title:  "All in the Family: Filter, Map, Reduce, Recur"
date:   2015-08-12 09:00:38 -0700
categories:
    - Coding
    - Foundation
    - Functional Programming
    - Javascript
---
{% raw %}
In programming it is becoming more common to see functional patterns.  Filter, map and reduce are all discussed openly in programming circles that live far away from Lisp, Haskell, ML and other functional languages. It is common, in Javascript especially, to see these functions being misunderstood and misused. My goal is to uncover the relation between these functions and provide a really deep understanding of what is going on when these common functions are use correctly.

By the end of this post, I hope you will see the relationship filter, map, reduce and recursion all come together in a harmonious way, allowing the programmer to transform data without loops and without brutish, heavy handed data manipulations. This journey will be part technical understanding and part new-age enlightenment. Don't worry if everything doesn't make sense on the first pass. This is a deep dive into the world of functional programming and a departure from the imperative methods people commonly use.

Let's start off with reduce.  Reduce is a function that, as you might have guessed, reduces a list of values.  As a side note, in my little corner of the world, I think of arrays as lists and I will refer to them as such throughout this post.<sup>1</sup> A common example of reduce is adding numbers.  An adder is a simple function to implement and allows for a very simple explanation. Here's what it might look like:

```javascript
function add(a, b){
    return a + b;
}

var myResult = [1, 2, 3, 4].reduce(add, 0);
console.log(myResult); // 10
```

I want to dig under the surface of this behavior and understand what is really going on with reduce.  Let's take a look at a way to implement reduce. The first implementation is just going to use a standard loop. Here's what it might look like:

```javascript
function loopReduce(valueList, reduction, initialValue){
    var index = 0,
        result = initialValue !== undefined ? initialValue : valueList[0];
    
    index += result !== initialValue ? 1 : 0;
    
    while(valueList[index] !== undefined){
        result = reduction(result, valueList[index]);
        index++;
    }
    
    return result;
}
```

It's not elegant, but it gets the job done. We loop over everything in the list and apply a reduction.  You can create an add function and a list of numbers and try it for yourself. Anyway, if you really want to do this functionally, you would pull out our good friend, <a href="http://www.chrisstead.net/archives/783/mainstay-monday-solving-problems-with-recursion/" target="_blank">recursion</a>. Recursion is a more mathematical means for looping over a set of values, and dates back to some of the earliest prototypes for computing back in the 1930's.

Before we go any further, I want to introduce a few short functions that will make everything a lot more functional. In our loop-based function would have gotten little utility out of these, but moving forward these are going to be very important.

```javascript
function first(valueList){
    return valueList[0];
}

function rest(valueList){
    return valueList.slice(1);
}

function isUndefined(value){
    return value === undefined;
}
```

In the next function we are going to use recursion to handle the looping so the body of the function only needs to be concerned with a single step in the process of reducing our list. Now that we have those out of the way, let's crack open a functional version of reduce and see what we can find. Let's have a look.

```javascript
function recursiveReduce(valueList, reduction, initialValue){
    var _a = isUndefined(initialValue) ? initialValue : first(valueList),
        _b = isUndefined(initialValue) ? first(rest(valueList)) : first(valueList),
        remainderList = isUndefined(initialValue) ? rest(rest(valueList)) : rest(valueList);
    
    return remainderList.length > 0 ?
           recursiveReduce(remainderList, reduction, reduction(_a, _b)) :
           reduction(_a, _b);
}
```

If this is your first time digging into the world of functional programming and using functions like first and rest, you might want to stop and absorb all of this for a moment. Reduce is a rather complex transformation function that requires keeping a fair amount in your head, so this is a lot to absorb. Another challenge we encounter in Javascript is the lack of pattern matching which would simplify this function significantly. Nontheless, that's a pretty heavy change from where we started at the beginning of the post and we still have more of this mountain to climb.

For sufficiently small lists of values, this reduction technique will work fine, but as the list gets too big, our reduce function will begin to slow down and fail. This is because recursion in Javascript is not tail-optimized, so each call goes on the stack which will eventually overflow. This overflow is the primary reason why many imperative modern languages discourage recursive algorithms.

Clojure introduces an idea that helps us to remedy this issue.  It is possible to use recursion inefficiently in Clojure and fill the stack, however, by using the recur function and calling it at the end of your function, you get the tail optimization you are looking for.  Similarly, the <a href="https://github.com/cmstead/JFP" target="_blank">JFP library</a> offers a recur function that allows for tail-optimized recursion.<sup>2</sup>  Let's rewrite our function using the JFP recur function.

```javascript
function recurReduce(recur, valueList, reduction, initialValue){
    var _a = !isUndefined(initialValue) ? initialValue : first(valueList),
        _b = isUndefined(initialValue) ? first(rest(valueList)) : first(valueList),
        remainderList = isUndefined(initialValue) ? rest(rest(valueList)) : rest(valueList);
    
    return remainderList.length > 0 ?
           recur(remainderList, reduction, reduction(_a, _b)) :
           reduction(_a, _b);
}

function reduce(valueList, reduction, initialValue){
    return j.recur(recurReduce, valueList, reduction, initialValue);
}
```

Phew! That was a long walk to get to a really efficient and effective reduce function.  It's elegant, declarative, and it uses tail-optimized recursion so we can really say we are operating in a functional way from the ground up. What's even cooler is, now we can see that even recursion can actually be looked at from a different angle and managed as a function instead just a concept. However, the title of this post mentions filter and map as well. Fortunately, we don't have to take the same long walk to get to those functions. We already have nearly everything we need already: looping, function application, even data copying!

Let's start with filter.  Anyone who has used filter correctly understands the power you hold when you start manipulating lists of elements and stripping elements down to the bare bones, leaving only the data you need.  It generally looks a little like this:

```javascript
[1, 2, 3, 4, 5, 6, 7].filter(value => value % 2 === 0); // [2, 4, 6]
```

If we peel back the skin and look at what is happening in filter, we can either look at it as another recursion. This means that filter is a function of recursion, just like reduce.  Here's an idea of what that would look like:

```javascript
function recurFilter(recur, valueList, filterFn, initialSet){
    var sanitizedSet = isUndefined(initialSet) ? [] : initialSet,
        testValue = first(valueList),
        remainderList = rest(valueList);
    
    if(filterFn(testValue)){
        sanitizedSet.push(testValue);
    }
    
    return remainderList.length ? recur(remainderList, filterFn, sanitizedSet) : sanitizedSet;
}

function filter(valueList, filterFn){
    j.recur(recurFilter, valueList, filterFn, []);
}
```

This is a lot like our implementation of reduce.  The problem is it's actually so much like reduce we are actually duplicating code. Duplicate code is a bad thing when you already have a function that will do what you need. Let's rewrite our filter function as a function of reduce.

```javascript
function filterer(filterFn, newList, value){
    if(filterFn(value)){
        newList.push(value);
    }
    
    return newList;
}

function filter(valueList, filterFn){
    return reduce(valueList, filterer.bind(null, filterFn), []);
}
```

If we think of filter as a function of reduce, then, all of a sudden, almost all of the logic goes away.  Our original function was so close to reduce that they could have been separated at birth. The only thing we really need to make filter unique is a wrapper function to evaluate our predicate and capture the values that pass. Filter is a reduction function.  In much the same way, map is also a reduction function.  Here's an implementation skipping all of the intermediate steps and drawing from what we know about filter:

```javascript
function mapper(mapFn, newList, value){
    newList.push(mapFn(value));
    return newList;
}

function map(valueList, mapFn){
    return reduce(valueList, mapper.bind(null, mapFn), []);
}
```

That's it! Map and filter are clearly little more than a wrapper around the reduce function.  With the relation to reduce, we can say that filter and map are functions of reduce.  We have essentially built a family tree of filter and map, which we can see are cousins related to the same reductive heir.  This relationship could not work the other way around since only reduce has the flexibility to transform lists in a variety of ways, all while maintaining function purity.  So, now when people talk about the filter-map-reduce pattern, we know that they are really talking about the reduce-reduce=reduce pattern.

Why is this important?

When I first starting learning functional programming. I had a really hard time separating myself from the idea that filter, map and reduce were really any different than a wrapper over forEach. I thought of them as highly specialized looping functions that did a little bit of extra work under the covers to add some power to the language.

This idea that these functions are wrappers over a loop is a common misconception made by many people coming from the imperative world into functional programming. It is common to see these functions called with function arguments with side effects, treating them as nothing more than a looping structure.

By breaking down the barrier between the programmer and high-performance recursion, it becomes obvious that traditional loops are not really part of the game at all. Any looping that might be done is used simply to access values within a list.  This data access is what's really important.  As it turns out, the order in which the elements are accessed is really unimportant as long as the output list adheres to the same order as the input list.

This break from conventional thinking, and seeing these functions which perform operations on a list as functions of reduce, helps us to understand what is really happening: we are actually transforming the data into something new! The reason the original data is unmodified is not an operation of the language and data mutability, it is the way immutability could exist at all.

When you return to looking at the code you are writing, and use map or filter again, it will be as if you are seeing beyond the curtain into the way the cogs and wheels are really working together. You may, like me, wonder why tail-optimized recursion is not core to the language. Things will make sense in a new way, and instead of writing programs which work, by brute force, to capture and strong-arm data into a form the user can make sense of, you will allow the data to glide effortlessly through transformations and become something the user can enjoy.

<h4>Blog Post Notes</h4>

<ol>
<li>As it turns out, arrays in Javascript are more closely related to vectors in languages like Clojure. This distinction can be discussed at length elsewhere, but it is important to note.  Ultimately, arrays and vectors have extra memory access features which give them a performance boost when data is accessed at places other than the head or the tail. Lists must be access sequentially.  I prefer the term list when dealing with arrays in Javascript because many of the functions we use to process arrays come directly from list processing, and do not benefit from the vector characteristics.</li>

<li>The tail optimization that JFP uses is a generic form of the trampolining method. Each pass of the recursive function finishes and returns. Within the recur function is a while loop which reduces the recursion into a high-performing loop structure. This allows a central recur function to capture the return and either execute the next step or exit, depending on the state of the recursion.</li>
</ol>
{% endraw %}
    