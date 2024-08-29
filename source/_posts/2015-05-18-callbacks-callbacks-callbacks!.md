---
layout: post
title:  "Callbacks, callbacks, callbacks!"
date:   2015-05-18 10:25:37 -0700
categories:
    - Coding
    - Javascript
    - Site Architecture
---
{% raw %}
Waiter,

There's a promise in my spaghetti.

***

So, dig, I like promises.  People I work with and people I talk to think I don't but I really, genuinely do. Promises (in a computer science way) are just plain awesome.  Here's the idea:

Program module: Yo, system, I want to do something and I want it to happen on another thread so I can keep doing stuff.

System: Okay. I'm doing it. Here's an IOU, let me know when you are ready to collect.

Program module: Okay, I need that stuff now.

System: I'm not ready yet. Please hold.

Program module: okay, I'll wait.

System: Okay, I'm done now, here's the stuff you wanted.

Program module: Cool, thanks. Game on!

What happened here?  Basically a promise was issued and the program continued running with an async process continued in the background. When the program was ready for the data, but the data wasn't ready, the promise became a blocking operation. Once the system was done, it delivered what was needed and the block was released.  This is awesome because you don't end up with something that blocks up front. This can be annoying when you need something to appear completely transparent and non-blocking.  Such is the way of the world.

Javascript promises are, let's just say... different. Everyone likes to say "oh they stop callback hell! They are the magic bullet!" Incorrect!

Promises are just syntactic sugar over a callback structure, which basically seems like a big fat lie to me. I don't like the idea that I am "getting rid of callbacks" and really all I am doing is tucking away functions in a place where I have to do a TON of work to get tests around them. I have seen some of the worst code ever written inside of promise callbacks because "hey, it's promise. It's cool, man. You don't need to test that."

*cough* yes you do *cough*

Did you notice how I said "promise callback?" Yep, there it is. Promises and callbacks are still the same. You still pass in callbacks. You still have to handle the asynchronous nature of it all. This is where I climb to the mountaintop and proclaim "the cake is a lie!"

Then there is the q.all argument:

"What if you need to do a bunch of things and then call back? That's like... complicated, man."

It is. This was one the one concession I make... well, I USED to make. Q.all is pretty cool. Don't get me wrong, anything that will bundle up a bunch of async calls and then hang out until they are all done, THEN callback is pretty darn nifty.  The problem is you are still introducing this idea of promises into the mix.  Stuff happens, the spell is woven and magic happens... Magic that is basically untestable.

So, let's stop trying to paint the callback turd with a single layer of abstraction that makes things murkier and more difficult to understand. Promises are magic that have become lingua franca of async spaghetti. Instead, let's have a look at a handy new library borne of Node and easily pulled into the client: <a title="Async on NPM" href="https://www.npmjs.com/package/async" target="_blank">Async</a>

Dear promises, never send to know for whom the bells tolls; it tolls for thee.

Async deals with callbacks differently. Instead of wrapping everything up in a nasty set of promise.then().then().thens, try async.waterfall(). It's like magic:

async.waterfall([
firstOperation,
secondOperation,
thirdOperation
], finishFunction);

Now your code actually says what it is doing. Callback hell is gone. Promises are eliminated. All is right in the world.

But what if I want to do a bunch of stuff that doesn't happen in serial? Parallel. Check it, yo:

async.parallel([
anOperation,
anotherOperation,
yetAnotherOperation
], finishFunction);

It's like magic right?

In closing, all I would ask is, if you are going to write a bunch of async stuff, please give me and everyone else on your team a break. Async is the way to righteousness and the light. Promises are great when you absolutely, positively must have it sometime later, but most work can be done with async. Give it a try and make your code a better place.
{% endraw %}
    