---
layout: post
title:  "Small Inconveniences Matter"
date:   2010-08-26 09:41:47 -0700
categories: Coding, Internet Culture, Site Architecture, User Experience
---
{% raw %}
Last night I was working on integrating oAuth consumers into Noisophile.  This is the first time I had done something like this so I was reading all of the material I could to get the best idea for what I was about to do.  I came across a blog post about oAuth and one particular way of managing the information passed back from Twitter and the like.

This person will remain unidentified as I don't want gobs of people spamming his site, nor do I want to give his poor judgement any extra exposure.  That said, the basis of the post was, it is preferable to make users authenticate with Twitter every time they logged into the system as opposed to storing the keys and remembering who the users of the site are.

The take-away message was, paraphrased, "it's a simple back and forth between your site and Twitter each time they log in.  It won't bother the user and it is preferable to storing all of those authentication keys."<!--more-->

Let me say it again: he was evangelizing inconveniencing the user and stating this was actually the preferable thing to do.

This idea is wrong-headed in so many ways.  First, let's look at Twitter and see how they would feel about it, shall we?

Suppose we stored the keys for the user.  Twitter would have to generate a key just once for each user.  Once that work was done, they would simply take requests as usual and the day would go on.  Their API is built around using stored user authentication so this is no extra burden.  Instead it is business as usual.

Now, suppose you make your user re-authorize every time they signed in to your web app.  This means that each user would have to hit the Twitter authorization page once per login.  Now Twitter has to burn the extra cycles to generate a new key for YOUR user.  On top of that, there is storage of that key.  Each time you request a key, you are taking up space on their server.

The more times you make your users request authentication, the more it costs Twitter.  It might be no big deal to you, but that is money out of THEIR pocket.  That is the very same pocket which is financing that lovely API you are using to update your user's timeline.  We haven't even started talking about your users yet.  This is just the mess for Twitter.

Let's have a look at your user.  If you store their authentication, they have to hit the Twitter authentication screen just once.  Once they do that, they will probably forget all about it, carrying on with using your application, like they want to.  That's it.

Suppose you, on the other hand, make your user authenticate every time they log in.  One of two things is going to happen.  Either you make them authenticate through an account screen and they will assume, after the first time, that they are done.  The other option is, as soon as your user logs in, they will be faced with a Twitter authentication screen.

Suppose you make them authenticate through an account screen.  Your user will reasonably assume this was a one-time thing.  Later they will discover that Twitter isn't being updated by your app anymore.  They will check their account and see they have to re-authenticate.

Rinse, repeat.

Eventually, your user will figure out that you expect them to re-authenticate EVERY time they log in.  If your application relies heavily on Twitter updates, you will lose that user.  If that user liked your application because it updated twitter, you will lose that user.  In the end, you are likely to lose users over the choice.

Suppose you force your user to re-authenticate each time they logged in.  Your users are going to view logging in to your service as a chore.  Eventually they will tire of the whole process and leave. This is the most direct route to losing users.

Regardless of the path you take, you are bound to lose users if you make them re-authenticate through a service each time they log into your service.  Also, the more services your app interacts with, the more services your user will have to re-authenticate each time they log into your app.  This compounding effect will only drive users away faster.

In the end, what this person was really evangelizing is simply laziness.  It is unreasonable to expect your user to go through a litany of special operations each time they log in before they can fully use your service.  In this day of "less is more" user interaction, asking the user to perform unnecessary actions is a sure-fire way to drive users from your site and fast.  Think about your user.  Do a little work for them and make the web a better place.
{% endraw %}
    