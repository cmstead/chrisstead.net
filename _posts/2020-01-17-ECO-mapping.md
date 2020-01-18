---
layout: post
title:  "ECO Mapping: The Basics"
date:   2020-01-17 00:00:00 -0800
categories: 
---

I started writing a long, wordy post all about ECO mapping, how it works, why you should use id, and the entire process of generating the map from the top, down. It was WAY too much.

Instead, I want to introduce you to ECO mapping from the bottom.  I'll follow Kurt Vonnegut's advice and start as close to the end of the story as I can.

ECO mapping is a way of breaking down work you are planning to do. The goal of an ECO map is to understand exactly ONE THING the user is going to do, identify the things the software must do to respond to the user action, and understand the outcomes which can arise.

## What is ECO Mapping? ##

ECO mapping (pronounced ee-koh mapping) is the process of prototyping a thin slice of a software solution, without code, to identify areas of concern and allow for early discovery of work which needs more understanding before implementation can begin.

## What ECO Mapping Is Not ##

ECO mapping is not the entire process of discovery.  There is no replacement for talking with customers and stakeholders.  Tools like Event Storming, user studies, personas, and more, can facilitate better conversation, and surface crucial pieces of the problem which need attention.

## The E, C, and O of Mapping ##

The acronym ECO stands for event, commands, and outcomes.  These three ideas are the core for understanding and discussing the next thin slice of software which must be built.

### Events ###

In an ECO map, events are anything which triggers a behavior inside the system from the outside. Any time a user interacts with a text field, or clicks a button, it is an event.  In much the same way, an action from an outside system which interacts with the system you are building is also an action.

Examples of events:

- A button click
- An HTTP request
- A message from a message queue

The one thing which hasn't been highlighted yet is intent.  No event is terribly interesting without some intent.  No event is triggered without reason, even if the reason is simply because the button says "click me."

Each event should be described with regard to the intent and context:

- The user clicks the button to generate a report
- The user requests a book list (HTTP get request)
- A data read result was returned through the message queue

By associating the triggering event with intent we have insight into what the expected outcomes will be, which will help us build software which is better suited to meet the user needs.

### Commands ###

Commands are the "thing" your software will do in response to an event. This language comes straight out of Event Storming and holds much of the same meaning.

There are a couple of important rules around commands: they must represent some discrete behavior the program will do, and any command can fail. We will explore this more in the outcomes section.

The goal of identifying commands is to start identifying and visualizing the parts of the system which will be exercised when an external event occurs.

When beginning to build your ECO map, it is fine to simply identify a command at a high level.  High-level commands can be things like "gets data from the database and returns it." Often, this high-level command will help trigger thoughts around the smaller, distinct parts of the system which will run due to a triggering event.

### Outcomes ###

Outcomes are what happens when a command is run. These outcomes may be success messaging, data retrieval, or, possibly, errors.  Since any command can fail, errors are critical to understanding what will happen within the system.

With each triggering event, a user is expecting some desired outcome. Two things may happen. Either the user gets what the system can provide, or they are given information on why the system can't complete the request.

I make a distinction between what the user desires and what the system can provide only because some systems don't have the means to provide what the user actually wants.  These constraints can be design, or technical in nature, but it is important to understand the kinds of constraints you will encounter as you build a new execution path.

Often, as we start identifying outcomes, it becomes clear that new commands may need to be drawn out. This is okay. The goal of an ECO map is to generate discovery and discussion. You'll know when you're done generating outcomes when ideas don't bubble out without a struggle.

**An important note**: DO NOT force yourself to imagine every possible outcome.  It will, likely, lead to analysis paralysis, and you will never be able to guess every possible scenario. If you identify errors which readily jump to mind, you will have a robust enough list of outcomes to begin driving development.

## Building an ECO Map ##

