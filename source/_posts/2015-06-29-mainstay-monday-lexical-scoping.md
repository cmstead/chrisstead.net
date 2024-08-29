---
layout: post
title:  "Mainstay Monday: Lexical Scoping"
date:   2015-06-29 01:00:50 -0700
categories: Coding, Functional Programming, Javascript, Mainstay Monday
---
{% raw %}
Edit: I incorrectly stated that Javascript has dynamic scoping. It actually uses a mix of lexical scoping and contextual binding. Dynamic scoping is significantly different than contextual binding. This post has been updated to reflect correct information.

Eight-ish years ago, I wrote a blog post about the importance of programmatic scope. At the time I could have told you roughly what scope was, but I don't think I could have explained how scope in Javascript actually worked. I could explain that some variables were accessible in different parts of the application and I could point at things and give a vague, hand-wavy kind of explanation as to how it all related.  Only understanding that much served me well enough for a while, but when push came to shove, not understanding scope at a deeper level started to make development in Javascript difficult and unreliable.

Perhaps the most important thing to understand is what scope is. Variables are available to different sections of code based on how they are defined. Simply put, there is a lookup table that is provided at each layer of the code and this table contains all of the variable references a line of code may access based on where it lives in the source file or at execution time. Below is a visual demonstration of how this works in your code.

```javascript
function myOuterFunction(){
    var foo = 'bar';

    function myInnerFunction(){
        var baz = 'quux';

        //foo is available from the outer function, here
        console.log(foo);

        //Baz is only available here
        console.log(baz);
    }

    myInnerFunction();

    //foo is available here too
    console.log(foo);

    //baz from the inner function is NOT available here
    console.log(baz);
}

myOuterFunction();

/*
* Output:
*
* bar
* quux
* bar
* undefined
*
*/
```

In order to write programs which are stable and predictable, it is really important to have a firm grasp on variable scoping and what this means in the context of the code you write. As it turns out, there are actually two major types of scoping. The first kind of scoping is <a href="https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping" target="_blank">lexical scope</a>. The second type of scope is <del datetime="2015-07-03T04:33:01+00:00"><a href="https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping" target="_blank">dynamic scope</a></del> actually contextual binding.

As it turns out Javascript actually uses a combination of each of these. This blended approach to scope is, in my opinion, one of the largest sources of confusion for debugging and editing code in Javascript today.  This post will focus on lexical scope, so we can get a firm grasp on, in my opinion, the simpler of the two scoping methodologies. I will cover the following lexically bound scope scenarios:

<ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#global-scope">Global Scope</a></li>
<li><a href="#function-scope">Function Scope</a></li>
<li><a href="#block-scope">Block Scope</a></li>
</ul>

<h3 id="overview">Lexical Scope Overview</h3>

Lexical scope is, in the simplest terms, association of variables in the program based solely on the way they are introduced in the source code. In other words, lexical scope will always follow the same rules when executing based solely on how you wrote the source code. Execution context has no bearing, so though inspection of the code alone, you can reason about which variables are available where.

The first example in the post is an explanation of how lexical scope looks when writing functions. Each variable is made available precisely where you would expect it based on the structure of the code. With the next three scenarios you will see how each of the lexically bound scopes work and how to apply them.

<h3 id="global-scope">Global Scope</h3>

When people say "don't use global variables," what they really mean is don't bind variables to the global scope. Globally scoped variables are available in every context and, when modified, can introduce all kinds of bugs and problems into your code.  However, with ES6, we can <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" target="_blank">define constants</a> which are safe for global use.  Let's take a look at a good globally scoped value:

```javascript
//This is NOT an arbitrary single-letter variable.
//https://en.wikipedia.org/wiki/E_(mathematical_constant)
const e = 2.7183;

//We can compute continuous interest growth, now
function continuousGrowth(principle, rate, time){
    return principle * Math.pow(e, rate * time);
}
```

Global scope is typically reserved for constants and namespaces.  Other items that are globally scoped are built-in objects and functions that are part of the core Javascript language.  Although the global scope is a valid scoping target, it is best to take great care when using it.

<h3 id="function-scope">Function Scope</h3>

In Javascript, up to this point, function scope has been the primary scope used for defining, assigning and maintaining variables. Function scope is a relatively safe place to define variables that will be used locally for work to be done.

The interesting point about function-scoped variables is, they are defined within a function but any functions that are defined below that function level also have access to the variables as well. There are caveats, but that is a discussion for another day.  Let's take a look at function-level scoping.

```javascript
var parrot = (function(){
    'use strict';

    var handyVar = 'variable scoped to an IIFE';

    function say(value){
        var prefix = 'Polly wants a ';
        console.log(prefix + value + '.');
    }

    function sayHandyVar(){
        say(handyVar);
    }

    return {
        say: say,
        sayHandyVar: sayHandyVar
    }
})(); //Take that, Crockford

parrot.say('cracker'); // Polly wants a cracker.
parrot.sayHandyVar(); // Polly wants a variable scoped to an IIFE.
parrot.say(handyVar); // Polly wants a undefined.
```

