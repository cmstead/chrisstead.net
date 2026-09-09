---
layout: post
title:  "Limiting LLM Code Generation"
date:   2026-09-13
categories: 
    - Coding
    - Software Quality
    - AI
    - LLMs
---
I'm sure you've been there, you're reviewing code that is just too much to digest at one time. It could have come from generative AI or it could have been from a coworker. Either way, it was just too much code, and too much going on. With generative AI, changes can easily spiral out of control and become unfocused and complicated. It can become just far too much to digest.

When working with generative AI, I always encourage everyone to start with a clean commit and end with a clean commit, but I am starting to push for something new: substantially limited scope. For a long time I have been a fan of well-scoped slices of work because they are easy to keep in your head as you work. Now I believe it is the way we should work in order to avoid being overrun by generated changes of extraordinary size.

I have summed this philosophy up as, do not let a machine generate more code than you can fix in one sitting. It is not enough to say the change must be small enough to be read in one sitting. This is a recipe for rubber stamping changes. A bunch of code comes out of the far side of your LLM and your eyes glaze over. You read it by skimming and think "it looks good to me!" That's not enough. You must be able to not only read it, but fully digest it and be able to refactor, debug, and fix it all without needing to get up and go take a break before finishing.

It turns out that is a pretty small slice, but that's also the point.

Isn't handing over coding duty to AI supposed to speed up our process and produce more work than we could have done without it? I'm not sure that's actually what we want. I believe that by going slow, we will actually go faster. I know that this is an expression as old as time, but it holds just as true now as it ever did.

## But why?

I believe we get several benefits for small, intentional changes:

- It keeps changes bite size, shortening the feedback loop
- It makes context maintainable and manageable
- It reduces verification fatigue
- It keeps the focus clearer for testing and refactoring
- It ensures commits are single-intent
- It's less painful to throw away small amounts of code

This is to say, the entire enterprise maintains focus on the capabilities of humans to read, review, and modify code over the ability for generative AI to produce large amounts of code. Moreover, if something needs to be updated, or fixed, the time from code generation to having a fix in place should be minimal.

Keeping changes small provides an immediate benefit in the form of a speedy feedback loop. The longer the feedback loop, the less context will remain. Design decisions become blurry, and your ability to effectively assess the quality and correctness of code decreases. When working with AI generated code, the less time it takes to go from prompt to first code, the more likely you are to have context fresh in your mind. That fresh context will make it easier to review the code that is produced. This means you will be prepared, not only to approve it, but also to refactor and redesign the code as is necessary. This code review brings us to another key benefit.

When the feedback loop is fast, and context remains fresh, verification feels less arduous and more like part of the work to be done. Rather than spending a large amount of time after a one-time production of code, you break up that verification and turn it back into an opportunity to apply design and refactor code.

Testing and refactoring are two skills which, I believe, will persist even in a future where AI performs ever more of the work a software engineer might do now. Tests at the front end allow for design thinking which lead to a better review heuristic. On the far end, by having tests in place, it becomes safer to refactor the code since you have tests verifying that the outward behavior hasn't changed. This test and refactor cycle, even as it was developed originally, relies on small, well focused code and a fast feedback loop.

Small amounts of focused code leads to better, more focused commits. There are two benefits from small, well-scoped commits: they are easy to reason about when they are first stamped, and they are easy to reason about when reviewing history. By working smaller and committing frequently, code becomes more legible through version control history.

Finally, in the case where the code just does not meet expectations for whatever reason, the less code you have, the less painful it is to throw away. Given the short feedback loop, the time you go from concept to test to code remains small and the code only represents a small fraction of what the end goal may be. That small amount of code becomes safely disposable as you can simply take the work you have already done and prompt again.

## In Conclusion

If you are working with AI and you have long feedback loops generating massive amounts of code, you are setting yourself up to struggle against large reviews that take a long time requiring large amounts of concentration. It becomes easy when the amount of generated code is large to fall into the trap of rubber stamping the code, assuming it is good enough. It is likely you are missing important tests that you couldn't have planned for initially, even when your coding agent generates tests for you. Moreover the tests that are generated assert that the code the AI wrote was what the AI wrote, it does not ensure that the code does what you expected. This means it will be harder to reason about and change safely.

By keeping code generated by AI small enough that you can review it in one sitting, you combat all of the ills I've listed above. You are likely to start seeing more success using AI to drive solutions forward, and by shortening the feedback loop you will actually speed the time to delivery as your verification step tends to be shorter and more accurate. So, keep your changes small, work in tight feedback loops, test and refactor regularly, and don't keep code that doesn't measure up.
