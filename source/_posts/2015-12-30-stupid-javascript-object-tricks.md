---
layout: post
title:  "Stupid Javascript Object Tricks"
date:   2015-12-30 08:00:12 -0800
categories: Coding, General Blogging, Javascript
---
{% raw %}
I usually write something meaty for my posts, but sometimes it's worthwhile to just see some of the strange stuff you can do with a language because it's informative. I remember one of the most enlightening things I experienced while I was working on my degree was taking a class on Assembly.  I don't use Assembly at all in my day to day, but there was a lot of good knowledge I gained just from taking the class.  

Probably the most profound item I experienced in that class was creating a struct in C and watching it take up real memory in the debugger.  It's one thing to say "such and such takes a double word" but to actually see it happen in real time is something completely different.

Today we are going to play with a feature of Javascript that is earmarked for deprecation in ES-next, however, it is so valuable to gaining greater insight into how the language works, I hope its never actually removed.  The feature I am talking about is hand-instantiation of base objects.

Before we dive in, let's back up a little and take a look at some code which should be familiar for people who have written any OO Javascript.  This is just a basic object setup, so don't get too excited.

```javascript
function Greeter (greeting, name) {
	this.defaultGreeting = this.cleanString('Hi', greeting);
	this.defaultName = this.cleanString('person', name);
}

Greeter.prototype = {
	cleanString: function (defaultValue, value) {
		return typeof value === 'undefined' ? defaultValue : value;
	},
	
	greet: function (greeting, name) {
		var cleanGreeting = this.cleanString(this.defaultGreeting, greeting),
			cleanName = this.cleanString(this.defaultName, name);
		
		return cleanGreeting + ', ' + cleanName + '.';
	}
};

var myGreeter = new Greeter('Hi', 'Chris');

myGreeter.greet(); // Hi, Chris.
myGreeter.greet('Hello'); // Hello, Chris.
myGreeter.greet('Dammit', 'Jim'); // Dammit, Jim.
```

Tell Jim, I'm a programmer, not a magician.

Anyway, this is essentially intro to Javascript object creation for OO programming. The interesting thing is, we can actually look up the chain and see the same kind of code repeated at the language definition level. Let's dig in and have a look at the Object object.  (Yes, I just said that.)

```javascript
typeof Object; // function
typeof Object.prototype; // object
Object.prototype.toString(Object.prototype); // [object Object]
```

The reason this is interesting is this, we can actually do some strange stuff with our base object. Normally if we wanted an object, we could just create an object literal.  There are actually two other ways we can create an object as well.  Behold!

```javascript
// Common object creation:
var myNormalObj = {};

// Object instantiation:
var myObjectInstance = new Object();

// Object creation through function calling:
var myFirstObjCall = Object();
```

Okay, here's where it starts to get weird.  You can do this, not only, with Object, but also with Function. Let's create a Function without using the function keyword.  Like Samuel L. Jackson said in Jurassic Park, "hold on to your butts."

```javascript
var firstAdd = new Function(['a', 'b'], 'return a + b;');
var secondAdd = Function(['a', 'b'], 'return a + b;');

firstAdd(1, 2); // 3
secondAdd(4, 5); // 9
```

These are actually just creating anonymous functions with a global scope, but the fact that you can do this at all is kind of amazing.  It gets even weirder, though.  Let's actually dig into the inheritance hierarchy of the Javascript language a little bit and see what lives underneath it all.

```javascript
function identity (value) {
	return value;
}

typeof identity; // function
identity instanceof Function; // true
```

So far, so good.  We know that identity is a simple function and that any function should be an instance of the parent object Function. This all strings together nicely.  It also means we get all of the standard function-related behaviors like call and apply as we would expect.  This makes things reasonably predictable and sane. If we dig a little deeper, though, we discover something surprising.

```javascript
identity.valueOf() === identity; // true

Function.prototype.hasOwnProperty('valueOf'); // false
Object.prototype.hasOwnProperty('valueOf'); // true (!!!)

Function instanceof Object; // true

// Testing because of the transitive property of equality
identity instanceof Object; // true
```

Translating from abstract weirdness to English, what this means is Function inherits from Object.  More to the point, functions are not only data, they are actually objects!

Let that soak for a moment.

This helps the idea we could attach properties to functions make a lot more sense.  In fact, if numbers and strings weren't evaluated through and converted to their rough primitive equivalents, they would actually be Object instances too.  A good way to see this is to open a REPL and try the following:

```javascript
Object(8) + Object(9); // 17
Object('foo') + Object('bar'); // foobar
```

All of a sudden everything in Javascript wraps up a lot more nicely.  Literally any value we deal with in Javascript originates from an object with inherits from Object.  This literally means we deal in objects everywhere.  This, in turn means, creating new types is as straightforward as generating new objects, which is really what objects are largely about in Javascript anyway.

Let's play one last game.  Let's create a function which returns a base value and attaches an error state if something goes wrong, otherwise the error is null.  This kind of behavior is something that can be performed in Go.  Given the power we get with the Javascript Object hierarchy, we can really do some amazing things.

```javascript
isValid(7).error; // null
isValid(15).valueOf(); // true
isValid(999).error; // Number must be positive and less than 100.
```

This kind of programming wanders dangerously close to the meta-programming world, so we should probably stop before we spin off into madness. At the end of the day, Javascript has some really amazing, powerful features which are not generally publicized, but can provide for as rich and powerful a programming experience as you might ever want. The next time you wonder if you can do something, open up a REPL and try it out. The worst that will happen is your idea doesn't work. The best is you will discover a new, relatively unexplored corner of the language.  What's to lose?
{% endraw %}
    