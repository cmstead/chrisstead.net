---
layout: post
title:  "Degrading Behavior: Graceful Integration"
date:   2010-02-26 09:00:26 -0800
categories:
     - Coding
     - CSS
     - Javascript
     - SEO
     - Site Architecture
     - User Experience
---
{% raw %}
There has been a lot of talk about graceful degradation.  In the end it can become a lot of lip service.  Often people talk a good talk, but when the site hits the web, let's just say it isn't too pretty.

Engineers and designers work together, or divided as the case may be, to create an experience that users with all of their faculties and a modern browser can enjoy.  While this goes down, the rest of the world is left feeling a bit chilly.

What happens is, the design starts with the best of intentions and, then, the interactivity bug takes hold.  What comes out is something that is almost usable when slightly degraded, but totally non-functional when degraded to the minimum.<!--more-->

In the end, of course, the user needs must be considered.  Having a graphically intensive site doesn't hurt if you are a design firm, but might not be the best option for a company dealing with medical customers.

My suggestion, however, is simple.  Instead of degrading your site as the user needs become greater, start with a site that is usable at the lowest common denominator and work up.

Understand who your audience is and prepare to serve those of them who have the greatest needs.  Build a site that is attractive and works if the user can only view it through a program that reads for them.

Once your site has been built and is fully functional, build up.  Integrate functions to serve the users that have some needs, but aren't in the highest-need area on the spectrum.

Continue on this path until you have integrated all of the latest and greatest, bleeding-edge functions that your highest-ability users can interact with.

As you build this way, be sure that you are simply enhancing the function that is already on the screen.  As you add enhancements, you should be able to remove them cleanly and still get the same experience you started with.

I call this approach graceful integration.  Each progressive step, you integrate more functionality and interaction, preserving the layer just below as a separate user interaction.

Each progressive enhancement should be separate and easily disabled.  The granularity of your enhancements can be as large as a two-step approach: all or nothing.  You may also enhance your site in a careful way that allows for several levels of degradation depending on the user and their distinct needs.

A natural separation of user interaction happens when HTML is written, CSS is added and Javascript acts upon the subsequent design.  This three-tier separation, you can use the work that will be done regardless to define your user interaction in a clean way.

One of the best quotes I've heard regarding graceful degradation, in paraphrase, is, "if you show it with Javascript, hide it with Javascript."  I offer this with no source as I can't recall where I heard it.  If you know/are the author of this, stand up and reap the rewards.

The attitude in this quote represents the core of graceful integration.  As you pile the Javascript on, be sure you manage its behavior with Javascript.  Don't use CSS to manage something that is going to be handled with Javascript.  If you must, prepare a style sheet that defines scripted behavior, but set the object classes with Javascript.

There are other benefits you'll gain from this approach.  Not only will your users appreciate the time and care you put into their experience, so will the search engines.

As search spiders crawl your site, they won't see any CSS that looks to be doing something sneaky like hiding text from the viewer.  Spiders have gotten smarter and they recognize when something fishy is going on.  As you are already doing something good for your users, you get this bonus for free.

For those of you looking for snippets of code, the best thing you could know and rely on is the "noscript" tag.  This is a tag which defines the behavior of the page for users without Javascript.  I use this quote a bit to display extra form controls when Javascript has been disabled or is unavailable to the user.  You can use it like the following:

&lt;script type="text/javascript"&gt;
     //your script logic goes here
&lt;/script&gt;
&lt;noscript&gt;
&lt;!-- HTML elements go here like style definitions or form controls. -->
&lt;/noscript&gt;

You can also use noscript by itself scattered throughout the page to display page elements that might, otherwise, be missing for some of your users.

In the end, behavior on your site should be defined by the HTML first, the CSS second and the Javascript third.  Should you choose to go to a finer granularity, don't forget to double check your users can still use all of the layers effectively.  Be mindful of your users, integrate function into your site in stages and make the web a better place.
{% endraw %}
    