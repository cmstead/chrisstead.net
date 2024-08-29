---
layout: post
title:  "Information Architecture: More than Skin Deep"
date:   2011-09-30 14:46:32 -0700
categories: Coding, Internet Culture, Site Architecture, User Experience
---
{% raw %}
Most of what I have seen on the web regarding Information Architecture has been related, primarily, to what the user sees and interacts with directly.  This means, what users see, and how the site is, ultimately, hierarchically constructed.  Very little consideration is given for what is ACTUALLY going on with the site.<!--more-->

In the early days of the web, a website was mostly HTML and associated miscellany.  There were some content management systems and dynamic utilities out there, but they were typically purpose-built and totally proprietary.  One company I worked for had a system that, essentially, took in HTML snippets and stored them in a database as a web page that was 90% constructed, doing the last of the construction for presentation on the fly.  It wasn't graceful, but it served its purpose.

Today websites are web apps and vice versa.  There are fewer and fewer business sites on the web that are old-fashioned HTML.  The company I work for now, has a broad-reaching infrastructure for its web presence which involves various computers and disparate web services.  This is all very important to the experience the end-user is going to have when they visit your site.

Information Architects today need to be cognizant of the systems they will be working with, the limitations of technology already implemented and the latitude they have regarding direction for the site and the user's end interactions.

Let's assume you have a list of items you already account for in your work: page layout, important items both for users and internal, site hierarchy, taxonomy, findability of information, etc.

Here are other items which should be considered:

<strong>Content Management</strong>

What kind of a system is being used?  Is there an e-commerce solution in place? What e-commerce package is being used? Does it integrate with the existing content solution or is it a separate tool?

<strong>Integrated or Decoupled Site/Content System</strong>

Is the site being run on a simple Wordpress/Movable Type/Drupal install where the site management is tightly coupled with the website itself?  Is the website requesting content across the wire from a service on another site/computer/continent? How will this impact speed?  How easy is it to integrate custom features and functions?

<strong>Data Transport</strong>

This is a biggie.  If you have an old-school web project, this is unimportant.  If you are sending data across a wire to a custom tool or application, this becomes VERY important.  How do you want to connect to the data?  Do you want to make a direct remote connection to the database or do you want to send the data as a single package across the wire?  If the data is being sent as a package, what do you want to use? JSON? XML? Serialized string? Something sneaky I don't know about?

These sound like much more engineery/techy/geeky considerations, but they are important in the end.  Perhaps you are pulling information from your company's database, a Twitter feed and pictures from Flickr. All of a sudden, you are working with mixed coupling.  You will need to know this in case something fails.  You are the one they are going to ask when they need an error screen.

Why data transport?  Simple.  You don't need to know how to implement it, but if you work with the engineers and pick a standards-compliant data transport system, you will save them lots of headaches and yourself extra work in the end.  By understanding the way data is being passed across the wire, you can start to understand how to better integrate RSS feeds into a design, present useful information to users and do it in a way that will be quick to implement and easy to maintain.  Ultimately, if you want to invent a better wheel, you'll want to be armed with a damn good reason.

Ultimately, there is a lot of information that needs to be shaped and directed.  In order to best your user, yourself and your company, you need to consider things that are more than skin deep.  By tackling the tough questions about your project early, you can write a more clear and useful specification.  In the end, by peeling back the layers, you help to make the web a better place.
{% endraw %}
    