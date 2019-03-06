---
layout: post
title:  "Content: It's All About Objects"
date:   2010-03-25 14:35:56 -0700
categories: Coding, CSS, HTML, Site Architecture, User Experience
---
{% raw %}
When I wrote my first post about <a href="http://www.chrisstead.net/archives/112" target="_blank">object-oriented content</a>, I was thinking in a rather small scope.  I said to myself, "I need content I can place where I need it, but I can edit once and update everything at the same time." The answer seemed painfully clear: I need objects.

Something funny happened between then and now.  I realized that content is already made up of objects.  All at once, I discovered I was one with all of the content scattered across the web.  It was a very zen moment I'm not sure I could recreate on my best day.

See, we are already working with content objects everywhere, but we just haven't noticed.  Take Twitter for instance.  Twitter specializes in the content object. It's a very small object, but it's there all the same.  Take, for instance, a <a href="http://twitter.com/cm_stead/status/11044627560" target="_blank">tweet</a> from my <a href="http://twitter.com/cm_stead" target="_blank">feed</a>.

My one tweet is both content on its own and it is part of my feed which is also content.  The same can be said for blog posts, RSS feeds, Facebook status updates, YouTube videos, that picture of your cat and any other of a number of things scattered across the web.<!--more-->

The funny thing is, these pieces of content are already broken up for you and made ready for consumption.  So, let's head back to your site for a moment.  That footer information you have posted on every page is managed as an object.  This can be further demonstrated by the fact that CSS uses the box model to manage the content on your page.  Those boxes are objects.

This is getting a little esoteric.  Let's bring things back around for a moment, shall we?

Content is more than just the sum of its parts, i.e. words, images and video.  Content is something so real it can almost be touched.  It's a building block.  Without content, the web would be nothing and the only reason the web is something WITH content is because content is something.

Still a little weird, right?  When you build a site, you could simply throw content at the screen without containers.  This would result in a rambling page with no breaks, no sense and no way to logically decipher it.  This would be something akin to the center of the sun: lots of elements, really dense and really REALLY hard to live around.

In order to make the content more presentable to the user, we break it up into pieces we can manage and format.  As soon as you have done this, you no longer simply have words and other garbage on a page, you now have divisions, paragraphs and images. Outside the page, those divisions are meaningless.

Says who?

If a paragraph from a book were written, longhand, on a sheet of paper, it doesn't lose the quality of being a paragraph, it simply loses its association with the book from whence it came.  This means the content structure is actually meaningful outside of the original context.

This is really useful when you deconstruct and reconstruct a page.  All of a sudden you aren't trying to figure out where to put this image and that word.  Instead, you are filling a bucket.  That bucket happens to have a name, and that name is 'page.'  The best part of this whole exercise is, we have now separated content from the page it lived in.  

Why do this?

Once you've broken the content out of the page, it doesn't really matter where the content comes from.  This means you can start drawing smart boxes on your page and simply filling them with the content you want.  Need an RSS feed? I'll draw a box for that.  Want a piece of home-grown content? I'll draw a box for that too.  After all of the box drawing is done, you can start pulling in pieces from all over the web and putting them right into your site.

Much of this isn't new.  We've been dropping content into sites like this for years.  Where this can get really interesting is when you are working on blended content/application sites.  All of a sudden something really magical happens.  Functions aren't programs which live off in a separate ecosystem.  The functions become OBJECTS!

When your functions become objects, they stop being scary and just become part of the content flow.  Forms go here, dynamic items go there and the page comes together.  By simply realigning ourselves and looking at content as objects, instead of words, images, feeds, functions and all the other odds and ends available to us in spades, putting a site together becomes something of a spiritual experience.  All of the wonders of the web come together to form a cohesive whole.

For your next project, go crazy.  Imagine you are playing with blocks and throw away your content notions altogether.  Use the APIs available in the wild and build a smarter page.  The magic of the web is the fact that everything exists a mere request away.  Think about objects and build your site.  Make the web a better place.
{% endraw %}
    