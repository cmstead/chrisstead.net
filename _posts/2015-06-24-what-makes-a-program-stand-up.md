---
layout: post
title:  "What Makes a Program Stand Up"
date:   2015-06-24 10:00:16 -0700
categories: Coding, Design Patterns, General Blogging, Javascript
---
{% raw %}
Over the last year I have interviewed a lot of Javascript developers and I discovered something: many people working in Javascript don't really understand what programming really means. What I am saying by this is, people can write code and make stuff happen in the DOM, but they don't really understand why. Scratching just below jQuery reveals that most of a program is still essentially magic for people who promote themselves as developers.

If we look at professionals who regularly practice in other fields, even the most junior practitioner has a foundation understanding of what drives the profession.  Lawyers fresh from the Bar understand law. Medical doctors, even in their residency, already have the foundation knowledge they need to diagnose and treat ailments. The most junior of architects have the physics, materials and design knowledge to understand what makes a building stand up.

Javascript developers, even at the most junior level, should understand what makes a program stand up.

<h3 id="history">History -- Turing Completeness and Lambda Calculus</h3>

Let's hop in our wayback machine and go back about 80 years.  There was a guy named Alan Turing. He is (<a href="http://www.imdb.com/title/tt2084970/" target="_blank">finally</a>) known by the general public as the man who helped crack the Enigma machine through the use of computing and mathematics. Before the second world war (~1936), he developed the idea of a computing device which could, in theory, emulate any other computing device. This device is called the <a href="https://en.wikipedia.org/wiki/Turing_machine" target="_blank">Turing Machine</a>. The Turing Machine is important because it, largely, defines what we know as the foundation of modern computing.

With the advent of the Turing Machine came the concept of Turing completeness.  Essentially, any computing system that could emulate a Turing Machine could be called <a href="https://en.wikipedia.org/wiki/Turing_completeness" target="_blank">Turing complete</a>. Turing completeness is a key ingredient in the development of modern programming. Though Alan Turing was working with tapes and those who followed used punch cards, programming as we understand it today began to take form in the early 20th century.

Around the same time as the development of the turing machine (1936-1937), another mathematician by the name of Alonzo Church developed a new method of describing computing function and behavior, called <a href="https://en.wikipedia.org/wiki/Lambda_calculus" target="_blank">Lambda Calculus (&lambda;-calculus)</a>. Incidentally Turing and Church developed these computing ideas separate from one another. Lambda calculus described a foundation for what we know as functions in programming and, more specifically, functional programming. &lambda;-calculus is relatively inscrutable for the uninitiated, but a good example of what it looks like is the following:

&lambda;.x.x => (&lambda;.x x) = x;

This particular example draws upon Lisp notation to provide a little clarity. Below are the same functions in Clojure and Javascript:

```raw
;This is a standard Clojure identity function expressed with a variable
(identity x) ;returns x
```

```javascript
function identity(value){
    return value;
}

identity(x); //returns x
```

In the great tradition of 1, 2, skip a few, 100, I'm going to bypass the invention of Lisp, C, C++, ML, OCaml, Haskell, Python, Java, Pascal, Basic, COBOL, etc. Though all of these languages are important in their own right, they are all informed by the same underlying principles.

If we come back to the modern day, Turing completeness and Lambda calculus underpin all of the things we know about good programming and reliable software. Turing completeness gives us the notion of branches and flow control in our favorite general purpose programming language, Javascript.

<h3 id="conditionals">Conditionals and Branches</h3>

A computing system can be said to be Turing complete if it can emulate a Turing Machine. Although our modern computers are limited in memory and we, as people, are limited by time, a modern programming language can generally be considered Turing complete because it contains conditional operations and it is capable of accessing arbitrary amount of memory locations.  In other words, because Javascript, much like other modern languages, has if statements and can store and retrieve arbitrary data in memory, we can consider it Turing complete.

