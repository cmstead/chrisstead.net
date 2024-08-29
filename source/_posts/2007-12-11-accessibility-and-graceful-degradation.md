---
layout: post
title:  "Accessibility and graceful degradation"
date:   2007-12-11 15:51:54 -0800
categories:
    - Coding
    - HTML
    - Javascript
    - Site Architecture
    - User Experience
---
{% raw %}
Something that I have learnt over time is how to make your site accessible for people that don't have your perfect 20/20 vision, are working from a limited environment or just generally have old browsing capabilities. Believe it or not, people that visit my web sites still use old computers with old copies of Windows. Personally, I have made the Linux switch everywhere I can. That being said, I spend a certain amount of time surfing the web using Lynx. This is not due to the fact that I don't have a GUI in Linux. I do. And I use firefox for my usual needs, but Lynx has a certain special place in my heart. It is in a class of browser that sees the web in much the same way that a screen reader does. For example, all of those really neat iframes that you use for dynamic content? Yeah, those come up as "iframe." Totally unreadable. Totally unreachable. Iframe is an example of web technology that is web-inaccessible. Translate this as bad news.

Let's talk about <acronym title="HyperText Markup Language">HTML</acronym> and <acronym title="Extensible HyperText Markup Language">XHTML</acronym>. These are both derivatives of <acronym title="Standard Generalized Markup Language">SGML</acronym> which is a generalized markup language that is used to describe data. That's it. SGML doesn't make things "look" a certain way. You won't find it hanging around the local bar trying to pick up girls. It's just data description. Kind of geeky, like that kid that sits in the back of class playing with his... calculator. So, then HTML was developed with it's own <acronym title="Document Type Definition">DTD</acronym>so that people could describe the information contained in their HTML documents.  Early HTML was easy to interpret if it was coded well, however most people are sloppy with their code.  This led the W3C to create a code validator.  Now, based on the DTD that you use your document may be standards complient or it may not.  Personally I really like to stay within the bounds of strict XHTML, though onMouseOver is deprecated, so Javascript kind of hoses the whole complience thing.<!--more-->

This leads us to the topic at hand: accessibility.  Considering that HTML and XHTML are used for simply describing data, why would a page be more or less accessible?  Well, let's think about that kid that has MS, but still needs to get online research done for a class he's taking, or better yet, consider Stephen Hawking.  Do you think that they would be particularly amused if they had to fill out a form and had to be pixel precise to click on the input field?  I promise you they wouldn't.

Accessibility means that regardless of the browser or disability, your page should still be reasonably functional.  Now, this does not mean that your page should read minds, but there are some tags that should be very familiar. Learn and use the following:

&lt;acronym&gt; - The acronym tag describes what an acronym means.  Hover your mouse pointer over the first instance of HTML, XHTML, SGML and DTD.  The full name will pop up.  In some screen readers the full text will replace the acronym so that the human can interpret what the acronym means.

&lt;label&gt; - Label tags should be used with form inputs whenever possible.  This will ensure that your user will be able to click on either the form element or the associated text and the form element will gain focus.

&lt;noscript&gt; - Ok, if you have ever used Javascript, you are familiar with the &lt;script&gt; tag.  So, in contrast, the &lt;noscript&gt; tag surrounds what should happen if Javascript or other inline scripting language is disabled.

Aside from these few tags, you should also become familiar with the following attributes:

title - Title can be used on practically any element.  This should be used somewhat sparingly though, as using a title with an alt tag, for instance, could spell disaster for a screen reader which cannot interpret all of the attributes precisely as you might expect.

alt - EVERY IMAGE SHOULD HAVE AN ALT TAG!  No ifs ands or buts.  If the image is included in the page via the &lt;img&gt; tag, use an alt tag.  Furthermore, use descriptive alternate text.  img_21938740928374.jpg is not useful.   I will find out if you are doing this and I will stalk you in the night.  Alternate text doesn't have to be perfect.  No two people are going to interpret it in precisely the same way, but if the image is of a bird in flight, use alternate text that says something like "bird in flight."  People will understand enough to get by.

accesskey - The accesskey attribute sets the stage for people that are going to use the keyboard to navigate your site, or perhaps have a limited command set to work from.  This attribute enables people to use keyboard shortcuts to access form elements for their ease and convenience.  I recommend using this tag in your forms in general, though I strongly urge you to add accesskey to any form elements that a disabled user might be looking to use.

Moving forward, let's discuss the &lt;noscript&gt; tag.  Whenever you have a Javascript effect on your site, consider whether there would be a problem if there were no Javascript enabled.  As a matter of fact, go to your site, turn off Javascript in the options and try navigating.  If your site topples like a house of cards, you need to re-work your Javascript.  I currently work for a company whose previous web-person didn't account for people with no Javascript.  The corporate site is totally unnavigable without Javascript.  This is bad.  This is really bad.

Ensure that your scripts degrade gracefully.  If you have elements that are hidden from the user until the Javascript function is triggered, what happens if scripts are disabled?  I always run a special function at the end of the page that hides the elements I want hidden.  What this translates to is, if you have scripts disabled, the page displays everything.  The failsafe for my scripts is usability.

This brings us back to Lynx.  Don't think that I had forgotten.  I browse my sites using Lynx.  I do this so that I can see what happens when nothing is viewable but text.  Lynx doesn't even give any particular kind of formatting.  Pages are just a long string of words.  If you can open your site like this and still find everything easily you have successfully made your site accessible.  If your page looks like an amorphous mess then you have some work to do.

Now, go forth and make the web a more usable place.
{% endraw %}
    