---
layout: post
title:  "A Case for Quickspec"
date:   2017-10-02 09:00:33 -0700
categories:
    - General Blogging
---
{% raw %}
Any software community has a contingent which agrees that tests are a good thing and testing first leads us to a place of stable, predictable software.  With this in mind, the biggest complaint I've heard from people is "testing takes too long!"

This blog post covers the testing library <a href="https://www.npmjs.com/package/quickspec" rel="noopener" target="_blank">Quickspec, which can be installed from NPM</a>, so you can follow along!

All tests in this post will be written to test the following code:

<script src="https://gist.github.com/cmstead/0cfbc6c9993a547ccc406bef0a071bb3.js"></script>

<h3>Testing a Composition With Mocha and Chai</h3>

Coming from a background of testing first, I am used to writing tests quickly, but even I have to concede, there are times I just don't want to write all of the noise that comes with multiple use cases.  This is especially true when I am writing tests around a pure function and I just want to verify multiple different edge cases in a computation.

If we were going to test several cases for the composition multiplyThenDivide, the output would look a lot like the following:

<script src="https://gist.github.com/cmstead/aa3e3bb2c85e7b8915f65913662279e4.js"></script>

<h3>Testing a Composition with Mocha and Quickspec</h3>

Although testing a simple composition like this is not particularly hard, we can see representing all interesting cases actually requires a whole bunch of individual tests.  Arguably, there are enough cases, we'd get bored testing before the testing is actually done (and we did!).

What if we could retool this test to be self contained and eliminate the testing waste?

This is the question is precisely what Quickspec aims to answer.  Let's have a look at what a simple Quickspec test might look like:

<script src="https://gist.github.com/cmstead/e07dc87c70d326be44e0fe8dd5e5bf4f.js"></script>

<h3>Why Is This Better?</h3>

<h4>Separation of Setup and Execution</h4>

The first benefit we get from using Quickspec is we can see, up front, what all of the cases are we are going to test.  This makes it much easier to see whether we have tested all of the cases we care about.  This means we have a clear picture of what our tests care about and it is completely separated from the execution of the code under test.

<h4>Deduplication of Test Execution</h4>

The second benefit we get is, we eliminate duplicate code.  In this example, the duplication is simply a call to multiplyThenDivide and a call to verify, but this could have represented a full setup of modules or classes, dependency injection and so on. It's common to have this kind of setup in a beforeEach function, but this introduces the possibility of shared state, which can make tests flaky or unstable.

Instead, we actually perform our setup and tie it directly into our test. This means we have a clear path of test execution so we can see how our specifications link to our test code.  Moreover, we only have to write any test boilerplate once, which means we reduce the amount of copy-paste code which gets inserted into our test file.

<h4>Declarative Test Writing</h4>

Finally, if it is discovered a test is missing all it takes is the definition of a test case and we're done.  There is no extra test code which needs to be written, or extra boilerplate to be introduced. Each test is self contained and all specifications are clearly defined, which means our tests are more declarative and the purpose is clear.

<h3>Other Testing Capabilities</h3>

<h4>Async Testing</h4>

Quickspec is written around the idea that code is pure, thus deterministic, but it is also built to be usable in asynchronous contexts, which is a reality in Javascript.  This means things like native Javascript promises and other async libraries won't make it impossible to test what would, otherwise, be deterministic code.

<h4>Testing with Theorems</h4>

Writing theorem tests with Quickspec could be its own blog post, so I won't cover the entirety here, though this is an important point.

Instead of hand-computing each expected value, Quickspec allows you to write tests where the outcome is computed just in time.  This applies especially well where outcomes are easily computable, but the entire process to handle special cases could lead to extra winding code, or code which might actually use an external process to collect values in the interim.

<h3>What this all means</h3>

In the end, traditional unit tests are great for behaviors which introduce side effects like object mutation, state modification or UI updates, however, when tests are deterministic, Quickspec streamlines the process of identifying and testing all of the appropriate cases and verify the outcomes in a single, well-defined test.

Install <a href="https://www.npmjs.com/package/quickspec" rel="noopener" target="_blank">Quickspec from NPM</a> and try it out!
{% endraw %}
    