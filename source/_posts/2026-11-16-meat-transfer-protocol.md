---
layout: post
title:  "The Meat Transfer Protocol"
date:   2026-11-16
categories: 
    - Coding
    - Teamwork
    - AI
---
The notion of a meat proxy has been around for some time now. You know the way it goes: a person brings a requirement to the developer who turns around and feeds it to AI without reading or modifying the document or specification. It occurred to me, though, that any good proxy _must_ run on top of a protocol layer of some sort. I have decided that a meat proxy can only run on the Meat Transfer Protocol, or MTP.

The MTP specification is simple:

1. Receive software specification
2. Skim software specification
2a. Reject software specification if it doesn't have the look and feel of thoroughness
3. Feed software specification to AI
4. Receive source code of questionable quality
5. Show off potentially working software

- In the case that the software fails to run, return the specification as defined in 2a.
- In the case that the software has bugs, request a new specification

This is, of course, an anti-pattern, but it is becoming common in the industry. The question, though, is why? Why is it an anti-pattern and if it _is_ an anti-pattern then why is it becoming common in the industry?

In order to understand why this is an anti-pattern it is essential we understand what happens when we follow the MTP specified steps:

- It disempowers developers, taking much of the agency they have away
- It puts the onus of the development work on someone other than a developer
- Common software concerns become second-class citizens
- It stifles learning, knowledge, and mental exercise

## The New Miserable Experience

The disempowerment of developers is one of the main drivers of developer disengagement today. I have heard from developers that AI makes their job boring or uninspiring. Developers feel divorced from the practices they knew because of the use of AI. By following MTP you will find yourself not only divorced from the code, but also from the entire software endeavor. You lose any sense of control as all power has been handed to either someone outside of the development group, or AI. By following MTP you make the choice to mindlessly push a button to get software each day.

By putting the power of decision in the hands of people outside of the development group you choose to put the responsibility of thinking like a developer in the hands of someone who, probably, has other pressing matters to attend to. This means that the software specification is never going to have the detail or rigor that comes from applying real software thinking to the development process. Even with a coding agent writing the bulk of the code, the only way to improve code quality is to provide high-quality input. The kind of input that only a software developer can provide.

When software specifications are developed by a non-developer, common software concerns that are invisible to people outside of the industry begin to fall by the wayside. Architectural concerns fall by the wayside leading to bloat, and increased cost to build and run the software. Testing gets lost without developer hands guiding the coding agent toward right-sized pieces of functionality that can be tested. Security concerns are forgotten and software is left in a vulnerable state.

Finally, by offloading the work to either your coding agent or others outside of the development group opportunities are lost. Developers stop learning. Since there is no engagement with the software specifications, domain knowledge is never absorbed. You will no longer have that software sense of remembering why something is the way it is and knowing how to get yourself back into the contextual space. Finally, you will lose the mental exercise that keeps developers sharp. The thinking that was done before coding agents tapers off and you are left less capable than you were a year ago.

## Breaking the Habit

Following the MTP spec can become habitual. As you think less about the software that is being built, you become accustomed to thinking less. There are things that you can do to reclaim that thinking spirit you had as a developer before you handed control over to the coding agent. There are four ideas to get you started. I'm sure you can think of more as you wake up from the MTP sleep.

Question the information you receive. Don't simply skim the spec and decide it's good enough. Ask questions. What feels right and what feels wrong? What sorts of changes need to be made in order to account for what you already know is true about the software? How would you improve the spec in order to make sure the software is as good as you can imagine? The questioning is the process you go through in order to develop a better spec which you can review with your business partners.

Synthesize the information from the specification and verify your understanding. This is your opportunity to develop deep domain knowledge regarding the software you are building. Much like asking questions, this is the place where you have conversations with your customer, product owner, or other business partner to deepen your professional knowledge which will enable you to develop a more critical eye as you continue to build the software you have set out to make.

Expand on the specification you received. Once you have questioned it, and synthesized what there is to know, develop out the spec in a way that encompasses your own particular expertise. Build in security requirements. Develop the context you provide to your coding agent in order to give it better architectural patterns to follow. Fill in the blanks. Collaborate with others and have them help you spot holes in your specification. Develop a real product spec that includes work that only a technically skilled developer like you can make.

Validate the results of your work. Once the source code is generated and the software is built, be sure that it meets the criteria you provided in your software specification. Apply good testing practices. Use a combination of your own judgement and deterministic tools (like automated testing and linting) to verify the software is not only working, but working correctly.

## To Sum Up

If you are currently following MTP and acting as a meat proxy, it is time to ask yourself why. It is an anti-pattern that introduces multiple issues including disempowering developers, hands off responsibility of effort, relegates common software practices to the bench, and stifles learning. Take on the challenge of questioning what you receive, synthesizing new information and verifying it, expanding on the specification in order to develop the best product you can, and validating the results of your work.

Working with a coding agent can either be a soul-sucking endeavor or it can be an opportunity to round out your knowledge in new ways, and apply higher-level design and architectural practices that we have all talked about for decades. It's time to seize this opportunity and build great software.
