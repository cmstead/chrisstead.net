---
layout: post
title:  "Refactoring: The Last Human Coding Skill"
date:   2026-09-06
categories: 
    - Coding
    - Software Quality
    - Refactoring
    - AI
    - LLMs
---
We've heard the word "refactor" across a variety of scenarios: Red-green-refactor, read by refactoring, I'll just refactor that really quickly. At this point, refactoring is a concept that exists in the shared software development psyche. We talk about it and do it as if it was something that has been known from time immemorial. In fact there was a time when the book Refactoring by Martin Fowler didn't exist. And it wasn't that long ago - 1999. Much like design patterns, the concept of refactoring must, assuredly, have existed prior to the writing of the book, but the book gave it substance.

So what, exactly, is refactoring?

Martin Fowler defines refactoring as "a change made to the internal structure of software to make it easier to understand and cheaper to modify, without changing its observable behavior". A key concept here is that refactoring does not change observable behavior. The takeaway is that refactoring is a human effort to somehow enhance software in such a way that it is easier for humans to reason about, maintain, modify, or otherwise work with. Refactoring is, by definition, a human activity.

# Why is it so important?

It turns out that a lot of code can be made easier to work with simply by applying changes that are code-layer only. Humans thrive in environments where understanding is attainable. From what I'll refer to as "well factored code" it is possible to reason about and make large, important changes in the source code. Just by refactoring code, seemingly impossible code becomes manageable and understandable. Some might say that well factored code tends to lean toward what we could consider "good code" or "high quality code".

Of course, simply refactoring for the sake of making hand crafted artisanal code with hints of chocolate and gooseberry would be considered gold plating in many circumstances. It turns out, though, that code with high internal quality is also easier to update and change. Martin Fowler addressed this as well in his post about whether [high quality software is worth the cost](https://martinfowler.com/articles/is-quality-worth-cost.html). As it turns out, it's not gold plating at all. It's adding business value.

Setting aside quality arguments, there is something else that has emerged because of refactoring and that's understanding through the act of refactoring. In other words, refactoring no longer just adds understandability, but it can be used as a tool for better understanding the code as you work. Extracting a method can clarify the surrounding logic. Renaming a variable may enhance the meaning of the source document. In fact, even if you throw away a refactoring because it didn't go where you thought it would, you learned something. Refactoring has become a learning tool.

# Because of AI... So What?

With AI-assisted development becoming commonplace, it is easy to ask why something so specifically human would be interesting at all. After all, AI will just read the source code in place and interpret it, right? So what's the big deal? Beyond that, if you are using a coding agent, you're probably not writing the code anyway, so let the chips fall where they may.

I would argue this is fundamentally wrong-headed. AI coding assistants are all, at their core, large language models (LLMs) which are basically big neural networks trained on lots of human text. Some frontier models have even been trained on trillions of language tokens. After the initial training, LLMs go through additional training to communicate with people, and even tell the truth.

Interestingly, because of the training, and the makeup of the model, LLMs tend to "think" similarly to the way humans do. They respond well to clear communication, and struggle with muddy context. A document that is well structured can be priceless when you are interacting with an LLM. In much the same way, a well factored source document will provide more usable context to the LLM that is trying to interpret and edit it.

Refactoring can lead to well factored documents. Well factored documents are easier to interpret, which means we will get better results from people and LLMs alike. This means is that refactoring isn't only good for people, it's good for machines!

# ...And So Refactoring Will Endure

Many skills will become less important as AI becomes a larger part of the software development lifecycle. Many seasoned developers are already sharing their experiences moving away from writing code on places like Reddit. Over time, we are likely to see software skills atrophy as LLMs do the coding for us, but one thing will persist: source code must be read.

People read source code now, even with coding agents writing the source. LLMs read the source as well. Essentially anyone involved in the coding process must read and interpret source code effectively in order to produce high-quality software. This requirement means that well factored documents will need to exist long after any of us have written our last line of code.

As it stands now, source code may be generated by AI, but our name is on the commit. That means we are, ultimately, responsible for the quality and maintainability of the code that is committed. As we briefly explored, we can use refactoring not only to make a document more maintainable, but we can use it to better understand the code we are looking at. In order to deeply understand the code we are ultimately responsible for, we must engage with it, deeply. Refactoring offers that exact opportunity.

In the end, when all other skills have faded and we are left simply verifying the code that is generated for us by agents and AI systems, the one thing which will endure is refactoring. The most human of practices, responsible for maintainability, extensibility, readability, and understanding, is good not only for us, but also for the AI that does the generative work we rely on.
