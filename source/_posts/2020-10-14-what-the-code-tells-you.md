---
layout: post
title:  "What the Code Tells You"
date:   2020-10-14 00:00:00 -0800
categories:
  - programming
  - code-authorship
  - design
  - affordances
---

The world around us contains a number of contextual clues we have become so comfortable with, it's common to forget they are there at all. These contextual clues are often referred to as _affordances_. An affordance is a contextual clue about the way something works, or what it does. This is generally applied to the environment surrounding us, but it can also be applied to things like visual design.

## The Door ##

One of my favorite examples of an affordance is the design of some doors, typically found in corporate and retail spaces. The type of door I have in mind is one with a pull handle on one side and a push bar on the other. You've probably seen these doors, interacted with them, and never noticed that they actually provide context clues as to how you should interact with them.

The structure and design of the door is centered around informing the user how to interact with it appropriately. When on the side with the pull handle, all you need to do is grasp the handle and pull. From the opposing side, you push the bar and the door opens.

The clues in this type of door abound!

The pull handle tells you how to interact with the door. It also tells you the direction the door will swing. If you are on outward-swinging side and passing the door, you know to give a wider berth. Likewise, the push bar on the inside tells you the door can be opened with a push, and it also tells you the door opens outward. If you are a mindful person, you might push the door open slowly so you don't accidentally injure someone.

Affordance!

## Source Code ##

Programming languages come with their own set of affordances. Some provide more clues than others. For example, a language like Python provides block definition by way of colons and indentation. Though this may simply seem like "the way the language is," this choice was made in order to instruct the reader as to what block they are currently looking at.

Another interesting side effect of using **just** indentation for block identification is, it becomes difficult to see where the block started from in a multi-screen long block of code. The side effect of this is the programmer is actually incentivized to keep their blocks short and focused.

Indentation in this case provides context clues as to how the language should be interacted with at a block level. Moreover, the context clues pass from the interaction of writing code to the action of reading it.

Since source code is a written document, it will necessarily have authors and readers. Some people will be both. By adding context clues about how to both read and write the code, and having a clue like indentation guide the author, someone who is writing the code now will be guided in a direction that would make life easier for the reader.

## The Conditional ##

There are other affordances built into languages as well. Programming languages all have some means of choosing. This choice can be provided through conditional blocks, like if/else statements, or through more subtly coded behaviors like the filter function in JavaScript.

The thing that got my head going on affordances begins here. Operators and programming structures tell you a lot about what they do, and what they mean. Some of that knowledge comes from cultural context, some of it comes from interpretation of the words used in the language itself.

In JavaScript there are two expressions that explicitly handle logical branching (conditions). These are the if/else statements, and ternary expressions. Let's have a look at each of these.

First this is what an if/else statement might look like:

```javascript
if(isADog(animal)) {
  console.log('Woof!');
} else {
  console.log('Baaaaa!');
}
```

Though I've assumed there are only dogs and sheep, the conditional speaks for itself. Now, let's have a look at a ternary expression used to accomplish the same goal:

```javascript
const sound = isADog(animal) ? 'Woof!' : 'Baaaaa!';
console.log(sound);
```

This second example produces the same result as the first, but the written code is more cryptic. Ternary expressions provide information contextually within the scope of a cultural group. People who have only ever written Python or Lisp might not recognize this structure at all. Meanwhile someone with a background in C, C++, C#, Java, JavaScript, etc, would recognize this as a ternary expression.

I provide this information without any statement of judgement. These are simply two ways of accomplishing the same thing.

## The Logical Operator (Boolean Operator) ##

In Javascript, and a fair few other languages, there are operators for expressing "and" and "or" in logical expressions, they are, respectively, `&&` and `||`. These are used for evaluating logical ideas like "this is a dog, but not a corgi" or "this is a sheep or a really strange cat"  These expressions would look something like this:

```javascript
isADog(animal) && isNotACorgi(animal);
isASheep(animal) || isAStrangeCat(animal);
```

Given this information about the intent of the `&&` and `||` operators, we can clearly see that, in JavaScript, `true && 'Woof!'` would resolve to "Woof!". Likewise, `false || 'Baaaaa!'` would resolve to "Baaaaa!".

No, I'm not joking. This is not a bash on JavaScript. It's just the way the language works. We can even rewrite our previous example this way:

```javascript
const sound = isADog(animal) && 'Woof!' || 'Baaaaa!';
console.log(sound);
```

I don't know how you feel about that code, but it makes me a little dizzy. I actually consider this to be a [_load-bearing bug_](https://twitter.com/Grady_Booch/status/1290471083934715904). People have come to rely on this behavior, but is it something that would be sensible, even within the Javascript community?

I would argue that this behavior, where the logical operator returns a non-boolean value, is an overload of the operator. I generally find that _overloading_ operators leads to confusion. Why would we want something that is performing boolean evaluation to also return values in a not-completely-arbitrary way?

If we look at the history, and the larger programmer community, I believe people are more likely to find this behavior surprising. This actually flies in the face of the [Principle of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

> As an aside, if you don't consider the Principle of Least Astonishment as applicable to programming languages, I urge you to consider that a programming language is a human-centered (hopefully) API for a program that will create a run a program.

## A Heuristic for Reading Complexity ##

A good way to measure whether something will be easier or harder for another person to read is the formula I provide below. I want to note this formula is not mine, I can't find the original author, and I provide it with almost no surrounding context.

To compute the reading complexity of source code,

1. Take the time it takes to read the line
2. Multiply it by the number of times you guessed wrong about what it it does.

When leaning into the language affordances, keeping code short, focused and descriptive, the value of this measure will go down. Leaning away from the language affordances, the value of this measure will go up.

## What Does It Actually Mean, Though? ##

The example I provided from JavaScript is not the only place we can find choices made by programmers that are easier to write than to read. The notion of affordance in code stretches across all languages and choices that are made.

Every language carries with it a design. Much like other design, if the creator opts not to choose the design of the language, the design will be chosen for them. This design, like any other kind of design, can consider the user, the way they work, and what might provide insights into the deeper system. These context clues become affordance in your code.

As a software developer you have a duty to yourself as the author, and the next developer to lean into the affordances provided by the language, and build a new system with design clearly in focus.
