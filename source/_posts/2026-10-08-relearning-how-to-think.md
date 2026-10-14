---
layout: post
title:  "Relearning How To Think"
date:   2026-10-14
categories: 
    - Coding
    - Focus
    - AI
    - LLMs
---
Until about 8 months ago, I used a coding agent as a fancy autocomplete, and code reviewing agent. I joined a new team and everything changed. This team, as well as the rest of the entire department, used coding agents as a producer of production code. This is something I had balked at prior, but now I had come face to face with the reality that it is inescapable.

AI coding agents have become part and parcel of software development over the last 1-2 years. Today you can't swing a laptop without hitting someone vibe coding their way toward new software solutions. It has been noted that writing augments thinking. This is not to say that any particular sort of writing is necessary to augment thinking, though there are arguments that certain types of writing might do more than others. Nevertheless, when you are talking about writing software, the primary written form is source code.

Programmers think in a variety of ways including drawing and scribbling ideas, writing on sticky notes, and talking with colleagues. The single biggest thinking tool that programmers relied upon was writing code. The very act of writing code provided an avenue for programmers to think deeply for long periods of time about problems, uncovering details and nuances of a problem that would have been overlooked otherwise. Coding and deep thinking were deeply intertwined.

With coding agents taking over the act of mechanical coding, I have noticed something troubling: programmers are trying to think their way through a prompt without tools to augment their thinking. One of the primary tools we once had to aid in our thinking and discovery has been taken away by a tool that is held up as the new standard for code production. Personally I have found myself feeling lost and unable to process the way code is produced now, since the problem goes into a black box on one side and code comes out on the other.

A couple of months ago I started a path of discovery. I started off looking at one thing, but recently I discovered what I really needed: a new way of actually thinking about problems that I am supposed to hand off to coding agents for mechanical implementation.

The real problem is not that coding agents have taken thinking away. We have handed off the thinking when we handed off the coding. This is an inherently human problem. There are countless developers who are working on coming up with the better harness and engineering the hell out of their agentic coding systems. I thought I wanted to be one of them, but I really don't. I'm not bringing anything new to the party there. There is, however, engineering that still needs to be done in the meanwhile, even as harnesses are engineered and MCP servers are created for numerous different tasks and goals.

I realized that the thing that isn't being engineered now is the way engineers are thinking. I have started exploring ways to enhance thinking and provide better tools for engineers to use with their coding agents. We have circled back to a time when features are thought out more or less in advance and agents are generating large swaths of code faster that people can. The question is how do we think about what we want the agent to do before the agent does it? How do we not hand off the thinking?

Though I have a long list of ideas, I have identified several items that are a bridge between humans and their AI coding agents. Prompt writing has become the de-facto means of writing what we want the agent to do, but I have found it is one of the least effective ways of thinking about the problem. By the time you have started prompting, you have begun the process of handing off work. Instead think of the following as on-ramps to prompting which can provide rich context as well as provide a way to deeply engage with the problem _before_ the agent begins work:

- Spec writing (often Gherkin)
- Diagramming logic flows (mermaid)
- Diagramming architecture (mermaid)
- Diagramming database schemas (mermaid)
- Screen layout (SVG)
- Pseudocode (plain text)

These six different elements of diagramming and writing can provide a rich way to expand ideas, enhance understanding, and deeply engage with your work in a way that simply prompting cannot do by itself. The key to all of the tools listed is they can be expressed with plain text meaning they can be provided to an LLM for added context.

Ultimately, the goal here is not simply to generate artifacts that can be provided to the AI. Instead the real goal is to externalize thinking in a way that allows you to fully engage your system 1 and system 2 thinking with respect to the problem and provide real human problem solving. As software developers, we are problem solvers and we are here to solve human problems. The only way for us to continue to be effective problem solvers is if we engineer our way of thinking and uncover new ways to produce software that solves human problems better than just prompting an agent and hoping for the best.