It is worth noting on the outset, if you have not explored the domain for your problem before jumping into ECO mapping, you may find this process difficult to complete. Consider starting work by having a discussion with your product owner, stakeholders, customers, etc. to uncover the problem which needs to be solved. Often a tool like Event Storming can help. It is also worthwhile to have a storyboard of user interactions.  Understanding the kinds of actions a user can take will make it easier to drive your ECO map forward.

For the sake of this discussion, let's use the classic to do list to explore ECO mapping.  Our to do list will communicate over HTTP and write data to the database, which will add just enough complexity to understand how to slice your work.

### Picking an Event ###

ECO mapping assumes that any event and interaction is, largely, disconnected from another, we can choose any triggering event to begin.

Let's pick the "add to do" button click user event to trigger action in the system. Your map would look like this:

![Sticky note with "User Clicks Add Button" written on it](/assets/blog-images/eco-mapping/single-event.jpg)

Here are my assumptions by picking this triggering event:

- The to do item form exists, with an "add" button
- Styling and other visual concerns are either complete, or underway
- We have a place to put the new item on the page

In the grand scheme of things, this is a really small set of assumptions.

### Capturing Commands ###

Let's see what the commands would look like considering the selected event:

![Event with command sticky notes](/assets/blog-images/eco-mapping/event-with-commands.jpg)

In text:

- Client-side
  - Validate user input
  - Send new to do item to server/API
  - Display result from server
- Server Side
  - Validate user input
  - Write to do item to database
  - Send result to requestor

We can see there are roughly six high-level commands which must be written to accomplish the task at hand. These commands represent distinct behaviors which the software must **do**.

### Uncovering Outcomes ###

Now that we have an event, and commands, let's have a look at outcomes.  Each command will have **at least** one outcome.  Any command can fail. The failure condition is also an outcome. Let's take a look:

![ECO Map with outcomes](/assets/blog-images/eco-mapping/event-commands-and-outcomes.jpg)

In text:

- Client-side
  - Validate user input
    - Input okay
    - Input not okay
  - Send new to do item to server/API
    - Request sent
    - Request failed
  - Display result from server
    - Display new to do item
    - Display error result
- Server Side
  - Validate user input
    - Input okay
    - Input not okay
  - Write to do item to database
    - Write is successful
    - Write failed
  - Send result to requestor
    - Send success status
    - Send error status

### Outcomes Driving Commands ###

The outcome from one command may be the triggering event for another command.  In our to do case, if user input fails to validate, we need to handle the fallout somehow.

We wouldn't have uncovered this without our initial ECO map. Below is an updated ECO map with our validation concerns highlighted.

![updated ECO map with validation outcome commands](/assets/blog-images/eco-mapping/event-commands-outcomes-added-command.jpg)

The updates include the following:

- Client side
  - Display validation error
- Server side
  - Respond with validation error

## Test Driven Development ##

ECO mapping provides a framework for identifying events, commands and outcomes. These concepts flow directly through the idea captured in Given/When/Then and Arrange/Act/Assert.  By following the chain of events, commands and outcomes, we have a perfect vision into the tests we must write.

In our "to do" application thin slice, I can see a total of about 14 tests which must be written to cover the cases I can anticipate. This means I can read the test cases directly from the map and use them to drive the final implementation, and design.

ECO mapping also highlights the power of collaboration on a team.  The more team members collaborate as the ECO map is developed, the more likely the team is to uncover better ways to build software together. By collaborating on the map, we end up collaborating on the tests, which leads to collaborative coding.

## Finishing Up ##

Indu Alagarsamy mentioned that sticky notes are cheaper than code. ECO maps capitalize on this notion by providing a fast (5-10 minutes), cheap way of doing software thin-slicing and development discovery.

By getting together with the team and developing an ECO map together, you get quick feedback, and you also generate healthy conversation about work which must be done, and the discovery which underpins potential unknowns. Test cases emerge directly from the ECO mapping process, making it easier to test-drive the solution. This means higher quality software becomes more attainable.
