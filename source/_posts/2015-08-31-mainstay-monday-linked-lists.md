---
layout: post
title:  "Mainstay Monday: Linked Lists"
date:   2015-08-31 09:00:26 -0700
categories:
    - Coding
    - Data Structures
    - Foundation
    - Javascript
    - Mainstay Monday
---
{% raw %}
Dear data structures, which of you is most useful? I don't know, but linked lists are pretty awesome. Linked lists are great for any number of things, a list of data that can be grown without bound, a data structure that can be incrementally increased, a queue or a stack. There are even more things that can be done with linked lists, but before we can dig into what can be done with a linked list, we need to understand what it even is.

The most basic linked list is a series of objects that point from one to another. This is what we are going to dig into today. To get a basic understanding of how a linked list works, let's have a look at a basic diagram of a linked list.

<blockquote>
|Object A| -> |Object B| -> |Object C| -> null
</blockquote>

By this diagram, it makes sense to say that an empty list is null. It's not like null or falsey, but it's actually null.  Null contains nothing and points to nothing. As soon as you put your first element into the list, you get this:

<blockquote>
null
=> |Object A| -> null
</blockquote>

The last object in our linked list, always, is null. This actually makes it really easy to identify when we have hit the end of the list.  This kind of list is called a singly-linked list. This means we can only traverse the list in one direction. Typically when a linked list is created, the head of the list is held as a pointer.  Each object, including the head is an object and they are all, essentially, the same.  Let's have a look at an implementation of a basic linked list item.

```javascript
function ListItem(value){
    this.value = value;
    this.nextPointer = null;
}

ListItem.prototype = {
    val: function(){
        return this.value;
    },
    
    append: function(node){
        var pointer = this.nextPointer;
        this.nextPointer = node;
        node.setNext(pointer);
    },
    
    setNext: function(pointer){
        this.nextPointer = pointer;
    },
    
    next: function(){
        return this.nextPointer;
    }
}
```

There's really not much to this, but the important items here are the constructor which sets the internal value, which I am treating as read-only for our case.  Let's just say it's better that way. After that, we need an accessor, so let's use val.  Finally we need to be able to set the next value in the list and retrieve the next value in the list; append and next will do just fine for this.  Now if we want to create and use our list it would look like the following:

```javascript
var listHead = new ListItem('foo'),
    listTail = new ListItem('bar'),
    tempItem;

listHead.append(listTail);
tempItem = new ListItem('baz');
listTail.append(tempItem);
listTail = tempItem;

tempItem = listHead;
console.log(tempItem.val()); // foo
tempItem = tempItem.next();
console.log(tempItem.val()); // bar
tempItem = tempItem.next();
console.log(tempItem.val()); // baz
tempItem = tempItem.next();
console.log(tempItem); // null
```

This is a pretty manual process, but it gets the job done and we can see the basic use of our linked list object.  Now we can see how each of the objects links to the next and the last object always refers to null. This gives us a nice, predictable structure and clear, obvious algorithm for accessing each element in the list.

Let's add some convenience functionality around our list so we can dig into some of the interesting characteristics of a linked list.  We can create a list object and an iteration object.  These will give us a nice API to work with.

<pre class="language;javascript">
function Iteration(list){
    this.current = null;
    this.listHead = list;
}

Iteration.prototype = {
    next: function(){
        var next = (this.current !== null) ? this.current.next() : this.listHead;
        this.current = (next !== null) ? next : this.current;
        
        return (next === null) ? null : next.val();
    },
    
    hasNext: function(){
        var next = (this.current !== null) ? this.current.next() : this.listHead;
        return next !== null;
    }
};

function List(){
    this.first = null;
    this.last = null;
}

List.prototype = {
    append: function(value){
        var item = new ListItem(value),
            last = this.last;
        
        this.last = item;
        
        if(last){
            last.append(item);
        }
        
        if(!this.first){
            this.first = item;
        }
    },
    
    getFirst: function(){
        return this.first;
    },
    
    getLast: function(){
        return this.last;
    },
    
    iterate: function(){
        return new Iteration(this.first);
    }
};
```

Here's what our original usage looks like once we wrap everything up:

```javascript
var myList = new List(),
    iterator;

myList.append('foo');
myList.append('bar');
myList.append('baz');

iterator = myList.iterate();

while(iterator.hasNext()){
    console.log(iterator.next());
}

console.log(iterator.next());
```

This is much cleaner and it gives us a little insight into the first aspect of linked lists, access performance. If we want to access the first or last element of our list, it happens in constant time, which we can express in big-o notation as O(1). This is really fast.  It's just about as fast as you can get for value access.

On the other hand, we also lose something for this gain at the front and back of the list.  Accessing any of the elements in the middle can only be accessed in linear, or O(n), time.  This means, to reach the nth element, you have to cycle through each element before it.  For small lists this is not a problem, but for large lists, this can be a problem.

These performance characteristics make linked lists great for small data sets and things like stacks and queues. Linked lists, however, are not suited for random access or repetitive search.  Sorting's not great either, but that's another discussion for another day. Let's look at accessing elements.

```javascript
var myList = new List();

myList.append(1);
myList.append(2);
myList.append(3);
myList.append(4);

function nth(list, index){
    var foundItem list.getFirst().next();

    // Looping to access! Linear time element access.
    while(index > 0){
        foundItem = foundItem.next();
        index--;
    }

    return foundItem;
}

var firstItem = list.getFirst(), // O(1) - fast
    lastItem = list.getLast(), // O(1) - fast
    secondItem = nth(list, 1); // O(n) - linear
```

Modification characteristics, on the other hand, are fantastic. If you need to add elements to a list, it's fast. The addition action is nearly as fast as reading the head or tail of the list. If you have the list element you want to insert after, you get an O(n) insertion speed.  The most costly part is the instantiation of a ListItem object. Each time you call append, it just adds an element and you're done. Speedy!

At the end of the day, there is another kind of list: the doubly-linked list.  As it turns out the performance characteristics aren't terribly better.  You get the benefit of moving up and down through the list, but access is about the same speed as is appending.

Linked lists, by themselves, are useful for the purpose of fast writing and small memory footprint for storage expansion.  It also doesn't require any pre-allocation, and can grow incrementally. When we look at other data structures, linked lists can make a good foundation structure because of the fast write behavior.  There is also a removal characteristic that is equally fast.  We'll take a look at those structures in another post.  Until then, think about your data and how you need to use it. Perhaps a list is what you've needed all along.
{% endraw %}
    