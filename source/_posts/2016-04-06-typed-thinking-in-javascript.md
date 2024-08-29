---
layout: post
title:  "Typed Thinking in Javascript"
date:   2016-04-06 09:00:16 -0700
categories: Code Smells, Design Patterns, Foundation, Functional Programming, Javascript
---
{% raw %}
Javascript is a dynamically typed language. I suspect this is not news to anyone reading this. The reason this is important, however, is I have heard people say Javascript is untyped.  This statement is most definitely false. Javascript has and supports types, it simply does not actively expose this to the world at large.

Javascript is in good company when it comes to dynamically typed languages.  Python and Ruby are also popular languages which are dynamically typed. Other venerable languages which are dynamically typed include Clojure, Elixir, Io and Racket. People coming from statically typed languages often say that Javascript's dynamic typing is a hindrance to good programming. I disagree. Bad programming is a hindrance to good programming. I feel programmers coming from the languages listed above would probably agree.

<h3>What's the Difference?</h3>

Several popular languages today, including C#, Java and C++, are statically typed. This means the programmer declares the values they plan on using to accomplish a task when they define a method. There are distinct benefits to this kind of programming, specifically, the compiler can quickly determine whether a method call is valid.  This kind of validation is useful and can prove a good tool for programmers, no doubt.

```java
// Somewhere in a static class...
    public Int add(Int a, Int b) {
        return a + b;
    }
```

As you can see above, everything is explicitly annotated with a type definition.  This kind of annotation is effectively a note to anyone who reads this code, including the compiler, et al, that this function behaves this way. Unfortunately, this convenience comes with a price.  Suppose you wanted an add function for any sort of number including mixed arguments...

```java
public Int add(Int a, Int b){
    return a + b;
}

public Double add(Double a, Double b){
    return a + b;
}

public Double add(Int a, Double b){
    return (Double) a + b;
}

public Double add(Double a, Int b){
    return a + (Double) b;
}

// And it goes on and on and on...
```

