---
layout: post
title:  "Mainstay Monday: Sorting"
date:   2015-09-21 09:00:01 -0700
categories: Algorithms, Coding, Design Patterns, Foundation, Javascript, Mainstay Monday
---
{% raw %}
If you're reading this you're likely already a programmer. This means you have likely used [].sort() in your code many times. I honestly can't remember how many times I've sorted data one way or another. Just because you've called sort on an array doesn't mean you're necessarily doing the best way you can. Does the following code look familiar to you?

<pre class="language">
[5, 9, 3, 8, 7, 6, 2, 5, 4, 8].sort().reverse()
```

If that code looks familiar, today is the day you stop. Javascript's Array.prototype.sort function is actually a rich function that will allow you to specify sorting far beyond just ascending search. Although reverse has its uses, the example above is just plain abuse. Stop abusing your code!

Let's take a look at how we can make use of sort in a smarter way. Sort will take a sorting function which it uses to compare two values to decide their correct order. You can define your sorting any way, but let's start with just sorting numbers.  Here's our same array and a standard, ascending sort, but we're actually defining the direction of the sort by hand. Let's take a look what this expansion would look like:

```javascript
var numberArray = [5, 9, 3, 8, 7, 6, 2, 5, 4, 8];

function sortNumbers(a, b){
    return a - b;
}

numberArray.sort(sortNumbers); // [2, 3, 4, 5, 5, 6, 7, 8, 8, 9]
```

Yep, that looks like extra work to accomplish the same thing. SortNumbers just does the standard comparison and returns the array, sorted as expected. The win we get here is we can now specify the sort directly. Let's have a look at reversing the sort:

```javascript
function reverseNumbers(a, b){
    return b - a;
}

numberArray.sort(reverseNumbers); // [9, 8, 8, 7, 6, 5, 5, 4, 3, 2]

//This output is exactly the same as
numberArray.sort().reverse(); // [9, 8, 8, 7, 6, 5, 5, 4, 3, 2]
```

If we are lucky enough to only ever have to sort numbers, this knowledge isn't particularly helpful. We eliminated a linear algorithm for the sort behavior which might have shaved a couple milliseconds off the total processing time. No big woo, right?

Actually it is. Have a look:

```javascript
function numberSort(values, direction){
    var directionSort = direction.toLowerCase() === 'desc' ? reverseNumbers : sortNumbers;
    return values.sort(directionSort);
}
```

Our little abstraction made specifying the sort really, really easy. This means you could actually change the sorting behavior at runtime based on user input! Now, that's pretty useful.

Sorting is definitely not limited to numbers. Strings are another commonly sorted array. Much like numbers, strings have a predefined comparison inside Javascript. That said, we can't simply subtract them if we want to reverse the order. Strings have an ordinal number (numeric) value. This means you can't subtract strings, because it's meaningless, but one string can be greater or less than another.  Here's how we would perform a reverse sort on a string array:

```javascript
var stringArray = ['foo', 'baz', 'quux', 'bar', 'snafu', 'woot'];

function reverseStrings(a, b){
    var result = a < b ? 1 : -1;
    return a === b ? 0 : result;
}

//The forward sort is left as an exercise for the reader. ; )
stringArray.sort(reverseStrings); // ['woot', 'snafu', 'quux', 'foo', baz', 'bar']
```

Now we can see, a little more clearly, what sort is really looking for. Negative numbers move values to the left, positive numbers move values to the right and zero means the values are equal. This is very helpful information we can capitalize on to do more interesting sorting.  Suppose, instead of sorting trivial arrays, we wanted to sort arrays of objects.

A common sorting happens when objects have an ID and we want the objects in ID order. By understanding how to sort strings, which have an inequality comparison operator, we can create a function that gives us the meaning objectA is greater, less than or equal to objectB, i.e. objectA < objectB.

Supposing we were comparing two objects, objectA = { id: 1 } and objectB = { id: 2 }.  We (might or might not) know that objectA < objectB === objectA > objectB because both inequality operators evaluate to false for objects. With that in mind, we know that objectA.id < objectB.id === true. This is what we are going to use to write our object sorting function.

```javascript
var objectArray = [{ id: 1 }, { id: 4 }, { id: 2 }, { id:7 }, { id: 3 }];

function objectSort(a, b){
    var aId = a.id,
        bId = b.id,
        result = aId < bId ? -1 : 1;

    return aId === bId ? 0 : result;
}

objectArray.sort(objectSort); // [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 7 }]
```

This is the first time we really couldn't just use Array.prototype.sort on our array. This problem can only be solved with a specialized sorting function. This is where the power provided by the built-in sort really shines. We can actually define data comparisons on the fly, which means we can actually create a much richer experience for our users with a lot less code.

Let's actually take our object sorting one step further. Suppose we wanted to sort an array of people. The most common way this kind of list is sorted is by last name, then by first if the last names are the same. This leads us into uncharted territory. If you were simply relying on the basic sort, you would end up sorting, partitioning and sorting again.  Let's have a look at how we might solve this problem.

```javascript
var people = [
        { lastName: 'Jones', firstName: 'Bob' },
        { lastName: 'Smith', firstName: 'John' },
        { lastName: 'Jones', firstName: 'Arlene' }
    ];

// First let's generalize the object sort by allowing
// for a key to be specified. This way we can define 
// a sorting methodology at runtime and reduce the amount
// of code we write.
function keySort(key, a, b){
    var aValue = a[key],
        bValue = b[key],
        result = aValue < bValue ? -1 : 1;
        
    return aValue === bValue ? 0 : result;
}

