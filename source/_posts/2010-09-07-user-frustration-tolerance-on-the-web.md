---
layout: post
title:  "User Frustration Tolerance on the Web"
date:   2010-09-07 09:00:49 -0700
categories: Site Architecture, User Experience, World Wide Weird
---
{% raw %}
I have been working for quite a while to devise a method for assessing web sites and the ability to provide two things. First, I want to assess the ability for a user to perform an action they want to perform.  Second I want to assess the ability for the user to complete a business goal while completing their own goals.

Before we start down this particular rabbit hole, there's a bit of a prerequisite for our discussion.  It is important that you understand <a href="http://chrisstead.posterous.com/fittss-law-and-the-steering-law" target="_blank">Fitts' Law and its generalization, the Steering Law</a>.  These are critical to understanding how much time a user will be willing to dedicate to your site the first time they arrive, or after a major overhaul, before abandoning their goals and leaving the site.<!--more-->

So, let's suppose you have users visiting your site, or, better yet, you are performing user testing and want to evaluate how your site is performing with the users you are testing.  It is important to have a realistic expectation regarding what users would really tolerate on the web before they leave so you can evaluate the results of your test accordingly.

Most users have some sort of tolerance level.  By this, I mean most users are only willing to give you a fraction of their day before they get fed up.  Reasonably, some users will have a shorter fuse than others, but all will eventually blow the proverbial gasket and leave your site, never to return.  Let's call this tolerance for pain and frustration 'L.'

L is the amount of time, typically in seconds, that your user is willing to spend time looking over your site and trying to accomplish their goals.  It is becoming common to say that a user will attempt to satisfy a goal and, ultimately, they will attempt to <a href="http://en.wikipedia.org/wiki/Satisficing" target="_blank">satisfice</a> if nothing else seems to work.

When they hit the satisfice point they are reaching their tolerance for frustration.  The satisfice action comes quickly, so we have very little time to fully satisfy the user.  There are actually 3 items which go into the base tolerance before satisficing occurs:

<ol>
<li>The maximum acceptable page load time (p)</li>
<li>The maximum time it takes after page load to locate a satisfactory action to achieve their goal (g)</li>
<li>The Fitts'/Steering time it takes to get to their preferred action item (fs)</li>
</ol>

The maximum acceptable page load time seems to range from one to ten seconds depending on who you talk to or read on the web.  I am opting to take the average and say that the maximum page load time should take around five seconds, though this can vary depending on other factors which are outside the scope of this discussion.

Users, once the site has loaded, have a maximum time they will spend searching for something to satisfy their goals.  The number I keep seeing thrown around is seven seconds, so I am going to accept that as my number for a general baseline for user behavior.

Finally we have Fitts' Law and the Steering Law.  This lends a little complication to the matter as these functions will return varying results.  The simplest case would be a Fitts' law case where the user can move directly to an item on the screen without interruption or interference.  Each person knows how much time it takes them to move from one place to another on the screen and they will, generally, allow for time to move the cursor to a target.

If the screen does other, unexpected things while the user is moving their pointer, like opening and closing ads, displaying inline pop-ups which cover the target or other interferences, the user will get distracted and frustrated.  This is where a Fitts' Law asset can become a Steering Law liability.  A frustrated user is far more likely to leave than a satisfied user.  For each item which interferes with the user's ability to move to their target, their patience will wane.  Reasonably, then, using the variables I defined above, we can calculate the tolerance constant as follows:

L = p + g + fs - (sum of all subsequent change in fs)

Better yet, if we plug in the basic values I collected from around the web, we get this:

L = 5 + 7 + fs - (sum of all subsequent change in fs) = 12 + fs - (sum of all subsequent change in fs)

Moving from one place on the screen to another is a relatively quick motion, so we can see, given there aren't major issues with user-flow interruption, that the average user tolerance is going to be between 12 and 13 seconds for a site from beginning to end.  That's not a very long time, but to a user, it's an eternity.  Don't believe me? Sit and watch the clock for 13 seconds, uninterrupted.  Go on, I'll wait.

Kind of a painful experience, isn't it?  Keep this in mind as you create your site and watch users test it.  During your next test, run a stopwatch. If it takes your tester more than a quarter of a minute to sort everything out and do what they were tasked with, you have some serious issues to consider.

I threw a lot out in one little post, today.  Let it soak for a while and tell me what you think in the comments.  As you work on guiding users through your site and as you test, think about the 13 seconds just watching the clock tick.  Consider your user and their tolerance for frustration and pain.  Keep the journey quick and painless and make the web a better place.
{% endraw %}
    