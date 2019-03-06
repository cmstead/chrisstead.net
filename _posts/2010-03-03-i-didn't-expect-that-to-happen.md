---
layout: post
title:  "I Didn't Expect THAT to Happen"
date:   2010-03-03 12:48:07 -0800
categories: Coding, Site Architecture, User Experience
---
{% raw %}
How many times have you been on a website and said those very words? You click on a menu item, expecting to have content appear in much the same way everything else did.  Then, BANG you get fifteen new browser windows and a host of chirping, talking and other disastrous actions.

Boy, I didn't expect THAT to happen.

You've fallen prey to a violation of what I call page-behavior taxonomy.  In short, page-behavior taxonomy is a set of rules that certain items must follow when they perform an action or page-behavior.  Wikipedia does a reasonable job of telling the user what they should expect after they perform an action as each type of link looks a certain way.<!--more-->

In the current age, a typical website has links that behave in all kinds of ways.  Some links move the user to a new page. Some links display information inline. Some links move the user away from the site altogether.  The user anticipates the behavior of a link based upon page context and presentation.

Each of the links on a page fall under a particular taxonomical definition.  The written list of taxonomical definitions is all but hidden to the user.  In the best situations the taxonomy can be used to define the user journey and experience, creating a smooth flow of content from the web to the user.

The most common page-behavior taxonomy I use categorizes links into the following groups: inline content links, intra-website content links, extra-website content links, object display links and other javascript behavior.

When the taxonomy is considered, the user will understand the function of a link given the context they discover it under.  This means, if they see a calendar icon next to a date entry field, they won't be surprised when they click the icon and a calendar pops up.  It relies on expectation of the user and the fact that the link was part of the "other javascript behavior" kingdom.

What brought this discussion about was my discovery of a set of tabs that violated the page-behavior taxonomy.  I won't provide the site because they were giving away a script to let others recreate the effect. We discourage bad Ux around here.

The tabs I encountered were <acronym title="Asychronous Javascript and XML">AJAX</acronym> enabled.  This means the user clicks a tab and the content is requested and displayed inline.  I was generally okay with the behavior.  It was something the user could reasonably anticipate or even be pleasantly surprised by.  I didn't see any way for the tabs to degrade gracefully, but I won't go into that now.  

As I clicked through the tabs, I had a nice, consistent experience.

Click -> content,
click -> content,
click -> content.

Then I clicked the last tab and my browser window was hijacked.  I was sent off to a new page entirely. I didn't know where I was. I didn't know what I was supposed to gain from the page.  I was lost.  All I wanted, after that, was to go home.

The designer had kept me distracted while the developer got behind me and crouched.  The designer pushed and I fell over.  I felt betrayed.  How could my friend, the designer, or my colleague, the developer, play such a dirty trick?

This sentiment is shared by users when they visit a site that tricks them.  The user, in the end, feels they were somehow dealt an unfair hand.  They feel betrayed.  They lose faith. They leave.

The important item to note is, no single person is responsible for this kind of manhandling.  First, the UxD has to betray the user by not telling them something is going to happen.  Then the developer has to build a function to enable this kind of behavior.  In the end, both parties were to blame.

The solution to this is to build a taxonomy.  Consider the terms you will use.  Select copy that is meaningful to your user and use it consistently across your site.  Develop a list of page behaviors and implement them, projected against your taxonomical dictionary.  Make page-behavior rules clear to your user.  If you plan on surprising them, do it by understanding ease-of-use.

Carefully consider your link behavior and develop it against a backdrop of user understanding.  Make your site easy to use.  Think of your user and don't give them unpleasant surprises.  Construct a page-behavior taxonomy to structure your site around and make the web a better place.
{% endraw %}
    