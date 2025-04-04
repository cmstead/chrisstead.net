---
title: "Writing An Interview Test Framework"
date: 2025-04-03
categories:
    - testing
    - interviewing
    - work environment
---
Going into an interview is stressful when you have all your tools at your disposal. When the tools you rely on aren't available it can make the most sturdy developers stumble. This is a follow up to my call to write tests during your interview. What happens when you discover there is no test framework available? You write your own!

The task of writing a test framework sounds daunting, but you don't need to build Jest or Mocha to succeed. We are going to explore writing an ad hoc testing framework in three parts. We will focus on just-enough implementation. The emergence of our testing framework will support swift and effective problem solving. The three parts of our journey will be:

- An expectation behavior
- A test runner
- Iterative enhancement

The first two pieces of the puzzle are structural in nature. We will develop enough of each to solve a simple problem. Once done, we will explore an interview situation with an expanded problem space. This expanded problem space is our opportunity to iterate on our test framework. As we expand our framework the goal remains, deliver a working production solution.

The Setup

- For this post I am going to use the classic FizzBuzz problem. The rules are as follows:
- A function takes a numeric argument
- If the number is divisible by 3, return Fizz
- If the number is divisible by 5, return Buzz
- If the number is divisible by both, return FizzBuzz

Otherwise return the number as a string

We will not go through every step of this problem. There are enough interesting parts of the problem to drive our test journey.

Phase 1: The Expectation

As with any test-driven work, we are going to test-drive our testing. We will wrap our test implementation around the solution to our interview solution. It's a common practice to write a simple true/false assertion when setting up a test environment. Let's do that first.

```
expect(true, false);
```

If your interviewer understands test-driven development they will recognize this. We are test driving our test framework. This step defines our expectation API and declares how we will test our code going forward. Of course, this will fail to run because `expect` doesn't exist yet. Let's write code to make this fail for the right reason.

```
function expect(expected, actual) {
        throw new Error(`Expected value ${expected} but got ${actual}`);
}
```

This took a few seconds to write, but we now know, if we run a test and it's wrong, we will get feedback. Let's follow this up with expecting true to be true. We will change the values in our expect call. 

```
expect(true, true);
```

This will output nothing, which provides no feedback. If a test passes we should always be able to see at a glance. Let's update our expect function.

```
function expect(expected, actual) {
    if(expected !== actual) {
        throw new Error(`Expected value ${expected} but got ${actual}`);
    }

    console.log('Success');
}
```

At this point we have enough of a testing framework to write a single unit of production code. Following test-driving patterns, let's suss out a solution for our first rule: `x = 3`

```
const expected = 'Fizz';
const result = fizzbuzz(3);

expect(expected, result);
```

This is enough implementation to solve step one of the problem, and it only took a few seconds to write. This is crucial to testing and developing our solution throughout the interview. We will use this as an anchor to build the rest of the framework, and deliver working software. I will leave the solution to this problem as an exercise for the reader. 