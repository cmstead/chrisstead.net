# Working With Legacy Javascript #

Legacy code a huge topic which I won't be able to cover in a single post.  It may not be possible to fully cover the topic in a single book.  Nevertheless, this is a first look into ways to start approaching a legacy codebase you are working on, and simple things you can do now to start making your codebase better.

In order to talk about working with a legacy codebase, the first thing we will need is a common language. A legacy codebase is not simply old code that has been working for a while.  Though that old code might **also** be a legacy codebase, it could just be a running system which doesn't need anything done to it.

What we're going to talk about:

- Defining legacy code

- Adding new features (TIP method)
  - Test expectations first
  - Integrate late
  - Pure behaviors by default

- Managing existing code
  - Creating vice tests
  - Isolating pure behaviors
  - File churn

## Defining Legacy Code ##

Michael Feathers, in __Working Effectively with Legacy Code__, defines legacy code as "any code which is not under test." By this definition, you could have written legacy code yesterday. Although you, or your teammate may be creating legacy code, it's not the end of the world, nor is it something you should feel shame about.

Every developer has had oversights and misunderstandings, and legacy code is simply either an oversight or a misunderstanding.

If you have legacy code created by an oversight, that's okay.  It just means you forgot to write a test.  Although the code was not test driven doesn't mean you can't build automated tests afterward.  The more you can get tests around your code, the more likely you are to spot problems in the future as new code is developed.

If, on the other hand, you have legacy code because it was not clear whether, or how to test it, it's a misunderstanding.  The developer either misunderstood the hows of getting the code under test, or they misunderstood the why of getting the code under test.

Neither of these things are something to be ashamed of.  They are opportunities to learn and grow as a developer.  Learning and growing are characteristic traits of the software development skillset, so you're right on track!

So, legacy code is code which is not under test.

## Pure Behaviors ##

One of the most important qualities of highly-testable code is the idea of pure behaviors.  A pure behavior can, most easily be described as data-in, data-out.  This means if a function or method does anything other than operate on data, it is not pure.

Examples of impure behaviors are behaviors which make network calls, interact with the database, manipulate the dom, modify or access state, and others.  The reason these behaviors are problematic for testing is they interact with external resources which must be managed from within your test setup or teardown.

By minimizing external interactions, tests become easier to design and implement.  Moreover, by eliminating external interactions, code becomes deterministic, so tests become more clear. This means tests can focus on the business domain and remain decoupled from the implementation details of the broader system.

## Adding New Features ##

As you add new features, this is the perfect time to introduce tests. New features are different than implementing extensions to existing behaviors. We'll talk a little about extending behaviors later.

Adding new features to an existing system is an opportunity to introduce a different division in the code. By introducing a new division in the code, you can provide a seam to introduce tests around the new functionality.

As the new behavior is added to the system, you can opt to introduce the computational aspects as pure behaviors.  These pure behaviors are easier to reason about and straightforward to test.

If the new feature interfaces with the database, network, or other resource, you may find you need to interact with existing code.  This new interaction may require a vice test, which we will discuss next. If, on the other hand, it does not use existing code, you can use this as an opportunity to introduce a localized integration test. We will talk about localized integration testing shortly.

## Vice Tests ##

Michael Feathers coined the term "vice test" in his book.  The underlying idea behind vice tests is that they lock a certain behavior in place and ensure nothing changes as the code is modified.

Vice tests are intended to be temporary tests while the rest of the code is refactored to introduce more healthy, business-related tests.

As you write vice tests, focus your attention on capturing information about the beginning and ending state of your application. This state may or may not provide full insight into the way the application works, likewise, it might not even capture all of the effects the code you are interacting with introduces into the system.  Nevertheless, simply having tests which capture something about the changes the system goes through as code is executed will provide momentary safety.

## Localized Integration Tests ##

I consider any integration test which only interacts with a single layer in your application to be localized.  This means, if you are testing the interaction between two different application components, you have reached beyond the localized scope.

For instance, if you are testing that a single business layer writes and/or reads from a database in a particular way, it is localized. If you are testing that the same interaction also tests a stored procedure, or DB trigger, it is not localized.

The key to localization of integration tests is to provide a broader vice around core interactions between the current layer of your application which could, in turn, allow for the introduction of test doubles at the application edge to make the test more deterministic in nature, and decouple it from the rest of the application resources.

These localized integration tests also allow you to gain insight into whether modules of your application integrate properly without having to run the entire system under test as a full end to end integration.  This localization of tests introduces test speed and reliability into a legacy system without major refactorings or rewrites.

## Isolating Pure Behaviors ##

Everything we have investigated so far has been centered around new development in the system, but we haven't addressed any of the existing codebase. Often times you will discover there are large chunks of functionality which live in a single file, module, or even a single function.  This is all behavior we would really rather break out of its current context and into a new, simpler context on its own.

One of the most important tools you could have in your belt is an automated refactoring tool.  Whether you use WebStorm or VS Code with JS Refactor, having a tool which will perform some core refactorings for you is essential to isolating behaviors.

The process goes a little like this:

1. Create a vice test around the code you are going to modify
   
2. Find a piece of code which relies only on local variables
3. Extract that piece of code into a method and give it a name -- even if its just an equality check
4. Wrap your pure behavior in a test
5. Check to see if you have any patterns emerging around pure behaviors
6. If patterns are emerging and you can extract some of the behaviors to a new module, do so
7. Return to step 1

At first this may seem either a) too small to help, or b) like it's intellectually dishonest because you already knew what each of the little pieces did.

What is most important about this exercise is to start surfacing information about the larger context.  If you are trying to keep hundreds or, even, thousands of lines of code and the associated context in your head, you are bound to make mistakes.

The most important idea here is, eventually you will refactor all of the pure behaviors out and all you're left with is an integration file.  Perhaps that will be enough, or you might want to go further.  You won't know until you get there.

## File Churn ##

Although this might seem out of place in a discussion of managing legacy code, file churn is a critical indicator for the value of the work you are undertaking. First, however, let's take a look at what a churn metric is.

File churn is the number of times a file is modified within a given period of time. If a file has been modified 10 times in the last 5 years, the churn is pretty low. On the other hand, if a file has been modified 25 times in the last two months, the churn rate is quite high.

By itself, a churn metric is little more than a piece of information. When coupled with untested files, file churn says a lot about the risk associated with a particular file being left as is.

The lower the file churn on a legacy file, the lower risk it is to the system as a whole. As the churn metric increases around a file in a legacy system, the higher the likelihood one or more of the changes made to the file will introduce a bug.  

High churn files are the most important to address first. This is due to the fact that if a file has changed very recently, or has changed many times within a certain time window, the probability of it changing again goes up.

The most important thing you can do with a high churn file is to reduce the scope and importance of that file in the system.  The more responsibility you remove from a file, the fewer changes will need to be made to that file as development progresses.

## Wrap Up ##

There is such a massive amount of information about legacy code and how to improve it over time, we have barely scratched the surface.  Ideally you have a concept of what legacy code is and how to start thinking about it, now.

When you see code, the first question is, are there tests.  If there are, you have a leg up and some of the code may not be legacy by our definition. If there are no tests, the outcome we should aim for is getting some test structure in place and some production code under test.

If you are adding new behaviors into the system remeber, SIP: seams, integration points, and pure behaviors.
