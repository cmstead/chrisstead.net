---
layout: post
title:  "Mainstay Monday: Queues"
date:   2015-09-14 09:00:59 -0700
categories: Coding, Data Structures, Foundation, Javascript, Mainstay Monday
---
{% raw %}
A couple weeks ago, we looked into <a href="http://www.chrisstead.net/archives/885/mainstay-monday-linked-lists/" target="_blank">linked lists</a>. Sadly linked lists are kind of a standalone topic that don't use much more than basic objects in order to function as designed. Queues, on the other hand can easily spring forward from linked lists, and they are a way of working with data as you might with generators!

Queues are a great resource for dealing with anything from data stores which are being updated in one place and read from another to dealing with data requests against an endpoint and a cache. Queues give you a reliable way to store data and interact with it later in the same order. Since functions are first class in Javascript, this means functions are actually data, which can be stored in a queue as well. This kind of power opens a world of possibilities.

Let's take a look at a queue in action.

```javascript
// Does stuff and stores it
function processAndEnqueue(queue, process, value){
    queue.enqueue(process(value));
}

function slowResolve(queue, resolutionProcess){
    setTimeout(function(){
        if(queue.peek() !== null){
            resolutionProcess(queue.dequeue());
            slowResolve(queue, resolutionProcess);
        }
    }, 0);
}

function fakeAsyncRequest(callback, value){
    setTimeout(callback(value), 10);
}

function square(value){
    return value * value;
}

function enqueueSquares(queue){
    var resolutionCallback = processAndEnqueue.bind(null, queue, square);
        
    for(let i = 0; i < 10; i++){
        fakeAsyncRequest(resolutionCallback, i);
    }
}

function logSquares(queue){
    var log = console.log.bind(console);
    slowResolve(queue, log);
}

var squareQueue = new Queue();

enqueueSquares(squareQueue);
logSquares(squareQueue);
```

That's a lot of code for a simple example, but I think you'll get the idea. Essentially we want to call a service and get a value, resolve the value and store it in the queue. One that is complete, we want to log everything that was queued up.  The problem we would have run into is, the queue may not be filled completely before we start dequeueing. This allows us start with the first value and let the rest filter in over time.

Queues are a common data structure which are used throughout programs in every language to solve the same kinds of problem: we want to perform one action and allow other actions or data to wait until we are ready. It's a lot like people waiting to get into a movie on opening night.

Since I already talked about linked lists, you probably have an idea where I am going with all of this. Let's use the list object we created in the last post to build our queue. It turns out that once we have a linked list item definition, we can create a queue with just a bit of effort.

```javascript
//Linked-list-backed queue

function Queue(){
    this.queueHead = null;
    this.queueLast = null
}

Queue.prototype = {
    getHeadValue: function(){
        return Boolean() ? this.queueHead.val() : null;
    },
    
    peek: function(){
        return this.getHeadValue();
    },
    
    enqueue: function(value){
        var queueItem = new ListItem(value);
        
        // Append item to the end of the list
        if(Boolean(this.queueLast)){
            this.queueLast.append(queueItem);
        }
        
        // If there is no current list, create it with
        // the new value as the single item.
        else {
            this.queueHead = queueItem;
            this.queueLast = queueItem;
        }
    },
    
    dequeue: function(){
        var value = this.getHeadValue(),
            queueHead = this.queueHead;
        
        // If there is a head element, move to the next
        // otherwise leave queueHead as null
        if(Boolean(queueHead)){
            this.queueHead = queueHead.next();
            queueHead.setNext(null); // Avoid memory leaks!
        }
        
        // This checks to see if the head and the last point to
        // the same object. If so, the queue is now empty.
        if(queueHead === this.queueLast){
            this.queueLast = null;
        }
        
        return value;
    }
};
```

There is a little bit of logic here to ensure we don't leave dangling pointers and we don't have null pointer exceptions, but other than this, we're basically moving through a list that has the capability to grow on one side and shrink on the other. This is the perfect structure for dealing with data which isn't infinite, but could grow to an arbitrary size at an arbitrary rate.

Why not just use an array for this?

It turns out we can do this in a quick and dirty way with an array. I've done it and you can do it too. I'll even give an example of how to do it, but I would argue that you shouldn't. Arrays are really, really good at handling random reads from a location. This means, if you have data you want to bounce around in, arrays are a good way to manage that. While you get this random access behavior, you have to pay for it somewhere. That cost is built in to the allocation and management of array memory.

Let's take a look at a queue built on an array and then we can talk about the problems.

```javascript
// Array-backed queue

function ArrayQueue(){
    this.queue = [];
}

ArrayQueue.prototype = {
    peek: function(){
        return (this.queue.length > 0) ? this.queue[0] : null;
    },
    
    enqueue: function(value){
        this.queue.push(value);
    },
    
    dequeue: function(){
        return this.queue.shift();
    }
};
```

As you can see, this code is really short and easy to write. For a small queue written in a naive way, this will suffice, but there is something dangerous lurking just beneath the surface. When we create our array, it allocates space for the array to live in. This space will grow with our array at a linear rate, which is okay, though non-optimal. The real problem comes in when we perform a shift.

Shifting an array involves retrieving the value from the head of the array, and then moving each of the elements into a new position in the array to fill the head space which was shifted out of the array. This kind of element movement and array space reallocation is really, really slow.

This slowness comes from the fact that an array in Javascript has to abide by particular rules to be predictable. If we were to do the following and the elements weren't moved as described here's what would happen:

```javascript
var myArray = [1, 2, 3, 4];
console.log(myArray.shift()); // 1

//What would happen without reallocation:
console.log(myArray[0]); // undefined

//What REALLY happens because of reallocation
console.log(myArray[0]); // 2
```

This kind of reallocation is exactly what we avoid by using a linked list.  Linked lists grow and shrink in constant time and position 0 is always the head of the list. Since queues only ever interact with the first and last elements of a set of values, lists give us the improved performance we need to ensure, even with large queues, we don't encounter the kinds of difficult to diagnose bottlenecks in our code that can cause slowness.

Queues are a great example of a use for linked lists in the wild and they provide a useful mechanism for lining up data and handling it in a predictable order. With a little creativity, queues can provide a means to manage a cache, handle processes in an orderly way and even provide the backbone for generator-like behavior. Take our queue code and play with it. You might find a solution to a problem that has been challenging you.
{% endraw %}
    