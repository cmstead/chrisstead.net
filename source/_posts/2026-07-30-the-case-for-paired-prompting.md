---
title: "The Case for Paired Prompting"
date: 2026-07-30
categories:
    - software development
    - pair programming
    - generative ai
---

Lately I have heard of people talking about pair programming with AI chat or a coding agent. The claim is that they are getting the benefits of pair programming without the cost of having another human at the keyboard with them. On the surface this sounds rather compelling. You always have a pairing partner and they are less expensive than a second person. For solo developers who have no pair partner this would be a vast improvement. For people already working in an XP shop, I believe this is a step down in value from traditional pair programming.

## So, why do pair programming in the first place?

Pair programming isn't about having two people type code. It's about improving the quality of thinking that goes into the software. You get better design through continuous discussion. Though there are numerous reasons for pair programming, I would like to focus on five benefits you get from the practice:

- Clarity of thought
- Better design
- Continuous review
- Shared ownership
- Knowledge sharing

Pair programming often involves the driver/navigator paradigm. This means that ideas flow out of one person, through the hands of another person and into the code. This process forces the navigator to verbalize their ideas, which helps organize thought and leaves room for the driver to ask questions and seek clarity before typing.

When developers work together, not only do they talk about the code in the small, they also talk about the ramifications of the code in the large. When TDD is included in the process, opportunities for refactoring emerge continuously. Each refactoring step is a design opportunity which leaves the door open for discussion about design and architectural patterns. These can be applied in real time and the code improves.

Since all ideas are being verbalized before they are committed to code, there is not just a simple code review, but an initial review of the solutions being designed by the developers in the pair. Once code is typed and on screen, the navigator is in a position to review and provide feedback on the implementation. As the driver and navigator switch positions, each person will have time and focus to review ideas and code in real time leading to more thoroughly vetted solutions.

With two people writing code together, no single person owns the entire solution. There is no my code, or your design. Instead there is our work. With shared ownership you get greater consistency, broad architectural awareness, and a sense of shared responsibility which improves team morale.

Finally, pair programming provides a vehicle for knowledge sharing. When developers pair on a solution each benefits from the experiences of the other and gains new knowledge not just in the current codebase, but also in the broader topic of programming and problem solving.

When pairing is moved from two programmers working in concert to a programmer and chat or a coding agent, many of these benefits disappear. Let's take a look at what happens when a programmer pairs with AI.

## What do you lose?

When working as a solo developer pairing with AI, many of the benefits that come from the human practice of pair programming are lost. The process stops being handled out loud and the developer becomes isolated from the rest of the team, largely generating solutions alone. Reviews become asynchronous and pull requests become the norm. Knowledge is not shared with the rest of the team. Though the single developer may learn something new in the process, there is no knowledge sharing as Ai doesn't doesn't become a more knowledgeable teammate. New outcomes arise from the practice of pairing with AI:

- Design discussions are obscured
- Architectural reasoning becomes opaque
- Knowledge remains with one developer
- PR reviews become the first human review
- Team members become consumers instead of collaborators

Although Ai provides a second perspective while developing, the key human aspects of pair programming are lost or obscured. Human review happens late, the decision process is not distributed across the team, and knowledge is not shared through human interaction. All of this leads to a team who less equipped to collaborate on solutions and deliver working software smoothly and quickly. Ultimately people end up prompting AI in isolation with reduced human support.

## Enter Paired Prompting

Paired prompting is the practice of two developers working at a single computer together, engaging an AI system to augment pair programming practices. Rather than replacing pair programming, AI provides support for mechanical development practices, while leaving humans responsible for design and delivery.

If we consider tests to be the facilitating medium for discussion and design in an XP environment without AI, prompts would be the post-AI analog. I propose that the new paradigm when using AI in an XP work environment is paired prompting. Paired prompting is the practice of two developers working at the same machine at the same time, interacting not only with the problem, but also with the AI.

In paired prompting two people define requirements, explore alternatives, discuss tradeoffs and more while augmenting the work with AI chat or a coding agent. This brings back the good that comes with classic pair programming and emphasizes the thinking work like design and review that humans do best. In the end, knowledge is shared, decision processes become transparent and collective ownership is restored.

## The Process

When working in a paired prompting environment, the process that used to involve only humans gets a third element folded in. Now the process we would follow looks like this:

Humans:
1. Discuss the problem together
2. Refine the prompt until both developers agree
3. Review the AI's proposed implementation
4. Challenge assumptions and refine the design

Agent/Humans:
5. Generate implementation
6. Generate tests

Humans:
7. Run tests together
8. Review and refactor together
9. Commit with shared understanding

By following this playbook, humans once again become centered in the process and focus their energy making decisions together. Systems are designed together. Prompting becomes the facilitating mechanism for human interaction. In the end the team is enriched by the process.

## Conclusion

If we look back at XP history, we can see that the principles that were once in place still apply. Humans are still central to the development process and the team requires human support. By leaning into paired prompting we lean into the history of pair programming. By using paired prompting, we can have a rich and thorough practice that supports human developers which garners real knowledge transfer. Design decisions are made together, review is done in tandem. With AI in the mix, we can speed the process of mechanical delivery, increasing the amount of time dedicated to higher level thinking and decision making.
