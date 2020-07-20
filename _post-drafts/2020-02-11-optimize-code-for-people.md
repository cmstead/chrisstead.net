---
layout: post
title:  "Optimize Code for People"
date:   2020-02-11 00:00:00 -8:00
categories: tdd agile software-development communication
---
In the time that I've been a software developer, I have seen and written a lot of code. At this point, it's entirely likely I have been a part of creating, maintaining and updating several millions of lines of code. It is worth noting that no matter how much, or little, code you write, you are bound to write some bad code.

I have.

I've written some really awful, terrible, regrettable code. Given the length of time I've worked and amount of code I've written, I believe I have become something of an expert on writing horrible code.

At one point I would have told you that the code which runs the fastest is the best code.  At another point I would have said that code which runs at all is the best.  There are even times I have argued that obscure code is the best because nobody needs to know those intermediate steps anyway.

Each of the ways I have looked at code specifically optimized for something. Some of my code was optimized for speed, some for raw execution, and some of it for abstraction opaqueness. None of these are intrinsically bad, but they all miss one of the most important facts about source code:

it's a specification, not the actual running software.

In other words, if you are not writing binary straight to disk, you are not writing the executable software.

## Source Code is for Humans ##

Since all source code is a specification, we should consider who the audience is -- people. I've heard many programmers argue that source code is a means for capturing instructions which can be compiled to a target. I don't believe that's true, and we can look to [Grace Hopper](https://en.wikipedia.org/wiki/Grace_Hopper) for the answer:

"She believed that a programming language based on English was possible. Her compiler converted English terms into machine code understood by computers."

Her goal in creating a compiler was, specifically, to create a human-readable, human editable document, IN ENGLISH, her native language.

This work was done in 1949, just a year or two after my parents were born. This means that someone has been trying to make programming more human almost as long as my parents were alive.

We can look elsewhere to get more perspective on this as well. Regardless of what your position is on Bob Martin, he presented a pretty interesting idea in [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=redir_mobile_desktop?_encoding=UTF8&aaxitk=mpz1qxMGQ8X16bqAzSf5zQ&hsa_cr_id=8875635360201&ref_=sb_s_sparkle):

"Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...[Therefore,] making it easy to read makes it easier to write."

Considering RDML Hopper's aims in creating a compiler, and Bob Martin's claims about reading versus writing code, it seems reasonable to claim that source code is purpose-built to be read, edited and understood by people.

## Optimizing Development For People ##

Since code is for people, and the problems being solved are, likewise, for people, the development process should also reflect the human aspect of the job, over any machine involved in the process. Computers are, necessarily, created and devised to execute computations for people. We spend an awful lot of time worrying about whether something can be done by a computer when the question would probably be better posed as "does anyone want or need this?"

If we think about performance characteristics of a piece of code, it is easy to fall down a hole and talk about shaving microseconds from execution time. This kind of thinking is particularly useful if the same piece of code is going to be run tens of thousands of times. What if the code is designed to be run only once? Are we getting value from optimizing a few microseconds, or milliseconds from the run time?

Probably not.

Execution optimization is for people. The length of time it takes for something to happen is only interesting when it matters to people. This means we, as developers, can focus more of our time asking whether the work we are doing matters to the people who will be using the software we are creating. By focusing on the value to people, we can actually reframe our entire development process to center on people.

So, what does people-optimized work look like?

The very first thing we need to focus on during the process of software development is the people who are interested in the creation of the software, and the people who are actively involved in the process of creating that software. By re-centering on people we need to ask what is most important to people day to day.

People are social creatures, who are emotionally motivated, and have high-powered brains which allow us to engage in active problem solving and pattern recognition. Of the three things I listed, two are based on feeling. Moreover people are more inclined to react emotionally first rather than rationally.