---
layout: post
title:  "What Have I Done? (Redux)"
date:   2010-03-22 11:08:05 -0700
categories: Coding, PHP, Site Architecture, User Experience
---
{% raw %}
A little earlier this month, I made a post to Posterous called "<a href="http://chrisstead.posterous.com/what-have-i-done-18" taget="_blank">What Have I Done?</a>"  It was less a post about what I had done as what I was doing.  Here we are, approaching the end of the month and I've just completed phase one of what I was doing.

In saying all that, I would like to oficially kick this post off with a bit of rejoice.  <a href="http://cobblesite.chrisstead.net/" target="_blank">CobbleSite</a> version 1 is complete and ready for people to play with it.  Let's just call it a version though it's not. Not really, anyway.  This is exciting for me as I get to do more than simply blog about what I do, I get to show it.

All of this isn't very useful if I don't share a little about why I did it.  I mean, what's so special about just one more content management system if it's built to be a variant on everything else that is already out there?  There is, after all, one major difference:<!--more-->

Object oriented content.

The CobbleSite <acronym title="Content Management System">CMS</acronym> is not so much about doing something that others before me have already done, it was about a philosophy.  I believe that treating content as objects is the right way to move forward into new places on the web.  Moreover, <acronym title="Object Oriented Content">OOC</acronym> makes life easier for administrators and users alike.

I've poked through several different content managers to see what they do well and what they do poorly.  Every system has a strength: simplicity, focused function, raw power or vast ability to integrate plugins and custom functions.  All of these things are wonderful, but they come with a tremendous amount of stuffing and whatnot that makes them unwieldy given the situation.

Personally, I love WordPress.  I think they have done a great job of building a tool that is easy to install, use and administer.  Templates are reasonable to build even by the relative novice and getting a site up and running takes little time and effort.  I would consider this a success on many levels.

Regardless of how I feel about WordPress, it, just like every other system, fails to fulfill requirements I typically have for a website.  I don't only work on blogs.  I build Corporate sites with pages and content distributed throughout a medium to large hierarchy and, sometimes, across multiple domains.

There are other tools as well, which are open source, that might fill this need a little better.  Drupal is one.  Drupal, however, is hardly friendly to the newcomer.  You must learn new technical jargon, become familiar and comfortable with a cryptic template system and then struggle through building menu systems which support different levels of users.  This is just too much work for me.  Moreover, running a distributed Drupal installation for multiple domains becomes challenging very quickly.

In short, I can't build a site, push it out to the world and then hand control to a creative team to maintain the content.  Worse than all this, every CMS I have seen (so far) has content tightly coupled with pages.  This is precisely why I built CobbleSite.

I had only one aim when I set out to build CobbleSite in the first place: decouple content from pages.  I won't go into detail about the benefits of OOC as you can read them in <a href="http://www.chrisstead.net/archives/112" target="_blank"">a previous blog</a>.  Let's take a peek under the hood and I'll give a little insight into why I did things the way I did them.

First, let's look at hierarchy.  Up-front, the hierarchy management works a little like a folder system.  There are pages, sub-pages and sub-sub-sub-pages.  This can be carried as deep as necessary.  I was inspired to manage the hierarchy this way after working with people who would ask "so, where do I find that page again?"  The answer: right where you left it.  If the page is in a particular location within the site, it is right there in the hierarchy too.

Another benefit of managing the hierarchy this way is taxonomy management.  It becomes quite obvious whether a taxonomical dictionary for your site will work or not.  You can ask "does this copy work," and get an answer with a glance.  It allows people to tackle user-centric questions before the site has been built.

Within the hierarchy lay the pages.  Pages are containers and, as such, just because you've made a page doesn't mean you are stuck with some lorem ipsum to fill the space while you construct the site hierarchy.  This approach maintains focus on one task at a time.

Pages are defined rather than created.  This means, you give it a name, a template and some related meta information.  Page definitions are manipulated through the hierarchy.  Grouping and subordination are defined and stored.

Finally, let's take a look at content.  Content is created and given a type.  Content can be created through a page view, or it can be created independently.  The function of the content is left to the user to define.  This is where the principle of OOC becomes clear.

The "class" of the content can be viewed as the content type.  Meanwhile, each piece of content can be viewed as an object instance of the class.  The translation of this technical jargon is, content can be created and reused across pages or even websites.  This cuts down on duplicated work and turns the work of building a site into a much more straightforward act of creating and posting content inside of existing containers.

In the end, my method is not the only way of implementing OOC.  Moreover, I wouldn't even dare say it is the correct way, but it is the best I have done so far.  There is much MUCH more related to the topic of building CobbleSite, but now is not the time.  I encourage you to try CobbleSite, think about OOC principles and find ways it could improve.  Better yet, think of ways you would build a better system altogether.  When you make a site, think about object oriented content, provide a great site for your users and make the web a better place.
{% endraw %}
    