---
layout: post
title:  "TIP -- Adding Features to Legacy Code"
date:   2019-11-05 10:00:00 -0800
categories: Coding, Javascript
---
# TIP -- Adding Features to Legacy Code #

Michael Feathers defines legacy code as [code without tests](https://en.wikipedia.org/wiki/Legacy_code).  This means code written years ago, with a good test harness, is not legacy code. It also means the code written yesterday, without tests, IS legacy code.

We don't need to dig very deep into this to understand what is happening here.  Code which has tests is going to be easier on the nerves to change than code without. If we dig a little deeper, code with descriptive tests actually documents context and meaning for the code under test.

It's very common, even as TDD is continuing to gain popularity, to encounter legacy code.  It's a common response to want to remove legacy code and replace it with something new.  Generally speaking it is [unwise to do this](https://vibratingmelon.com/2011/06/10/why-you-should-almost-never-rewrite-code-a-graphical-guide/).

There are two scenarios which arise around legacy code, adding new features, and updating old code. Trying to fit both of these topics into a single discussion is too much for my simple mind to attempt, so let's talk adding new features!

When you add features to a legacy codebase, there are three things you will want to keep in mind. I even have a fun little mnemonic for you: TIP.

- **Test expectations first**
- **Integrate late**
- **Pure behaviors by default**

We will examine these three ideas and how they make adding new features a more reasonable request.  Mind you, legacy code is a tough problem so, this is a guide, but not an absolute. You will always need to use your best judgement to assess your particular situation.

So, let's have a look at the TIP approach.

## Test Expectations First ##

New features may be big or small, but either way, it is important that you get a good feel for the expectations stakeholders have around the feature you'll be developing. The most effective approach to gathering this information is to have conversations. Lots of them. At the very least you should probably talk to people about the problem you are solving as much of the time as you are writing code, but that's a different discussion.

When you and your team start approaching a story, the user story is the beginning of the conversation, not the end. Be ready to take lots of notes.  Draw pictures. Identify the kinds of behaviors which are expected in the system.  For an especially robust conversation, try using [event storming](https://www.youtube.com/watch?v=veTVAN0oEkQ) to gather insights.

Once you have all of your expectations captured, you are ready to start iterating on your solution. It's important to understand that your solution is almost guaranteed to require iterations. It is entirely likely that you did not capture all of the information available in the first conversation.

Before you write a single line of code, write a test. Capture some behavioral expectation in that test and decide how you want to interact with the code you're getting ready to write.

This test should reflect an initial state of the system, the event that triggers your new behavior, and the outcome of that behavior. There are a few different ways to capture this, including the classics: Arrange/Act/Assert and Given/When/Then. Regardless of the test format you choose, be sure you test discrete expectations and cover the cases you are aware of. Use each new test as your North Star, guiding your development efforts.

You'll note we spent a lot of time talking about communication in this section. The reason for this is, the only way to uncover expectations is to communicate with the people who hold information about the desired outcome. Often they will forget to share something you would consider critical. As a developer, it is crucial you develop the skill of surfacing those important details, as they will be the signposts to building a well-aligned solution.

## Integrate Late ##

New features, regardless of where you are in the product lifecycle, go through a process of discovery, development, and iteration. All of this is best done outside the flow of the current system. Ideally, the current software is in production and providing value to users. We want to cause as little disruption as possible to the current software as we introduce new behaviors.

When working in a legacy system, the idea of working outside of the primary released software is even more important since there is a lot of risk associated with modifying existing code. Often, even small changes in a legacy system have wide-reaching consequences, so care is critical.

It's common practice to introduce feature toggling into systems in order to cordon off new development work from the eyes of the user. This protects the user from accidentally stumbling into a feature which is incomplete and, possibly, unstable.

In a legacy system the feature toggle is not a conditional behavior. Instead we can view integration into the system as our feature toggle. By developing code which is not reachable, by any means, from the main application, we protect our new development efforts and the user who might interact with something that could lead to an unrecoverable situation.

Integrating late, then, is waiting until the point in time where you feel confident that the work you have done is at a point that, at least, the stakeholders could interact with it and provide feedback. This airgap provides safety around the changes you make and enables the company to continue providing value in the software without breaking customer expectation.

## Pure Behaviors by Default ##

We can look to functional programming and get a sense, immediately, of what a pure behavior might be.  For our purposes, we can consider a pure behavior to be *a behavior which performs a data-in, data-out action without interacting with external systems or maintaining state.*

Business logic can be largely characterized by our definition. Business rules can be stated as "if x, then do y." This means we can describe most of the business concerns through pure behaviors, and test them accordingly.

If we write the majority of our new feature as a collection of pure behaviors, we will be able to test most of it without even concerning ourselves with the inner workings of the rest of the system.

It is worth noting, by creating new, pure behaviors, we may end up duplicating code which exists elsewhere in the system.  This is fine, since we can always refactor later. It's important in the refactoring that we be mindful of keeping pure behaviors by default, since this is our path out again.

Since pure behaviors are comparatively easier to test than behaviors embedded deep inside a legacy codebase, this approach will actually create a new positive feedback loop where others have an example of a testing methodology that is easy to follow and have success with.

## Folding it All Together ##

Although this approach is not the grand unifying solution for all legacy code woes, it provides a means to start providing new value in a system which might, otherwise, be difficult, or impossible to work with otherwise.

If we look at the entire TIP methodology, we can see it bundles the classic TDD approach of test-first, a healthy practice of reducing coupling between program elements, and the descriptive quality of well-scoped pure functions. By working within the TIP structure, each part of the new feature development process builds upon the new, healthy codebase we created, meaning this is a self-reinforcing loop we can rely on.

Of course this method of approaching a legacy codebase continues to rely on good XP practice including sharing knowledge, refactoring, tests, automation, etc.  Instead of viewing the TIP approach as a standalone practice, consider it a part of the process of integrating new, healthier practices into a codebase which makes change hard.
