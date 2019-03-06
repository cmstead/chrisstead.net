---
layout: post
title:  "What is Functional Programming?"
date:   2016-03-23 09:00:42 -0700
categories: Design Patterns, Foundation, Functional Programming, Javascript
---
{% raw %}
For the past couple of years I have been trying to put my finger on a crystalline idea which I could use to explain what functional programming is for someone who doesn't understand.  Along the way I have given lots of explanations, some were merely confusing and others were actually bad.  My goal, with this post, is to give a clear, concise picture of what functional programming is really about.

It is common for a programmer, today, to have a good grasp on Classical Object Oriented programming.  What this means, at the heart of it, is they understand managing objects through a class and inheritance system. I know I was taught a classical approach when I was in college and many programmers, even those who didn't attend a formal, degree-granting institution experienced a similar path of education.

Functional programming has, in fact, been around quite a bit longer than object orientation of any kind, but it was largely either implemented in a language that was geared for research, or it was implemented in a college project (typically Lisp) to explore creating a programming language.  Due to the academic nature of early functional languages, and the fact that programming, in the large, was something which was still in a discovery process, nobody tried to provide a small idea to state "this is what we are doing."

With all of this in mind, it is useful to have a setup which will be accurate and, at the same time, descriptive to Classical OO people.  I thought about how Scheme was introduced in "The Little Schemer," and though there was no crystalline idea, the approach really helped to clarify what functional programming really is.  With all of this in mind, let's take a look at the small idea.

Functional programming is made up of three parts:

<ul>
<li>Inquiry</li>
<li>Declaration</li>
<li>Abstraction</li>
</ul>

What I mean by this is, though functional programming contains ideas like closures, first class functions, higher-order functions and so on, that is not ACTUALLY what functional programming is.  I feel that the person who wrote "The Little Schemer" (nee "The Little Lisper") understood this clearly.  Unfortunately, I have never seen this written anywhere.

The remainder of this post will be an inspection of this three-part idea and how we can look at Javascript and either see or build the pieces we need to make this idea clear.

<h3>Inquiry</h3>

The first concept in our list is the concept of inquiry.  Another way we can say this is, we can ask questions.  Conditional blocks are already designed around the idea we want to know if something is true or false, but we construct our conditions with (sometimes) cryptic operators which force people to think while they read the code instead of simply reading the code like English.

We can start by asking very core questions, which are handled by operators in Javascript.  Checking the type of a variable in Javascript cloaked in operator soup which creates a long line which someone has to read later.  It would be preferable if our expressions were closer to natural language.  Here's a way we can wrap our operator soup and be more expressive about the questions we are asking.

```javascript
    function areEqual (a, b) {
        return a === b;
    }
    
    function isType (type, value){
        return areEqual(type, typeof value);
    }

    function isInstance (obj, value) {
        return value instanceof obj;
    }

    // Here are these functions in use

    areEqual(5, 5); // true
    areEqual(10, 'A'); // false
    isType('string', 'foo!'); // true
    isInstance(Number, {}); // false
```

Although these functions are, potentially, a few more characters, they are much more transparent in their intent. By wrapping our operators, the code we write will actually state precisely what it does in English, making the time to understand a program shorter.  Here's taking this a step further:

```javascript
    function isNumber(value) {
        return isType('number', value);
    }

    function isZero(value) {
        return isNumber(value) && areEqual(0, value);
    }

    function isEven(value) {
        return isNumber(value) ? isZero(value % 2) : false;
    }

    function isArray(value) {
        return isInstance(Array, value);
    }

    // Examples of use:

    isNumber(99); // true
    isNumber('bar'); // false
    isZero(0); // true
    isZero('A cat'); // false
    isEven(6); // true
    isArray({}); // false
```

By wrapping up the original operators in functions, we can actually build on top of them, creating new functions which also read clearly and add quite a bit more utility.  One of my all-time favorites in this list is isArray, where we simply ask if our current value is an instance of the base Array object.  This really beats the commonly suggested:

typeof value === 'object' && Object.prototype.toString.call(value) === '[object Array]'

<h3>Declaration</h3>

It could be said that asking questions is a special case of declaring intent, but I prefer to keep these separate because it helps shine a light on two different aspects of the programming process. Sometimes we want to ask questions, but, often, we really just want to get something done.

The act of getting something done is what I like to refer to as intent.  When we create a function, called sum, which sums the numbers in an array, we are actually declaring, in code, that we want to add up a bunch of numbers.  In much the same way, we might want all the even numbers from an array.  This would lead us to creating a function called getEvens.