// Now we can use our key sort to handle
// sorting in name order, last, then first.
function nameSort(a, b){
    var firstNameSort = keySort.bind(null, 'firstName'),
        lastNameSort = keySort.bind(null, 'lastName'),
        result = lastNameSort(a, b);
   
   return result === 0 ? firstNameSort(a, b) : result;
}

people.sort(nameSort);

/* output:

[
    { lastName: 'Jones', firstName: 'Arlene' },
    { lastName: 'Jones', firstName: 'Bob' },
    { lastName: 'Smith', firstName: 'John' }
]

*/
```

Now, that's some good sorting! We have all of the names in the right order with just a little bit of work. All of a sudden what looked like unnecessary abstraction becomes a big win. We sort on last name for every record, but we only sort on first name if the last name is the same. This allows us to not only sort complex arrays, but do it in a smart way to guarantee the best performance we can get.

This algorithm is great if you only need to sort first name and last name. What if you actually want to sort on a set of different keys? More importantly, what if you want to sort on a set of keys that are specified at runtime? This is a new, interesting problem which relies on what we learned with our people array. Let's generalize.

```javascript
// Here's our starting point for a complex sort
function complexKeyedSort(keys, a ,b){
    var sortFunctions = keys.map(key => keySort.bind(null, key)),
        result = 0;
    
    sortFunctions.reverse();
    
    while(result === 0 && sortFunctions.length > 0){
        result = sortFunctions.pop()(a, b);
    }
    
    return result;
}

//Here we apply it to our people array:
var nameSort = complexKeyedSort.bind(null, ['lastName', 'firstName']);
people.sort(nameSort); // Output is identical. Try it!
```

This is a good start, but we still have a problem. We are rebuilding our sort function array on every step of the sort. For small arrays, this is probably fine, but when our arrays get big, this is dangerous. We will start seeing a bottleneck and it will be difficult to identify. Let's use the factory pattern to retool our function and get some really great code.

```javascript
function reducedComplexKeyedSort(sortArray, a, b){
    var result = 0,
        index = 0,
        
        // Only read the length once for a micro-enhancement
        sortArrayLength = sortArray.length;
    
    // Updated while loop to be array-non-destructive
    while(result === 0 && index < sortArrayLength){
        result = sortArray[index](a, b);
    }
    
    return result
}

function complexKeyedSortFactory(keys){
    // Performs sort algorithm array construction only once
    var sortFunctions = keys.map(key => keySort.bind(null, key));
    
    // Returns bound, ready to use sort algorithm
    return reducedComplexKeyedSort.bind(null, sortFunctions);
}

// Putting our new sort factory to use:
var nameSort = complexKeyedSortFactory(['lastName', 'firstName']);
people.sort(nameSort);

// This will fall back, ever deeper into the object to give us
// a rich, deep sort with only two lines of code.
var complexObjectSort = complexKeyedSortFactory(['foo', 'bar', 'baz', 'quux']);
complexObject.sort(complexObjectSort);
```

With all of this complexity, we are actually missing one last piece of the puzzle, a reverse sort. Even with our most complex sort managed by our reducedComplexKeyedSort, we might still want to reverse the entire sort. We agreed at the beginning that calling .reverse() on a sorted array is kind of a gross, hacky way to do things. Fortunately, reversing the order is really, really easy. All that has to be done is multiply the sort outcome by -1.  Here's some evidence:

```javascript
// Here's a forward number sort
sortNumbers(a, b) === a - b;

// If we multiply by -1 we get this:
-1 * sortNumbers(a, b)
    === -1 * (a - b)
    === -1 * (a + (-b))
    === (-1 * a) + (-1 * (-b))
    === (-a) + (-(-b))
    === (-a) + b
    === b + (-a)
    === b - a
    === reverseNumbers(a, b)

// This means
-1 * sortNumbers(a, b) === reverseNumbers(a, b)
```

I'm not going to walk through a formal proof, but the evidence is pretty compelling. This means we could actually write a function which will return a reverse sort function. Now we only have to know how to sort one direction and we can actually switch between directional sorts easily. Here's a sort reverse function:

```javascript
function reverseSort(sortFunction){
    return function(a, b){
        return -1 * sortFunction(a, b);
    }
}
```

Let's use our reverseSort to reverse the order of our most complex sort constructing our sort function from the ground up.

```javascript
var complexObjectSort = complexKeyedSortFactory(['foo', 'bar', 'baz', 'quux']),
    reversedComplexObjectSort = reverseSort(complexObjectSort);

complexObject.sort(reversedComplexObjectSort);
```

By abstracting out our object sorting behavior, we have taken an object we know nothing about and produced a sorting algorithm which will sort our objects in reverse by keys in a ordered, refined way. That's some pretty powerful stuff.

To sum up, sometimes we can get away with simply using the built-in sort, and we can even hack in a reverse to give us ascending and descending sort behavior, but the world of array sorting is large and full of twists and turns.

We've introduced a simple way to address sorting which requires more than just relying on the language supported comparison, which will likely carry you through most common sorting tasks. We have also introduced a higher-level abstraction for defining complex sorting. Finally we developed a higher-order function which allows us to easily reverse any sort function.

This kind of development provides a strong way to reduce the amount of code you write and enhance the functionality of your program while you do it. You can look back at the code you've written and refactor it to be more maintainable and simpler to build upon. Now go forth and do some great sorting!

<h3>Blog Notes</h3>

I created a final factory for handling complex sorting with ascending and descending order handled in a SQL style. This will allow for sorts like the following:

keyedSortFactory.build(['column1 asc', 'column2 desc', 'column3 desc']);

Please see the gist here:

<a href="https://gist.github.com/cmstead/9ea2da73f0675707a7e3" target="_blank">Keyed Sort Factory</a>
{% endraw %}
    