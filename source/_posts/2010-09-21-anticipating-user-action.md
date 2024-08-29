---
layout: post
title:  "Anticipating User Action"
date:   2010-09-21 11:09:25 -0700
categories:
    - Internet Culture
    - Site Architecture
    - User Experience
---
{% raw %}
Congrats, you've made it to the third part of my math-type exploration of anticipated user behavior on the web.  Just a refresher, the last couple of posts were about <a href="http://www.chrisstead.net/archives/369" target="_blank">user tolerance</a> and <a href="http://www.chrisstead.net/archives/429" target="_blank">anticipating falloff/satisficing</a>  These posts may have been a little dense and really math-heavy, but it's been worth it, right?

I have one last function to look at.  This function will let us sort out how long a certain percent of our users will hang out at a site, trying to accomplish their goals given a random population interacting with a page or site they have never visited before. By having the ability to calculate the output of the user falloff function, we can compare user test results to our falloff curve without plotting the entire curve to show anticipated versus actual results.<!--more-->

We've already talked about the user tolerance constant (L) and our starting number of users (u_0).  These are all the elements we need to figure out at what time (t) we will have a percentage (p) of our users left actively seeking on our site.  The actual number of users remaining is trivial to calculate after you pick a percentage, i.e. p*u_0.

(Reminder: percentages should always be expressed as a decimal between 0 and 1.)

Without further ado, here's the function of the day:

t = L*[ln(1/p)/ln(u_0)]^0.5

There are some interesting features of this function which are a direct result of the <a href="http://www.chrisstead.net/archives/429" target="_blank">falloff/satisficing</a> function we talked about last time.  First, as we get closer to 100% (or p gets closer to 1) t gets closer to 0.  This shows us that, at least at one end, this function must be meaningful since none of our users should have fallen off before the testing or site loading began.

At the other end, we can see that as we get closer to 1% (or p gets closer 0.01) then time is going to approach L, <a href="http://www.chrisstead.net/archives/369" target="_blank">our user tolerance limit</a>.  This means our function is actually behaving the way it should and our results will prove to be reasonably meaningful, regarding our test population.

This function is probably as important, if not more so, for testing than our falloff function because you can actually see how you are performing in your test group against a theoretical control group.  This means, if you take your testing group, collect data and analyze it against standard statistical curves, you should be able to get a reasonable estimate of how your users are measuring up against when visiting your site.

On the other hand, if you are underperforming, you now have a reasonable metric to deduce when things are going wrong.  You can do things like plug in .68 for the percent and see if you are actually capturing the first standard deviation of your users within the allotted time.

In the end, this should all relate back to one question: are my users accomplishing what they want to do before they are getting too frustrated to continue with my website?  If the answer is 'yes,' then pat yourself on the back and then make it even better.  If, on the other hand, your answer is 'no,' it's time to start evaluating how your site is impacting the users who visit it.

Are they suffering from unintended ad-blindness as <a href="http://www.useit.com/alertbox/fancy-formatting.html" target="_blank">the users tested for the US census website</a> were?  Are you suffering from a <a href="http://www.slideshare.net/billwscott/design-anti-patterns-how-to-design-a-poor-web-experience?nocache=7174" target="_blank">hover-and-cover anti-pattern</a> which is causing your users to have to <a href="http://chrisstead.posterous.com/?sort=&search=steering+law" target="_blank">steer</a> all over the page to get to what they need?  Are you not using language that makes sense to your audience?

All of these questions and many more should come to mind to improve your performance against the baseline we've defined.  Just remember, even when you are consistently beating my model you can still improve more.  Surprise and delight your users.  Beat the curve and then improve again.  Think about your users, make your site a delight to use and make the web a better place.
{% endraw %}
    