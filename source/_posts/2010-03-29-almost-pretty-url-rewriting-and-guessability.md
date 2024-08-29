---
layout: post
title:  "Almost Pretty: URL Rewriting and Guessability"
date:   2010-03-29 01:00:10 -0700
categories:
    - ASP.Net
    - C#
    - Coding
    - JSP
    - PHP
    - SEO
    - Site Architecture
    - User Experience
---
{% raw %}
Through all of the usability, navigation, design, various user-related laws and a healthy handful of information and hierarchical tricks and skills, something that continues to elude designers and developers is pretty <acronym title="Uniform Resource Locator">URL</acronym>s.  Mind you, SEO experts would balk at the idea that companies don't think about using pretty URLs in order to drive search engine placement.  There is something else to consider in the meanwhile:

The user.

Several articles I found talk about the SEO benefits of pretty URLs and whether it is very important to consider using them with a site as they don't encourage a major boost anymore. "It's ten years too late," they say.  It's never too late, I say.<!--more-->

Rather than bashing SEO experts that cry "content, content, content" let's look at content and wrap it up in an easy to guess URL the user can make sense of.  <a href="http://findability.org/" target="_blank">Peter Morville argues for findability</a>, meaning users are more likely to use resources which are easy to navigate. Moreover, users will naturally navigate to whatever <a href="http://en.wikipedia.org/wiki/Satisficing" target="_blank">satisfices</a> their information needs.

I wonder why users are forced to satisfice when pretty URLs make it much easier to satisfy by simple guessing.  Unfortunately, something that stands in the way of this guessability is the combination of SEO professionals considering pretty URLs as a lesser sin combined with technologies which stand in the way of smarter URL writing.

Actually, I don't necessarily wonder much, at all, why users are forced to satisfice when attempting to find something on a site through URL guessing.  Much of the available technology on the internet is fairly limited when looking at URL rewriting.

When working with PHP, Python, Perl or anything else that works well with Apache, rewriting is easy.  If you are working with Java or anything that runs under IIS, rewriting gets tricky quickly.  Some of the technology which lives under the skin of the web gets a little ugly when you want to start doing pretty things.  We'll talk about overcoming these obstacles soon.

See, here's the issue.  We really want to do URL rewriting, not maintenance-heavy URL trickery.  I came across <a href="http://www.sitepoint.com/blogs/2009/07/07/pretty-urls-pretty-easy/" target="_blank">an article about creating pretty URLs</a> which claims it is "pretty easy."  Technically it IS easy but the suggested method is to make a directory for every page and have a single index.php or index.html page in the directory.

Using this method is a one-way ticket to sites you'll have to manually manage forever.  If you are a maintenance thinker, this is fine.  If you want to solve the problem correctly, once and for all, you'll want to do a little URL rewriting, instead.

In case you are new to the idea of URL rewriting, here's a quick overview.  When someone arrives at a site using a URL of the following form:

<a href="http://www.chrisstead.net/search/url rewriting" target="_blank">http://www.chrisstead.net/search/url rewriting</a>

The server captures the URL which was used and then works a little magic, making it look more like the following:

<a href="http://www.chrisstead.net/?s=url+rewriting&submit=Search" target="_blank">http://www.chrisstead.net/?s=url+rewriting&submit=Search</a>

Which makes the whole URL much MUCH easier to manage and manipulate by, in this example, a PHP script.  There are a couple of different reasons we would want to do this kind of rewriting.  Let's take a look at them.

Note: Yes, those both work. Give them a try! 

Rewriting hides the underlying technology.  This might sound like a strange thing to want to do, but there is learning in my lunacy.  People interested in compromising your site will use any knowledge they can get to take advantage of common little flaws and loopholes.  By disguising what technology you are using, it sets up a roadblock, making your site less interesting to attack.  This isn't really what I wanted to write about, however.

Rewriting makes gives you the opportunity to make your URLs guessable.  If users start to notice a pattern in the way the URLs are structured, they can take advantage of the common themes.  This means it is easy for the user to guess how to get to something they want directly and just type the URL.  This might seem like kind of an obscure goal, but let's look at something a little more reasonable.

