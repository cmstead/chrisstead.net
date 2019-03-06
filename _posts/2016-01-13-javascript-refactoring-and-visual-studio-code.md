---
layout: post
title:  "Javascript Refactoring and Visual Studio Code"
date:   2016-01-13 08:00:10 -0800
categories: Coding, General Blogging, Javascript
---
{% raw %}
About a month ago, I started working at Hunter. Now, I have been pretty aware of refactoring, design patterns, good practices and common practices.  I don't always agree with what everyone else says or does, but I typically have a good reason to do it the way I do.  For whatever I do, Hunter does more so. I am a notorious function extractor and deduplicator, but never more than what I have seen or done in the last month, or until now.

C# has a bunch of really cool tools and toys, the likes Javascript developers have never known, until now. Over the last couple of weeks, I have been working on an extension for Visual Studio Code to help even the odds.  I'm no full-time tool builder, so I won't be matching the quality of Jet Brains or the like, but I'm giving it my best go.

In future posts I will start covering some of the discoveries I have made while building this plugin, but this week is all showboat. I haven't gotten my extension released on the Visual Studio Marketplace... yet. While that gets finished up, I do have everything together in a <a href="https://github.com/cmstead/js-refactor" target="_blank">github repository</a>.

Currently, I think the issues list is actually longer than the list of things JS Refactor (my extension) does, but what it does is kind of nifty. How many times do you discover you actually want to pull some code up and out of a function, into its own function? Probably a lot. The worst part of it all is all the goofing around you have to do with going to the top of the code, adding a function declaration, going to the bottom of the code and closing the function definition, making sure you matched all your braces and finally, when everything looks just right, you finally indent everything to the right place...

Nevermore!

JS Refactor has an action called "wrap in function." Wrap in function will ask for a function name, wrap up your code, and indent everything using your preferred editor settings.

I KNOW, RIGHT? It's awesome!

Seriously, though, wrap in function is nice except when it gets the job wrong. Sorry, it's not perfect, yet, but I am working on it. Along with that, there are also a wrap in anonymous function and extract to function actions.  These are a first go, so they still need some love, but they make things faster all the same.

Another part of this plugin, which generally works more reliably than the the actions, are the snippets.  Fortunately, the snippets rely on code written by the good folks on the Visual Studio Code team. The snippet functionality really shines through when you start writing lots of code. It's like having a miniature code generator living in your editor.

Currently I have a handful of snippets available for use and they work pretty darn well.  Strict declarations, functions, and a couple other things I have actually noticed a significant increase in the speed of code generation, which gives me more time to spend just thinking about the problem I am most interested in solving.

I am not going to give a rundown of all the features of JS Refactor, instead I would encourage you to go play with it. Take a look at the code that drives the whole thing. Give me feedback. It's part solving a problem and part learning how to even do the code analysis to make things work. I won't promise to solve all of the issues quickly, but I will sure try to solve them eventually.

So, until next week, please take a look at <a href="https://github.com/cmstead/js-refactor" target="_blank">JS Refactor</a> and use it on your code. I think you'll like it and I hope it will make your life easier. Next week we will start taking a look at building VS Code extensions and some of the stuff that I wish someone had put in a blog so to make the discovery process easier.
{% endraw %}
    