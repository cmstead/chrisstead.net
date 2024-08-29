---
layout: post
title:  "Five Things That Will Improve Your (Javascript) Code"
date:   2015-09-16 09:00:47 -0700
categories:
    - Coding
    - Functional Programming
    - General Blogging
    - Javascript
    - Unit Testing
---
{% raw %}
I see lots of discussion around new frameworks, libraries and other odds and ends, which claim to make your code better, cleaner, easier to maintain, etc. Although frameworks are definitely useful for avoiding reinventing the wheel and libraries help clear out boilerplate you would have to litter your code with, the cake they offer of better code is a lie.

As client-side development in the browser becomes more focused on solving application-sized problems, the days of merely dropping in a plugin or a library to accomplish what you need are coming to an end. Javascript living both in the browser and on the server further leads to large, potentially complex code bases. If we simply continue working the way we did 10 years ago, you end up with a spaghetti mess that is completely unmaintainable.

Don't panic!

There are things you can do to save yourself from impending doom. There are actually five things I recommend every Javascript programmer do to make their code and their lives better. It's a lot like reinventing yourself, though, it takes work and dedication, but it is worth every ounce of work you put in. I would do a countdown, but I always recommend these items are done in order.

<strong>1. Test Driven Development (TDD)</strong>

If there is one thing on this list you should start doing immediately, it is test driven development. TDD allows you to define, up front, what the business requirements are that your code should adhere to.  You actually write tests before you write code.

Red-Green-Refactor

This means, first you write a test and run it. That test should fail. If your test doesn't fail you are either writing tests against existing code (not TDD) or you wrote a test that tests nothing. Make sure your test fails first. Once your test fails, write just enough code to pass that test. Run the test again. Green means passing. When your test goes green, your code is good. Once you have written enough code to get messy, refactor, ensuring your tests continue to pass.

It doesn't really matter which testing framework you choose. At my work we use Jasmine, but Mocha is fine as is Tape. There is always a flavor of the week testing framework, so pick one that makes sense to you and use it. The choice is completely up to you.

<strong>2. Static Analysis</strong>

Static analysis is, basically, a program that checks your source code against a set of rules and warns you of potential errors and bugs in your code. The sooner you can get static analysis going on your code, the better. I recommend you set it up before you even write your first unit test.

Current popular static analysis tools are JSLint, JSHint and ESLint. I prefer JSHint only because I have used it and I'm very familiar with the tool. ESLint is the newest of the three and people swear by it. Both support ECMAScript 2015/2016 syntax. JSLint is the oldest and I am unsure as to the progress regarding new syntax. Douglas Crockford is a busy guy and he may or may not have the time to maintain it.

Another way to get static analysis into your project is to use a language designed for transpilation. Transpilation is the process of compiling source code into Javascript. The output could be either human-readable code or ASM, though I tend to prefer human-readable output for no particularly good reason except ASM makes me think of Emscripten which makes me cringe.

Languages which will provide good static analysis include TypeScript and Elm. TypeScript allows you to define the type contracts your functions and methods will adhere to, which means you get some good information up front about the safety of a function call. Elm is a functional view-layer language with very strict code and type rules; because of this Elm provides greater code stability guarantees.

<strong>3. Functional Programming</strong>

The kind of functional programming I am talking about is not just introducing Underscore or Lodash into your project, but really embracing the ideas that make functional programming great: immutability, no side effects, function composition and function abstraction.

Even though Javascript variables are mutable, by treating them as immutable, you add stability to your code by avoiding changing state under your own feet. When a value is set and remains as it was assigned, you can rest assured that your code will always behave the same way when you refer to that variable.

By eliminating side effects in as much of your code as you can, you create well defined units of code which behave the same way every time and, better yet, are easy to test. This makes the first item on our list even easier to satisfy which makes your program better.

Function composition is the process of creating small abstracted units of code as functions without side effects which are then put together to do more complex work.  This kind of modularity and abstraction makes it much easier to test and, when necessary, debug your code.

<strong>4. Data Structures and Algorithms</strong>

In any computer science program, the data structures and algorithms course is considered a critical course in computer science thinking. By getting familiar with the well known data structures and algorithms, you lay a foundation upon which you can build your knowledge and skills which will help to more quickly analyze and work with business concerns as well as existing code which will start to display recognizable patterns.

Data structures reach beyond the basics of variables, arrays and objects and dive into the concept of lists, stacks, queues and trees. These complex structures provide much cleaner, smarter solutions to common problems and can provide insight into problems which might be hard to identify without this kind of core understanding.

In much the same way that data structures provide data-related solutions to problems, algorithms provide insight into code and how to build in efficiency and good structure. Topics like sorting, searching and working with complex data structures will give a functioning foundation for how to integrate data solutions into your projects.

<strong>5. Design Patterns</strong>

Finally, to really cap the knowledge you have gained from the rest of the list, design patterns are a set of solutions which have been discovered and well documented. Design patterns tie together all of the practices with testing, abstraction, data solutions and algorithms and provide a well known structure to add to your program as common problems and patterns emerge.

As evidenced by my list, design patterns are not where you begin, but where you enhance. Good use of design patterns will enhance well-architected code and provide clarity when the going gets rough. These patterns are not so much a law as a guideline to help make good programs better and bad programs stable.

<strong>Closing</strong>

There are many other important practices I could have thrown into this list, like polygot programming and theoretical studies, but these things are only useful once a strong foundation is set. In studying these five major topics it is highly likely you will encounter different programming languages and different schools of thought. This is a good thing.

The greater the number of perspectives a programmer is introduced to, the better they are bound to become. This list is not something a good developer can go through once and be done. Instead it is a cycle which should be recognized and embraced. By learning, developers grow and by growing, developers improve their world.

Hopefully the topics I presented here resonate with you and you share this with others who want to continue their journey to be their best. Even the journey of a thousand miles is started with a single step, so take your step and become better every day.
{% endraw %}
    