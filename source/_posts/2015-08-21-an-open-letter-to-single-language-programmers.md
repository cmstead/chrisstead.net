---
layout: post
title:  "An Open Letter to Single-Language Programmers"
date:   2015-08-21 09:00:57 -0700
categories:
    - Coding
    - General Blogging
    - Javascript
---
{% raw %}
I work with several programmers every day and I end up giving advice a lot.  Let's not discuss whether people are actually soliciting my advice, or not, but I give it regardless. This evening I started thinking about things I think every programmer should experience. There are lots of different topics that come to mind, including math, hardware, networking and so on.  One thing that keeps coming back to me, though, is languages.

When I started studying computer science in college, I thought, "learn one language, you basically understand them all."

Incorrect!

Some languages are very similar to one another, but each one has its own specific flavor or idiom. Some languages, on the other hand, are radically different from anything that is used in the mainstream commercial development landscape.

Early in my career resurrection I bounced from language to language, always staying close to home. PHP, C#, Java, JavaScript and back again. I wrote the same way in each of these languages, only doing things slightly differently only because there was a slightly different method to dig into what I needed.

The first time I really got a clear understanding that all languages are not made equal was when I built a content cache in Java.  Everything was in the runtime and I just created a static cache instance that lived outside of the current control flow and stored content I could retrieve later. I wasn't really breaking new ground, but I had to deal with one thread safety, cache invalidation and so on.

I swung back around and decided I was going to do something similar in PHP. Lo and behold, I discovered that no matter what I did, there was no way I could spin up a long-running thread or long-lived memory location I could easily store and retrieve anything from. The PHP lifecycle is akin to the lifespan of a housefly.

That was the first time I got a really clear picture of how different languages could be, even when they feel similar to an outsider.

My next eye-opening experience was when I decided I was going to look into a functional language and started seriously playing with Clojure.  For the record, I love Clojure. It just feels right to me.  I don't know why, but it does. Moving from languages which borrow syntax from C to a Lisp really changed the way I think about programming altogether.

All of a sudden my view of programming took a hard right turn and I stopped thinking about shared state and started thinking about data transformations. State became nothing more than a transition from one data form to another.

My day job revolves almost exclusively around writing JavaScript and I couldn't stand looking at sets of loops and conditional blocks.  It was a rat's nest of too many variables and too much ceremony. Every line looked like a duplication of code and all of the code looked like a bomb waiting to go off.

Clojure changed me.

This doesn't mean that I spend my days writing Clojure now, in fact I still write JavaScript, but every language I have touched has changed me a little. Java taught me about working in a long-running environment, PHP taught me about short-lived scripts. C# taught me about data structures and Clojure a lot about data management.

In the end, the reason I continue to work with JavaScript is because it reminds me a lot of myself.  It draws upon a little bit from a lot of different influences. The important thing is, JavaScript reached out and touched all of those things and brought something back with it.

I share all of this because I want to say to anyone who has gone their entire career only ever writing in a single language, try something new. Reach outside of your comfort zone and do something that looks nothing like the work you've done until now. Write a program that scares you. Use a language that changes you. Make yourself better and never look back.


{% endraw %}
    