---
layout: post
title:  "Javascript: Require and Import Found Harmful"
date:   2018-04-05 13:12:01 -0700
categories:
	- Code Smells
	- Design Patterns
	- General Blogging
	- Javascript
	- Testing
---
{% raw %}
For the moment, let's go ahead and make an assumption: automated tests (unit tests, integration tests, etc.) <a href="http://www.chrisstead.net/archives/1/hello-world/">make code safer</a> to write, update and change. Even if tests break, it says something about how the code was written and pulled together while running. I will address this concern in another post at a later date. Nevertheless, I am going to rely on this assumption throughout this post, so if you disagree with the initial assumption, you might be better served to drop out now.

Now that the grumpy anti-testers are gone, let's talk, just you and I.

I don't actually believe that require or import -- from the freshly minted ES module system -- are inherently bad; somewhere, someone needs to be in charge of loading stuff from the filesystem, after all. Nevertheless require and import tie us directly to the filesystem which makes our code brittle and tightly coupled. This coupling makes all of the following things harder to accomplish:
<ul>
 	<li>Module Isolation</li>
 	<li>Extracting Dependencies</li>
 	<li>Moving Files</li>
 	<li>Testing</li>
 	<li>Creating Test Doubles</li>
 	<li>General Project Refactoring</li>
</ul>
<h3>The Setup</h3>
Let's take a look at an example which will probably make things clearer:

<script src="https://gist.github.com/cmstead/4873522004fceae5d1d0f1be3a974d36.js"></script>

To get a sense of what we have to do to isolate this code, let's talk about a very popular library for introducing test doubles into Node tests: <a href="https://www.npmjs.com/package/mockery" target="_blank">Mockery</a>. This package manipulates the node cache, inserting a module into the runtime to break dependencies for a module. Particularly worrisome is the fact that you must copy the path for your module dependencies into your test, tightening the noose and deeply seating this dependence on the actual filesystem.

When we try to test this, we either have to use Mockery to jam fakes into the node module cache or we actually have to interact directly with the external systems: the filesystem, and the external logging system. I would lean -- and have leaned -- toward using Mockery, but it leads us down another dangerous road: what happens if the dependencies change location? Now we are interacting with the live system whether we want to or not.

This actually happened on a project I was on. At one point all of our tests were real unit tests: i.e. they tested only the local unit we cared about, but something moved, a module changed and all of a sudden we were interacting with real databases and cloud services. Our tests slowed to a crawl and we noticed unexpected spikes on systems which should have been relatively low-load.

Mind you, this is not an indictment of test tooling. Mockery is great at what it does. Instead, the tool highlights the pitfalls built into the system. I offer an alternative question: is there a better tool we could build which breaks the localized dependence on the filesystem altogether?

It's worthwhile to consider a couple design patterns which could lead us away from the filesystem and toward something which could fully decouple our code: <a href="https://stackoverflow.com/questions/3058/what-is-inversion-of-control" target="_blank">Inversion of Control</a> (of <a href="https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)" target="_blank" rel="noopener">SOLID</a> fame) and the <a href="https://stackoverflow.com/questions/69849/factory-pattern-when-to-use-factory-methods" target="_blank" rel="noopener">Factory pattern</a>.

<h3>Breaking it Down</h3>

To get a sense of how the factory pattern helps us, let's isolate our modules and see what it looks like when we break all the pieces up.

<script src="https://gist.github.com/cmstead/4db01275adfefa8ee082d5305c10c972.js"></script>

With this refactoring, some really nice things happen: our abstractions are cleaner, our code becomes more declarative, and all of the explicit module references simply disappear. When modules no longer need to be concerned with the filesystem, everything becomes much freer regarding moving files around and decoupling concerns. Of course, it's unclear who is actually in charge of loading the files into memory...

Whether it be in your tests or in your production code, the ideal solution would be some sort of filesystem aware module which knows what name is associated with which module. The classic name for something like this is either a Dependency Injection (DI) system or an Inversion of Control (IoC) container.

My team has been using <a href="https://www.npmjs.com/package/dject" target="_blank" rel="noopener">the Dject library</a> to manage our dependencies. Dject abstracts away all of the filesystem concerns which allows us to write code exactly how we have it above. Here's what the configuration would look like:

<script src="https://gist.github.com/cmstead/be27f8f61e5e2773e7a17fad97cdb656.js"></script>

<h3>Module Loading With Our Container</h3>

Now our main application file can load dependencies with a container and everything can be loosely referenced by name alone. If we only use our main module for loading core application modules, it allows us to isolate our entire application module structure!

<script src="https://gist.github.com/cmstead/a98472fdebd6e4fa5e691e1ebf7d7e9b.js"></script>
<h3>Containers, Tests and A Better Life</h3>
Let's have a look at what a test might look like using the same application modules. A few things will jump out. First, faking system modules becomes a trivial affair. Since everything is declared by name, we don't have to worry about the module cache. In the same vein, any of our application internals are also easy to fake. Since we don't have to worry about file paths and file-relative references, simply reorganizing our files doesn't impact our tests which continue to be valid and useful. Lastly, our module entry point location is also managed externally, so we don't have to run around updating tests if the module under test moves. Who really wants to test whether the node file module loading system works in their application tests?

<script src="https://gist.github.com/cmstead/205b5b731426fc664687c92835c614ec.js"></script>
<h3>Wrapping it All Up</h3>
With all of the overhead around filesystem management removed, it becomes much easier to think about what our code is doing in isolation. This means our application is far easier to manage and our tests are easier to write and maintain. Now, isn't that really what we all want in the end?

For examples of full applications written using DI/IoC and Dject in specific, I encourage you to check out the code for <a href="https://github.com/cmstead/js-refactor" target="_blank" rel="noopener">JS Refactor</a> (the application that birthed Dject in the first place) and <a href="https://github.com/cmstead/stubcontractor" target="_blank" rel="noopener">Stubcontractor</a> (a test helper for automatically generating fakes).
{% endraw %}
    