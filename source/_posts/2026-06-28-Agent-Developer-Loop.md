---
title: "The Agent-Developer Loop"
date: 2026-06-28
categories:
    - testing
    - software development
    - ai-agents
---
I have been doing a lot of thinking about software lately. We are in the middle of a substantial shift in the way software is produced. More and more, software developers are using coding agents to create software, which means more and more software is no longer crafted entirely by hand.

In a time not too long ago, software was largely a hand-written endeavor. Software developers would sit down and turn requirements into working software by writing source code. There was code generation, but that largely handled the boilerplate. The creation of code which manifested working software was still up to the developer to handle. Arguably, in certain ways, this was a Good Thing(tm) since it meant that you were also actively involved in the creation of the software all the way through, including architecture.

There was an important practice that came out of lots of people writing lots of code for a long time - the TDD loop. It's commonly spoken of as Red-Green-Refactor. First you write a test and it fails. Then you write some code to pass the test. Finally, you refactor the code to keep it maintainable, readable, and architecturally sound, hopefully. I lived and breathed that loop for at least a decade, probably longer.

With agentic coding, the center of gravity is shifting from the TDD loop to what I think of as the agentic loop. If we view this through one lens, it appears as though the developer has been left out of the loop and replaced with software written atop an LLM. Through another lens, the developer has been put into a new role. Now, we are all architects. Or at least, we are all supposed to be. The tooling is pushing us toward higher-level decisions whether we're ready for that role or not.

## On This Glorious Day...

On this glorious day we are all architects. Except not so much. Most developers who are using AI coding agents like Copilot or Claude Code are leaving all of the decision making up to the bots. This is a huge mistake, but probably not for the reason you're thinking.

You see, coding agents are really good at seeing patterns and repeating them. In fact, that's what LLMs (and Tiggers) do best. They are so good that they can spot patterns in even the most chaotic code. Once they see that pattern, it's off to the races! Boy oh boy can an LLM crank out some crummy code when they meet a chaotic codebase.

This is where we _must_ be architects. There are hundreds, if not thousands of books in the wild about software and architectural patterns. Your friendly neighborhood LLM has probably read many of them. Your agent, however, won't employ the knowledge in these books without being tasked with it. This is where the developer comes in. You need to know your patterns too. More now than ever, you need to read all of those architecture and patterns books and start committing the words to memory because you are part of the loop.

## But, Who Cares Anymore?

It would be easy to write off software architecture as a lost cause. Now that the AI can read and write code, we can just leave the job up to the agent and drink coffee. It turns out, however, that LLMs actually can't just process an infinite amount of unstructured code. You will run out of context tokens and the LLM will barf. The only way to ensure that the LLM keeps on chugging is if the source code actually goes through architectural review. Files need to stay small, code must be organized with good names, and the codebase needs to actually remain healthy.

## The Loop

I propose, in this age of agentic coding, there is a new loop - The Agent-Developer loop. Humans still need to be part of the software development lifecycle even if the coding agent _could_ merrily go along cranking out thousands upon thousands of lines of code without much intervention. Here's what I think the new loop realistically can look like:

**Prompt** -> **Generate Code** -> **Validate Code** -> **Generate Tests** -> **Architectural Revision**

We can actually break this up into the human and computer bits:
- **Prompting** is a human undertaking. Somewhere along the line a human has to take product specs and turn them into something the agent can consume.
- **Code generation** is the computer. You pull the cord and let it rip.
- **Code validation** - human. Sure, the LLM could be sent to validate the code it just wrote, but that's unlikely to end well.
- **Test generation** - probably the computer. Your coding agent can pin down software behaviors pretty well, so you may not get the value you expect out of painstakingly hand crafting every test.
- **Architectural revision** - human all the way. An agent can suggest patterns, but someone still has to decide what kind of system is being built, what tradeoffs matter, and how the codebase should evolve over time.

When we build the loop this way, humans become an integral part of the software development process as the guides through the business and architectural wilds. It also calls out skills you absolutely must have:

- Code literacy (reading _and_ writing)
- Prompt engineering
- Code review, including read by refactoring as necessary
- Software design patterns - both small and architectural in nature

## To Sum Up

In the end, just like humans, LLMs are limited in memory and context. We still need to think about software design and architecture. The AI won't save us from carelessness. The TDD loop we have relied on may be on the way out. Our new loop, the Agent-Developer loop, gives us a real way to stay connected with the codebase and help the software thrive.
