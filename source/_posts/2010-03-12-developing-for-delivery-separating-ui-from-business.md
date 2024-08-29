---
layout: post
title:  "Developing for Delivery: Separating UI from Business"
date:   2010-03-12 10:47:58 -0800
categories:
    - Coding
    - Site Architecture
    - World Wide Weird
---
{% raw %}
With the advent of Ruby on Rails (RoR or Rails) as well as many of the <acronym title="PHP: Hypertext Preprocessor">PHP</acronym> frameworks available, <acronym title="Model View Controller">MVC</acronym> has become a regular buzzword. Everyone claims they work in an MVC fashion though, much like Agile development, it comes in various flavors and strengths.

So, what is really going on here?

The idea behind MVC as well as many other design patterns, is to break programming tasks into chunks and handle them independently.  MVC typically fills a need on the web as the view or <acronym title="User Interface">UI</acronym> is what the user ultimately sees and keeping it uncluttered makes life easier for the creatives to work their magic after the programmers have performed theirs.<!--more-->

Though frameworks typically make it easy to keep the models, views and controllers separate, programmers tend to get a little heavy with the code.  There is a project of which I know, and will remain unnamed, that incorporates business and model logic into all parts of the code.  This sets the developers up for two distinct issues:

Requirements change

Maintenance is a nightmare

First, we know that requirements change.  Someone is going to say "gee, I wonder if we could do x."  When it is an executive that says this, the whole sentence can be rewritten simply as "do x."  If the code is scattered across views, controllers and models then changing direction is kind of like redirecting an aircraft carrier.  You can do it, but it is slow going.

If the code is packaged into neat little controllers and the view is completely separate, then adding new function is much less labor intensive.  In the end, functions almost materialize before you, taking a task which could have been a month project and turning it into something which gets done in an afternoon.  The savings is tremendous.

Second, the maintenance nightmare.  There are many factors that come into play when writing maintainable code, but let's focus on the single aspect of good, modular practice.  When writing code, be it in an MVC design or some other separation scheme, putting together solid modules makes everything a little easier to maintain.

Imagine you have your same, scattered code.  A little of the work is done here.  Some of it is done there.  In the end, it takes fifteen files to get a job done.  Suppose something breaks. Don't say your code never breaks.

All code breaks.

Once something breaks, you have to maintain it.  Now, was that function here or was it over there?  What all did it do?  Where do I find it?

Perhaps you haven't touched that code in three years.  It happens.  You could spend a day just tracking down the bug, forget about fixing it.

Now, I don't want to make this all about MVC, because it's not.  This is about simply keeping the presentation separate from the business logic.  Perhaps your business logic is broken into 15 layers.  Great. Make sure that none of those layers is the presentation.

So, what does this have to do with delivery?

I'm glad I asked.

Rhetorical questions suck.

On the web there is one goal. Deliver content to the user.  I don't care who you are or what you do.  In the end you are delivering something to the user.  Sometimes it's e-mail. Sometimes it's a blog.  Sometimes it's a way for them to do their taxes.  It is all about delivery.

Users on the web are demanding.  They want it all and they want it now.  If there is a bug, they don't want to wait for the next five build cycles to see it fixed, they want it now.  The simpler you make things for yourself, the easier it is to get down to the business of delivery.

Another benefit you will see is the ability to quickly change direction.  If your creative team wants to completely redesign the website, it won't cost the rest of your life to make this happen.  You can keep all of the infrastructure you already have and simply make it look new.

I am currently working on a project using <acronym title="Java Server Pages">JSP</acronym>.  I am collecting website content from an outside source and presenting it within a JSP page.  I could have build a heavyweight page that does all of the collection and presentation, but I opted against it.  Instead I built several classes, each meant to perform a single clear task.  One collects menu information, another collects the content.  Yet another produces nicely formatted menus.

You'll note there are two classes for menus.  This is intentional.  I don't want to have to dig through all of the menu collection code to rewrite the menu presentation engine.  These should live separately.

In the end, all the actual JSP page does is present the pre-collected, pre-formatted content I prepared using plain old, run-of-the-mill Java.  The extra added benefit: because most of the function is compiled to run in a virtual machine, rather than parsed and executed by an interpreter, the collection and presentation is blazing fast.

The lesson to be gleaned from my rambling post is this: regardless of the particular design model you choose, break pieces apart.  Keep the UI separate from the business logic.  It will save some gray hair, hours of lost time and it might even make your program function better. Develop for delivery, keep your code tidy and make the web a better place.
{% endraw %}
    