---
layout: post
title:  "OOC: Object Oriented Content"
date:   2010-01-15 11:15:08 -0800
categories:
    - Coding
    - Site Architecture
    - User Experience
    - World Wide Weird
---
{% raw %}
Most content on the web is managed at the page level.  Though I cannot say that all systems behave in one specific way, I do know that each system I've used behaves precisely like this.  Content management systems assume that every new piece of content which is created is going to, ultimately, have a page that is dedicated to that piece of content.  Ultimately all content is going to live autonomously on a page.  Content, much like web pages, is <a href="http://www.websitemagazine.com/content/blogs/posts/archive/2009/02/05/psychology-of-design.aspx" target="_blank">not an island</a>.

Six months or a year ago, I had an epiphany.  Content can be handled much like programming, i.e. in an object-oriented manner.  Web sites often have repeating elements which could be broken out into individual pieces and reused throughout the site.  These pieces could be considered objects in their own right, and they would share quite a bit with objects in programming.  After building a proprietary Content Management System around this concept, I coined the phrase "Object Oriented Content."<!--more-->

Object Oriented Programming (OOP) has roots dating back as far as the 1960's and came into common use in the early 1990's, <a href="http://en.wikipedia.org/wiki/Object_oriented_programming" target="_blank">according to Wikipedia</a>.  Since its widespread adoption, OOP has become commonplace among engineers and is expected to be part of a programmer's standard arsenal.  Though object orientation (OO) has become commonplace with engineering professionals, some of the inherent benefits of OO have been overlooked in other, non-geek circles, especially within creative groups.

Though content will never demonstrate all of the principles found in programming, as it is written copy and not a programming language, there are some striking similarities between OOC and OOP.  Principles such as encapsulation, inheritance and abstraction come to light as content is broken into objects and removed from the page in which it will be displayed.

Content, once broken into objects, is an abstraction from the page it was intended to be displayed on.  We can look at this as, distinct copy is an instance of the object content and content is what goes on a page to solve the content question on the web.  In English, this means any copy I create is, ultimately, content.  A content object is an abstract idea that is used to answer the question of content on the web.

This abstraction of content from the page provides great power in managing a website and trimming time off the process of maintaining a website.  Content objects can be reused again and again throughout your site.  Moreover, since the content is not tied directly to a particular page, it offers greater flexibility in the operation of gathering and presenting content on the web.  The power comes from the ability to edit content in a single place in the system and update across an entire site, or across multiple sites.

A content object is, by its very nature, encapsulated.  All parts of the content are maintained within the content object and no part of the content is outside of the object.  The site page on which your content is to be displayed is totally unaware of the content contained within the object, but simply that it is a chunk ready for human consumption.

For the non-programmer, this means your end display does not look for what kind of content is being displayed or what the content says specifically.  Your client-facing site simply receives a prepared object and displays it as it is, without meddling in the affairs of the copy writer and editor.

Ultimately, display properties may vary based on things like CSS and container wrappers in your site, but the content, itself, will remain wholly intact and unedited.  This translates to a high-fidelity in content presentation based upon what the author intended. 

Finally we will look at content inheritance.  Content inheritance must work differently than programming inheritance.  Engineers will argue that what I am offering here is not the same effect, but for copy writers and editors the world over, this will be a great benefit for you.

If you create a content instance and store copy in it, you can reuse it.  This we know.  Within my proprietary system, you can also inherit content from an existing instance.  Once content is stored, it can be included in a page.  Suppose you would like to make a change to your content, but only on one page.  You can clone the content and edit it accordingly.  What you've done is inherited from the original content, but modified it to suit the new use.

There is an issue with this definition of inheritance.  If you modify the original content, your modified content does not change with it.  This is, however, a boon to your editor as they expect content to behave this way.  If your modifications change, or revert to some other form, it would lead to a great deal of frustration.

In the end, moving away from a static page-content model and to a more flexible and fluid content object model provides a great deal of power and ease when preparing a site for production.  From the creation of content, which can be reused, to editing content where a single change can affect multiple pages, the process of updating content prepared for the web because fast and easy, allowing all parties to spend less time managing pages and more time doing what they specialize in, providing content to the user.  Consider applying this approach to your site and make the web a better place.
{% endraw %}
    