Another way of looking at this is Javascript is a Turing complete computing system because you can write code like this:

```javascript
function myFunction(maybeArray){
    var myArray = maybeArray === null ? [] : maybeArray;

    return myArray;
}

myFunction([1, 2, 3, 4]); //returns [1, 2, 3, 4]
myFunction(null); //returns []
```

Let's be honest, this is a really trivial function, but there is a lot of history that goes into it. We declared a function which was stored in memory.  Inside of that function we test a passed value with a conditional. When the conditional is satisfied, we perform one assignment operation. If the conditional is not satisfied, we perform a different assignment operation. After the assignment is complete, we return the result.  For such a small, simple function, there is a lot happening.  Consider what would happen if conditionals (programmatic branching) didn't exist. How would we ever do this? All of our programs would look like this:

```raw
doAction1
doAction2
doAction3
doAction4
```

This program is really useful if, and only if, you ever only need to do just those four things in succession. If one action fails, the program would continue running and disaster could occur. For instance, suppose that was the program for a robot on an assembly line and a part came through oriented incorrectly. That part could translate into a completely ruined product. Whoops.

The idea of conditionals and the way they impact programming can be summed up by a joke about engineers. An engineer is going to the store for his wife. She told him "buy a loaf of bread and if they have eggs, buy 12."

The engineer returned with a dozen loaves of bread.

The engineer's wife said "why do you have so much bread?"

The engineer replied "they had eggs!"

Branching, as far as I am concerned, is the most important concept to pave the way for any modern computing. All other elements of modern computing would not exist without it. Branching, however, is necessary, but not sufficient to define modern programming.

<h3 id="reusability">Reusability -- Reusable Logic, Objects and Functions</h3>

The other core element of modern computing without regard to the implementation details, is logic reuse. We like to say code reuse, but what we really mean to say is, "I want to define some logical behavior and then just refer to it elsewhere."

Logic reuse comes in several forms, but the ones best recognized are functions and objects. We can claim that there is third type of reuse which comes in the form of modules or namespaces, but can't we squint a little bit and say those are just special cases of objects?

In Javascript we get the benefits of our forebears because we get all of the object/class goodness that comes with heavily object oriented languages like Java and C++, but we also get all of the functional wonderment that comes from languages like Lisp and Haskell.

Object logic reuse could look a little like this:

```javascript
//ES6 format
class MyObject{
    constructor(){
        this.foo = 'bar';
    }

    setFoo(value){
        this.foo = value;
    }

    getFoo(){
        return this.foo;
    }
}

//ES5.1 format
function MyObject(){
    this.foo = 'bar';
}

MyObject.prototype = {
    setFoo: function(value){
        this.foo = value;
    },

    getFoo: function(){
        return this.foo;
    }
};

//Instantiating is the same either way
var myNewObject = new MyObject();
```

The functional paradigm in Javascript looks like this:

```javascript
//A higher-order function
function fooer(userFoo, someBar){
    userFoo.bind(null, someBar);
}

//A standard function
function myFoo(a, b){
    return a + ' foo ' + b;
}

//Partial application with a higher-order function
appliedFoo = fooer(myFoo, 'bar');

//Use of a partially applied function with another higher-order function -- map
fooedArray = ['baz', 'quux'].map(appliedFoo);

//Resulting array: ['bar foo baz', 'bar foo quux']
```

You'll note we are already doing some relatively advanced operations, and the code is rather brief. This brevity is due to the nature of logic-block, or more correctly algorithm, reuse and abstraction from the deepest building blocks in a computer software system.  As we get further from the computer hardware, we get more power with fewer keystrokes.  The language becomes more like English and less like bits.

<h3 id="looping">Recursion + Conditionals => Looping</h3>

The next piece of the modern language puzzle is recursion. Recursion blended with branches is, in my estimation, the easiest way to break down looping structures into the base elements to add visibility.  Recursion on its own is not simple, but it is key to understanding why loops work they way they do.  Here's a really basic recursive algorithm for adding values:

