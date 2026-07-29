---
title: "The Case for Pair Prompting"
date: 2026-07-28
categories:
    - software development
    - pair programming
    - generative ai
---

AI suggestion:

The biggest improvement: anchor the article around XP's purpose

Right now, the outline focuses on what pair programming is. I would instead spend more time on why XP introduced pair programming in the first place.

If readers agree on the purpose, the conclusion follows naturally.

For example, you could introduce pair programming in terms of the outcomes it was intended to produce:

Better design through continuous discussion
Continuous code review
Shared ownership of the codebase
Knowledge transfer
Reduced defects
Faster learning
Better decisions

Once you've established those goals, you can ask:

Does prompting an AI alone achieve these goals?

That naturally leads into your argument.

# My outline

- What is pair programming?
    - working together on the same computer
    - shared design and development work
    - Real-time review
    - knowledge sharing
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
- Summary
    - XP principles still apply
    - Pair prompting holds to the spirit of pair programming
    - Pair prompting can be thorough and garner real knowledge transfer

Obvious objection:

"Couldn't I just share my prompts afterward?"

I'd address this explicitly.

Something like:

Reading prompts after the work is complete is similar to reviewing a pull request after the implementation. The collaboration has already happened. Pair prompting is about making design decisions together before and during implementation, not documenting them afterward.