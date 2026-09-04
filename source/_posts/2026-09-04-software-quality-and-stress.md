---
layout: post
title:  "Software Quality and Stress"
date:   2026-09-04
categories: 
    - Coding
    - Software Quality
    - Stress
    - Cognitive Load
    - Code Smells
    - Linguistics
---
When writing, editing, and reviewing source code, there are markers of poor internal quality. Popular parlance for these common issues calls them code smells. I've found that more often than not, when one code smell appears, there is another that is comorbid: primitive obsession.

Primitive obsession is when individual values which belong together are handled separately as data primitives. This is particularly common when things grow organically without any intervening effort to rein in the data and create a cogent design. Generally, when I see primitive obsession, I find other code smells lurking around.

Although primitive obsession is data-related, I believe there is another sort of primitive obsession which haunts code struggling against entropic design decomposition - language primitive obsession. Language primitive obsession is when primitive language constructs are left as a pile of logic rather than being collected up and turned into domain abstractions. This pernicious sort of smell leads to all sorts of issues including massive methods and functions, duplication, copy/paste logic replication, etc.

So these programs were just written by bad programmers, right?

Truthfully, no. In fact I believe that even the best programmers, when put in hyper-stressful environments, would produce code like I've described. I would argue the number one reason that code smells turn up, even in environments with strict code review policies, is high stress. In order to understand the effects of stress on source code, let's have a look at some of the things social scientists have already identified.

## Cognitive Load Theory

Cognitive load theory is an instructional framework for developing curricula which meets educational outcomes and successfully allows learners to absorb material more effectively. Since software development is knowledge work, learning is a core component of the work itself. This means that structuring your work around learning will necessarily incorporate elements from cognitive load theory.

Cognitive load theory is built on the existence of three distinct sorts of cognitive load:

1. **Intrinsic load** - the cognitive effort required to accomplish a task, e.g. learning or writing software
2. **Extraneous load** - unnecessary or external influences which add to the cognitive effort necessary to accomplish a task
3. **Germane load** - the mental effort required to convert learning into long-term memory

In software the intrinsic load is best understood as the mental effort required to solve a programming problem. This may include experimenting, coding, and researching. Extraneous load can come in many forms, including computer software maintenance, yak shaving, environmental distractions, and unnecessary or exceptionally high stress. Given the nature of these extraneous elements, germane load can increase, especially when the developer is under high stress. In fact high stress can negatively impact the brain's ability to solve problems and form long term memories. [[1](https://www.americanbrainfoundation.org/the-brain-and-stress/)]

## Effects of Stress on Speech

Given the impact of stress on the brain and how it effects germane load, it is unsurprising that stress also impacts the way we think and speak in the moment. Stress can actually lead to language that is simpler, and less rich. It can lead to repetition and actually narrows cognitive flexibility. [[2](https://pmc.ncbi.nlm.nih.gov/articles/PMC4059522/)] This means that someone who is under a substantial amount of stress is going to actually fall back to simpler overall language, though they may fill the space with repetition or the production of more, but simpler speech, i.e. rambling. 

Now if we consider the impact of stress on source code, we can see how stress might lead to simpler program construction and a larger volume of source code for the same outcome. In fact, given what we know about cognitive load, speech, and stress, it seems highly likely that the reason your coworker wrote this long, rambling block of code using simple language (primitive language obsession) structures is because they are under a high level of stress causing their programming skills to suffer.

## Reference articles:

1. The brain and stress: [https://www.americanbrainfoundation.org/the-brain-and-stress/](https://www.americanbrainfoundation.org/the-brain-and-stress/)
2. Speaking under pressure: [https://pmc.ncbi.nlm.nih.gov/articles/PMC4059522/](https://pmc.ncbi.nlm.nih.gov/articles/PMC4059522/)
