---
layout: post
title:  "Math for Programmers: Arrays, Objects and Sets"
date:   2016-01-27 08:00:03 -0800
categories: Algorithms, Applied Math, Coding, Data Structures, Foundation, Functional Programming, Javascript
---
{% raw %}
I've had conversations with a programmers with varied backgrounds and experience levels. One thing which has come up in several conversations is math, and how much math a programmer needs to be effective. I have a formal background in math, so I tend to lean heavily on the side of more math is better. Other programmers argue that only select topics in math are important to make a professional programmer effective.

Arguably, for day to day programming needs, it is unlikely you will need to demonstrate a strong understanding for the proof of indefinite integrals over n-space, however there are topics which seem to come up often and would be useful for a programmer to understand.  I decided that the first in the series of math for programmers should cover something that ever programmer has to think about at one time or another: sets.

If you are working with data coming from persistent storage like a database, sets should be your bread and butter. Most of your time will be spent thinking about how sets work together and how to combine them to capture a snapshot of the data you need. On the other hand, if you are working with data at another layer somewhere above data access, your interactions with sets are going to be a little more subtle. Arrays and maps are sets of data with added restrictions or rules, but they are, at their core, still sets in a very real way.

If we look at an array of integers, it's not immediately obvious you are working with a set.  You could, in theory, have a duplicate number in an array.  Arrays also have the characteristic of being ordered.  This means that each element will come out of an array in the same order each time.  Let's take a look at an array of integers.

```javascript
var myIntegers = [1, 2, 3, 4, 2, 5, 1, 1, 7];
```

Honestly, this array is most reminiscent of a vector in mathematics. This could easily describe a point in a nine-dimensional space, which is kind of hard to get a visual on.  Nevertheless, we can do just a little bit of reorganization and turn this into a set which adheres to all the normal rules a given mathematical set has.

<h3>Rules of a Set</h3>

All sets are unordered.  This means two sets are equal if both sets contain the same members, regardless of the order.  For instance, {1, 2, 3} and {3, 2, 1} are the same set since they each contain the members 1, 2 and 3 and ONLY those members. Regardless of the order chosen to represent the elements, the set is guaranteed to be unique given the elements it contains alone.

Sets may not contain duplicate values.  Each value in a set is uniquely represented, so {1, 1, 2, 3} would be correctly represented as {1, 2, 3}. This uniqueness makes sets well defined. Well defined simply means our sets are unambiguous, or any set can be constructed to be clearly defined and distinctly represented.

Sets may be constructed with individual values, like our set of integers, or with more complex structures like a set of sets or a set of vectors. This means {{1}, {2}, {3}} is not the same as {1, 2, 3} since the first set is a set of sets containing 1, 2 and 3 respectively, while the second set is a set containing the numbers 1, 2 and 3.  Understandably, this is kind of abstract, so think about an array of arrays, versus an array containing integers. The relation is quite close.

<h3>Thinking of Arrays as Sets</h3>

Let's take another look at our original array. If we were to take our array and interpolate it into an object literal instead we can start to see the relation between a set and an array.  Let's see what our object literal would look like.

```javascript
var myIntegerObject = {
    0: 1,
    1: 2,
    2: 3,
    3: 4,
    4: 2,
    5: 5,
    6: 1,
    7: 1,
    8: 7
};
```

Now we can see how each element in our array maintains uniqueness.  Our object has a key, which represents the array index and a value, which is the original value in an array. This data formation makes creating a set trivial.  We can describe each value in our array as a vector containing two values, <index, value>.  By using vector notation, we can make our array conform exactly to the definition of a set.  Our array can be rewritten as a set this way, {<0, 1>, <1, 2>, <2, 3>, <3, 4>, <4, 2>, <5, 5>, <6, 1>, <7, 1>, <8, 7>}.

This vector notation helps us to tie together two separate data structures into a single, unified mathematical form. By understanding this form, we can see how values could be easily stored and organized in memory to either be sequential, or fragmented throughout memory with pointers stored in a sequential data structure for faster access.

Being able to move between the array or object formations we use day to day to set notation gives us a lot of power.  We can abstract away the physical computer and think less about the language constructs, in order to solve data set problems in a language agnostic way first and then weave the solution back into our code in order to improve our thought process and, ideally simplify the logic we use to organize our thoughts in a program.

This is a first slice cutting across programming and its relation to math. There are techniques which can be used to dissect problems and solve them directly without code as well as different programming paradigms which abstract away the nuts and bolts of loops, conditions and other detail-related behaviors in favor of a more general approach, simply declaring the operation to be done and then working with the result.  We will explore these techniques and the math related to them in upcoming posts.
{% endraw %}
    