---
layout: post
title:  "On Agentic Code and Legibility"
date:   2026-11-01
categories: 
    - Coding
    - Focus
    - AI
    - Code Readability
---
When considering the current state of affairs with software development and coding agents, it has occurred to me that I am not clear on where things stand with regard to human code legibility. For the sake of understanding, the word legibility is used here because any source code can, in theory, be read, though it may take a Herculean effort to do so. Legible code is code that can not just be read, but can be read fluently by a seasoned practitioner. Legible code is code designed to be read as a logical document conveying information to the reader.

It has been said by more than one person I have encountered that refactoring is now a job of the coding agent. It has also been said that code is cheap enough now that throwing away code is just as economical as reading and understanding it. Being a long-time practitioner of software authoring, I can say that these statements feel foreign to me. It is alien thinking that leads to this sort of conclusion, but I am not ready to toss the sentiment aside simply because it doesn't align with my own understanding of the world. Instead I set out to investigate these claims and see whether my perspective was poorly aligned or if there is some core concept that is eluding people who might feel this way.

As it turns out, my perspective has changed, and I still disagree with those who would rather throw code away than read it. I have not settled on whether refactoring is wholly a human effort or only in part, but I have come to believe that code legibility is important, although not for the sake of legibility itself.

Let's explore.

Suppose there is a world where there exists a coding agent so well developed, so perfect, that it follows instructions perfectly and without mistake. It is capable of producing working software on a single pass that satisfies the specification it is provided. Functional tests of the software system only reveal missed opportunities in the specification, but all originally specified behaviors are in place and operate as expected. When debugging, the agent is capable of identifying the offending code and repairing it without further input from the operator than an explanation of the current behavior and the expected behavior.

A world like this would lend itself to black box software. It would seem that source code would not require review as the agent would be capable of working, unaided, even in a surgical fashion within the code. Humans would be spending their time drawing up specifications, reviewing functional behaviors, and testing results.

Even in a world like this with a perfect agent, we can conceive of a system that has taken months or even years to build over time, with our perfect agent. Let's assume that this system was built entirely without the aid of human eyes on the code, and only using our perfect agent. In this case, the software would be in a state that is, perhaps, workable for the agent. It is unclear whether there is any particular design or architectural intent built into the system. Let us also assume that there is telemetry of some sort built in, and error reporting such that errors can be identified and acted upon, so we are not flying blind, so to speak.

Now, let us assume that one day an error occurred. Perhaps it is a memory leak, or a race condition. Either way it is not something that is replicable within the span of a typical agent session. This error would, then, be undiagnosable by the agent and would require human intervention. Since the system has not been reviewed or designed by a human, then the task of tracking down the offending code is onerous.

If we assume the code has been organized by feature, or by function, it is likely the code is not organized in a way that is legible by humans. We are left here with a particularly challenging trap. Even if the code had been organized by way of architectural features, or more preferably by domain concept, the task would likely have not been so daunting.

So, to this end, let us assume, then, that architecture is an important concern and something that engineers are interested in maintaining. If we assume that humans do not need to engage with the code, then how are things like architecture, domain driven design, or design at all managed?

Arguably, even with just concerns at a high level of abstraction, domain division, design, and architecture are of interest in the ideally rare case that a surgical change were necessary at the least. However, in order to account for domain division, design, and architecture, it is necessary for a human to intervene in the process of generating software. This intervention is going to require that a human perform some review of the code.

Of course, if human engineers must interface with the generated code, even for architectural or other high-level concerns, then the code must be legible. If the code is illegible then the engineer in charge of adjusting the architecture is going to necessarily make the code legible. This means that, because of architectural, design, and domain concerns, the code must be human legible. Beyond that, the very act of intervening and steering the code in the right direction will introduce legibility into the source code. So, although the legibility may not be uniform across the codebase, it will be a consideration even in the case of a perfect agent.

With that in mind, we do not currently work with perfect agents, which means we are necessarily going to need to intervene in the code generation process and introduce architectural steering which must generate more legible code as a by-product. It is not sufficient to simply set an agent to task and accept the output. This is true even with the best of adversarial agents reviewing the code.

In fact, it has been shown that when agents are left to their own devices, they can and will develop a language of their own to communicate. This was found by Facebook/Meta in an investigation they undertook several years ago. With this in mind, putting an adversarial agent on the task of code review is likely to generate code that is less human legible in the long term.

In the end it is reasonable to conclude that human legibility of code is necessary and, even in the best of cases, a by-product of good software engineering even when using coding agents to generate source. Given the state of affairs even with the perfect coding agent, architecture and design are critical to successful software development in the coming years as agents continue to improve.
