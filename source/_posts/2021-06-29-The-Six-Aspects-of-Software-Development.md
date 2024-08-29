---
title: The Six Aspects of Software Development
date: 2021-06-29
tags:
    - software-development
    - human-centered-code
    - sociocognitive-software-development
---

There is a sense of click-bait, and one of the most common forms is n-best lists. These are the 10 best basket weaving solutions on the market. Here are the 5 best practices of highly successful cat herders. Vampires HATE these 3 things do them to stay safe in your parking garage. They are right there. You almost want to click them to read more, right?

In the software development social sphere, the most pervasive n-best lists are things like “the 5 best skills to have as a software developer”, or “the 3 most important things you’ll do for your software development career”. Every time I see these lists, I can’t help but ask “are these really the most important things?”

Frankly most of the time, these people are putting a list together of the things which saved their butt today, or this week. To that end, I can’t blame them. On the other hand, claiming these things are the best ever seems a little disingenuous.

Over the past year or so, I have been diving into a lot of social science information. I did a six-month crash course on foundational linguistics topics. I’ve been reading about cognitive science. Lately, I’ve been reading about cognitive load theory. What I’ve come to believe is, the reason people don’t know where to put the new great thing they learned is, they don’t exactly know what way it helped them.
People write software. Software is created for people. Software is really about people creating solutions for people. Of course, what this means is, every aspect of software is influenced heavily by the people who created it. Mel Conway recognized this in the 1960s, so this is not particularly new.

There is a pattern which gave me a clarity of thought regarding software development and how we can actually best use our energy to become better software developers. I can identify 6 distinct aspects of software development as a whole, and it’s really all about people. These aspects are:

- Understanding
- Communicating
- Teaching
- Learning
- Reading
- Writing

No software developer ever does exactly one of these things. Instead they are parts of a systemic whole which defines the way people go about software development day to day. Each of these system constituents represents an entire model of how we operate within that space. I won’t attempt to cover it all today. Instead, I’d like to propose how each of these aspects of the software development sociotechnical model impacts our daily work.

## Six Aspects of Software Development

### Writing

When people think of software development, writing is the thing they think of most readily. In fact, what they really think of is just one very narrow aspect of writing software: writing instructions which tell the computer what it is supposed to do.

This naive understanding of software is what leads people, frequently, to the idea that everyone must “learn to code”. Of course, learning to simply write code is much like teaching someone the alphabet, handing them a book on grammar and a dictionary, and saying “get to work, you have a report to write”.

Writing software is an interactive process where the developer, or developers, consider a problem, and devise a solution. They validate the solution as they work by either testing inputs and outputs by hand, or writing automated tests which provide just-in-time feedback.

We can continue to expand our understanding of writing to include the automated tests. Skilled test authors capture a significant amount of information in their test suites. The entire generated set of source documents – tests and production code – are a written body of work which can, and will, be read by other developers who extend and support the software created by you.

### Reading

In its simplest form, reading source code is the process of looking at, and unraveling logical structures in a source document, then performing some rudimentary execution in your head to understand what happens when that code is run. This is, in my opinion, ill-advised. Computers can tell you what the code outputs when you provide an input.

With the development of automated refactoring tools, reading has become a much more active behavior. When software has an acceptable level of testing, it is reasonable to actually read the code by gaining understanding of a small portion of the code, then using the an automated refactoring tool to capture the discovery in the source document. (Read by Refactoring, devised by Arlo Belshee)

Reading the source code can also provide insights into the problem domain, depending on whether the domain information is well embedded in the source. As we learn to actively read our source code and add insights in place, domain knowledge can be embedded into the test and production source, which will lead the next developer to ask fewer questions like “what does 5 mean, and why are we checking if it is in the list” and more questions like “why do we no longer support feature x”.

### Learning

As developers settle into new positions at work, they must learn about business problems, and how the code solves those problems. There are four things developers spend a significant amount of time learning: technical foundations, problem space concerns, team-specific code patterns, team politics.

Technical foundation knowledge is the kind of knowledge which is used to become more effective creators of written logical documents. Technical foundations do not necessarily make source documents better, instead they provide the means to create source documents at all.

Problem space concerns are what the business cares most about. Combining an understanding of technical foundations, and the problem space, software developers can create a solution to the problem. The solution may not be right, and the code may not be immediately coherent, but these are the core to developing a first-pass software solution.

