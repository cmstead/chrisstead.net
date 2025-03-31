---
title: "Write Tests During Your Interview"
date: 2025-03-30
categories:
    - testing
    - interviewing
    - work environment
---
Something I haven’t thought about in a long time is solving toy problems during an interview. Recently I did exactly that - I had an interview involving a LeetCode style toy problem. I got some feedback I wanted to share because it is telling. I'm the first candidate the interviewer had met who test-drove a solution. I got the second interview because of it.

Test driving is more than writing tests. Even so, the act of writing tests is still enough to make your interview experience smoother. Being able to write tests in an interview setting will set you apart from other candidates.

In this post, we are going to explore how automated tests will help you do the following:

- Keep track of what you have done and what you have left to do
- Change the code you've written to handle new, unforeseen needs
- Spot bugs in your code to shorten the time between writing new code and debugging

All successful candidates I've seen in interviews account for these three things. Unsuccessful candidates tend to stumble because they are missing an organizational skill. Automated tests help you keep these three items in focus. They provide a crucial organizational framework on which you can lean.

## Keeping track of tasks

Part of the appeal of toy problems for interviewers is that they are tricky in some way. They introduce a problem that looks simple on the surface but has a lot of little traps and potholes along the way. The best thing you can do to keep from falling into the traps is to break down the tasks you want to tackle. After you have your tasks sorted out, prepare to pivot.

If you are a test-after type person, that's fine, but write a comment down on what you mean to do next. Maintain ruthless focus on your task. Anything that gets in the way is either a product of the task or a distraction. Write notes on the distractions and stay focused on the immediate outcome. Solve only the problem at hand and don't look at the clock.

You wrote your comment. Now you have your solution crafted. Write a test. Make sure your test reflects the problem and your current solution. Focus on input and output and ignore the implementation. Implementation always changes, and yours will too.

Pause.

Let's review what happened. You:

- Wrote down a task
- Solved the immediate problem
- Put the solution in a vise so it doesn't move while you work

These are crucial elements of keeping track of your tasks. Don't delete the comments when you finish. Don't delete any tests. Keep these pieces exactly as they are. You might need to come back and read them again. Also, your interviewer will likely review all the test artifacts at a later time. You want to ensure they have everything they need to advocate for you.

Repeat this process as you solve the larger problem. If you run a test and discover something has changed, stop immediately. Fix your code. Don't move forward again until all your tests are passing. Passing tests are your lifeline, so keep them green.

## Change your code to meet new needs

Solving toy problems often leads to unexpected discoveries. These discoveries come in three flavors:

- Germane work: this work is part of the task at hand
- New tasks: these are requirements that were not obvious at first blush but need attentio
- Extraneous discovery: These discoveries set a boundary for what is in and out of scope

While working on a task, pause on each discovery and decide if it is germane to the current task or not. Every discovery deserves consideration, but not everyone deserves your effort. If a discovery is not germane, is it extraneous or not? Capture your thoughts as you go. Interviewers want to know if you are considering these concerns.

These considerations serve core elements of the development process:

- Identifying tasks
- Writing and modifying code
- Capturing discoveries
- Delivering working software

If a discovery is part of the solution for your current task, make a note and address it immediately. This new work may require changes in your original assumption. It may be an extra element of the work already at hand. No matter what the case, if it is context that was not clear before, add a note in the test. Your tests are your notebook. They will guide the changes necessary in your code.

If a discovery is not part of the current task, add a comment in your test block and complete the task at hand. Once the current task is complete, look at your notes. Ask questions. Sort requirements from work that is out of scope. If your discovery surfaces a new task, it is likely the next piece of work you need to do.

Testing while interviewing keeps you centered on core elements of software development. These elements keep you focused on the most important work. Tests, as an organizational framework, help keep your priorities clear. Clear prioritization will set you apart from other candidates.

## Spotting bugs in your code

Spotting bugs goes hand in hand with changing code. Bugs don't appear in code spontaneously. They emerge from changing code to do something new or different. To this point, tests have been more about note-taking and ensuring that your code works as expected. Catching bugs is where your tests will shine in interviews.

If you have been following my advice this far, you have been writing and running your tests. If you haven't been, it is time to start. Every time you make changes to your code, you should run your tests. This is a rule. Any time you break this rule, a bug will catch you off guard.

When a bug emerges, the following events occur. First, you write some code and expect it to work. Next, you run your tests. Your tests fail. You do a double take. Then, you see the problem and think back to the change you made thirty seconds ago.

Then you thank me.

The more often you run your tests, the faster you will spot new bugs in your code. Spotting bugs by running your software may seem like putting a target on your back. The interviewer isn't interested in the fact that you created a bug, though. They want to see how quickly you find bugs and how you address them. In other words, spotting bugs quickly is a good thing.

Sometimes a bug highlights a misunderstanding or conflict in project criteria. This is an opportunity to discuss the acceptance criteria for the session. Sometimes interviewers will request more changes after you're done. Your tests will give you the confidence to make changes, knowing your solution is stable.

## In closing

Writing tests is a hygienic practice that has real-world benefits during interviews. You can:

- Keep track of what you have done and what you need to do
- Keep your code in a test vise while making new changes
- Spot and resolve bugs quickly

Each of these is a quality interviewers look for in good candidates. Coming in armed with the ability to test your code makes it easy for you to stand out. The tests you write will serve to explain how you arrived at the solution you used. This will make it easier for interviewers to advocate for you if they think you are a good fit.

A last bit of parting wisdom: practice early. Don't try to write your first test during an interview. The interviewer will see you are uncomfortable with the practice and it can hurt you. Be sure to spend time when the stakes are low and get good at writing tests. With a strong testing muscle, you will walk into interviews with confidence.
