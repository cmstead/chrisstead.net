---
layout: post
title:  "The Selection Correction"
date:   2010-01-11 16:21:38 -0800
categories: SEO, Site Architecture, User Experience
---
{% raw %}
User self selection is a mess.  Let's get that out in the open first and foremost.  As soon as you ask the user questions about themselves directly, your plan has failed.  User self selection, at best, is a mess of splash pages and strange buttons.  The web has become a smarter place where designers and developers should be able to glean the information they need about the user without asking the user directly.

The innate problem with asking the user about what they want is, they will invariably give you the wrong answer.  Sometimes it happens because they don't know what they want.  Sometimes they don't care.  Sometimes they misunderstand what you really want to know and sometimes they flat out lie to see what happens.

The question has hit my desk a few times now, "how does the user self-select in a nice, fluid manner?"  The answer: they don't.<!--more-->

It occurred to me, while pondering this question, that it wasn't the answer that was a problem.  It was the question.  I don't want to know how the user self-selects. I want to know how I am to select the user.  The question is flawed.

The first thing I did, once I awoke from the haze and saw the truth for what it was, I reformulated the question.  How do I select the user before they get to the site?

It sounds like I am preparing for a life of mind reading.  No computer will tell you much, if anything about your user.  Do they like cats or do they like laser blasters?  The computer neither knows, nor cares.  All you get is an IP address, an operating system and browser info.

So, how would one approach the user selection issue?  Is it a design concern or a development concern?  Yes.

The developer can say a lot about the computer the user is using, the place they came from to get to your site and where they landed on your site.  The designer can pick up the stragglers and put them on the path to user experience redemption.

First the developer must work their magic.  Given where the user came from and what page they landed on, the developer can make predictions about what they are going to want to do next.  These predictions are essential to handling the user experience moving forward.

If you have more than one type of user coming to your site, it is helpful to understand what they did to arrive.  If they typed in the address manually, or clicked on a link in their e-mail, the resulting behavior is almost certain.  They are there for a purpose and it would be wise to get out of their way.

If, on the other hand, the user arrived via search, the search terms will probably be in the referrer URL that is passed along with the GET request. If this is too much tech speak, think of it this way: the browser tells you what they searched for and you can use that to guide your user.

Any other in-bound links will tell you the user is interested in the page they clicked through to.  This is especially true if they were not mislead to believe the page is something it's not.  Your SEO skills would come in handy for that little task.  If you know the user is interested in a particular product or area, you can use that for opportunities to cross- or up-sell.

Once the user it on your site, the battle is half over, or only half over, depending on your outlook.  Since you know something about your user, you can guide them.  If, on the other hand, the user arrives mistakenly, on the wrong page, they need to find a way to get out of their mess.

This is where design and client-side architecture come into play.  Users typically behave in a click, back, click, back manner.  They click a link then, if it is not what they wanted, they click the back button.  It is your job, O noble chess player, to stave off that back-click at the expense of life and limb.

Make it easy to find the way to the right place on the site.  "Is this not what you wanted? Why not try this?"  It's a fantastic way to lead the user where you want them to go.  Make their journey one that ends at Mecca.

There are two wonderful side-effects of pre-selecting your user and their journey.  The first is you can streamline the architecture of your site to match precise needs and exclude the train wreck "features" that balloon into eventual site clutter.  Secondly, you can spend more time solving the problem of how to handle the edge-case users, leaving the straight-and-narrow users alone to complete their journey as effortlessly as they please.

In the end, the question of how a user self-selects should undergo great scrutiny before it is passed off as a primary goal of the site development process.  Think carefully and consider, not only the visual elements of the site, but the outside influences that make up the ecosystem you are about to interact with.  Consider your user before building the site.  Your users will thank you for it.
{% endraw %}
    