---
layout: post
title:  "Leveling Up With Reduce"
date:   2015-10-14 09:00:15 -0700
categories:
	- Code Smells
	- Design Patterns
	- Functional Programming
	- Javascript
---
{% raw %}
It was pointed out to me the other day that I suffer from the curse of knowledge. What this basically means is, I know something so I don't understand what it means to NOT know that thing. This can happen in any aspect of life and it's common for people, especially software developers, to experience this. Many of us have been working with computers in some way or another for most or all of our lives. This means, when we talk to people who haven't shared our experiences, we don't understand their position, i.e. we talk and they don't have any clue what we are saying.

Within various programming communities this can also happen when more experienced developers talk to developers who are still learning and growing. The experienced developer says something they think is imparting great wisdom and knowledge on the person they are talking with, meanwhile the inexperienced developer is baffled and lost.

Functional programming has become one of these dividing lines in the community. There are people who have dug in deep and have an understanding of the paradigm which they then have trouble conveying to people who haven't had the same experiences. Ultimately the message falls on deaf ears.

One of the least understood, but, possibly, easiest to comprehend concepts is reduce. We perform reductions every day. We reduce lists of values to sums. We reduce records down to a single selected record based on user preferences or our need. Programming and reduction really go hand in hand.

To come to grips with the kinds of behavior we're talking about, let's have a look at some common patterns programmers use in their day to day development.  The following block of code contains functions for taking the sum of an array, finding a maximum number and filtering an array of integers. If you have written loops, conditionals and functions before, these will probably be completely unsurprising.

```javascript
function sumImperative (values) {
	var result = 0;
	
	for (let i = 0; i < values.length; i++) {
		result += values[i];
	}
	
	return result;
}

function findMaxImperative (values) {
	var max = -Number.MAX_VALUE;
	
	for(let i = 0; i < values.length; i++) {
		if(values[i] > max) {
			max = values[i];
		}
	}
	
	return max;
}

function filterEvensImperative (values) {
	var result = [];
	
	for (let i = 0; i < values.length; i++) {
		if (values[i] % 2 === 0) {
			result.push(values[i]);
		}
	}
	
	return result;
}
```

These functions are written in an imperative style, and express every minute detail of the reduction process. We start with some sort of accumulator, whether it's an array or a number, our variable is meant to capture outcome as we move through our iteration. We iterate over the array, performing some action at each step, then returning the result at the end.

These functions aren't beautiful, but they are effective and predictable. For many readers, this pattern feels warm and cozy like a winter blanket. The problem we run into is, this methodology is really verbose and bloats the code. It also introduces a lot of noise. Do we really care about the inner workings of the iteration process or do we merely care about the output of our functions?

Let's take a couple examples from our initial three functions, and rewrite them. It has been said that any recursive algorithm, may be rewritten as an iterative loop. I have no evidence to support the inverse, but I can say, with certainty, that we can rewrite all of these as recursive functions.

Just to catch everyone up, recursion is when a function calls itself internally to perform an iterative operation. We <a href="http://www.chrisstead.net/archives/783/mainstay-monday-solving-problems-with-recursion/" target="_blank">discussed recursion</a> relatively recently in a different post. Essentially what we are going to do is put more focus on what happens in each step of the iteration, and make the iteration process less prominent in our code.  Let's take a look at a recursive strategy for sum and max behaviors.

```javascript
function sumRecursive (values, accumulator) {
	accumulator += values.pop();
	return values.length === 0 ? accumulator : sumRecursive(values, accumulator);
}

sumRecursive([1, 2, 3, 4, 5].slice(0), 0); // 15

function findMaxRecursive (values, max) {
	var value = values.pop();
	max = max > value ? max : value;
	return values.length === 0 ? max : findMaxRecursive(values, max);
}

findMaxRecursive([2, -5, 12, 3, 89, 7, 6].slice(0), -Number.MAX_VALUE); // 89
```

An interesting point to note is, these functions are actually destructive in nature. We could have written them in a way that is not destructive, however it would have added complexity we don't need to dig through at the moment.  Instead, we can slice the array we are sending in to ensure the original array is not modified by the pop behavior.

Each of these recursive algorithms do something very similar. They highlight a single step in the process, allowing the programmer to focus on the immediate problem of reducing no more than two values at a time. This allows us to actually identify the real behavior we are interested in.

Recursion, of course, leaves us in a position where we have to identify a stopping condition, which was more obvious in the original, imperative, code. Nonetheless, if we choose to halt the process on the occurrence of an empty array, we can just replicate the behavior without needing to put too much extra thought in.

When we review these recursive functions, it becomes apparent the main difference is the accumulation versus comparison behavior. Without too much work, we can strip out this unique behavior and create a generic recursion function which accepts a behavior parameter as part of its argument list. Although this makes our recursion function fairly abstract, and possibly a little harder to read, it reduces the load when we start thinking about what we want to do. The recursion function can disappear as a <a href="https://en.wikipedia.org/wiki/Referential_transparency_(computer_science)" target="_blank">referentially transparent</a> <a href="https://en.wikipedia.org/wiki/Black_box" target="_blank">black box function</a>.

This level of abstraction allows the implementation details of our recursion to be safely separated from the details of our immediate functional need. Functions of this type, which take functions as arguments, are called <a href="https://en.wikipedia.org/wiki/Higher-order_function" target="_blank"><em>higher-order functions</em></a>. Higher order functions are commonly highly-abstract and can lead down a rabbit hole known as <a href="https://en.wikipedia.org/wiki/Generic_programming" target="_blank">generic programming</a>.  Let's not go there today, instead let's cut to the chase and see our abstraction!

