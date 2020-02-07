---
layout: post
title:  "Reflective Software Domain Discovery"
date:   2020-02-07 00:00:00 -8:00
categories: domain-driven-design software-development agile tdd refactoring
---

I originally set out to write a blog post about Domain-Driven Design (DDD) which could give people a clear path to go from no understanding to, well... some understanding. I'm not an expert, but I feel I have started to come to grips with what DDD is, and how to make the ideas which underpin it to work for me and my team.

Nevertheless, that topic, even simplified, is a lot to try to fit into a single blog post.  DDD can be highly technical, take the "Blue Book" ("Domain-Driven Design: Tackling Complexity...", Evans) as an example. Many people struggle to finish Eric's book simply because it is dense and highly technical. All the same, there is a tremendous amount of value packed into the volume.

Instead, I'd like to try and back into the idea of designing software around a problem domain by assuming you already have software which solves a problem, but isn't centered around the domain, within the source code itself.

Before we even explore what a domain might even be, I'd like to touch on some approaches for simply making your source code and, ultimately, your software better. These approaches will draw you closer to domain-driving your code as a by-product.

## Making Source Code Better ##

As we dive into this section, I want to point out, source code is not the same as software. Even if you ship software built in an interpreted language, the code you write must be converted into a form that the computer can consume and use as instructions.

Since source code is not a program, and not executable, it must be for people. High-level languages like Java, C#, Javascript, Python, Lisp, etc. are all written with the express purpose of being English-like. This choice was made to meet the needs of people. So...

**Source code is documentation for people.**

### Editing Source Documents ###

Source documents are designed to be read. If they can be written and read, they can be edited, like a book or article.
