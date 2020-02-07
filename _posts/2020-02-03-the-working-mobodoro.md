---
layout: post
title:  "The Working Mobodoro"
date:   2020-02-03 00:00:00 -8:00
categories: mob-programming mobbing mobodoro agile xp
---

I've heard of several teams programming in mobs using the concept of the mobodoro.  I believe in the notion of parallel development, so I'm not going to claim I am the sole inventor or coiner of the term, though I believe I introduced it at my current department.  Instead, I want to share my personal discovery of the mobodoro and how it developed in the mobs I've worked with.

I'm going to break down my experience and practice in order to make it fast to get started, and easy to return and read more later.  This post will present everything in the following order:

- How: how to get started
- Why: why I find it useful
- History: how the concept came about and developed over time

I'm presenting my experience this way so anyone reading this can dive right in and try it, even without understanding all of the whys.  The whys are next to present heuristics on how to tell whether a mobodoro could be beneficial to the team.  Finally, the history may provide insight into both my personal journey, and the kinds of twists and turns you might experience while discovering something new.

## How to Implement the Mobodoro Method ##

To start your team woking in mobodoros, the foundation pieces are the rotation, the retro, and the break.  If any of these core pieces are missing, it is unlikely the mobodoro method will stick with the team, or provide maximum benefit.

### Simplest Mobodoro Format ###

The most basic form looks like this:

