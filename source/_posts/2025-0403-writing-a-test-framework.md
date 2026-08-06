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

Phase 2: The Test Runner

If you plan to run more than one or two tests, it will be important to isolate them. Isolation limits interference between tests and keeps them organized. One of the easiest ways to limit this interference is by wrapping each test in a function. The most robust and feature rich test frameworks still rely on this simple principle. Functions create a well-defined scope and provide automatic garbage collection post-execution. Following is a naive implementation:

```

function test1() {

 const expected = 'Fizz';

 const result = fizzbuzz(3);

 expect(expected, result);

}

test1();

```

This gets the job done though it lacks a certain elegance. Having the extraneous function call at the end is undesirable and unnecessary. Some languages, JavaScript included, provide a nice way to tidy this up. We can use an immediately invoked function expression (IIFE). Let's look at this in action.

```

(function () {

 const expected = 'Fizz';

 const result = fizzbuzz(3);

 expect(expected, result);

})();

```

This structure is enough for writing a few short tests. This may become too noisy once we have a large enough test load, or the tests become verbose. In the next section we will look at ways we can improve our tests. We can use our tests to support delivery of interview code and enhancement of the test framework, at the same time.

Phase 3: Iterative Enhancement

Interviewers would find this acceptable, so we could stop here. The biggest complaint I have, personally, about this is that it still requires you properly structure your IIFE for each test case. I'm clumsy and make mistakes which would slow me down. I prefer to rely on a little functional ingenuity to reduce what I have to remember. Let's throw our test in an array and use forEach to do the execution heavy-lifting.

```

[

 () => {

 const expected = 'Fizz';

 const result = fizzbuzz(3);

 expect(expected, result);

 },

].forEach((fn) => fn());

```

Now we have a nice tidy test runner that will help us stay organized and isolate our test cases. By structuring our tests this way, it becomes obvious where each test case starts and ends. Our expectation output will align with our test structure, making it easy to find which case failed, even in a heavily restricted interview environment.