```javascript
function add(valueArray, initialValue){
    var base = typeof initialValue === 'number' ? initialValue : 0,
        value = valueArray.length === 0 ? 0 : valueArray.pop(),
        sum = base + value;

    if(valueArray.length === 0){
        return sum;
    }

    return add(valueArray, sum);
}

add([1, 2, 3, 4]); //returns 10
```

You'll note we did not use a standard looping structure for this. This is a special type of recursive function called a tail recursive function.  What this means is the call back to the original function happens as the very last statement in the function.  This behavior is very similar to the way a while loop works.  Each iteration checks the return condition and the loop exits if the condition is met.  If the condition is not met, the loop continues.

The problem we encounter with algorithms like this is you can easily fill all available memory with a large enough array of values, which can cause all kinds of problems.  This is because Javascript does not support tail-recursion optimization.  In other words, you could write this recursion any way you please and it will perform essentially identically.  Due to the growth nature of recursion, looping constructs become significant.  We could rewrite this loop with a standard while in the following way and not crash a browser, server or any other device you might be running your code on.

```javascript
function add(valueArray){
    var sum = 0;

    while(valueArray.length > 0){
        sum += valueArray.pop();
    }

    return sum;
}
```

You'll note that, while this will perform the operation more efficiently than our recursion, we have now tightly coupled our addition logic to our exit logic. This tight coupling is what, ultimately, interferes with the innate understanding of the loop and precisely when it will exit and allow the function to return our sum.  It is equally important to note that this is the preferred way to handle explicit looping in Javascript.

We do have an alternate methodology which abstracts away the condition altogether which reintroduces the concepts we get from Church's &lambda;-calculus.  If we select an appropriate higher-order function, we can extricate our addition logic and abstract away the express syntax for looping, leaving the real intent, alone.

```javascript
function adder(a, b){
    return a + b;
}

//Using the higher-order function reduce, we can apply addition across all values
//Once we perform our reduce we can eliminate the explicit condition and loop
//from our system altogether
function add(valueArray){
    return valueArray.reduce(adder, 0);
}

add([1, 2, 3, 4]); //Returns 10
```

Although this is not what any mathematician would ever call a formal proof, we can see immediately that the functional aspects of Javascript introduce branches in such a way that we can guarantee Turing completeness in much the same way as the imperative logic could.

<h3>Conclusion</h3>

Much like any other profession, programming has a storied history and the groundwork for what we use today takes advantage of some very important foundational concepts.  Even though we have been abstracted away from the hardware and we are no longer using punch cards, all of the groundwork laid by Turing and Church as well as many others who followed define physics, materials and design knowledge we employ today when we apply experience to new problems across many industries.

What makes a program stand up is not just understanding each of these concepts in a vacuum, but how they work together to create new solutions to existing problems. We have to understand and evaluate the interrelation of the core components of what makes a program work, and apply them in a way that makes software not only functional, but maintainable and clear in intent.

Simply knowing there are conditionals, loops and code reuse is possible does not, by itself, make the professional programmer skilled. It is understanding the interrelation of the elements in a program that allows a professional programmer to skillfully design and execute software that will solve problems and provide those professionals who follow to understand the choices that were made and enhance solutions as real world problems continue to change and grow.

<h3>Blog Post Notes</h3>

Related links:

<ul>
<li><a href="http://www.imdb.com/title/tt2084970/" target="_blank">The Imitation Game (Movie)</a></li>
<li><a href="https://en.wikipedia.org/wiki/Turing_machine" target="_blank">Turing Machine</a></li>
<li><a href="https://en.wikipedia.org/wiki/Turing_completeness" target="_blank">Turing Completeness</a></li>
<li><a href="https://en.wikipedia.org/wiki/Lambda_calculus" target="_blank">Lambda Calculus (&lambda;-calculus)</a></li>
</ul>
{% endraw %}
    