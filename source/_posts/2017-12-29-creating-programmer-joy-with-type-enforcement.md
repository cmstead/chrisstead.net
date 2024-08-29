---
layout: post
title:  "Creating Programmer Joy with Type Enforcement"
date:   2017-12-29 10:22:13 -0800
categories:
    - Coding
    - Design Patterns
    - Javascript
    - Types
---
{% raw %}
It's extremely common for developers who work in statically typed languages to talk about how much easier their code is to maintain and that the code is self-documenting because of the type system.  However, these same programmers often talk about the amount of "ceremony" they have to overcome to work within the type system and language of their choice.  The ceremony issue seems to be reduced to zero within the Javascript community because of the dynamic type system.  On the other hand it is common to hear JS developers complain about the level of difficulty regarding maintaining a codebase which brought them so much joy while they were creating it.

In a project I have been maintaining for the last couple of years, I started off with the creation joy only to find myself fearing the idea of jumping back in and making updates to resolve bugs logged by users.  I started considering options.  Should I rewrite the entire codebase from scratch? Should I write it with a different language altogether?  It is a plugin for VS Code, so Typescript is the preferred option, though everything I wrote was in vanilla Javascript.

Between the creation of <a href="https://marketplace.visualstudio.com/items?itemName=cmstead.jsrefactor" rel="noopener" target="_blank">JS Refactor</a> and this past November, I started creating a suite of different libraries all of which were employed to solve the exact kinds of problems I had in my plugin: tight coupling, undocumented code, uncertainty, and the requirement of having to go back and reread my code to rebuild context so I could start working again.

The last two issues were my greatest hurdle. I felt completely uncertain about what the code looked like which I had written to create the plugin in the first place and the only way to understand it was to go back and read it again.

Ultimately, for all of the effort I made to keep my code clean, I had still created write-only code and I was miserable about it.  Nevertheless, I started with the first bug that made sense for me to tackle and dove in.  I plodded along and my dread quickly turned into joy.  Something had happened which actually made me want to throw myself back into this (tested) legacy project.

Somewhere in the process I discovered real programmer joy.

Set aside the fact that I created a <a href="https://www.npmjs.com/package/dject" rel="noopener" target="_blank">dependency injection library</a> and integrated it a while back (this was not the source of my joy). Let's even set aside the tool I created for <a href="https://www.npmjs.com/package/mochadoc" rel="noopener" target="_blank">turning automated tests written in Mocha, Jasmine and Jest into human readable documentation</a>.  The thing that made my life easy and joyful were the types!

No, I didn't make the switch to Typescript.  For all the good Typescript offers to the user, the issue of being constrained by the type system was still too much for me to bear.  Instead I stayed within plain old Javascript and started really leaning hard on the <a href="https://www.npmjs.com/package/signet" rel="noopener" target="_blank">Signet type system</a>.

First things first, I started identifying the types of objects and data I was going to interact with and I created just enough type information to say something meaningful about it all.  Here's a sample of what I created:

<script src="https://gist.github.com/cmstead/7e72bb3dc4db04ef562531bd04c8e78a.js"></script>

After I got my type information lined up, I started working. As I slung code and discovered new information about the data I was working with, I tweaked my types to tell future me, or another developer, what kind of information really was lurking in that data with which I was interacting.

As I worked I would forget what a specific API called for, or how it worked.  I would open the source code and, instead of trying to interpret the functions I had created, I simply referred to the signatures at the bottom and my context was instantly rebuilt.

What made this such a revelatory experience was not that I simply had type information encoded into my files, but it was always accurate and, if I got something wrong, I would get real, useful information about how I could fix it. The types are evaluated at run time and could verify things like bounded values and in-bound function behaviors. The more code I wrote, the faster I got.  The more I introduced types and encoded real, domain-specific information into my files, the better my program became.

My code came to look like the kind of code I always wanted to write: strict and safe at the edges and dynamic in the middle.  As long as I know what is coming in and what is going out I am safe to trust myself, or anyone else, to behave as they should in the middle of their function, because they can't get it wrong.

All of a sudden typed variables became irrelevant and creating something from what existed became an exercise in joy.  The game went from dynamic or static to dynamic and dependent.  I could encode logical notions into my software and they always led to something better. An example of what this looks like is as follows:

<script src="https://gist.github.com/cmstead/1eff9e7ddcf2f2195788dca8a4edc8ab.js"></script>

With all of this information encoded in my program, I could start writing tests which actually described what is really happening under the covers.  Creating example data could be done relatively effortlessly by simply fulfilling the type contract.  Even creating and interacting with automated tests brought me joy:

<script src="https://gist.github.com/cmstead/e29ff045591f7f2dfc3064ad380f07b2.js"></script>

This meant that all of the code would lead back around to the start again and each piece, type definitions, type annotations and tests, told the story of how the program worked as a whole. For the small amount of extra work at the beginning of a given thread of thought, the payout was tremendous at the end.

Now, does this mean that types ARE joy? No.

All this really says is a good, rich type system can, and should, help tell the story of your program.  It is worth noting my code reflects the domain I work in, not the types of data living within objects and values. Arguably, if a programmer goes type crazy and codes something obscure into types (like some of the atrocities committed by overzealous Scala programmers) the types can bring pain. Instead we should aim to speak the same language as other humans who work around us.  Never too clever, never too obscure, just abstraction in simple language which helps form immediate context.

At the end of the day, anything could be used to build beautiful abstractions, but why not use a <a href="https://www.npmjs.com/package/signet" rel="noopener" target="_blank">tool that helps you fall into the pit of success</a>?
{% endraw %}
    