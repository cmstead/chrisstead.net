---
layout: post
title:  "Thinking in Pieces: Modularity and Problem Solving"
date:   2010-04-12 09:00:28 -0700
categories: Coding, Site Architecture, User Experience
---
{% raw %}
I am big on modularity.  There are lots of problems on the web to fix and modularity applies to many of them.  A couple of posts ago <a href="http://www.chrisstead.net/archives/276" target="_blank">I talked about content</a> and that it is all built on or made of objects.  The benefits from working with objectified content is the ease of updating and the breadth and depth of content that can be added to the site.

Something really exciting that came from my previous post was that functions are objects.  By this, I mean, site function does not live in a separate world, outside of the content object ecosystem.  Functions should be and ARE integrated right into the website.

This is the beauty of the modern web.  Since functions are merely objects which can be included in pages, they can be built, tested and deployed independently and then integrated seamlessly into the web application.  Typically we think of this kind of function as a plug-in, though plug-ins are merely objects in their own right.

Hagan Rigers (<a href="http://twitter.com/haganrivers" target="_blank">@haganrivers</a>) is currently part of the <a href="http://www.uie.com/events/web_app_masters/" target="_blank">Web App Masters Tour</a>. Without giving too much away about her talk, she discusses managing site (and application) navigation as a function.  She breaks navigation out of the system and handles it as a separate function of the site, independent of the content.  If we consider this approach, then we can see something really important:

Navigation is a function.<!--more-->

Something we already know is that functions are simply objects to be plugged into a website.  Moreover, we know we can AND DO build all kinds of interactivity and user-centric functions into websites.  So, adding one more function to the site is no big deal, or is it?

Thinking about navigation as some object to simply plug into a website seems like a radical departure from good sense, doesn't it?  I mean, navigation is integral to the site.  It's the foundation upon which all is built, isn't it?

I'm not sure that's actually true.

Ultimately, there is only one thing on the web: content.  If not for content, there would be no reason for the web.  There would definitely be no reason for my blog.  There would absolutely be no reason to ever think about navigation.  Perhaps navigation really isn't as foundational as we might think.

The real dilemma of all of this content-object business is that once everything becomes an object then there is no reason to think that any object is immutable or immovable.  Everything can be updated, changed, moved around and even reinvented as the need arises.

This is not to say that any content-object is disposable.  I would argue quite the opposite.  It was said, as taken from Paddy Donnelly's blog, "A designer knows he has achieved perfection not when there is nothing left to add, but when there is nothing left to take away."  (quotation by Antoine de Saint-Exupery)

In short, if this is done correctly, each content-object should be indispensable and irreplaceable. This holds for everything from the main body of text you write to the RSS feed you pull syndicated content from, through the interactive functions of the site and finally to the navigation.

So, we're 500 or so words in, what's the big hubbub?

Here's the thing, your user need not know that you're dealing in objects.  The key is integrating your content objects so well that your user feels as if they are immersed in a smooth, polished experience, each part completely inseparable.

Each object does not live in a vacuum, however all of your content of a certain type should be interchangeable with another.  This is key as you move forward in building a site.  Users will tell you what they want from you.  This may be as direct as an e-mail detailing the things your user would like to as indirect as an inference based on analytics data.

When your site is built upon the content-object ideals, you can quickly rise to meet the wants and needs of your user.  Users are fickle and what they may prefer one day, they will balk at the following.  By managing your site in a modular way, it allows you to keep up with the users and their impossibly quick pace.

So, navigation and modularity.

What I have been driving at this whole time is modularity.  Wonderfully, navigation falls right into that basket.  As you build your site consider your content as objects, then think about your pages as objects containing smaller objects.  Each of those objects is then contained inside the site.

Spinning yet?

The navigation should be your savior.  The navigation, when done right, is the glue which holds everything together in a polished structure.  Navigation is the wrapper that should bind your objects together and, at the same time, make the structure as transparent as possible.

In the end, what you will uncover is, content is drafted and the navigation describes it all as your user is guided through the experience.  Since navigation is a function and all functions are objects, then navigation is simply a content-object which should be crafted with the same kind of care you pour lovingly into your media content-objects.

By breaking the entire site into independent objects and polishing each individually, you lay a strong foundation for building your site.  Once each content-object is ready for inclusion in your site, begin thinking about your navigation.  Pull the site together and buff everything to a high shine so you know your user will be nothing less than dazzled.  I'll let Hagan do the talking about how to think of navigation in even smaller objects.  In the meanwhile, build your site modularly.  Think about everything as an object.  Keep up with your users.  Fill their needs.  Make the web a better place.
{% endraw %}
    