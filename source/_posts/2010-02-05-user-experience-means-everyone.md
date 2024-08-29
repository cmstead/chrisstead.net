---
layout: post
title:  "User Experience Means Everyone"
date:   2010-02-05 09:00:12 -0800
categories: ASP.Net, Coding, Javascript, Site Architecture, User Experience
---
{% raw %}
I've been working on a project for an internal client, which includes linking out to various medical search utilities.  One of the sites we are using as a search provider offers pharmacy searches.  The site was built on ASP.Net technology, or so I would assume as all the file extensions are 'aspx.'  I bring this provider up because I was shocked and appalled by their disregard for the users that would be searching.

This site, which shall remain unnamed, commits one of the greatest usability crimes I've seen: they rely only on Javascript to submit their search.  In order to give you, dear reader, the scope of the issue, I always test sites like these by disabling Javascript and testing the function again.

The search stopped working.<!--more-->

Mind you, if this was some sort of specialized search geared toward people that were working with Javascript technology, I might be able to see requiring Javascript in order to make the search work properly.  Even in circumstances like the aforementioned search, shutting down the search with Javascript disabled is still questionable.

This, however, is a search for local pharmacies.

Considering the users that might be searching for a pharmacy, we can compile a list.  This is not comprehensive: the young, the elderly, the rich, the poor, sick people, healthy people, disabled people and blind people.  I'll stop there.

Let's consider a couple of select groups in that list, i.e. the poor, the disabled and the blind.  The less money you have the less likely you are to buy a new computer if your old one still works.  I know this sounds funny, but I've seen people using Internet Explorer 5.5 to access sites in the insurance world.  Lord knows what other antiques they might use to access a site.  Suffice to say, people with old computers may not support the AJAX calls made by an AJAX only search.

Let's, now, consider the two groups who are much larger than the  IE 5.5 crowd: the disabled and blind.  I separate these two so we can think about different situations for each.

First, the blind.  Blind people use screen readers to view web sites. Though I am unsure as to the latest capabilities of screen readers, but the last time I did reading about screen readers for the blind, I was brought to understand that their experience is a little like using Lynx.  See a screencap below to get an idea of what Lynx is like.

[caption id="attachment_182" align="alignnone" width="300" caption="chrisstead.net on Lynx"]<a href="http://www.chrisstead.net/assets/uploads/2010/02/lynx1.png"><img src="http://www.chrisstead.net/assets/uploads/2010/02/lynx1-300x210.png" alt="chrisstead.net on Lynx" width="300" height="210" class="size-medium wp-image-182" /></a>[/caption]

As you can see, browsing for the blind is kind a no-frills venture.  No CSS, no Javascript, no imagery.  Since many of them can't see what you have made available, (yes, there are varying degrees of blindness) they have to rely on a program to read the screen for them.  This means, pages that rely on Javascript for core functionality are out of reach for these users.

In much the same way, disabled users may have a limited set of functions they can access within their browser.  This will depend on the degree of disability and the breadth of function on their browser.  I can't and won't say what a disabled browsing experience is like since I am not disabled and the experience varies so widely it's not possible to pin down what the overall experience is like.  Suffice to say, it is limited.

Now, the reason I mentioned the site was built on ASP.Net:  For whatever reason, the sites I see with the worst usability almost always seem to be built on ASP.Net.  I have a hard time wrapping my head around this, as I've built ASP/C# apps and had no problem building the core functions to operate with or without Javascript enabled.  Everything you need is right at your fingertips.

From sites that require users to be on a windows machine using the newest version of Internet Explorer, to web apps that require users have Javascript and images enabled just to navigate the core functions, ASP sites often seem to be bottom of the barrel.

Perhaps it is a group of people that are used to developing for desktop apps and haven't had to consider usability in the modern age of the web.  Perhaps it's novice developers that don't understand some of the core concepts that go into building successful web applications.  Either way, the current trend of ASP disabled-inaccessibility must come to an end.

To the ASP.Net developers of the world, I implore you to reconsider your development goals and meet the needs of your customers.  To the rest of you that may be committing the same sins in another language, I beg you to be considerate of all of your users, instead of a select group.  Think about usability for a degraded experience, build accordingly and make the web a better place.
{% endraw %}
    