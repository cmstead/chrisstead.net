---
layout: post
title:  "Mainstay Monday: SOLID - Interface Segregation Principle"
date:   2015-08-17 09:00:13 -0700
categories:
    - Coding
    - Design Patterns
    - Javascript
    - Mainstay Monday
    - SOLID
---
{% raw %}
This post is part of a series on the <a href="http://www.chrisstead.net/archives/category/design-patterns/solid/" target="_blank">SOLID programming principles</a>.

The Interface Segregation Principle is a close relative to the <a href="http://www.chrisstead.net/archives/795/mainstay-monday-solid-single-responsibility/" target="_blank">Single Responsibility Principle</a>. The idea behind interface segregation is your API should use several small functions or methods to accomplish tasks instead of one large function.  The traditional definition states you should use many client-specific interfaces instead of one general purpose interface.

Since Javascript doesn't have support for abstract classes or interfaces, we are going to focus on the functional application of interface segregation. Let's start off supposing your program is going to deal with a few different cases for objects which will be handed around and managed.  You know that your are going to potentially receive objects, which you want the keys from, arrays which you want just the strings out of and you will be receiving a JSON string from the user through some request or input.  Here's the way a single function looks when we try to manage all of these cases:

```javascript
function doIt(myObj, isArray, isUserSpecified){
    if (!isArray, !isUserSpecified) {
        return Object.keys(myObj);
    } else if (isArray){
        return myObj.filter(value => typeof value === 'string');
    } else {
        try {
            return JSON.parse(myObj);
        } catch (error) {
            return [];
        }
    }
}
```

Obviously this fails single responsibility, but there is more going on here. This function receives two different boolean values and changes the way it behaves based on configuration values. This is a dangerous path to walk and I strongly suggest people avoid it. The other problem that we have here is practically every executable line returns a value. This whole function is a setup for danger.

Note, I have actually seen functions like this. This kind of practice is easy to find in the wild, especially when looking at the code written by novice developers. There is also a variation on this function which handles the creation of booleans inside the function.  The code, when rewritten looks like this.

```javascript
function doItAlternate(myObj){
    let isArray = Object.prototype.toString.call(myObj) === '[object Array]',
        isUserSpecified = typeof myObj === 'string';
        
    if (!isArray, !isUserSpecified) {
        return Object.keys(myObj);
    } else if (isArray){
        return myObj.filter(value => typeof value === 'string');
    } else {
        try {
            return JSON.parse(myObj);
        } catch (error) {
            return [];
        }
    }
}
```

I'm not sure which is worse, but we are really solving three completely different problems with this code.  Let's suppose, instead of all the booleans, we were to start breaking this function down and solving the problems independently.  This is where our segregation comes into play.  We have one case where we want object keys.  By inspection we can see this is not related to the array problem or the user entered data problem.  Let's split that function out.

```javascript
function getObjectKeys(myObj){
    return Object.keys(myObj);
}
```

This function clearly cuts straight to the heart of what it does. Now we can take an object and safely capture the keys This reduces the cognitive load to understanding the cases when each boolean should be passed and whether or not something will go wrong with the code if our cases go wrong.  More importantly, any place in our code where we need to call this function can do it without any knowledge that our program could ever receive arrays or user defined functions. Those behaviors are completely outside the scope of this particular piece of functionality.

Let's deal with our array logic.

```javascript
function getStringValues(myArray){
    return myArray.filter(value => typeof value === 'string');
}
```

This is another one-liner, but it serves a very specific purpose. We no longer have this bundled in with our object or user input logic which means we can understand precisely the roll it plays. Now our code can safely assume it will always get the same information back, so we can call our array function in the correct context and reduce the overhead that accompanies a single, general-purpose function.

Finally, let's have a look at our segregated user input function.

```javascript
function parseUserObject(userObj){
    var output;
    
    try {
        output = JSON.parse(userObj);
    } catch (error) {
        output = {};
    }
    
    return output;
}
```

This one is the biggie of the bunch. User data is notoriously unreliable and this is the one that muddied the water the most. Originally we had a return statement in the try and one in the catch block.  This seems like a terrible idea. More importantly this really added a lot of complexity to our original function since we, not only, had to know this was user data, but we had to drop in a block to handle any of the fallout that happens when JSON.parse is called on something that won't parse.

With this function isolated, we get the same benefits we would get with the segregation of the other parts of our function, but we also get the added bonus of being able to rewrite this function without having to dirty up a general purpose function's scope with a bunch of variables which may never be used in any of the other behaviors.  Now we can clearly define a single entry point and a single exit. This function starts to approach the kind of purity we like when we want to wrap things up in unit tests.

Let's take a look at one last element of the interface segregation principle. We have looked at how interface segregation and single responsibility work together to clean up a function that increases cognitive load, let's take a look at the value of wrapping up general purpose behaviors in specific purpose functions. This is where interface segregation can really shine and simplify your programming.

Below is a set of functions I've created to demonstrate satisfying specific needs and reducing the exposure of general purpose functions to our code in the large.

<pre class="language">
function stringPredicate(value){
    return typeof value === 'string';
}

function shortPredicate(value){
    return value.length < 5;
}

function numberPredicate(value){
    return typeof value === 'number';
}

function evenPredicate(value){
    return value % 2 === 0;
}

function filterStrings(valueList){
    return valueList.filter(stringPredicate);
}

function filterShortStrings(valueList){
    return filterStrings(valueList).filter(shortPredicate);
}

function filterNumbers(valueList){
    return valueList.filter(numberPredicate);
}

function filterEvenNumbers(valueList){
    return filterNumbers(valueList).filter(evenPredicate);
}
```

Here we can see several things at work. First, we have wrapped up the filter function in a few convenience functions which give us a specific type of output. This is great for sanitizing data as well as function composition. With each of the produced functions, we can provide value: filtering strings or numbers, filtering strings of a certain length or filtering only numbers which are even.

What is even better is, we can actually use these functions in a composite way to build more complex functions or new functions that do something different.  Imagine if we had to do this directly in our code. That would be a LOT of duplication and we would have to interact with the general purpose filter function every time.

We've looked at two interesting cases around the concept of segregating our interfaces and providing solutions for problems which can be reused throughout our code. First we looked at how interface segregation and single responsibility principle are related, and how one strengthens the other.  Then we had a look at wrapping up broad-use functions in solution-driven structures to simplify the process of solving problems in our program.

Interface segregation is a strong principle for simplifying code and providing a clearer strategy for solving problems.  It works hand in hand with other principles to make your program cleaner, simpler and more stable, which is what we all really want, isn't it?
{% endraw %}
    