---
layout: post
title:  "Flexible Communication Media for Developers"
date:   2019-11-19 00:00:00 -0800
categories: development, communication, domain driven design
---
## The Problem ##

One of the most challenging problems I have encountered in development teams is communicating effectively as the team size increases. The more people there are on the team, the harder it is to communicate detailed information across multiple people at once.

We can quickly see this problem if we, first, consider a small team. When a team is small, say 2-3 people, communication can be fast and easy. When people work closely together, communicating becomes near instant since anyone can ask another person anything at any time.  This means, with a small team, project context is reasonably straightforward to share.

The reason for this ease of communication arises out of the number of communication channels needed to create what is referred to as a *complete graph*.  A complete graph is a graph which contains an *edge* (line) to connect each *vertex* (point).  This means, for two people, that we only need one communication channel to generate a complete graph.

As the number of people in a team grows, more *vertices* (points) are added to our graph.  When we grow from 2 people to 3, our communication channel count increases to 3. When we increase to 4 people, we must have 6 communication channels.

Now, if we consider a team of 10 or more, the channel count balloons to 45. This means, in order for everyone to communicate with every other person individually, 45 different steps must be taken.

We can actually compute this value directly by using the following formula:

```
(n * (n - 1)) / 2

where n = the number of people in the team
```

This communication load can become quite large with each additional person. Since the communication load is so high, it is common for communication to either become limited to sub-groups within the team, or the communication slows to a crawl. This communication breakdown commonly leads to hierarchical structures in order to reduce the edges in our communication graph.

## The Tools ##

Most, if not all, human language contains a significant amount of noise.  The signal is usually subject and/or verb, the noise is pretty much everything else. What I am proposing is, rather than trying to reorganize the structure, we reorganize around signal to noise.

What I propose is, we opt for important, rich communication to occur through a combination of word of mouth and *non-verbal, flexible communication media*. This term is essentially a fancy way of saying, let's write stuff down in a way that we can change it quickly and easily.

If we consider agility in development, the goal is to make code easy to change, and rich with context. It only makes sense that we could do the same for our out-of-code communication as well.

### Brainstorming ###

Brainstorming is a way to optimize for the fast capture of information in an unorganized way.  Often people brainstorm onto a whiteboard or piece of paper, but the  information is captured directly with a pen. This means we can't reorganize our discoveries in the same space we originally designed to capture the discoveries in the first place.

To overcome this limitation it is worthwhile to take our brainstormed ideas and capture them on sticky notes. By using sticky notes, we can perform an initial capture of ideas in an unordered way and reorganize them in real time.  This actually allows for a new dimension of information capture which was lost before: relations.

A simple way to capture relations is simply affinity grouping the discoveries and capture some sort of idea overlap.  A more structured approach is mind mapping.

### Mind Mapping ###

Mind mapping is a formalization of the relation information we discovered in our brainstorming session.  It is actually a natural progression once the original brainstorming round is complete.  By organizing ideas into hierarchical structures, a rich relation can be uncovered, which can, and likely will, generate new ideas which were not available before the relations were made obvious.

For information on mind mapping, have a look here: [https://www.mindmapping.com/](https://www.mindmapping.com/)

### Event Storming ###

Event storming is a semi-formal approach to capturing domain information within the context of a business discussion. Rich context can be captured and exposed as the event stormed document is built.  Event storming can be used at a small scale (e.g. as a note-taking device) or large scale where stakeholders, developers, designers, and others are all together in a room building the context together.

The larger the number of people are involved in creating the event stormed document, the higher the stakes, so it's often best to gather stakeholders and others early in a project for a large scale event storm.  Once a project is underway, low-stakes event storming can be done by taking and enhancing notes as conversations occur.

Event storming can also be used during story discovery to capture deeper discoveries and help the team identify challenges, pitfalls, and the overall scope of a new development effort.

For more information on event storming, you can visit this site: (https://www.eventstorming.com/)[https://www.eventstorming.com/]

You can also watch this video: (https://www.youtube.com/watch?v=veTVAN0oEkQ)[https://www.youtube.com/watch?v=veTVAN0oEkQ]

### Solution Space Exploration ###

Solution space exploration is a combination of brainstorming and affinity grouping to capture information about:

- Problem Statement(s)
- Desired Outcomes
- Developer and system needs

This is distinct from event storming in that the generated document highlights the boundaries of the development effort without, necessarily, defining any implementation details at all.

### Fluid Architecture Diagramming ###

This is an approach to capturing information about the current system and any changes which must be made to solve the problem at hand. The key to fluid architecture diagramming is using the same sticky note approach to capturing ideas as each of the other approaches we have looked at.

The key to fluid architecture diagramming is to create a document which reflects the system under development within the context of the current solution space. 