This kind of programming is typically referred to as declarative programming.  Instead of writing out large blocks of conditions and sprawling loops, we can declare our intent and allow the underlying system to actually interpret our intent and perform the correct action. Let's have a look at creating a few declarative functions.

```javascript
    function first(values) {
        return isArray(values) ? values[0] : null;
    }

    function rest(values) {
        return isArray(values) ? values.slice(1) : [];
    }

    function add (a, b){
        return a + b;
    }

    function sum (values){
        return isArray(values) ? values.reduce(add, 0) : 0;
    }

    function getEvens(values) {
        return isArray(values) ? values.filter(isEven) : [];
    }

    // Examples of use

    first([1, 2, 3, 4]); // 1
    rest([1, 2, 3, 4]); // [2, 3, 4]
    sum([1, 2, 3, 4]); // 10
    getEvens([1, 2, 3, 4]); // [2, 4]
```

Right now seems like a good time to point out, although we took a few extra characters to bundle up our operators in functions, the bodies of all our functions, including sum and filter, which would typically be loops wrapped in a conditional, are actually only a single, very short line. This brevity is NOT because the goal is to be terse, but rather because that is all it takes to express our intended behavior.  All of the remaining braces, parentheses and operators are just cryptic language cruft we can abstract away.

<h3>Abstraction</h3>

Picking up right where we left off, abstraction is the final piece of the functional puzzle.  So far we have seen functions floating free, detached from objects and made available just as they are.  Abstraction is where we take those functions and really make them shine.

In functional languages, and languages which support functional programming, functions are first class.  What this means is, a function is a free-standing entity which is handled as data.  In Javascript, this is facilitated by the prototypal inheritance system which actually news up a function object and provides it free from the boilerplate and constraints which are put in place by Classical OO languages.

This first-class, data-centric behavior is what really makes abstractions strong in Javascript.  In the declaration section above, we created a function called getEvens, I'll paste the code below, so it's handy.

```javascript
    function isEven(value) {
        return isNumber(value) ? isZero(value % 2) : false;
    }

    function getEvens(values) {
        return isArray(values) ? values.filter(isEven) : [];
    }
```

I made sure to bring the isEven function along for the ride because it's an important part of this puzzle.  Inside the getEvens function, we call a method on the values array called "filter."  Filter is an example of what is referred to as a higher-order-function.

Higher-order functions are functions which take a function as an argument with the intent that the function is to be executed (as opposed to treated like a string or number).  This means we can write highly abstract, very generic functions like reduce which provide a tremendous amount of power for our programming pleasure.

If we were to write filter ourselves it could look like the following:

```javascript
    function getLength(values) {
        return isArray(values) ? values.length : 0;
    }
    
    function append (valueArray, value) {
        var result = isArray(valueArray) ? valueArray.slice(0) : [];
        
        return isType('undefined', value) ? result : result.concat([value]);
    }
    
    function filter (predicate, values, result){
        result = isType('undefined', result) ? [] : result;
        
        if(predicate(first(values))) {
            result = append(result, first(values));
        }
        
        return isZero(getLength(rest(values))) ? result : filter(predicate, rest(values), result);
    }
```

That code might be a bit much to choke down, but the idea is we don't actually have to see it.  Fortunately Javascript already has filter already built in.  With that in mind there is a real benefit that comes with abstractions like this.

If a generic function has a well defined contract, we can actually change the implementation under the hood.  This idea can be seen in Classical OO programming as well, but rarely with the level of genericising we have here. We could write a new filter function which takes advantage of a multi-core processor.  We could also use a distributed computing system to compute the result.  Ultimately, as long as the function contract remains the same, the calling code will never know the difference!

The abstraction portion of functional programming is a rather expansive topic including higher-order functions, closures, metaprogramming, types and more, but even without digging into all of the various topics, we can see the abstraction model is something that definitely sets functional programming apart from Classical OO.

<h3>Summary</h3>

This has been a whirlwind survey of some of the bits and pieces of functional programming itself, but hopefully the core ideas of inquiry, declaration and abstraction have clarified what seems to be a rather murky discussion of what functional programming really is.

If there is anything I would like you to take away from this discussion today, it is the idea that the three ideas presented here, for as sparse as they are, actually provide the ability to do tremendously powerful programming, while providing the ability to make code clear and descriptive of intent.

This is merely the tip of the iceberg, but I hope this tickled something in your brain that made you want to go out and learn more.  Until next time, happy coding!
{% endraw %}
    