- Mobodoro duration -- 25 minutes
- Rotation of driver/navigator
  - driver and navigator roles are the same as standard mob programming
  - the length of time for any one person is (25 minutes)/(# of mobbers)
  - length example: 5 mobbers, 25 minutes, rotations occur every 5 minutes
  - people seem to settle into about 3 minute rotations as a "sweet spot"
- Retrospective/Reflectrospective
  - a short (3 minutes or less) retrospective of the last round
  - may be very informal, more of a reflection
- Break
  - a disciplined break after each 25 minute period
  - allows people to take a bio break, rest their eyes, stretch, etc.
  - long enough for a reasonable bio break (5-7 minutes seems to work well)

Although this looks like a lot of bullet points, really it's just an interleaving of the ideas of mob programming, mixed with a pomodoro. The key to this simple form is to develop disciplined practice around rotating, retrospecting, and breaking. With this cadence it becomes resonable to work in a mob with others all day, without feeling too exhausted.

An extra note, by retrospecting every 25 minutes, stakes tend to lower and conversations become more natural over time.  There is little time for issues to linger, and become bigger sticking points, meaning the developers working together can find solutions to small challenges more easily.

### Experimental Mobodoro Formats ###

Once the discipline around rotations, retros, and breaks has been developed, and people feel confident with the tools, it's reasonable to start experimenting with the format. The critical piece, which must stay in place is the rotation -> retro -> break, in order to provide a familiar structure which reinforces what people have learned.

Experiments are best done one at a time, in order to identify whether they are affecting the change you are looking for. The most common experiments I've seen or been a part of are rotation time length, cycle time length (all rotations completed for a single mobbing cycle), rotation count length, and integration of other things into the cycle which must be done periodically, like email.

So far my personal favorite experimental format is the following:

- 15 minute cycle time
- 1 minute rotations (3-5 mobbers)
- 1 minute retro each cycle
- break every other cycle
- check email after break

This means, with 5 mobbers, each mobber will be at the keyboard 3 times per cycle, a retro will occur every 15 minutes, and a break is taken every 30 minutes.

It is worth noting, this format was discovered through running experiments, rather than simply jumping right into it.  Often people who are used to 5-10 minute rotations find 1 minute rotations to be far too fast. On the other hand someone who is finding 3 minute rotations too long might get benefit from shortening the rotation time.

### Automating The Mobodoro ###

Automating the mobodoro format is done to offload things the team must remember. If you are already using a mob timer to keep rotations moving along, you are most of the way there. Some timers are a little more primitive, and may require some creative setup to automate your preferred format. Others, like [Mobster](http://mobster.cc/), have features which allow you to set length of rotation, break interval, and the like.

The automation I have seen be most successful tends to involve integrating non-human elements into the timer so it periodically reminds the team to do something. This kind of reminder is great for things like email, committing code, running tests, etc. I fid that other things like "check your calendar before starting, at lunch, and at EOD" tends not to integrate well.

## Why Use the Mobodoro Method ##

I have found the mobodoro method is best suited to the situation where you want one or more of the following to improve:

- Identify improvements quickly and iteratively
- Improve team cohesion through regular communication
- Deliver higher value software through constant collaboration
- Ingrain disciplined practice into the team
- Build the retrospective muscle
- Develop emotional endurance

Let's take a look at each of these heuristics and what they mean:

### Identify Improvements Quickly and Iteratively ###

It's common for teams to retrospect once a week, or even once a sprint.  Though these retrospectives may provide value, the turnaround on experiments tends to be slow, and the indicators tend to trail. This makes it difficult to make fast changes and observe results at the speed of work. By introducing retrospectives into the course of daily work, the immediate team can find, troubleshoot and eliminate challenges which might have been plaguing them.

### Improve Team Cohesion Through Regular Communication ###

Short rotation cycles put developers in a position where they must learn to communicate ideas clearly, and succinctly. This focus on clear communication, coupled with high-frequency retrospectives provides the foundation for team members to learn how to communicate with each other well. The repeated process of retrospecting also encourages regular, thoughtful communication. That communication improvement is the bedrock for effective collaboration.

### Deliver Higher Value Software Through Constant Collaboration ###

Teams deliver high value software when they collaborate. The closer they get to constant collaboration, the value of the software created increases to the point where the primary hindrance is whether the next most important work is actually the most valuable to the stakeholders.

The mobodoro method provides a framework from which we can hang our collaboration. With a focus on rapid rotations, frequent retrospectives and constant experimentation, it becomes easier to collaborate effectively, constantly.

### Ingrain Disciplined Practice Into the Team ###

Disciplined practice is anything which is done intentionally on a regular interval. The mobodoro method focuses heavily on disciplined retrospectives, and disciplined breaks. Disciplined retrospectives will help the team be more effective in the retrospectives which are part of the larger conversation. Disciplined breaks make it easier for the team to build up endurance for the emotional work which needs to be done in constantly collaborating with each other. 

### Build the Retrospective Muscle ###

Since retrospectives are, commonly, an infrequent event -- separated by weeks -- it takes a long time to build healthy skill in being part of an effective retrospective.  The more frequently people are exposed to retrospectives, the faster they will build the "muscle" to be a part of, and even facilitate, an effective retrospective.  This means, by having lots of small retrospectives, the big retrospectives will actually improve!

### Develop Emotional Endurance ###

Constant collaboration requires empathy and thoughtful interaction. Working this way can be exhausting, especially for people who need time alone to recharge.  By introducing disciplined breaks, it provides people with a safe space to recharge momentarily.  This recharge will help people develop more emotional endurance, leading to healthier collaboration.

### Caveat Emptor ###

This is not a comprehensive list of heuristics, but these are the things I have found to improve most when I work in a mobodoro style with teammates. It is also worth noting that, if none of these sound like issues you need to resolve in your mob, perhaps the mobodoro method isn't right for your team.  Likewise, if you find that working in a mobodoro style isn't conferring any benefit, you may want to replace it with a different pattern.

All of this said, if working in a mobodoro style makes something painful, you have discovered a problem you and your teammates may not have been aware of.  Try leaning into the pain and look for the cause!

## History ##

### The Earliest Experiment ###

The earliest experiment I ran on mixing mob programming and the pomodoro technique was centered around the fact that people were feeling very frustrated by trying to communicate their ideas to each other. In order to help ease the pain, we tried running 25 minutes worth of keyboard time for each mobber, so they could explore, explain, and share.

This short lived experiment led to poor communication, disengagement, and a cowboy attitude toward developing software. Ultimately, the experiment was abandoned, but not forgotten.

### The Before Times ###

About a year after the earliest experiment, I found myself in a different team with different problems. We were struggling to communicate, much like before, but instead of just having communication breakdowns, we actually were fighting over control of the direction. We were communicating only the smallest of behaviors with each other, and the overall direction was not obvious. Moreover, the disengagement during each rotation was very high.

Willem (Larsen) was one of the people on this team, and he suggested shortening our rotation time from 7 to 5 minutes. Just removing the two minutes from our rotation time reduced the disengagement, but increased the pain around communication. Jason (Kerney) and I found it difficult to convey our ideas in 5 minutes, and were often frustrated by the reduced time for navigation.

At one point, we decided to start doing regular, short retrospectives. The more we talked, the easier it was to collaborate. At this point, we started using the mob timer to automate remembering to retrospect regularly.

This is when the pieces fell in place for me.  I suggested that we subdivide 25 minutes between the three of us, and aim for a pomodoro style work/break behavior.

### The Early Age of the Mobodoro ###

Once we put the mobodoro structure into place, we started experimenting with identifying work we needed to do aside from writing code. We started integrating time for breaks, retrospectives, email checking, schedule checking, code commits, and more.

During this time, we experimented with the amount of time we spent on each rotation, the length a break needs to be to allow for bathroom use, getting coffee, or anything else someone might need to do before jumping back into work.

### The Middle Era ###

Our rotation time began to settle at 3 minutes.  We also started introducing retrospective questions into the mix, which we found most useful for surfacing information, and ideas. As we settled into a formula which worked for us, we started focusing on other, more pressing problems.

I believe, this was also when we started to feel like we were stagnating. Changes weren't as drastic, and they come less frequently. We found ourselves focusing more on the code, and technical issues. This shift away from process improvement made the retrospectives feel lackluster, and uninspired.

We had become highly effective, but we needed new inspiration.

### The Current Era ###

Willem and I had started developing a hypothesis on what the minimum rotation time might be. My theory then, and now, is that time at the keyboard must be longer than the time spent rotating the new mobber into position. We decided that the next interesting rotation time experiment could be a 1 minute rotation.

Some time later, I had an opportunity to try out the 1 minute rotation -- sadly, without Willem or Jason. Something interesting happened: we stopped writing code and started talking about it, instead. We discussed what we wanted to do, why it was valuable, and what we might be overlooking.

This new experiment was run during a training exercise where multiple mobs were all doing the same thing. When we broke from the exercise and returned to reflect with the rest of the group, the mob I was in actually produced the same amount of work as the other high-performing group. The difference was, our group spent most of our time discussing what we wanted to accomplish and the direction to take next.  The other group hunkered down and just hammered the code.

This was telling since we spent far less time actually writing code, and more time discussing, but we were actually able to produce the same result, at the same quality, as the other group who didn't prioritize communication.

I realized right then that no matter how many -- or few -- people are in a group, writing code as fast and furiously as possible, it's not more valuable than the conversation which happens between the people who are working together. More than that, when the communication between members increases and improves, everyone actually contributes at the same level!

## Moving Forward ##

I'm still experimenting with ways to improve mobbing with others, and challenging what I believe is true about the mobodoro method. All of the observations in this post are retrospective in nature, and may only be part of a larger story. Nevertheless, the most important aspects I find to hold true are the value of communication, collaboration, and frequent experimentation.
