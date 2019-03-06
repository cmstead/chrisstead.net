---
layout: post
title:  "Predictive User Self-Selection"
date:   2010-02-04 09:00:14 -0800
categories: Coding, PHP, User Experience
---
{% raw %}
Some sites, like this one, have a reasonably focused audience. It can become problematic, however, for corporate sites to sort out their users, and lead them to the path of enlightenment.  In the worst situations, it may be a little like throwing stones into the dark, hoping to hit a matchstick.  In the best, users will wander in and tell you precisely who they are.

Fortunately, users often leave hints as to who they are without knowing it.  They (hopefully) travel through your site, touching certain pages and avoiding others.  They also arrive from somewhere.

When trying to select your user and direct them, your initial response may be to directly ask them who they are and what they want.  This works well if you are an e-tailer like Amazon, but the rest of us don't have quite the same luxury.<!--more-->

If you are planning on selecting the user once they get to your site, you are already too late and they have left.  You should know something about them before they every arrive.  This, surprisingly, is not just about knowing your audience.  It's also what they can tell you.

Yes, your users choose to tell you something before they arrive at your site.

To learn about your users sub rosa, you need look no further than the HTTP referer.  From the HTTP referer, you can find out where your user came from and, hopefully, something about what they want.

If your user accessed your site directly, you know they are either a returning visitor or they were recommended by someone.  If they arrived at a landing page, it is, undoubtedly, due to some marketing effort.  This, however, says the least about the user.

If they came from another website and not a search engine, you'll know they were reading another site related to yours.  Perhaps this is a competitor.  Perhaps this is a colleague.  Either way, you know they have come to your site because they are interested in the link they clicked through to.

The most directly informative method a user can use to access your site is through search engines.  You can gather, immediately, that your user was interested in something directly related to your site.  You also know your user is actively seeking something.  Finally, your user told the search engine what they wanted and, subsequently, they told you.

How?

The HTTP referer.  The referer is passed with every GET request and tells the server about where you have been.  Don't get ahead of yourself.  The referer only informs you of the last place your user was.  In our current case, a search engine.

The big four search engines, AKA Google, Yahoo, AOL and Bing (MSN), all use get arguments to store information about the current search.  This makes it easy to clip the information you want, like a coupon, from the HTTP referer string.

<strong>Note:</strong> The next bit of this discussion involves a little code.  If you're not comfortable with programming in the popular language PHP or this just isn't your job, copy and paste the following into an e-mail and send it to your developer.

In PHP, you can collect user referer information with the following line of code:

<pre class="brush:php">
$referer = $_SERVER["HTTP_REFERER"];
```<br />

Once you have the referer stored, you can test it against the big four.  One way of doing this might be like the following:

<pre class="brush:php">
$refererType = "other";
$searchEngines = array("aol", "bing", "google", "yahoo");
foreach($seachEngine as $value){
     if(preg_match("/$value/i", $referer) !== false){
          $refererType = $value;
          break;
     }
}
```<br />

Now we've got the search engine they used and a referer string.  This is prime time for extracting their search query and figuring out who your user really is.  Hopefully this won't turn into a Scooby Doo episode, where Old Man Withers is haunting your site.  Let's do some data extraction:

<pre class="brush:php">
$queryKey = ($refererType == "yahoo") ? 'p' : 'q';
$pattern = "/(\\?|\\&)$queryKey\\=/";
$argStart = preg_match($pattern, $referer) + 3;
$argLen = preg_match("/(\\&|\\$)/",
     $referer, $argStart) - $argStart;
$arg = urldecode(substr($referer, $argStart, $argLen));
$argArray = explode('+', $arg);
```<br />

Still with me?  The code part is over.

Now that you have the search information and it's been broken into happy, bite-sized chunks, you can use it to do all kinds of fun things with your user.  You can check their spelling, to ensure they are in the right place.  You can offer special links that relate to what they searched for.  You can even adjust the page to better suit the user's needs.

The possibilities are limitless.  By knowing a little about what the user did before they arrived at your site, you can direct their journey through your site.  It is in your hands to find interesting and creative uses for this information.  Go and make the web a better place.
{% endraw %}
    