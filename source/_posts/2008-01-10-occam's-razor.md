---
layout: post
title:  "Occam's Razor"
date:   2008-01-10 15:55:33 -0800
categories:
    - Coding
    - Site Architecture
    - User Experience
---
{% raw %}
I have a particular project that I work on every so often. It's actually kind of a meta-project as I have to maintain a web-based project queue and management system, so it is a project for the sake of projects. Spiffy eh? Anyway, I haven't had this thing break in a while which either means that I did such a nice, robust job of coding the darn thing that it is unbreakable (sure it is) or more likely, nobody has pushed this thing to the breaking point. Given enough time and enough monkeys. All of that aside, every so often, my boss comes up with new things that she would like the system to do, and I have to build them in. Fortunately, I built it in such a way that most everything just kind of "plugs in" not so much that I have an API and whatnot, but rather, I can simply build out a module and then just run an include and use it. Neat, isn't it?

So, today I was told that she really wanted to be able to update team members on a project and then update the status of said users. Now, the way the thing works is you update the list of team members on a project and then edit the project again to set the status. This is a little cumbersome, we've discovered, simply because we don't use the system the way we thought we would. Isn't this always the case? So, my boss specifically, goes and toys with the team members as she is working on a project. This is dandy, except that she has to update the team and then go find the project again, right away. Not so good. What she asked for is a way to update the team and then immediately update the status of any given member of the new team list.<!--more-->

My first reaction, mentally, was 'great, now I have to build out some crazy AJAX to go behind the scene, update the team list and then cobble together the list of the current team, push out some dynamic content to the page and then update things on the fly.' This is not my idea of a good day. I could have spent all afternoon working on this. Now being the planner that I am, I sat back and thought about this. This promptly put me into a slight daze and I took about a 5-minute nap. When I woke up it dawned on me: the requirements I put together in my head were not what my boss asked for, they were what I interpreted. My solution still uses a little javascript, but now there are just 2 buttons. 1 says 'save,' the other says 'save and exit.' When you click save, everything you did gets saved and you are returned to the page. From there, the page automagically builds and includes all necessary pieces. If you click save and exit, everything you did will be saved and you will be pushed back to the main screen.

So, the takeaway from all of this is Occam's razor applies very neatly to web projects. I love neat stuff that flies all over the screen and interacts with the server by making dynamic XHTML calls through activeX, but assuming all things are equal, the simplest answer is best. Why kill yourself and stress your server when you don't need to?
{% endraw %}
    