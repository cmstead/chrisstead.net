---
layout: post
title:  "Bottlenecks and Micro-Performance"
date:   2015-11-25 08:00:15 -0800
categories:
    - Algorithms
    - Code Smells
    - Coding
    - Design Patterns
    - Functional Programming
    - General Blogging
    - Javascript
---
{% raw %}
After my last blog, I got a response regarding functional programming and performance. This is actually a common theme when people talk about functional programming versus imperative programming. Before we move into the actual performance discussion, I will openly admit, there are often times when functional programming is slower, performance-wise, than imperative programming. I have never claimed otherwise, nor will I begin doing so today.

Now, let's move away from the very specific case of functional versus imperative programming and take a look at application performance in general. It is common to look for performance bottlenecks in applications. An application slows down and we want to dig in and uncover the performance issue. This particular situation arose at my work just a few weeks ago.

We had a form which, when big enough, slowed the entire experience to a crawl. This was bad news for us as our customers were quite unhappy with the way our application was behaving. I couldn't blame them. The experience was miserable.

My colleague and I started digging into the offending code.  I discovered a few methods which were running at O(n^2) time and he discovered a, seemingly innocuous, call to perform an external validation. When we moved our search to the validation code, it became obvious this was the problem. The entire form was being revalidated multiple times for every single element on the screen.

I fixed the O(n^2) algorithm, reducing it to an O(n) time execution, which made a visible difference, but the real win was decoupling the localized validation logic from the form logic. We estimated that for each validation call that was made, validation work was being done in the neighborhood of 60,000 times.

This demonstrates the difference between micro-performance and macro-performance. My algorithm enhancement was a macro-performance fix when looking at execution times of single lines of code, but when looking at the application as a whole, it was actually just a micro-performance tuning. The real win came when a true macro-performance fix was implemented and our total iteration count was reduced from 60,000 to about 600. That kind of performance gain can be measured in orders of magnitude and saved the experience of our customers.

Jeff Atwood <a href="http://blog.codinghorror.com/the-sad-tragedy-of-micro-optimization-theater/" target="_blank">talks about micro-performance benchmarking</a> as something that only matters when a bad choice is made. If a piece of code is not optimally performant, but it is only executed once, does it matter? Jeff and I agree, it doesn't.

Let's take a look at two different blocks of code:

```javascript
// Imperative single-loop behavior

function addEvensImperative (list) {
	var total = 0,
		listLength = list.length,
		index = 0;
	
	for(index; index < list.length; index++) {
		total += list[index] % 2 === 0 ? list[index] : 0;
	}
	
	return total;
}

// Functional, test and add abstracted, two-loop behavior

function isEven (value) {
	return value % 2 === 0;
}

function add (a, b) {
	return a + b;
}

function addEvensFunctional (list) {
	return list.filter(isEven).reduce(add, 0);
}
```

Clearly, addEvensImpertaive and addEvensFunctional produce the same output. If we look at the behavior with regard to constants, addEvensImperative loops over the array once so we can say it has a behavior characteristic function something like 1n + c_0. Meanwhile addEvensFunctional actually loops through the entire list twice in a pathological (worst) case. This means we can estimate the characteristic function to look something like 2n + c_1.  This means for each time the functional behavior is called, the pathological behavior will be half as fast as the imperative call.

Let's take a look at this using big-O notation. In big-O notation, the efficiency of the algorithm is reduced to the highest-power term in the approximate function.  This means, all constants are discarded as well as coefficients. When we annotate our functions the imperative function performance is O(n) and the functional function performance is O(n) as well.

What this means is both of these functions have a linear growth behavior. The more values we have in our list, the longer each of these take to complete.  Typically what we will see is total execution time measured in microseconds or a few milliseconds. Even large arrays of numbers can be iterated over very very quickly, so, even though the functional behavior is half as fast, the overall performance characteristic loss is negligible.

This is the pitfall of micro-optimization. Even though the perceived performance doesn't change drastically for the user, it is fussed over because it's easy to see and easy to measure. The problem is, there is a large blind spot that opens up when thinking about managing efficiency.

There is a phrase "what is measured is managed." When applied to things which are properly and fully measured and everything is measureable, this is valuable.  The problem is by measuring micro-optimizations, we can encounter the problem of "not seeing the forest for the trees." This means we have accurate measurements of parts of a system, but we haven't actually accounted for the system.

It's common to talk about early optimization both in positive and negative light (depending on where you stand). I tend to work on the task at hand, and measure when the work is done. This means, if one function is not fully optimized, but the overall performance is as good or better than business requirements dictate, there is no need to optimize further.  If, on the other hand, the system is under-performing and slow, I will look for new optimizations.

The important thing to note, however, is I prefer to optimize from the top-down. If a system is slow, it is highly unlikely that the culprit is a single function which is slower than we could be. More likely, we have a hidden optimization problem which is taking an O(n) function and looping, creating an O(n^) behavior, then looping again creating an O(n^3) behavior, and so on.

This hidden exponential growth characteristic is precisely what bit us in our slow-validating application. The reason my O(n^2) to O(n) optimization only gave us a small win is because we had another set of functions which were creating an algorithm performing at O(n^5) or so. Once we converted that behavior to an O(n) algorithm, the app sped up significantly.

In the end, the difference between a function that is performing at 2n versus n is significantly less critical than a system of functions performing at n^5 instead of 5n. Micro-performance benchmarks are important in systems like robotics, neural nets and so on. Common application behaviors like working with small, finite sets of data, typically benefit most from macro-optimizations, so fix those problems first, then measure again. In the end it is far more important to fix the bottleneck and leave the non-micro-optimized code readable and simple.

<h3>Testing Notes</h3>

Running a test on my local computer there was no measurable difference in performance between the two functions until the list of numbers got to 10,000 values, at which point the difference appears to be less than 1ms (0ms vs 1ms). At 10,000,000 the difference had grown significantly to about 850ms. Please don't make your users process 10,000,000 numbers in their browser.

Here is my test script:

```javascript
function range (start, end) {
    var output = [],
        current = start;

    for (current; current <= end; current++) {
        output.push(current);
    }

    return output;
}

module.exports = function test (endValue) {
    var rangeList = range(1, endValue),
        start,
        end;

    start = (new Date()).getTime();
    console.log(start);
    addEvensImperative(rangeList);
    end = (new Date()).getTime();
    console.log(end);
    console.log(end - start);

    start = (new Date()).getTime();
    console.log(start);
    addEvensFunctional(rangeList);
    end = (new Date()).getTime();
    console.log(end);
    console.log(end - start);
}
```

Output:

<pre>
> runTest(100)
1448224288065
1448224288065
0
1448224288065
1448224288065
0
undefined
> runTest(1000)
1448224303600
1448224303600
0
1448224303600
1448224303600
0
undefined
> runTest(10000)
1448224309681
1448224309681
0
1448224309681
1448224309682
1
undefined
> runTest(100000)
1448224315113
1448224315114
1
1448224315114
1448224315121
7
undefined
> runTest(1000000)
1448224319977
1448224319980
3
1448224319980
1448224320063
83
undefined
> runTest(10000000)
1448224325198
1448224325222
24
1448224325223
1448224326094
871
undefined
```

This demonstrates that even a large number of arithmetic operations, my computer (an older Macbook Pro) can still push out better than 10,000,000 functional operations* a second. Arguably, in any software system processing fewer than 100,000 values at a time, the difference in performance when running each function once would be imperceptible to the end user.

* megaFLOPS so, blah blah, analogy, blah 10 megaFOPS (million functional operations per second)
{% endraw %}
    