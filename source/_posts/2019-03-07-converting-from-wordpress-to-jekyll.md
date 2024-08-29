---
layout: post
title:  "Converting from WordPress To Jekyll"
date:   2019-03-07 00:00:00 -0800
categories:
    - Blog-Conversion
---

I remember a time, long ago, when WordPress was a small, scrappy piece of software which was dedicated primarily to the publishing of blogs and basic site content.  It wasn't the most fully-featured CMS on the planet, but it worked well enough. It was fast enough and flexible enough, so people, including me, used it.

Over time I have noticed my site getting slower and slower.  I looked at the database and there was nothing strange happening there. I checked the installation and ensured something hadn't broken. Ultimately, WordPress is just kind of slow anymore. It's fine for people who are not comfortable with writing their own HTML and/or using the command line, but I just couldn't deal anymore.

The most important realization I had was: my blog, like most blogs, is effectively static content.  Nothing on the web loads faster than a single HTML file loaded from the filesystem. This means, my site is likely to see the greatest performance improvement from converting to an entirely static content system.

I knew about Jekyll and I had used it before, but I looked around before diving in.  There are several different packages including Jekyll, Hugo, and Gatsby which were my final three.

## The narrowing ##

Ultimately, I was concerned about Gatsby because it is all tied together with React so I rejected it because: 1. I detest Facebook and don't want to even be peripherally associated with any technology they control; 2. I looked at examples and it looked like people were actually using single page applications to serve their blogs.  I'm sure that not every site is served as a React app since there is a server-side rendering system for React, but the choice just didn't instill a sense of confidence.

This left Hugo and Jekyll.  Both are static site generators which use template engines.  Both have a fairly strong following. Both seemed to be completely acceptable options.  The one and only thing that I felt uncomfortable with regarding Hugo was their template system actually felt MASSIVE and kind of confusing.  I don't want the infrastructure of my blog to become a separate hobby.

Ultimately, I leaned into what I knew and stuck with Jekyll.  So far I have had no regrets.

## The Mechanics of Conversion ##

I'll be totally honest here, I only had a couple of pages so I simply copy/pasted the page content, made small edits, and moved on with my day.  If you have a lot of pages, this will not be a good solution since you could end up copying and pasting for days, or weeks.

The really interesting part was converting my blog posts, which numbered over 100 in total.  As I started to review the posts and what needed to be done to convert them, I knew I needed a script of some sort. What I ended up creating was a ~100 line conversion script with a little external configuration JSON file:

<script src="https://gist.github.com/cmstead/a79346b403a3a4a05fe7dabfb25347a9.js"></script>

Using this script is as simple as editing your configuration file and then running the script.  By default, the conversion script will write blog posts to the _posts directory. This means you should be able to run the script, rebuild your site and everything should be set to go.

## Critical Steps ##

### Step 1: Export your WordPress blog posts ###

In your WordPress site, go to settings and choose the export option.  WordPress has an export behavior which builds an RSS feed document by default.  This is what we want.

Don't try to be tricky with this or things could be harder later.

### Step 2: Save the RSS XML export to your Jekyll project root ###

Just like the title says.  Move the RSS XML document to your Jekyll project root. That's all.

### Step 3: Copy the script and configuration from the gist to your local Jekyll root ###

Copy the script into a file called `post-importer.js`