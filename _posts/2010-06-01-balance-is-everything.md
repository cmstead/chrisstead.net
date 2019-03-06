---
layout: post
title:  "Balance is Everything"
date:   2010-06-01 10:55:57 -0700
categories: HTML, Javascript, PHP, SEO, Site Architecture, User Experience
---
{% raw %}
Earlier this year I discussed <a href="http://www.chrisstead.net/archives/226" target="_blank">progressive enhancement</a>, and proposed that a web site should perform the core functions without any frills.  Last night I had a discussion with a friend, regarding this very same topic.  It came to light that it wasn't clear where the boundaries should be drawn.  Interaction needs to be a blend of server- and client-side technologies.

Ultimately, it is rarely clear where boundaries are in a project.  What is too much, what is too little?  Somewhere between too much and too little is just right, much like what Goldilocks wanted in her porridge.  We know that even the most limited of users should be able to access our sites within certain considerations.  A photo gallery is, ultimately, little use to a blind person, but alt tags should still be in place.  Sound clips of the Boston Philharmonic Orchestra would be useless to a deaf person, though a caption or indication as to what each sound clip is would be quite handy.

Coming back to the point, finding a balance point is critical to providing rich, meaningful interaction between your user and your site.  Perhaps the first question which should be answered is "can this be done without Technology X?"<!--more-->

Technology X is always the hot technology everyone is dying to use.  Flash, AJAX, CSS3, these all have fallen under the Technology X heading at one point or another.  By using Technology X as your baseline interaction, you may be causing your users pain when you thought you were enhancing their experience.

A prime example of where Technology X is used when standard interaction would do is the Google login procedure.  Many, if not all, of Google's login boxes use AJAX for verification of user creds.  It sounds cute and looks vaguely neat, but what happens when the browser barfs on their Javascript or you suddenly lose your internet connection?  You have no clue what happened.

Your experience just took a nose dive and left you in the dark.

This is especially bad news for something like a login.  Logging into a website should be a simple, straightforward, FAST experience.  I want to type my creds, log in and be on my way to my dashboard.  If something dies unexpectedly, I want a clean, clear indication as to what happened and why.  If someone cut my ethernet cable in the next room, I want to know my computer lost network connectivity and that's why I'm not seeing my dashboard in all its glory.

CSS is another item which can choke on users, leaving them feeling lost and confused.  When things are hidden or altered with CSS in a way that makes them unreadable or unusable to the user, it can get ugly.  The user sees a damaged site and moves along.  Your rep falls to pieces and your user has moved on to greener pastures.  This is especially true for people using Javascript to reveal something hidden with CSS.

The phrase "if it is to be shown with Javascript, hide it with Javascript," carries a lot of weight with me.  If your Javascript is going to die, it would be preferable that you err on the side of caution.  Show everything.  Make sure the page is as usable as possible.

So, the balancing act.  I'm not saying there is no room for Technology X.  The Technology X of today is the old standby of tomorrow.  People will become familiar with new technology and learn to expect it.  In the meanwhile it is important to consider what your user is aiming to do.

As a friend of mine likes to quote: Proper prior planning prevents piss poor performance.  Know what it is your user is trying to accomplish by using your site.  If they are there to purchase widgets, build a no-frills site which sells widgets.  Use styles only to make the page more readable.  Make sure everything makes sense without styles.  Don't use Javascript to do anything.  Let the server do all the grunt work.

If you plan your site carefully and build something which is clear, usable and meaningful, adding Technology X will only make the site better.  If something fails, your user will still be able to interact with the site and get things done.  It may take them an extra click here or there, but it won't be the show stopper it would have been if Technology X had been your only approach.

Balance is everything.  Balance your plain site with your desire to incorporate interesting new technology.  Just because it might be neat to see something done with AJAX doesn't mean you should.  Flash doesn't solve all world ills.  Sometimes a little bit of HTML a dash of simple CSS and some server-side elbow grease will do just fine.  Build your sites for real use.  Make your toys secondary.  Think about your users' goals and make the web a better place.
{% endraw %}
    