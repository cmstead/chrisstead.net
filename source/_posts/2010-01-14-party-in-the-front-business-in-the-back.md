---
layout: post
title:  "Party in the Front, Business in the Back"
date:   2010-01-14 09:00:55 -0800
categories:
    - Coding
    - SEO
    - Site Architecture
    - User Experience
---
{% raw %}
Nothing like a nod to the reverse mullet to start a post out right.  As I started making notes on a post about findability, something occurred to me.  Though it should seem obvious, truly separating presentation from business logic is key in ensuring usability and ease of maintenance.  Several benefits can be gained with the separation of business and presentation logic including wiring for a strong site architecture, solid, clear HTML with minimal outside code interfering and the ability to integrate a smart, smooth user experience without concern of breaking the business logic that drives it.

The benefit that engineers will appreciate is the ease of maintainability.  With business logic abstracted from the presenation, engineers can maintain the infrastructure without worrying about breaking the look and feel of the client experience.  This alleviates stress and sleepless nights they might experience otherwise.<!--more-->

I just finished building the beta version of a Content Managment System for the company I am with.  I built a multi-layer system including two distinct uses of the Model-View-Controller design pattern.  The first instance was the underlying system that actually maintained the content, page information, taxonomy, hierarchy and page templates.  The second was more abstracted from the classic MVC pattern.

The CMS control interface, in my abstract version, is the model.  The API is the controller and it handles requests for display data, stores input from.  Finally, a very lightweight templating system is the view.  The templating system is actually built to act as a fully functional site on its own, built around a business logic/presentation theme.  The entire site can run on a separate machine from the CMS or API.

The benefit to all of this is releasing the presentation which the user interacts with from the confines of business logic which can slow a site down and muddy the response of an interactive system.  Flexibility is the path to enlightenment.

With the presentation decoupled, it offers a unique opportunity to concern myself only with what the user will interact with.  With some creative CSS and good, solid HTML I can build an experience my users will look forward to.  Also, with a lighter template to render, the site response should be snappier, leaving the user free to concern themselves with what they came for, content.

Because much of the template is pure HTML, the task of search engine optimization becomes trivial.  The HTML validates better and the content hierarchy is easier to develop.  This means search engines will be more likely to get a clear picture of what the site is like and how the content interrelates.

The benefit of keeping the business logic tucked away behind an API is, regardless of how it changes or functions, the user will have a seamless, predictable experience.  This builds trust between the user and your organization, which increases the liklihood they will stay longer and visit again.

Finally, all of this positive user experience would not be possible without a solid design.  Since the business logic does not interact or interfere with the design, the designer is empowered to make bold moves and guide the user through the site in a way that might not have been possible if user interface were tightly coupled with the code that drives it.

In the end, decoupling the business logic from the presentation allows us to move back to a simpler time when the web was primarily HTML, except you've got more than just bronze-age tools to build with.  With increased usability, maintenance and findability, your site will feel more like a smooth, clean experience and less like a clunky tool straight out of the mid-ninties.  Presentation decoupling makes for happy users and everyone wants happy users.  Go make the web a better place.
{% endraw %}
    