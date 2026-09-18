---
layout: post
title:  "AI Assisted Coding - Maintaining Critical Engagement"
date:   2026-09-20
categories: 
    - Coding
    - Focus
    - AI
    - LLMs
---
When reviewing code, regardless of how it was created, it is important to maintain a healthy critical eye. It's not enough to scan through and rubber stamp it, code must be made sense of and engagement is key. One of the most important aspects of working with AI to develop software is verifying the output.

It has become popular to have AI verify the AI generated code. This is fine as long as what you are looking for is stylistic in nature. A noteworthy consideration is that AI will tend to agree with itself. The moment you are looking for correctness or understanding, however, having AI verify the code is just not sufficient. This is the case we are most interested in: what happens when you need to verify correctness and ensure that your coding agent didn't go off the rails.

There are cases where you will want to critically engage with the software being verified. We have already considered correctness or fit for purpose, but you will also want to make sure code and tests continue to align with the outcomes. When left to its own devices, AI will modify tests and production code in order to ensure all tests pass. This is a case where you must be vigilant and ensure tests were kept in alignment with the expectations. It is also important to ensure that AI didn't over-code the solution. There is real history of AI generating more source code than necessary to accomplish a task. This is particularly true when it recognizes a pattern or expectation. It will try to build out things which are not requested in order to complete the anticipated request.

## So, what is critical engagement?

Critical engagement in software is the active process of exploring or examining source code. It is the active process of reviewing work which has been done in order to understand it or critique it. This is especially important for AI generated code as your eyes may be the first human eyes to actually review the code. By critically engaging with the generated source, you build a mental model of the work that was done and how the code accomplishes the task it was intended to.

## Is reading enough?

It turns out that reading is not nearly enough to support critical engagement by itself. When simply reading source code, you only engage with the code in a single way. Moreover, it is easy to overestimate how much code you can engage with before becoming overwhelmed. It may be reasonable to review a few lines of simple code within a short time and keep engagement high, but once the load gets larger, it becomes easier to slip into skimming mode.

As the quantity of code increases, especially when working with AI to generate code, it can become fatiguing. Verifying the correctness of code can become tedious and exhausting. When AI is generating large quantities of source code, fatigue can set in leading to rubber stamping of the code. This leads to missed bugs and edge cases. 

Since AI is neither deterministic nor perfect, the likelihood that generated code will be flawless is low. This means that as verification fatigue sets in, without tools to deepen engagement, bugs will slip through and unexpected behaviors will emerge that might have otherwise been caught.

## Levels of engagement

Reading is the simplest way of engaging with generated source code and requires the least presence to do. It is common when only reading source code to start skimming looking for the "good enough" review. This kind of review, even in the best of circumstances, is a very surface-level way of engaging with the source code. Reading alone does not tell the whole story and often misses important details like why things are defined as they are, or even just whether or not the source code would run at all.

The next level of engagement is interpretation, which can be seen as running the code in your head. This is when you are doing more than simply reading the source code. Instead you are looking to understand the deeper constructions within the code. Diving into why control structures are used or not, how things fit together to make a cohesive program, and even what things mean in a more semantic way. This is a deeper form of engagement than simply reading or scanning the code, but it leaves room for error as humans are imperfect computing machines and can overlook subtle details.

After interpretation, the next layer of engagement is questioning. You question the code when you not only interpret what you see, but you start to ask why something was done one way versus another. This takes into consideration the viewpoint of the author, or at least the intent at a higher level when the code is generated rather than authored. Questioning leads to insights like "this function appears to do this and it does so because...". This leads to a deep, meaningful understanding of the code which can lead to a more durable memory of the work which was done.

Refactoring is the next level of engagement with the code. Instead of refactoring in order to enhance the code, you refactor to capture the discoveries made during the process of questioning the code. As you inquire as to why and how something works, refactoring puts your hands directly on the source code and leads to meaningful source updates, capturing both questions and answers. Even in the case where you throw away the refactoring after you are done with the review, the very act of putting your hands on the code leads to a deeper understanding triggering multiple parts of the brain as you both read and interact with the code itself.

The final, deepest engagement with the code is testing. This is not simply running tests which already exist. Instead this is the process of writing new tests or running the code in order to see it execute. This activity of refactoring the code along with live testing leads to a profound understanding of the code and how it will work in production. It is a multi-faceted interaction with the code, seeing it both from the programmer side as an interface you can act upon as well as seeing it as a consumer, gaining understanding of the surrounding context in practical application.

## Why is it so important?

Setting aside the other negative effects of simply accepting the output of AI as a final draft without engagement, there are key issues which arise when we simply accept the output. Some high-level issues are application security, regressions, new bugs, poor fit for purpose, and testing.

Application security is something that reaches beyond just the security team. Software developers are the first line of defense against security issues in software. When we fail to critically engage with the produced code we open ourselves to real risks like data leaking and hard coded secrets like login credentials. I mention these two in particular because I have witnessed each of these first hand. In the case where leaking of both data and credentials occurred, the applications (yes, multiple) were all required to be pulled out of service completely. They have yet to be rewritten or redeployed.

Regressions are another common occurrence. Redditors complain often about regressions appearing in software as LLMs update source code and reintroduce bugs which were once solved. I have even witnessed my own coding agent rewrite tests in order to ensure that tests continued to pass with the old bug put back in place.

Coding agents, much like humans, are capable of producing bugs. The difference is that as humans, we are capable of spotting bugs and behavior inconsistencies which a coding agent produces. When we accept the output as a final draft, we also accept the errors that we may have otherwise identified. By critically engaging with the code, we give ourselves a chance to catch errors before they go out into a production application.

Something that happens when coding agents are left to their own devices is, software stops being fit for purpose. Through context drift and model misalignment as well as hallucinations, software can be produced that does not match expectations or stated need. By not only engaging with the code, but also with the executable program, we are given an opportunity to realign the output and ensure the software behaves as we would expect.

Finally testing. As I mentioned above, I have seen a coding agent actually rewrite tests to conform to incorrect behavior, preferring updating tests over updating source code that doesn't align with expectation. By writing and monitoring tests, we capture an opportunity not only to understand the code, but also validate it is correct. We verify that it is not simply logically consistent, but that it conforms to expectations.

As we work with coding agents to produce code, especially faster and in higher volumes, it is important not to view our inability to keep up as a failing which must be automated away, but as a design feature slowing the development process in order to ensure that code produced by a coding agent matches expectation. It is our duty to critically engage with the code in such a way that it ensures source code is logically consistent, well tested, stylistically aligned, and conformant to requirements. It is not enough to simply put in the acceptance criteria and then rubber stamp the result. Even when AI is tasked with reviewing its own output, there is no guarantee that the output would meet acceptable standards or expectations in any fashion. Given that our names are on the commit, it is vital that we engage with the code we commit in order to ensure not only that it is correct, but that our integrity is reflected in high quality solutions which can be proudly presented to stakeholders and customers.