Modern improvements on type values has helped improve this problem (don't shoot me, Java people), but it becomes obvious rather quickly that having restricted type flexibility means there is a lot more work which must be done to accomplish a seemingly simple task. We have to make a trade to get this compile-time help from the language.

Dynamic typing, on the other hand, does not have this restriction.  In Javascript (or Python, Clojure, etc.) no type annotation is needed.  This means the language will perform what is called <a href="https://en.wikipedia.org/wiki/Type_inference" target="_blank">type inference</a> to do the right thing.  Languages like Python or Clojure are less forgiving if types don't line up correctly.  If, for instance, you attempted to add a number and an array in either of these languages, an error would occur and everything would go downhill from there.

Javascript works a little harder to do the right thing; perhaps a little too hard.  In a strange twist of fate I, once, attempted to demonstrate that Javascript would throw an error when trying to add a string and a function.  Instead I got a string containing the original string, and the source code for the function. Suffice to say, this is not what I expected.

Nevertheless, this kind of type management is both the weakness and the strength of a dynamically typed language.  Rather than having to spend time really thinking about strings, ints, doubles, bools and so on, you can spend more time thinking about the way your program works...

Until it doesn't.

<h3>Correctness and Types in a Dynamic World</h3>

One of the most important things to consider in Javascript is intent.  Although the kinds of strange things can be accomplished by applying common actions to unexpected values can be entertaining, it is not particularly helpful when attempting to write a correct program.

<a href="https://en.wikipedia.org/wiki/Correctness_(computer_science)" target="_blank">Correctness</a> in programming is when a program performs the expected action and, within the domain of acceptable values, returns the correct output.  In other words, an adder would be incorrect if it always returned 9, regardless of the input; an adder which always returned a valid sum would be considered correct.

By considering correctness, we must consider input and output types.  Let's keep using our add function because it's easy to understand.  Above, when we discussed types annotations, we looked at an add function in Java.  We said that the input values a and b were both integers and the output is an integer.  This forces the idea of correctness upon our function which, actually, could be defined as correct in a broader sense.  What if, instead of declaring all of the different types and overloading the function again and again, we made up a new type.  Let's call this type Addable.  Suppose we had an addable type in Java and could rewrite our function accordingly:

```Java
// type Addable includes all Int, Float, Double, Long, etc. values

public Addable add(Addable a, Addable b){
    return a + b;
}
```

We can actually define a notation which will help us to understand the correct input/output values of our function.  We can say add has a function signature which looks like this: Addable, Addable => Addable.  In other words, our function takes two Addable values and returns a new, Addable, value.  All of this is true and we could test this function via various methods to prove the specific addition behavior is correct.

This new Addable type is effectively what we get in Javascript with the type "number."  We know that any number can be added to any number, so whether one number is an integer and another is a floating point value, we know they can still be added together. This means we can actually go so far as to eliminate the type annotations altogether and simply write our function as follows:

```javascript
function add (a, b) {
    return a + b;
}
```

Of course, the problem we face here is there is no annotation to tell the next programmer what types a and b should be.  Moreover, Javascript is quite forgiving and will allow a programmer to pass anything in which might be usable with a "+" operator. There are solutions to each of these, though we will only look at solutions for telling the next programmer what we intended.

<h3>Ad Hoc Properties to the Rescue</h3>

Under the hood, Javascript shares some really interesting characteristics with <a href="https://en.wikipedia.org/wiki/Smalltalk" target="_blank">Smalltalk</a>. Specifically, everything in Javascript, when managed within the runtime, is an object.  This means we can do all kinds of neat things with functions, like assign properties.

What this means is we can actually do something real about making our programming intentions more clear. What if we took our add function and assigned an ad hoc property to the Function object instance called "signature?"  By creating a property which declared what the function should do we get two benefits. First, anyone reading the source can immediately see what we meant to do and, second, we can actually create an artifact in our code which can be called upon elsewhere to get immediate feedback on what our behavior should look like.  Here's an example:

```javascript
function add (a, b) {
    return a + b;
}

add.signature = 'number, number => number';
```

Now, looking at our code we can see what add does.  It takes two numbers and returns a number.  We can use this same property to our advantage elsewhere in our code.  If we were planning to use add and wanted to see what the expected input and output are, we can simply output the signature.  Here's how we could do that:

```javascript
console.log(add.signature); // number, number => number
```

Now we know!  Better yet, if add was somewhere deep in a third-party library, we wouldn't have to dig through third-party code to understand what the contract for add might be.

<h3>Thinking Types</h3>

The really important idea here is, even if they aren't expressed in code, types live within everything we do in Javascript.  As we develop software, it becomes really easy to simply not think about what a function signature looks like and call it with whatever we have, hoping it does what we expect.

Programming this way is dangerous and can lead to bugs which are hard to triage and fix.  Instead of using the spray and pray approach, it is helpful to understand, more fully, what you intend to do and work with the types which are intended in a functions activity.

What this means to the dynamic programmer is, we have to be more vigilant, more cautious and more prepared while solving a problem than someone working with a statically typed, explicitly annotated language.

There are two ideas we must always keep in mind when programming, the goal of a correct program and what we must do to get there. The first idea is related to the company goal related to whatever problem we are actually trying to solve. The second idea encompasses types and actions almost exclusively.

<h3>Summary</h3>

Regardless of the typing mechanism for the chosen language with which we solve a problem, types are part of the solution.  Javascript does not express the value and function types explicitly in the source code, but the types we use are equally important to anything used in a statically typed language.

We can solve the problem of expressing our function signature through using comments or adding a property which can be read and understood by other programmers.  This will help alleviate the challenges which arise from misunderstanding source code.

Finally, as we work we must always be aware of the types we are interacting with and how they lead to the solution for whichever problem we are solving at the time.  Instead of throwing things at the wall and seeing what sticks, let's work carefully and with intent to write correct, valid programs.

P.S. If you don't want to remember all of the metadata stuff you have to do, <a href="https://www.npmjs.com/package/signet" target="_blank">check out signet</a>.
{% endraw %}
    