---
layout: post
title:  "Anonymous Functions: Extract and Name"
date:   2016-01-06 08:00:52 -0800
categories:
    - Code Smells
    - Coding
    - Design Patterns
    - Functional Programming
    - Javascript
    - Unit Testing
---
{% raw %}
It's really great to see functional patterns become more accepted since they add a lot of really powerful tools to any programmer's toolbox. Unfortunately, because functional programming was relegated primarily to the academic world for many years, there aren't as many professional programmers who have developed a strong feel for good patterns and share them with more junior programmers. This is not to say there are none, but it is important to note that most programmers think of functional programming and say "it has map, filter and reduce; it's functional."

Though having those three higher-order functions does provide a functional flavor, it is more important that there are higher-order functions at all.  With higher-order functions come the use of anonymous functions.  Anonymous functions (also known as lambda functions) provide a great facility for expressing singleton behavior inline.  This kind of expressiveness is great when the function is small and does something unexciting, like basic arithmetic or testing with a predicate expression.  The problem is anonymous functions introduce cognitive load very quickly which makes them a liability when code gets long or complex.

Today I'd like to take a look at a common use of anonymous functions and how they can cause harm when used incorrectly.  There are many times that anonymous functions are assigned directly to variables, which actually introduces one of the same issues we are going to deal with today, but I am not going to linger on that topic.  Please consider this a more robust example of why even assigning anonymous functions to variables is dangerous.

<h3>Jumbled Anonymous Functions - Our First Contestant</h3>

In Javascript, people use promises; it's a fact of life. Chris Kowal's Q library is a common library to see used in a variety of codebases and it works pretty well. Now, when someone writes an async function, it's common to return the promise so it can be "then'ed" against with appropriate behavior. The then function takes two arguments, a resolve state function and a reject state function. These basically translate into a success and error state.  I've created a common promise scenario so we have something to refer to.

```javascript
    function doAsyncStuff(condition) {
        myAsyncFn(condition).then(function (data) {
            var moreConditions = {
                foo: data.foo,
                bar: data.bar.baz
            };
            return anotherAsyncFn(moreConditions);
        }, function (error) {
            logger.log(error);
        }).then(function (data) {
            updateState(data.newValue);
        }, function (error) {
            logger.log(error);
        });
    }
```

<h3>Extract Method</h3>

The very first thing I see here that is a problem is, we have two functions logging an error. This behavior is not DRY which is a code smell and violates a commonly held best practice.  There is a known refactoring for this kind of redundancy called "extract method," or "extract function."  Technically we already have a function in place, so we can simply lift it and name it.  This will reduce our footprint and make this code cleaner already.  Let's see what this would look like with our logging behavior extracted.

```javascript
    function logError (error){
        logger.log(error);
    }

    function doAsyncStuff(condition) {
        myAsyncFn(condition).then(function (data) {
            var moreConditions = {
                foo: data.foo,
                bar: data.bar.baz
            };
            return anotherAsyncFn(moreConditions);
        }, logError).then(function (data) {
            updateState(data.newValue);
        }, logError);
    }
```

With this simple extraction, we now know more about what our function does and our code has become more declarative. Although logError is a one-line function, the fact that it does exactly one thing makes it both easy to reason about and easy to test. We can inject a fake logger and capture the logging side effect, which gives us direct insight into what it does.  Another benefit we get is that we can hoist this function further if need be, so we can reuse it across different modules or files.

<h3>Debugging Problems</h3>

Now we get to the real nitty gritty.  We have two anonymous functions which do not explicitly tell us what they do.  Instead, they just contain a much of code which performs references into an object. We run up against two different issues because of this.  First, the lack of declarative code means the next person who looks at this, which might be you, will have to sit and stare at this to understand what is happening.

Another, bigger issue than immediate comprehension is debugging.  Suppose we take this file and concatenate it with all of the other files in our project and then uglify the whole thing and deploy it out for use in someone's browser.  All of our code now lives on a single line and may not even have meaningful variable names anymore.  Now, suppose one of the data objects comes back null.  Our debugging error will contain something like "error at line 1:89726348976 <anonymous> cannot treat null as an object."

This is bad, bad news. Now we have an error which we can't easily identify or triage. One of the calls we are making no longer does what we think it does and it's causing our code to break... somewhere. Whoops! We can actually use the same pattern we used for our error logging to extract our methods and make sense of the madness. Let's take a look at what our refactoring would look like.

```javascript
    function logError (error) {
        logger.log(error);
    }

    function getChainedCondition(data) {
        var moreConditions = {
            foo: data.foo,
            bar: data.bar.baz
        };
        return anotherAsyncFn(moreConditions);
    }
    
    function captureNewState (data){
        updateState(data.newValue);
    }
    
    function doAsyncStuff (condition){
        myAsyncFn(condition).then(getChainedCondition, logError)
                            .then(captureNewState, logError);
    }
```

Now that we have lifted our last two functions out of our promise chain, everything makes a little more sense. Each of our behaviors is easy to reason about, we can test each function independently and all of our functions have a unique identifier in memory which saves us from the insidious debugger issue which can cost time and money.

There are other places we could go from here with our code to make it more fault tolerant, but that's outside of the scope of this article.  Instead, when you look at your code, see if you can easily understand what is going on.  Look at it like you've never seen it before.  How many anonymous functions are you using? How many different steps are crammed into a single function?

When you see this kind of muddy programming, think back on our reduction to simpler functions, avoid complex anonymous functions and think "extract and name."
{% endraw %}
    