```javascript
function add (a, b) {
	return a + b;
}

function max (a, b) {
	return a > b ? a : b;
}

function genericRecursor (behavior, values, accumulator) {
	accumulator = behavior(accumulator, values.pop());
	return values.length === 0 ? accumulator : genericRecursor(behavior, values, accumulator);
}

genericRecursor(add, [1, 2, 3, 4, 5].slice(0), 0); // 15
genericRecursor(max, [2, -5, 12, 3, 89, 7, 6].slice(0), -Number.MAX_VALUE); // 89
```

This generic recursion is actually the final step toward our goal, the reduce function. Technically, our generic recursor, given the way it behaves will perform a right-reduction, but that is more than we need to bite off at the moment. We could easily rename genericRecursor to rightReduce and we would truly have a reduction function. The problem we would encounter is, our function is backwards! If we really want to replicate the behavior from our original function we need to make a small modification.  Let's rewrite our genericRecursor as a first, and final hand-build reduce function.

```javascript
function reduce (behavior, values, accumulator) {
	accumulator = behavior(accumulator, values.shift());
	return values.length === 0 ? accumulator : reduce(behavior, values, accumulator);
}

reduce(add, [1, 2, 3, 4, 5].slice(0), 0); // 15
reduce(max, [2, -5, 12, 3, 89, 7, 6].slice(0), -Number.MAX_VALUE); // 89
```

The two key changes we made were renaming and changing from pop to shift. Shift is notoriously slower than pop, so this function is useful for illustration, but it lacks characteristics we would like to see in a production-ready reduce function.  Instead, let's jump from our hand-rolled reduce function to the Javascript native implementation.

Javascript's native implementation really is a black box function if you are working only from the Javascript side. Implemented in C++, reduce works only on arrays, and has a couple of shortcomings we won't address here. Nevertheless, the native reduce is key to leveling up your fluent Javascript skills, and is a valuable tool for reducing <a href="https://en.wikipedia.org/wiki/Cognitive_load" target="_blank">cognitive load</a> and <a href="https://en.wikipedia.org/wiki/Source_lines_of_code" target="_blank">SLOC</a> bloat.  Let's take a look at a couple of examples of using reduce.

```javascript
// Accumulation

var integers = [1, 2, 3, 4, 5],
	records = [{ value: 2 },
			   { value: 4 },
			   { value: 6 },
			   { value: 8 },
			   { value: 10 }];

function add (a, b) {
	return a + b;
}

function addValues (a, b) {
	return add(a, b.value);
}

integers.reduce(add); // 15
integers.reduce(add, 0); // 15

records.reduce(addValues, 0); // 30

// Maxima/Minima

function max (a, b) {
	return a > b ? a : b;
}

function min (a, b) {
	return a < b ? a : b;
}

var values = [2, -5, 12, 3, 89, 7, 6];

values.reduce(max, -Number.MAX_VALUE); // 89
values.reduce(min, Number.MAX_VALUE); // -5
```

If we return to our original filtering function, we can easily replicate the behavior using reduce. We will also introduce a mapping function. Reduce is so incredibly flexible we can actually accomplish many of the iterative tasks we do every day. The primary pitfall of using reduce for all of the iterative tasks is we will begin to introduce bloat again as we replicate more generic behavior.  We won't dig into the details today. Instead, let's take a look at some of the power we get from reduce as a tool. It's kind of the electric drill of the programming world: many uses, all of which save time and energy better spent elsewhere.

```javascript
function filterEvens (accumulator, value) {
	if(value % 2 === 0) {
		accumulator.push(value);
	}
	
	return accumulator;
}

function multiplyBy10 (accumulator, value) {
	accumulator.push(value * 10);
	return accumulator;
}

function shallowCopy (original, accumulator, key) {
	accumulator[key] = original[key];
	return accumulator;
}

var originalObject = { 'foo': 'bar', 'baz': 'quux' };

[1, 2, 3, 4, 5].reduce(filterEvens, []); // [2, 4]

[1, 2, 3, 4, 5].reduce(multiplyBy10, []); // [10, 20, 30, 40, 50]

Object.keys(originalObject).reduce(shallowCopy.bind(null, originalObject), {});
// { 'foo': 'bar', 'baz': 'quux' } !== originalObject
```

This discussion is merely the tip of the iceberg, but it exposes the kind of work which can be done with reduce and the energy we can save by using it more often. For as frequently as complex data types like arrays and objects appear in our code, it only makes sense to work smarter and faster. With the power that comes from first class functions and higher-order functions, we can accomplish large amounts of work with small, but highly declarative behaviors.

As you look at your code, try to spot places where behaviors are repeated and the real focus should be on the data you are working with. Perhaps reduce is an appropriate solution. You might even be able to use it in an interview. I leave you with FizzBuzz performed using reduce.

```javascript
function fizzBuzzify (value) {
	var result = value % 3 === 0 ? 'Fizz' : '';
	
	result += value % 5 === 0 ? 'Buzz' : '';
	
	return result === '' ? value : result;
}

function fizzBuzz (output, value) {
	output.push(fizzBuzzify(value));
	return output;
}

var integers = [1, 2, 3, /* ... */, 100];

integers.reduce(fizzBuzz, []);
// [1, 2, 'Fizz', 4, 'Buzz', /* ... */, 14, 'FizzBuzz', /* ... */, 'Fizz', 100]
```
{% endraw %}
    