---
layout: post
title:  "Inflexible XML data structures"
date:   2008-01-04 15:53:41 -0800
categories:
    - Coding
    - Site Architecture
---
{% raw %}
Happy new year! Going into the start of the new year, I have a project that has carried over from the moment I started my current job. I am working on the information architecture and interaction design of a web-based insurance tool. Something that I have run into recently is a document structure that was developed using XML containers. This, in and of itself, is not an issue. XML is a wonderful tool for dividing information up in a useful way. The problem lies in how the system is implemented. This, my friends, is where I ran into trouble with a particular detail in this project. Call it the proverbial bump in the road.

Generally speaking, when dealing with a database like one I use a lot, MySQL, you can run queries to retrieve data in any way you like. So long as the basic design is reasonably flexible, you can return anything you want. Apparently this isn't so with the XML structure that was used on my current project. People would ask, 'why is this a problem?' On the outset it doesn't seem like it would be. You figure out how you want to return the data and then you simply structure the XML containers appropriately. Great! Now along I come and I say, 'this model stinks. The usability is nonexistent and we want to change the structure.' Now what?<!--more-->

If the design were made to be flexible then it wouldn't be a problem. The query would be changed and the structure would be re-vamped. On the fly no less. Nothing like some good-old on-demand technology. I am all about on-demand flexibility. Obviously if you are talking about running a report for some exceptionally large amount of data then flexibility will have to be considered along with efficiency, but hey! We're talking about web experience here. People view things 10 at a time. We're not talking about 300,000,000 documents. Closer to 300. With current server tech as it is, 300 documents, even with an extremely inefficient algorithm, would take almost no time to sort at all, then you produce the correct XML and ship everything off to the client. Done! Zip-bang!

Now, if you have an inflexible data structure going into the whole system, you can end up with some major issues if someone, like myself, comes along and says 'this sucks. Fix it.' Now what? You start over. That's what. I made the mistake of coding a solution in a somewhat inflexible way and guess what? I had to re-work it. Some of the code was usable, but a lot of is was just lost time and lessons learned. Now the whole system is designed to be reasonably plug-able, though it's still not a spiffy API, and as people request things, I write them, plug in the necessary code and roll on like the champion I feel like!

So, the take away from all of this, if you are looking at things from a front-end, client-side perspective, expect to run into this kind of thing. Programmers like to write code that does <strong>precisely</strong> what it is supposed to. Nothing more. So if you are going to suggest major overhaul kind of ideas, prepare yourself. You will meet some friction. If you are a coder and would like to avoid the nastiness associated with people asking you to start over, think about how you can make your life easier at the front end. Since I finished the plug-in system, my life has been much happier and the final timeline has been much shorter on all associated projects. Do your self a favor. Be flexible. Think flexible. Things change. Will you be ready?
{% endraw %}
    