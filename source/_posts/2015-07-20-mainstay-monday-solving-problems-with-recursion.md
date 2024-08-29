---
layout: post
title:  "Mainstay Monday: Solving Problems With Recursion"
date:   2015-07-20 09:00:53 -0700
categories: Coding, Foundation, Functional Programming, Javascript, Mainstay Monday
---
{% raw %}
If you have been writing Javascript for any amount of time, you're sure to be familiar with standard loop structures. For and while blocks are part and parcel of the modern programming experience.  On the other hand, if you haven't done a data structures and algorithms course, you may not be familiar with the term recursion. Recursion is another methodology for handling repeated behavior, but it is useful for a completely different set of problems.

Before we start looking at the kinds of problems recursion is useful for handling, let's discuss what it is. Recursion is the process of calling a function from within that same function to perform the operation again.  Typically this is done with some reduction, modification or subset of the original data.  A great, and simple example of a recursive algorithm is the Greatest Common Devisor (GCD) algorithm.

In order to understand what we are looking at with recursion, let's first take a look at an iterative solution to our GCD problem.  Euclid would tell us this is the most inelegant solution he'd ever seen to solve this problem, but he's not here, so we can do what we want.

```javascript
function gcd(a, b){
    //Let's not modify our original vars
    let _a = a,
        _b = b,
        temp;

    while(_b !== 0){
        temp = _a;
        _a = _b;
        _b = temp % _b;
    }

    return Math.abs(_a);
}
```

This function will find the GCD every time, but there is a lot of variable manipulation. With the variables being swapped around so much, it becomes difficult to follow what this function is really doing.  Nonetheless, there are benefits to writing out GCD function this way that we will discuss in a moment.  Now, let's take a look at the recursive GCD function.

```javascript
function gcd(a, b){
    return b !== 0 ? gcd(b, a%b) : a;
}
```

This second function actually accomplishes the same task as the original, but in a single line of executable code! Clearly recursion can provide a simpler, terser way of framing certain kinds of problems.  In this case, we solve one step of the problem and then let the recursion do it over and over until we get an answer. This shorter syntax comes with a cost: memory.

Our while loop, though a little harder to read, takes up, effectively, a constant amount of memory and processing cycles. When you enter the function, variables are declared, memory is allocated and then the loop works within the constraints of the variables we define. Our recursive function operates differently.

Let's add an array into our first function and watch what happens when we push values into it while we are computing everything.  This will give us some insight into what is happening in memory as our recursion is working.

```javascript
function gcd(a, b){
    let memory = [a, b],
        _a = a,
        _b = b,
        temp;

    console.log(memory);

    while(memory.length > 0){
        
        if(_b !== 0){
            temp = _a;
            _a = _b;
            _b = temp % _b;
            memory.push(_b);
            console.log(memory);
        } else {
            memory.pop();
            console.log(memory);
        }
    }
    return _a;
}

gcd(150, 985);

// [ 150, 985 ]
// [ 150, 985, 150 ]
// [ 150, 985, 150, 85 ]
// [ 150, 985, 150, 85, 65 ]
// [ 150, 985, 150, 85, 65, 20 ]
// [ 150, 985, 150, 85, 65, 20, 5 ]
// [ 150, 985, 150, 85, 65, 20, 5, 0 ]
// [ 150, 985, 150, 85, 65, 20, 5 ]
// [ 150, 985, 150, 85, 65, 20 ]
// [ 150, 985, 150, 85, 65 ]
// [ 150, 985, 150, 85 ]
// [ 150, 985, 150 ]
// [ 150, 985 ]
// [ 150 ]
// []
// 5
```

This is just a rough approximation, but you can see how more and more memory gets allocated to handle the recursion. We can generally consider this kind of behavior in our programs bad. As the algorithm finishes up, we can see the memory allocation is 8 integers.

The size of an integer lives somewhere between 2 and 8 bytes, so let's call it 4 bytes and meet in the middle.  This means that just the storage for the numbers we were computing took up 32 bytes. That may not seem like a lot, but considering our original algorithm took about 12 bytes, this is a pretty substantial overhead.

Fear not! All is not lost.

Okay, so recursion may not be the most efficient kid on the block, but sometimes it actually, really makes sense. Suppose we had a tree that you really, REALLY need to search and find something. You could write an iterative solution to search the tree, but that involves trickery we don't have time for in this post.  Instead, let's suppose the tree is several layers deep and each layer contains several intermediate nodes.  Here's what our algorithm might look like:

```javascript
// A predicate function is a function which tests a value and returns true or false
function searchTree(rootNode, predicate){
    let children = Boolean(rootNode.children) ? rootNode.children : [],
        childCount = children.length,
        found = predicate(rootNode) ? rootNode : null;

    for(let i = 0; i < childCount && found !== null; i++){
        if(predicate(children[i])){
            found = children[i];
        } else {
            found = searchTree(children[i], predicate); // Recursion!
        }
    }

    return found;
}
```

As you can see, we search the tree one edge at a time. We travel from node to node, moving up and down the levels until we find the element we want. If a matching element doesn't exist in the tree, then we return null and accept our fate.

Wrapping this all up, there are always many ways to skin the proverbial cat and with each solution, there is a cost and a benefit. Recursion is an excellent way to solve some particularly tricky problems, but it comes with a cost, specifically memory and efficiency. Even with the drawbacks, sometimes it just makes more sense to use recursion and reduce the problem down to something more manageable.

We can consider looping to be a lightweight, electric chainsaw. It will cut just about anything you put in front of it, but it can make a mess.  By that same notion, recursion is a scalpel. It's not the right tool for every job, but when it's handled with care, it can perform delicate surgery and remove warts from some of the trickiest problems in your code.
{% endraw %}
    