---
layout: post
title:  "Bind All The Things"
date:   2015-12-16 20:48:35 -0800
categories:
	- Coding
	- Foundation
	- Functional Programming
	- Javascript
---
{% raw %}
In the time I have written and mentored with Javascript, there is a single core concept which seems to give people a significant amount of trouble: bind. To the uninitiated, bind is a puzzle, wrapped in a mystery wrapped in an enigma. If you are comfortable with functional programming, there are parts of bind which make no sense and, at the same time, if your experience is rooted in a strict OO language, other aspects will be less than sensible.  I'd like to look at bind holistically in the hope that all will become clear.

<h3>Bind for Object Orientation</h3>

If we look at the object oriented nature of Javascript, we come quickly to prototypes.  Let's create a simple object we can experiment with using a prototypal definition and behavior composition to create a rich greeting API.  (Yes, this is hello world, no I'm not kidding.)

```javascript
function Greeter () {
	this.defaultGreeting = 'Hello';
	this.defaultName = 'person';
}

Greeter.prototype = {
	cleanString: function(defaultValue, userValue) {
		return typeof userValue === 'string' ? userValue : defaultValue;
	},
	
	greet: function (greeting, name) {
		var cleanGreeting = this.cleanString(this.defaultGreeting, greeting),
			cleanName = this.cleanString(this.defaultName, name);
			
		console.log(cleanGreeting + ', ' + cleanName);
	},
	
	sayHello: function (name) {
		this.greet('Hello', name);
	}
};
```

Our greeter object gives us the facility to say hello and to generate a generic greeting. Let's have a look at how we do this:

```javascript
var myGreeter = new Greeter();

myGreeter.sayHello('Chris'); // Hello, Chris;
myGreeter.sayHello(); // Hello, person

myGreeter.greet(); // Hello, person
myGreeter.greet('Hey', 'Chris'); // Hey, Chris
```

Something interesting happens in Javascript when we start capturing pointers to functions. In a purely functional programming language, there is not object or class system to provide function execution context. In a purely object oriented language, functions are second class, so they cannot be separated from their context.  Javascript is the only language I am aware of where functions and their execution context can be separated.  This context separation is precisely the kind of behavior which introduces the "this" issues people are so keen to bring up. Let's have a look at what happens when we separate a function from its object.

```javascript
var hi = myGreeter.sayHello;

hi('Chris'); // undefined is not a function
```

<h3>Bind for Partial Application</h3>

The error we see is because sayHello refers, internally, to this.greet.  Since hi captured a pointer only to the sayHello function, all sense of object context is lost.  This means "this" is referring to whatever bizarre context happens to be surrounding our variable. Best case scenario is this refers to window, but who really knows.  Let's fix this issue.

```javascript
var boundHi = myGreeter.sayHello.bind(myGreeter);

boundHi('Chris'); // Hello, Chris
```

By using bind, we define the function execution context explicitly.  This means boundHi actually behaves the way our original sayHi method on myGreeter did.  Now we get the kind of consistent behavior we wanted. This is not the only thing we can use bind for.  Let's take a look at a function which doesn't depend on an execution context.

```javascript
function add(a, b) {
	return a + b;
}

add(5, 3); // 8
```

Add is a pretty simple function, but we can use it to perform some more interesting actions like doing an inline increment of a value.  Let's use bind to define a new, refined function to perform our increment action.

```javascript
var increment = add.bind(null, 1),
    always10 = add.bind(null, 7, 3);

increment(10); // 11
always10(); // 10

[2, 4, 6, 8].map(increment); // [3, 5, 7, 9]
```

Here, bind provides the ability to partially apply an argument, or arguments if you provide more than one. Obviously our second function is both trivial and somewhat useless, but it demonstrates performing a partial application of more than a single argument.  Meanwhile we can see a reason for wanting to partially apply a single value to a function for instance applying the same operation to an array of values.

<h3>Binding Context and Partially Applying Values Together</h3>

We're in a place where we can tie this all together now.  We have seen execution binding and partial application. Let's have a look at what using all of these behaviors together for a single focused purpose.  Let's create a new function from what we already have which does something a little different.

```javascript
var sayHola = myGreeter.greet.bind(myGreeter, 'Hola');
sayHola(); // Hola, person
sayHola('Chris'); // Hola, Chris
```

<h3>Tying it All Up</h3>

Here we have created a new function, sayHola, with nothing more than the bind function and existing functionality in our Greeter instance.  Bind is a very powerful function which is part of the core Javascript language.  With bind alone, a lot of work can be done.  The next time you are working and discover a context issue, or you simply wish you could use that one function if it only had one of the arguments pre-filled, look to bind. You might find exactly what you need.
{% endraw %}
    