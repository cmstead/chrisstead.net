---
layout: post
title:  "Intent: Why Types Are Important"
date:   2016-04-20 09:00:43 -0700
categories:
    - Coding
    - Design Patterns
    - Functional Programming
    - Javascript
    - Unit Testing
---
{% raw %}
A common complaint from both the Javascript religious and the newcomers alike is Javascript is tremendously difficult to debug when things go sideways.  When a null or undefined reference is passed, the stack trace can be illuminating or it can be completely obscure.  Couple this with the growing popularity to use anonymous functions assigned to variables in lieu of named functions and you have a recipe for tremendous difficulty.

In modern compiled languages like C# and Java or F# and Scala, there is an enforced, static type system in place which ensures values which would cause a malfunction are disallowed from function calls.  This does not guarantee program correctness, but it does help eliminate strange errors.

Of course, the really important thing which comes from static typing is less about the compile-time checking as it is the integration of typed thinking into the entire development process. While developers working in statically typed languages are thinking about the logic for their programs, they are also considering the data types they are using to arrive at their results.

<h3>Revealing Intent</h3>

When a programming language provides type annotations, it means the programmer can declare what they intend the program to do up front. Most statically typed languages typically have an editor (or two) which provide insight into what the annotations say elsewhere in the codebase, possibly quite far from where the programmer is currently looking.

What these editors are really providing is a look into the intent of the work which was done before. I refer to this kind of behavior as <em>revealing intent</em>.  By revealing intent to the programmer, they can make choices which simplify the work of understanding other objects, functions and behaviors.

Javascript, for better or worse, does not allow for revealing intent other than variable names. This means that either each variable name must contain information about its type so people can opt to conform to the expected types or, alternatively, misbehave and intentionally break the function being called.  I am a noted fan of dynamic languages and like my functions free-flowing, but sometimes I long for a good, strong contract.

Let's pick a simple function written in Javascript and see what our baseline is.

```javascript
    function addJS (a, b) {
        return a + b;
    }
```

Our function could add two numbers, but it could also be called upon to do other things the name does not specifically call out.  AddJS could concatenate strings, coerce numbers to strings or act upon functions, objects and many other data types.  Clearly this is not what we intended.

Microsoft designed a language called TypeScript which transpiles to Javascript and includes features from ES Next as well as a quasi-static type system.  The type system in TypeScript is a step in the right direction when types are used, but there are still some problems.  Let's have a look at our function rewritten in TypeScript.

```javascript
    function addTS (a: number, b: number): number{
        return a + b;
    }
```

Our new add function declares it takes two numbers and returns a number.  This is really handy when we are exposing a function as an API to the rest of the world because other programmers can then capture this type information as they program and use it to make their calls conform to the expectation declared in the type contract...

Unless they aren't using Typescript in the rest of their application.

Typescript really only solves the problem if someone has bought into the entire ecosystem and uses modules which exclusively have TypeScript annotations attached or a TypeScript Definition file.  Atop all of this anyone who wants to access these annotations will need to use an editor which supports that kind of behavior.

<h3>A Type By Any Other Name...</h3>

As functional programming continues to gain traction, patterns like function currying become more common in codebases.  This means we now have functions which could return other functions (higher-order functions) which run 2 or more layers deep.  This kind of behavior can be demonstrated by a small rewrite of our add function.

```javascript
    function curriedAddJS (a) {
        return function (b) {
            return a + b;
        };
    }
```

With this setup in vanilla Javascript, we have really challenged the next programmer to try and decode our intent if they aren't familiar with a currying pattern.  Due to the lack of types and intent declaration in Javascript, this function, for as simple as it is, tells us almost nothing about intent since even the input variables are separated across different functions and the result is the product of a closure.

If we were working in Scala we would get intent and behavior bundled in, possibly, too terse a form.  Nonetheless, the full intent of our behavior is described by the following line of code.