Suppose you are a music retailer.  If you write scripts to handle URLs like the following, your users might not be particularly keen on trying to guess how to rewrite things to find something else:

http://www.mymusicsite.com/query.aspx?s=records&key=LKIH8hi7iKJbkjykjBJ&artist=some%20artist

This looks a little intimidating to me and I know what I was trying to say.  Let's suppose you, then, rewrote URLs instead so what the user sees is this:

http://www.mymusicsite.com/search/some-artist

This looks a lot less intimidating and, better yet, your user knows precisely what happened without even looking at the results you present.  They typed "some artist" in the search box, which took them to a search page.  They then know how to type another artist in and get a result.  It would be even better if you capture the URL and replace the spaces with dashes for them, they can just type the artist name in and get what they want.

When the day is done, the SEO work, usability and findability could and SHOULD work together to create a site that is friendly to search engines as well as your users.  That single little string is the first, last and only direct link your user has with the underlying system that drives your website.

**Disclaimer**

If you are a designer reading my blog, you are welcome to stop here.  If you have concerns about URL rewriting, I encourage you to contact me and I'll address them.  Take what you have read and make the web a better place.  If you are comfortable programming in a web-friendly language, please read on!

**On with the code!**

That's great and all, but this doesn't really get us any closer to how you DO any of this rewriting.  There are, of course, barriers which get in the way of making this all happen.  See, if you are writing in PHP then you are probably serving everything with Apache.  This is great since Apache supports URL rewriting directly.  If you have any skill with regular expressions then you can work a little juju and be rewriting by this afternoon.  Your work will start and stop in the .htaccess file.

Common rules will look like the following:

RewriteRule (.*) /command/directory/index.php?$1 [L]

This was totally made up, so I can't promise it will work, but this is the basic idea.  Apache URL rewriting is a cryptic art that I have yet to master.  Fortunately, there are many people, much smarter than I, who can advise and direct your work.

Apache is the nice situation, however.  When we look at two languages used on the web, things get tricky really quickly.  The tools for rewriting get few and the machinations become more cumbersome.  I've encountered problems with each of the following.

ASP/ASP.Net runs on <acronym title="Internet Information Server">IIS</acronym> which does not natively support URL rewriting.  If you are interested in writing your own module or paying for something someone else has written for you, I give you my blessing.  However, this may not be an option for you.  Fortunately, you can still write URLs of the form:

http://www.mysite.com/Default.aspx?/my/ugly/url

Sadly, this probably cause more pain than anything else.  Java, through JSP, has much the same problem.  Unless you are running a Tomcat instance, hiding behind an Apache instance where you can rewrite your URLs nicely, your URLS at best will look like this:

http://www.mysite.com/index.jsp?/my/ugly/url

Once you have written your URLs like this, you can get slick and tricky with the code by simply doing the following:

<strong>ASP with C# code behind:</strong>

<pre class="brush:c-sharp">
String path = Request.QueryString.toString();
```
<br />

<strong>JSP:</strong>

<pre class="brush:java">
String path = request.getQueryString();
```
<br />

Now that we have gotten that little piece of ugly out of the way, let's look at a solution for that gorilla in the corner.  ASP and Java are typically only used to solve problems in a business environment.  This means your IT department probably has a router and a load balancer sitting between the world and their servers.  Enterprise routers are typically highly configurable, and can do quite a bit of rewriting work for you.

The most difficult part of getting your IT department to rewrite your URLs for you is convincing them it's worth the time and effort.  If you can provide them with precisely what you want the end result to be in your efforts, they can probably create the right rules and get everything situated fairly quickly.  Be ready to buy them beer.

In the end, pretty URLs, under the skin, are pretty ugly.  When it comes to getting your user to the site, moving them through your vast amounts of information and converting the visit into a sale or a return, the pain is worth it.  Just think about how much easier life will be for your users once you have taken the time to craft their journey even outside the carefully designed presentation of your website.  Think about URL rewriting and guide your user gently.  Make the web a better place.
{% endraw %}
    