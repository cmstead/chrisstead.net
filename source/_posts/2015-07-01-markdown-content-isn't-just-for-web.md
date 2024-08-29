---
layout: post
title:  "Markdown: Content Isn't Just For Web"
date:   2015-07-01 10:00:42 -0700
categories:
    - Coding
    - Design Patterns
    - HTML
    - Javascript
    - World Wide Weird
---
{% raw %}
A couple of my friends and I have the same conversation once or twice a month: How do you deal with content that could be displayed in any number of different devices?

I know, this sounds like chilling lunchtime conversation, but this is what happens when you get a group of programmers together over lunch on the regular. Nonetheless, there is value in this discussion. We don't all work on the web and we all have to deal with content from the same source.

<strong>But, HTML is a known spec.</strong>

True, however, the next time you talk to a mobile developer, suggest to them that they process your HTML (and CSS and Javascript and other garbage text) and display it as a part of their native environment. After they laugh long and hearty at you, they are likely to tell you it will never happen.

A friend of mine wrote <a href="http://eoghain.github.io/display-agnostic-content/" target="_blank">about the general nature of display agnostic content</a>, and concludes that with the current state of technologies, Markdown is likely the best option for safe cross-platform content.  I agree that this is likely true.

First, Markdown is easy to produce. No special editor is even necessary to create a Markdown document since the average person could learn all of the key features in a few minutes. Moreover, for technical users, some key players have adopted a specific dialect known as Github Flavored Markdown (GFM) and there is wide support for it, so converting to and from GFM has become a rather trivial task.

Second, Markdown does not allow for external documents to declare display properties. This means that the display management is left entirely up to the application that is rendering it. Since the user can't do things like create CSS to make all of the text green and rendered with Comic Sans, the application level control is more sane and normalized. Normalization is a good thing.

Third, Markdown is, at its core, just plain text. Plain text follows rules and standards that can be set outside the scope of your application or organization. If you store the text document in UTF-8 or UTF-16 format, it will always be the same. Everywhere. All of a sudden, you can reason about your document in all kinds of useful ways. You know precisely how big it is. You know exactly how fast it will render. You know, without question, what the format and markers will be.

<strong>That's a really, REALLY big win.</strong>

I'm going to sneak a fourth point into my three-point list: Markdown is safe for just about any text format or serialization strategy you can throw at it, because it's just text.

Markdown in JSON? It's a string
Markdown in SOAP? It's a string
Markdown in XML? IT'S A STRING

There are plenty of people out there still using XML. (Don't laugh, they are out there.) Imagine a world where CDATA just goes away. I mean, capturing XML, parsing it, dealing with CDATA protected strings, making sure everything didn't get completely borked in the process is a pain in the tuchus. I've been there and trust me, it stinks.

Of course this leads us to the inevitable discussion of how we process Markdown. If you are not on the web and you're relying on any number of different languages to parse and manage Markdown, use <a href="https://github.com/hoedown/hoedown" target="_blank">Hoedown</a>. Yes, it's called Hoedown, <em>seriously</em>. Hoedown is a standalone, no libraries needed markdown parser built in C.

It is likely, though, that you are using web technologies to process your Markdown (or you wouldn't be reading a blog by a JS developer), so I have a special gift for you too: <a href="https://github.com/chjj/marked" target="_blank">Marked</a>. Marked takes Markdown strings and turns them into standard HTML and it's easy. Here's what it looks like when you used marked:

```javascript
let myMarkdown = '**This** is some __markdown__.',
    output = marked(myMarkdown);

console.log(output); // <p><em>This</em> is some <strong>markdown</strong>.</p>
```

This is great if you already have Markdown and you just need to display it on the web, but what about the output from your favorite WYSIWYG editor? As it turns out, there is a library for that too. <a href="https://github.com/domchristie/to-markdown" target="_blank">To-markdown</a> is a script that will take whatever garbage-formatted HTML comes out of the back end of your HTML editor and turn it into crystal clear Markdown.  Here's what it looks like:

```javsacript
let myHTML = "<p><em>This</em> is some <strong>markdown</strong>.</p>",
    output = toMarkdown(myHTML); //It's so much like Marked it hurts

console.log(output); // **This** is some __markdown__.
```

To sum up, if you are working in a multi-platform environment, which is really REALLY common, make friends with your mobile and desktop developers and provide them platform-agnostic content in the form of Markdown. It's easy to work with, it's popular, it's plain text and it's easy to serialize.

With the solid support of two well-vetted libraries like Marked and To-markdown, there is practically no barrier to entry, so stop saving HTML to the database, and make your content easy to work with. If you drop in the conversion method into the standard content flow in your app, management will just look around one day and notice that everything is a little better and they won't know why. Who can argue with 'better,' really?

<h3>Blog Post Notes</h3>

<ul>
<li><a href="http://eoghain.github.io/display-agnostic-content/" target="_blank">Display Agnostic Content by Rob Booth</a></li>
<li><a href="https://github.com/hoedown/hoedown" target="_blank">Hoedown -- A C-Based Markdown Parser</a></li>
<li><a href="https://github.com/chjj/marked" target="_blank">Marked -- A Javascript Markdown parser</a></li>
<li><a href="https://github.com/domchristie/to-markdown" target="_blank">To-markdown -- A Javascript HTML to Markdown conversion library</a></li>
</ul>


{% endraw %}
    