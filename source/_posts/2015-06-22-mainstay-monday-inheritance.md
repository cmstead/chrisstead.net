---
layout: post
title:  "Mainstay Monday: Inheritance"
date:   2015-06-22 10:00:50 -0700
categories:
    - Coding
    - Foundation
    - Javascript
    - Mainstay Monday
---
{% raw %}
This is the first in a new series I am trying out on my blog.  Every Monday I want to provide a post about some foundational element of programming and how it relates to Javascript development. What better place to start than inheritance?

Object inheritance is one of the one of the least understood foundation Javascript topics I can think of. Even if a developer is comfortable with prototypal behavior and instantiating prototypal objects, handling inheritance is a layer which is more obscured in the Javascript than classically designed, OO languages.

Let's discuss the object prototype.  To start with a simplified definition, an object prototype is a set of properties associated with an object that defines the foundation functionality an instance of the object will have.  In other words, anything you put on an object prototype will define what that object will be when you perform a 'new' operation.

Let's take a look:

```javascript
//This is an object setup in ES5
function Fooer(){}

Fooer.prototype = {
    foo: function(value){
       return 'bar';
    }
};

var myFooer = new Fooer();

console.log(myFooer.foo()); // 'bar'
```

This is about as simple as it gets. We define a function attached to the prototype, let's call it a method to keep parity with classical OO languages, and when we get a new instance, the method is attached to the object we get back. Once you are familiar and comfortable with this syntax, it's easy to do and easy to understand.  The pitfall we have here is it's a little convoluted.  ECMAScript 6 (ES6) introduces a new, more classical notation, though the underlying behavior is still the same as it ever was.

```javascript
//ES6 classes look like this
class Fooer{
    foo(){
        return 'bar';
    }
}

let myFooer = new Fooer();

console.log(myFooer.foo); // 'bar'
```

The code is a little shorter and, hopefully a little more declarative of intent, but the end result is identical.  Now, in classical languages, there is a concept of object hierarchy.  OO languages provide a clear construct for how this is handled with a special keyword.  Let's call this inheritance keyword 'extends.' Let's pretend our classical language uses this 'extends' keyword and create a child object with it.

```javascript
class Greeter extends Fooer{
    greet(name){
        console.log('Hello, ' + name + '.');
    },

    fooGreet(){
        this.greet(this.foo());
    }
}

let myGreeter = new Greeter();

myGreeter.greet('Chris'); // log: Hello, Chris.

console.log(myGreeter.foo()); // log: bar

myGreeter.fooGreet(); // log: Hello, bar.
```

You'll note that we just got the parent properties for free.  Extra bonus, SURPRISE, that's ES6 syntax. It's nice and easy.  Most of us are still working in ES5 and in ES5, the times are hard.  Let's have a look at what inheritance looks like when you don't have all the handy dandy syntactic sugar.

```javascript
function Greeter(){}

Greeter.prototype = Object.create(Fooer.prototype);

Greeter.prototype.greet = function(name){
    console.log('Hello, '  + name + '.');
}

Greeter.prototype.fooGreet = function(){
    this.greet(this.foo());
}

Greeter.prototype.constructor = Greeter;

var myGreeter = new Greeter();

myGreeter.greet('Chris'); // log: Hello, Chris.

console.log(myGreeter.foo()); // log: bar

myGreeter.fooGreet(); // log: Hello, bar.
```

This is a lot more verbose than our friendly ES6 syntax, but it's pretty clear the result is the same.  We end up with an object that performs a new operation and directly inherits properties from Fooer.  This verbosity along with the hoops you have to jump through makes it pretty obvious why people don't introduce object inheritance in a beginning discussion of Javascript.

Regardless of the obscurity, we can try this and see inheritance really works and it adheres to the kinds of expectations we would bring from languages like Java, C#, PHP, etc.

```javascript
var testGreeter = new Greeter();

console.log(testGreeter instanceof Greeter); // true
console.log(testGreeter instanceof Fooer); // true
```

By adding object inheritance to our arsenal, we can look back to our computer science forefathers and apply the knowledge they shared in books like the Gang of Four Design Patterns book.  Concepts like inheritable DTOs become usable in Node and in the browser and we can begin to normalize our coding practices and use sane conventions in our profession to help us focus on the task at hand: solving new problems.

On top of all of this, we can see deeper into what is really happening with prototypes. When we understand how prototypes handle object properties and provide a link to the parent object, we can better understand how to leverage the finer nuances of the language for a more powerful programming experience.

<h3>Blog Notes</h3>

For an abstraction layer to handle inheritance, please see my <strong><a href="http://bit.ly/1LnWdFO" target="_blank">gist</a></strong>.
{% endraw %}
    