A parallel to the problem space is team-specific code patterns. Code patterns may be agreed upon coding standards like indentation, naming conventions, etc, or they may be more involved, like a common structure for microservices, including reuse of shared code. The problem space and the team-specific code patterns are two sides of the same coin – one serves the business, the other serves the team. When one or the other is missing, any developer would be at a significant disadvantage when working with a team.

Finally, we all must learn team politics. Regardless of how friendly and accommodating the developers in a team may be, there is a dynamic which has developed organically. To work effectively within a team, it is critical that all developers learn where it is okay to exert pressure, and where it is not.

Although these may not, on the surface, seem like software-developer problems, they are, at their core, the things we must learn about and adjust for on a daily basis.

### Teaching

Just as developers on a team learn from one another, and the code, they also teach. Teaching comes in the form of tests, production source, documentation, human interaction, and communication. Teaching pervades everything we do as we develop software.

It has been said, there can be good design, and bad design, but there is never “no design”. In much the same way, there is never “no teaching”. People are social creatures and we take cues from people around us whether there was intent or not. Many norms have proliferated simply because nobody thought to say “hey, don’t actually do that”.

The source code we write provides instruction. When people read the source code which already exists in a project, they will infer information. There are assumptions made about style, content, problem space, etc.

In the same way, our actions instruct those around us. This means that when we act without intent or care, it unintentionally informs the people around us. Actions teach about social norms. Those norms will make their way into the source code whether we want it or not.

> A system will mirror the communication structure of the organization which made it – Mel Conway

As developers we must be aware of, and use our skills of instruction as best we can. The people around us depend on us to be honest about our intent, and consistent with our behaviors. They depend on the code to reflect the way things are best done. They rely on clear understanding of the problem space and what we are doing to serve the business and the people who rely on our solutions.

### Communicating

We talk about things all the time. Some of us talk too much and listen not enough. Nevertheless, what we need is real, rich communication. Communication is not merely talking, it is listening, synthesizing, and conveying fresh information.

If we consider synthesis as part of real communication about building software, it means we rely on other skills. One important skill is understanding. This means, in order to effectively communicate with someone about the solution being built, we must have a certain level of skill regarding understanding.

I’m not going to dive into recall at the moment, but understanding and recall go hand in hand. The entire process of communicating effectively, in a way that can be received by the people you’re communicating with, requires you be able to recall information, and actively understand how it relates to the communication at hand.

### Understanding

Understanding is not a state of being, but an activity we undertake every time we interact with the software we build and support. Understanding is an active behavior centered on thinking about, chunking, and reorganizing the information we need to consider in order to build software effectively.

Understanding includes design and architectural patterns, testing approach (though not writing tests), domain concepts and domain driven design, and more. The most important takeaway here, is understanding does not actually include doing. Understanding involves looking at the source projects and evaluating how they are constructed, and for what purpose. It is the point at which problem domain understanding and technical knowledge meet.

By viewing understanding as an active engagement in teasing apart the software, we can also use this as a jump-off point for improving how we approach our understanding. Rather than understanding being a static state, it is a skill, which involves discovering information and reorganizing it into manageable chunks for consideration. This process of discovery and reorganization is a skill which can be developed over time.

## Now What?

This was kind of a rambling round-up of the six aspects I have spotted in software development. This is unlikely to be the best write-up since there is so much discovery left to do. Nevertheless, once I found I was staring at six interrelated constituents of a larger system, many of the challenges developers struggle with became clear.

Some developers struggle to identify the “most important things to know”. This likely comes from one of a few potential reasons:

- not understanding that learning is an incremental discovery path
- not understanding that different skills impact outcomes in different ways
- not understanding that there is no single discrete skill which will make or break a developer on their career journey

These 6 aspects are merely a lens we can use to evaluate where we, or others on our team, may be struggling. Moreover, there are complementary, and augmenting aspects. This means, if someone is struggling with reading code, it may mean the way code is written may be introducing a challenge. On the other hand, it may mean there is a learning gap, so we need to use our teaching skills.

Like any system, there is no single path to improvement, but there may be indicators of ways we can budge the needle without needing to spend a significant amount of time and effort to get people where they need to be next.

I hope this provides some usable insight which helps you and your team to become a little better than you were before. I’m really excited about what comes next with this all, and I hope we can discuss it soon!