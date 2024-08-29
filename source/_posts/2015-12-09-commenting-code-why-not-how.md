---
layout: post
title:  "Commenting Code: Why, Not How"
date:   2015-12-09 08:00:36 -0800
categories:
    - Code Smells
    - Coding
    - Foundation
    - General Blogging
    - Javascript
---
{% raw %}
If you have written any amount of code in any language you are likely aware of code comments or remarks and how they work. This isn't really what I'm interested in. I came across a discussion about an open source project which had a requirement that all code must be left completely uncommented. People were surprised and alarmed as to why this project would require all code to be uncommented, and I tend to agree. This post is to address comment content.  Hopefully, you will share my opinion that comments are important by the end of this.

New programmers are often told to comment their code by instructors, but they aren't told what the comments should contain.  I remember my C language instructor chastised me for commented all of my functions without regard to the importance of the function or value of the comment.  He said "there are too many comments, are you trying to make your code unreadable?" Others received feedback that they didn't comment enough.

While we are on the topic of novice programmers, let's take a look at a comment style I have seen in code written by inexperienced developers.  It usually contains information about what the function does and how it does it.  Although it is lovely to see the program explained in clear English, it is not particularly helpful since good code should be not only functional but illuminating.

```javascript
// Pulls accounts from type object, flattens accounts arrays then picks accountId from objects 
function getAccountIds (accountsByType) { /* function logic */ }
```

From this description anyone with experience in the language could probably devise a body of code which would perform the actions listed in the comment.  The problem is, I have no idea why this code exists.  Code which exists for no other purpose than just to be written is not useful code.  This could be dead code, or it could be a problem which could be solved another way.  If this code does something which the surrounding context gives us no clue to, we would never understand the value, just the means.

Instead I would write a comment like the following:

```javascript
// Constructs array of accountIds to send to the service layer which returns updated account information
function getAccountIds (accountsByType) { /* function logic */ }
```

Now we understand the context for the function.  We can not only see what the function does by the name alone, but the comment provides immediate context for the use. Even more than that, this comment is far less likely to be out of date by the next time someone looks at this bit of the code.  Comments which detail the inner workings of a function are more likely to fall out of date as the life of the code gets longer.  People may modify our function to behave differently, however the context of the creation of the function is unlikely to become obsolete even with (<a href="http://www.chrisstead.net/archives/813/mainstay-monday-solid-openclosed-principle/" target="_blank">anti-SOLID</a>) modifications.

This brief discussion can be summed up by the phrase "comments should tell the programmer why something was done, not how."  I like to call this my "why, not how" principle. This helps to guide the comment writer's hand when they feel the need to add a comment to the code.  If your code needs explanation as to how something was accomplished, the code is likely too clever. On the other hand, sometimes obscure solutions are unavoidable, which means the function context may not exist within the codebase. This is precisely the why that should be added as a comment. For example, this:

```javascript
// This code is a generic base for a variety of abstracted functions and is not intended for use alone
function complexGenericBehavior (fn, value) { /* Do complicated stuff here */ }
```

In Javascript there is another situation where comments are desirable. Although I believe JSDoc is a tool which was ported almost blindly from its source (<a href="http://www.oracle.com/technetwork/articles/java/index-jsp-135444.html" target="_blank">JavaDoc</a>) it is, hands down, the best tool for the job available in Javascript. I don't believe that every function, method, class and module in your code should contain JSDoc comments, it is useful to annotate functions which might be used in a variety of situations.  Essentially, JSDoc is a good initial way to document slow-changing program APIs which others might want to use.  Following is an example of JSDoc use for the same function.

```javascript
/**
 * @func getAccountIds
 * @desc Constructs array of accountIds to send to the service layer to capture updated account information
 * @arg {array} accountsByType - List of account type objects
 * @returns {array} - List of {int} accountId
 */
function getAccountIds (accountsByType) { /* function logic */ }
```

As you can see, the context comment is still part of the description associated with our function.  This contextual clue is still the best part of our comment.  Hopefully this function will be slow to change, so the arguments and return values will remain consistent.  Even if they don't howeever, our context clue will still provide important insight into why this function was created and what purpose it serves.

In the end, comments are not always necessary.  They can be extra noise, or they can be misleading. As programs grow large and the context becomes unclear, comments become a life raft for programmers who are digging deep into old code to identify functionality which is important or no longer in use.  If you choose to write comments, and I hope you do, think about WHY you wrote your code and let the code tell the next programmer HOW.
{% endraw %}
    