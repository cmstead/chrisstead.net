---
title: "The Case for Pair Prompting"
date: 2026-07-28
categories:
    - software development
    - pair programming
    - generative ai
---

I find myself thinking from time to time about what I want to get out of practices I use. I believe that every software development practice deserves reflection to ensure it is helping you accomplish what you want. One such practice I regularly reflect on is pair programming. By design and definition, pair programming accomplishes several aims at once, including better design through continuous discussion, shared ownership of the codebase, and knowledge transfer. The core element underpinning all good(tm) that comes out of pair programming is human interaction.

Lately I have heard of people pair programming with AI chat or a coding agent. They do all of their discussion, planning and execution. The claim is that they are getting the benefits of pair programming without the cost of having two developers at a computer at the same time. Each time I hear this I raise an eyebrow. It feels like something is missing. Are they having continuous discussion? Sure. Are they learning faster? The jury is out. Are they benefitting from shared ownership and knowledge transfer? It would seem not.

what gets lost?
            - Design discussions disappear.
            - Architecture decisions become invisible.
            - Assumptions aren't challenged.
            - Knowledge remains with one developer.
            - PR reviews become the first human review.
            - Team members become consumers instead of collaborators.

Let's explore what actually gets lost when you lose human interaction.

In fact, there are many benefits beyond the three I listed in the opening paragraph which all come from human interaction and only from human interaction. Generative AI seems to be here to stay so I have started asking myself, how do you get the best from interacting with generative AI while keeping humans in the loop?

In Extreme Programming (XP) tests are the foundation for design discovery. They are not only a safety harness for your code, they are an artifact of the design process. With generative AI, the foundation for design discovery is shifting from tests to prompts. Developers are leaning into prompting to drive discovery with AI chat and implementation with coding agents. We can use this new medium to facilitate human interaction.

Enter Pair Programming



- Why do you do pair programming?
    - Better design through continuous discussion
    - Continuous code review
    - Shared ownership of the codebase
    - Knowledge transfer
    - Reduced defects
    - Faster learning
    - Better decisions
- Working alone with an AI coding assistant does not produce the collaborative benefits that XP pair programming was designed to create.
    - Only one person makes all design and development decisions
    - Review becomes async - PR reviews become the norm
    - Knowledge is not shared - ai does not persist shared knowledge in a development environment
        - what gets lost?
            - Design discussions disappear.
            - Architecture decisions become invisible.
            - Assumptions aren't challenged.
            - Knowledge remains with one developer.
            - PR reviews become the first human review.
            - Team members become consumers instead of collaborators.

Do pair prompting! (Think of something better... Enter pair prompting)

- Why pair prompting?
    - prompting is design - in pair prompting, design happens together
        - defining requirements
        - exploring alternatives
        - discussing tradeoffs
        - defining tests
        - defining constraints
        - deciding architecture
        - deciding what not to build
    - design happens together
    - review happens together
    - knowledge is shared
- What does the process look like, then?
    1. Discuss the problem together.
    2. Refine the prompt until both developers agree.
    3. Review the AI's proposed implementation.
    4. Challenge assumptions and refine the design.
    5. Generate implementation.
    6. Generate tests.
    7. Run tests together.
    8. Review and refactor together.
    9. Commit with shared understanding.

Address the share afterward objection - this is the same as the PR review after.

"Couldn't I just share my prompts afterward?"

I'd address this explicitly.

Something like:

Reading prompts after the work is complete is similar to reviewing a pull request after the implementation. The collaboration has already happened. Pair prompting is about making design decisions together before and during implementation, not documenting them afterward.

- Summary
    - XP principles still apply
    - Pair prompting holds to the spirit of pair programming
    - Pair prompting can be thorough and garner real knowledge transfer
