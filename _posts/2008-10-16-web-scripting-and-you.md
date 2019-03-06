---
layout: post
title:  "Web Scripting and you"
date:   2008-10-16 16:56:56 -0700
categories: Coding, Site Architecture
---
{% raw %}
If there is one thing that I feel can be best learned from programming for the internet it's modularity.  Programmers preach modularity through encapsulation and design models but ultimately sometimes it's really easy to just throw in a hacky fix and be done with the whole mess.  Welcome to the "I need this fix last week" school of code updating.  Honestly, that kind of thing happens to the best of us.

Being that I am a web developer, specifically working in an interpreted language, there are two ways that things can go, clean, neat and easy to manage or a horribly mangled mess.  My first couple of full-scale projects on the web were more of the latter and less of the former.  I cobbled things together any way that worked within the time frame that I was given.  Ultimately this meant little to me at the time, but for the people that are maintaining the code now...  I am terribly sorry.  Fortunately, I know the poor sap that is currently updating the code so he has a resource to cut through the thick undergrowth of spaghetti.<!--more-->

Now fast forward a few projects and one ridiculously large CMS later and I have learned a few things about what not to do.  Lesson 1: don't make a script that does everything.  Lesson 2: you are eventually going to have to look at that code again.  Lesson 3: When the code is not completely obvious (read this as print statements and built in functions being used in the simplest possible way) comments are always helpful. Lesson 4: even interpreted languages have debuggers, so use one. Lesson 5: make it modular.

Lessons 1-4 are things that everyone hears, ignores and then ultimately pays the price for.  Lesson 5 is something that is preached and never reached...  dig the rhyming scheme.  On the web, if you build something in a nice, chunked out way to begin with, your code will look like that forever more.  I promise.  Once you have built a handy little chunk like an order-processing script that just hums along and processes whatever you send it, you'll never write a hack for this order or that one again.  I promise.  It won't happen because you won't need to.  You have a handy little piece of code that works like... say... an object!  WOW!  Who would have thunk it?

Now I write this not for the programmers that are in engineering teams out there working with a bunch of people that all have a standard that they follow and ultimately know all of this already.  I am writing this for the rogue programmer that has decided they are going to go it alone and do something stupid like write a custom CMS/Project Management System/Time tracker integrated tool... Man, that sounds really familiar.  Anyway, if you are going to tackle a large project all by your lonesome it is of the utmost importance that you make it as easy for yourself as possible.  I really like that I have built an ordering system where all I have to do is insert a new item and it is automagically updated and handled all over the place without any extra coding ever.  I don't even have to do a database insert.  It's all just done for me.  It's really nice.

So some of the basic rules that I follow for no other reason than I have found them to work:

1) A script in a file does one thing.  Even if you think it should do x, y and z, it doesn't.  If you coded it to do x, y and z all at the same time, one of those functions breaks on you, I have seen your code and your future, I know.  Trust me, one script, one purpose.

2) Create your directory structure BEFORE you write ANY code.  I generally include the following directories: page_elements, process, includes and templates.  This does not mean that you can't expand, but generally 4 directories and root is the barest minimum.

3) If you think something should be an object, it probably should be.  Gee, I find myself pulling info from the database a row at a time an awful lot.  Should I make a row object?  Yes. You should.

4) One object, one file.  Don't test me boy, see rule 1.

5) Break the system up into small, bite-sized pieces and create an API for plugins.  It can be rudimentary and even require a little code to plug the piece in, but you will save yourself a ton of work if you can just write the added feature without having to dig into anything else.

6) Figure out a layer structure and live by it.  I don't care the model, just use it and make it work for you.  It doesn't even have to be one of the widely recognized design patterns.  I use a home-grown MVC pattern myself and it works like a champ.

7) NO INLINE CSS! Yes, I have broken this rule from time to time, but eventually I go back and pull it out into a file

8) NO INLINE JAVSCRIPT! No, I haven't broken this rule.  I understand that you have to put in even handlers where you want the script to fire, but your script should not live in the document.  Plus, who knows, you might want that toggle element display script somewhere other than in the single place you built it originally.

9) Break up your scripts and include them as needed.  Both CSS and Javascript should function properly where it is needed, but it should be excluded when not needed.  I know that some people write these monstrous CSS files with inline server-side scripts to add in the extra pieces when they are needed, but honestly, isn't it easier on you and the server to just include files when they are needed and not load them at all when they are not?

10) Commenting!  You know that crazy function that you wrote which required bit-shifting to make it happen?  Remember how it took you three days to figure out how to do it?  It will take you 6 days to untangle what you did when you look at it again.  If you had to think about something before you wrote it, put in comments.  The person that ultimately follows after you will thank you, and that might just be YOU.

Very well, that is all.  Off with you.  Go about your programming and make the web a little better place.
{% endraw %}
    