I feel the last call to parrot.say was completely unsurprising. HandyVar is scoped within the IIFE and is not accessible from outside the function.  The item that is slightly more interesting is sayHandyVar. We access handyVar from sayHandyVar by referencing it directly. This is the nature of function-scoped variables.

By using function scoping, we can guarantee that our variables will remain unmolested by outside functions. This kind of data hiding gives us certain guarantees that our programs will behave more reliably and predictably as we develop. Due to this added stability, we can write larger, more complext functions without worry that we are impacting something we might not see until a bug shows up in production.

<h3 id="block-scope">Block Scope</h3>

Block scope is old hat for anyone who has worked in other languages like C++, Java or C#. If you have a conditional or loop structure and you define a variable within that block of code, the variable is only available within that block.

Block scoping was introduced with ES6, and is defined with the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" target="_blank">let keyword</a>. Theoretically, you could run around and replace all of your var declarations with let declarations and your program would work the same as it ever did... Theoretically.

Since var declarations only support function scoping, you might encounter some strange issues if vars were used inside of blocks and then referenced elsewhere in the function.  This is due to variable hoisting.  Basically, if you declare a variable with var, the declaration will be auto-hoisted to the top of your function. Let will not be hoisted. Let's take a look.

```javascript
function blockScoper(){
    console.log(myOuterVar);

    for(let i = 0; i < 3; i++){
        console.log(i);
    }

    let myOuterVar = 'Function scope';

    console.log(myOuterVar);
    console.log(i);
}

blockScoper();

/*
* Output:
*
* undefined
* 0
* 1
* 2
* Function scope
* undefined
*/
```

Wait, what?? So much craziness happening here. The variable myOuterVariable is not hoisted at all. It lives only below the for loop. Not only that, but i only lives within the for loop. This means you get a much more strict isolation of variables you define.

Coming from a Javascript background, this might not sound so great. We have all become so used to being loose with our variable declarations, that let might feel restrictive. As it turns out, var isn't going away (though I wouldn't miss it) and let is giving us a way to isolate our variables in a clean, predictable way. This kind of scope isolation allows us to use counting variables without fear of program retribution. Take a look at this:

```javascript
function looper(value){
    let lesserValues = [],
        squaredValues = [];

    for(let i = 0; i < value; i++){
        lesserValues.push(i);
    }

    for(let i = 0; i < value; i++){
        squaredValues.push(i * i);
    }

    console.log(lesserValues.toString());
    console.log(squaredValues.toString());
}

looper(5);

/*
* Output:
*
* 0, 1, 2, 3, 4
* 0, 1, 4, 9, 16
*/
```

We were actually able to redeclare i for each loop, safely, and then manipulate it without worrying about whether we were going to affect the output. This opens a whole new world of opportunities to isolate variables and keep our programs tight, maintainable and predictable. I love predictable programs.

<h3>Finally (or TL;DR)</h3>

This covers the foundation for how lexical scope is handled in Javascript. There are three main lexical scopes a programmer can work in, global, function and block.

Global scoping makes your value available to the entire program without regard to safety or data security. The global scope should be reserved for constants, namespaces and core language functions and objects.

Function scoping makes your variables available only to the local function and all child scopes. When using the var keyword, variable declarations will be hoisted to the top of the function, though the assignment will still occur at the declaration line at runtime.

Finally, block scoping, which is new in ES6, gives us a way to manage variable scopes with block level granularity so you can protect your data and guarantee consistent function execution.

As it was said in the beginning, both lexical scoping and <del datetime="2015-07-03T04:33:01+00:00">dynamic</del> contextual binding are used in Javascript. We've managed to make it through the lexical scoping, so next time we chat, we'll take a look at <del datetime="2015-07-03T04:33:01+00:00">dynamic</del> contextual binding. Until then, think about how you are scoping your variables and bring a little sanity back into your job.

<h3>Blog Post Notes</h3>

<ul>
<li><a href="https://en.wikipedia.org/wiki/Scope_(computer_science)" target="_blank">Variable Scope</a></li>
<li><a href="https://en.wikipedia.org/wiki/Scope_(computer_science)#Lexical_scoping" target="_blank">Lexical Scope</a></li>
<li><del datetime="2015-07-03T04:33:01+00:00"><a href="https://en.wikipedia.org/wiki/Scope_(computer_science)#Dynamic_scoping" target="_blank">Dynamic Scope</a></del></li>
<li><a href="https://en.wikipedia.org/wiki/E_(mathematical_constant)" target="_blank">Euler's/Napier's Constant</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let" target="_blank">ES6 Let Reference - MDN</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const" target="_blank">ES6 ConstReference - MDN</a></li>
</ul>
{% endraw %}
    