```scala
    def add(a:Int)(b:Int) = { a + b }
```

This function definition actually declares not only data types for the function, but how they interact.  We could almost say add moves out of the range of function definition and into a type definition on its own.  That is, however, a little more esoteric than we need to be.

Of course, moving back to TypeScript, we can see where data types, function definitions and intent start to fall apart.  Although data types are declared and displayed, it is difficult to write a curried function in a way that is both clear and declarative of intent.  Let's have a look at our curriedAdd function in TypeScript.

```javascript
    function curriedAddTS (a: number): Function {
        return function (b: number): number {
            return a + b;
        }
    }
```

That's kind of like a punch to the eyeball, isn't it?

<h3>Tying Intent and Implementation</h3>

At the end of the day, the challenge we keep coming up against is the fact that our intent is either declared, vaguely, in code and lost before execution, or it is not declared at all.  Really, though, data types are not intent. This is one of the biggest problems we have.

Although programming deals in data and behavior, the problem we have introduced is we have become obsessed with the data types and we have forgotten that they are only meaningful within the context of behavior.

A couple of weeks ago, we looked at <a href="http://www.chrisstead.net/archives/1119/typed-thinking-in-javascript/" target="_blank">a way to add a little metadata to our function</a> in order to communicate information to programmers who use our API in the future.  I also introduced a small library called <a href="https://www.npmjs.com/package/signet" target="_blank">Signet</a>, which helps to simplify the process of attaching metadata so we don't have to litter our code with a bunch of Object.append calls.

By using the language we introduced in Typed Thinking, we can actually get a full declaration around our function and add meaning and context to our API in general.  Let's try applying our full type, declaring intent, to our vanilla JS implementation of curriedAdd.

```javascript
    const curriedAdd = signet.enforce('number => number => number', curriedAddJS);
```

This definition helps us to fully understand what curriedAdd will do.  When we get back our final function, we can query the signature from anywhere in our code, including execution time, and get a full report back on what our function will do.  Let's take a look.

```javascript
    console.log(curriedAdd.signature); // number => number => number
```

This is a simple riff on the previous post since we already knew this was possible.  Where our simple type language becomes useful is when we start working with curriedAdd.  Instead of getting back an untyped function, which gives us no more information than we ever had before, we have a fully parsed AST which comes along for the ride with our function.  This means we will actually get all of our other types for free all the way through our entire execution path.  Let's have a look at what happens when we call curriedAdd with a single value and check the signature.

```javascript
    console.log(curriedAdd(1).signature); // number => number
```

This means our initial type declaration actually allows us to understand the return types without any further declaration anywhere else!

Our enforced type declaration has given us a way to communicate our intent to anyone interacting with our code whether we are available to answer questions or not.  This type assignment reveals intent and helps to make library APIs and code in other files easier to work with.

On top of the ability to clearly identify intent and keeping our APIs static and safe, we still get to keep the dynamic nature of Javascript and all of the convenience that comes with it anywhere we are using local functions.  This blended static/dynamic coding allows us to quickly and easily iterate on implementation details within a module or namespace while keeping the actual interface well-defined for the external user!

<h3>Summary</h3>

Languages and the way they manage types can be a really divisive topic, but with the flexibility built into Javascript, we can actually manage types on a case by case basis and surgically insert requirements without having to tie our hands elsewhere in our code.

Although TypeScript is a popular solution for trying to get a handle on the declaration of intent throughout our codebase, it starts to fray at the edges with advanced techniques, making it unsuitable for the move toward a more functional style of programming.

In the end, enforcing a type on our API endpoints with a strong, lightweight library like <a href="https://www.npmjs.com/package/signet" target="_blank">Signet</a> gives us the right blend of enforced static typing where we need it and a fully dynamic environment when we want it.  This seems like the only sane direction to go when working in a language as rich and flexible as Javascript.  Go declare your intent and make people awesome.
{% endraw %}
    