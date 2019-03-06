---
layout: post
title:  "Learning Javascript Differently"
date:   2016-03-02 08:00:40 -0800
categories: Coding, Foundation, Functional Programming, General Blogging, Javascript
---
{% raw %}
On Thursday and Friday I was at a convention called Agile Open San Diego. The core idea is people getting together and having two full days of water cooler discussions about agile development and leadership. It's pretty cool and you should go to one near you.  Anyway, something happened on Friday morning: I realized we need a new way of approaching language learning.

Currently there are a number of ways people can learn languages including classes, videos, code schools, code katas and more. The most important thing I have noticed is this: none of these really do a good job of building the language into your brain quickly or permanently.

I have watched people who are new at programming struggle through code katas after working through videos and online learning processes. I think it's time for something different. Borrowing against the ideas of code cooking and the way martial arts are learned, I created the first form in a series of forms for Javascript learning.

<h3>What a Form Is</h3>

In in certain martial arts, a form (much like a kata) is a scripted set of motions which help to define a dictionary of movements the practitioner will use when sparring or in a fight situation. The form is important for developing muscle memory and deepening the mental relationship with the art.

When developing a relationship with a new language any experienced programmer picks a project to do which will force them to go through the motions of asking all the questions they need to ask to really understand how the new language ticks. This is the driving idea behind doing code katas. Katas force a programmer to look at the language they are working with and ask the same kinds of questions.

What if the new language is also the FIRST language?

A new programmer won't necessarily even know the first questions to ask to get to the right questions. This is why katas help sharpen developers but don't bring new developers up quickly.  This is what a form will help to fix. Instead of placing a problem in front of a new developer, it places the code and asks them "what does this do?"

Here's a quick start video I made to give a better idea:

<iframe width="420" height="315" src="https://www.youtube.com/embed/6G3PH4vb_gc" frameborder="0" allowfullscreen></iframe>

<h3>Creating the First Form</h3>

In the language forms design I envisioned a total of (probably) six forms. Of course before there are six, <a href="https://github.com/cmstead/jsLearnerForms/blob/master/forms/first-form.js" target="_blank">there must be one</a>.  I wanted to emulate a system I already understood, which meant that the first form should be the gateway to greater understanding. I wanted to introduce some of the most common aspects of the language and use a problem which had a lot of room to grow.

Ideally, if the language student were to work through only first form, they would have enough knowledge of the language to start solving problems. The solutions may not be elegant and they would likely not seem refined to the veteran programmer, but solutions and doing are the path to greater understanding.

With all of this in mind, I chose a problem which covered interaction with vectors. Though this sounds pretty "mathy," anyone who has completed an intermediate course in Algebra should be able to understand what is happening.  Vectors represent just the right amount of leg room that the problem would be understandable by the accomplished first form student and had plenty to grow on for the third form student.

After choosing a problem that met my needs, I started creating the code. I want first form to represent the way someone would actually work through the problem in an agile environment.  This means every step the student takes, there is a test to validate their progress. It becomes far less important for them to sit and scrutinize their code to make sure they got every character right on the first pass since the process is: read the test, write the code, run the code.  If the code runs and it looks like what the golden example presents, it must be right. This gives students early comfort through TDD and small-step development.

<h3>Leveling</h3>

Something I personally have a terrible time with when I am trying to teach someone something is setting aside what I know. I want to give the student everything and have them see why I take such joy in what I do. It doesn't ever work that way. Instead, I end up overloading them and they have trouble absorbing what I am trying to share.

Lynn Langit encourages the idea of leveling in her <a href="http://teachingkidsprogramming.org/" target="_blank">Teaching Kids Programming</a> process. Leveling is the idea of presenting a simple idea that does one thing. Once the core idea is understood, then enhancing the idea with a greater concept, while reinforcing the original idea. All programming builds on more foundational concepts. This means that any topic can be taught through a leveling approach.

Language forms should work this way.  The first form actually opens with a greeting. This mirrors the kung fu tradition of performing a greeting or salute to Buddha. The greeting is, essentially the foundational Hello World program, TDD style. We could call this a salute to the programming force, or something. I haven't come up with a name yet, but it's coming.

After the greeting, the very next thing first form does is it presents the concept of squaring a number. We don't need to understand the entire process yet and the full problem is largely academic so the student can focus more on growing to solve the entire problem instead of trying to understand what it does. As we said before, katas are great for sharpening problem solving, this is all about developing a relationship with the language itself.

As we move through the process of solving the entire problem, the student will go through the process of small-step design, abstraction, TDD, conditionals, loops, variables, functions and so on. First form is a guided tour though the way a professional programmer works without the fear and intimidation that comes with getting thrown in with the sharks.

<h3>Later Forms</h3>

After the first form student has successfully grown to proficiency, they will need to move to the next form.  Currently, only the first form is complete, but the second and third forms will actually make subsequent passes over the same code that was covered before.  This process of enhancing existing code provides direct insight into identifying patterns, refactoring and smoothing out the edges on legacy systems.

Later forms will pull in concepts like closures, object orientation, higher order functions and so on. The process of creating custom types will be brought to the fore and, by the third form, the student will start learning ways to escape common pitfalls and smells by using well known patterns. They will be able to use what they have learned to improvise on solutions and find their way out of sticky situations.

Forms beyond the third are still in the embryonic stage in my mind, so they will come as I discover how to develop them. So far, I know they will likely not cover the same ground, but will, instead, dig into deeper topics like Gang of Four patterns, algorithms and data structures and greater language mastery. Understandably, not all students will want to go this far with a single language, but ideally, this would provide a means for the dedicated language student to open up greater discovery channels they can follow on their own.

In the end, all of the forms should create a comprehensive system for teaching language through immersion, muscle memory, leveling and, in the end, understanding.  The forms are made, not to be done once, but to be repeated again and again to develop a comfort with the language without trying to force the student through solving puzzles and toy problems which they may not have the answers for yet.

Check out my progress creating <a href="https://github.com/cmstead/jsLearnerForms" target="_blank">Javascript forms on GitHub</a>.
{% endraw %}
    