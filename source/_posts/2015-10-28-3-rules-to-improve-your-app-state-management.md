---
layout: post
title:  "3 Rules to Improve Your App State Management"
date:   2015-10-28 09:00:16 -0700
categories: Coding, Data Structures, Javascript
---
{% raw %}
As SPAs become more common for web application development, the concept of state is moving almost completely out of the realm of servers and services and into the browser, and rightly so. Ideally services should only maintain state as persistent storage like databases, document stores and file systems. Application state like where the user is and what they are interacting with should be maintained as close to the user as we can keep it.

Systems like Angular have built in state machines as well as third-party solutions, but these solutions are often not enough, on their own, to truly manage all the state your application needs. By relying on just a <a href="https://en.wikipedia.org/wiki/Finite-state_machine" target="_blank">finite-state machine</a> and persistent storage, your application takes on a chatty characteristic and leaves a lot of data living in limbo before it is actually ready for consumption by the services which persist the data from one application session to the next.

The goal of this post is to fill in some of those gaps and smooth out the application development process. Three main ideas are going to be presented: keep state where you can get it, make state mutation obvious, keep state out of meddling hands.  Each of these principles will guide our direction and create something that will serve us well as we work on integrating data transit into our systems both through the client-side application as well as moving data back and forth between our application and our data persistence system.

<strong>Keep State Where You Can Get It</strong>

The first main idea is, we actually do want our state to be accessible to our application. A common reaction I have seen from many developers I've worked with is to simply create a global variable and push data right into an object on the window scope. We will see later, this is a violation, not only of general best practice, but also of one of our three rules.

Nevertheless, we need some place where we can access our data, so let's create a very simple state cache factory, which will give us the most fundamental piece of the puzzle.  We will create an object, if one doesn't already exist, and hand it out to components which request it. This kind of design keeps state off the global scope, while still making it readily accessible when we need it.

** Note: Our state factory makes use of the either function from my <a href="http://www.chrisstead.net/archives/861/sanitary-data-maybe-either-and-deref/" target="_blank">sanitary data post</a>.

```javascript
var stateFactory = (function () {
	
	var stateCache = {
		data: false
	};
	
	function build () {
		stateCache.data = either({}, stateCache.data, 'object');
		return stateCache.data;
	}
	
	return {
		build: build
	};
	
})();

var myStatePointer = stateFactory.build();
myState['foo'] = 'bar';

var secondStatePointer = stateFactory.build();
console.log(secondStatePointer.foo); // bar
```

So far so good. We can easily reach our state, but it is kept out of the global scope. This makes our state a little more stable, but it also exposes a big problem. We are hand-editing an object. This means, each time we update state, we are actually modifying all state for everyone. What's worse, it's really, really difficult to identify where the state is getting modified. We can't search the document for any particular behavior because anyone could write their function to work in any way they like and potentially blow away all state for any part of the app. Yikes!

<strong>Make State Mutation Obvious</strong>

Simply handing around an object pointer is anything but obvious. We are all quite familiar with working with object literals, and most SPAs end up littered with them, so our state object will quickly become part of the crowd. Losing track of your state object is a dangerous game that will lead to some very difficult to identify bugs. Ideally your state should have a well-defined interface to interact with so it is easy to identify when state properties are added or existing properties are accessed and modified.

The post about <a href="http://www.chrisstead.net/archives/949/data-types-objects-and-creating-a-new-generic-type/" target="_blank">creating a new generic type</a> introduced structs as an object concept.  Structs are a good step in the right direction. Each property has its own accessor and mutator, so we get a lot of what we need for free. Let's update our state factory build method to return a struct and lock down our state interface.

```javascript
(function () {
	
	/* ... State factory code here ... */
	
	function build () {
		stateCache.data = either(new Struct(), stateCache.data, 'object');
		return stateCache.data;
	}
	
	/* ... Remaining state factory code here ... */
	
})();

var statePointer = stateFactory.build();

statePointer.addProperty('foo');
statePointer.set.foo('bar');

var secondStatePointer = stateFactory.build();

console.log(statePointer.get.foo()); // bar
```

The interface is a little more verbose than directly manipulating an object literal, but the clarity we get when interacting with the state outweighs the pain of an extra couple key strokes. We can now easily find every instance of state access by looking for get.keyName() and every instance of state modification by looking for set.keyName().

With an interface distinct to the struct, our state interactions become obvious. This kind of clarity makes programming much easier since our local data can be anything we like, while we keep our state data clean and obvious. There is still one issue: we still have a lot of access to do terrible things to the data stored in our state. The struct definition comes with a merge function so we could easily do the following:

```javascript
var statePointer = stateFactory.build();

statePointer.merge({
    keyName1: someNewObject,
    keyName2: someOtherObject,
    keyName3: someLastObject
});
```

Now all of the data for three keys has been blown away which could quickly send our app into a tailspin.  There is no way to be certain our objects will continue to line up with the state our app expects in other places. This kind of uncertainty makes for a scary programming experience which could bring even the most senior programmer to tears.

<strong>Keep State Out of Meddling Hands</strong>

There is a saying that goes a little like this, "if one person gets a cold everyone gets a cold." What this really means is, when everyone is working closely together, if someone introduces something bad into the system it becomes everyone's problem. There is no place this becomes more obvious than when dealing with state.

When dealing with state access, handing off a pointer becomes a liability. What we really need to do is wrap up our struct with a state-specific interface. Structs as created in the related post, are a mutable data type. This means anyone can go in and change them any way they want. What we really want to do is temper that mutability and define how our program actually interacts with our struct.

The best way to do this is to wrap our struct up in a state object, and expose methods which tightly control how our data flow works. This new construct uses the <a href="https://gist.github.com/cmstead/59675cb818593b197839" target="_blank">clone function from JFP v2.4.0</a> to allow copied data out through a getter, but stops data propagation back up the object tree. This forces programmers working with our state object to explicitly set the new state once they have modified the object copy.

```javascript
function State (initialState) {
	var sanitizedInitialState = j.either({}, initialState, 'object'),
		stateStruct = new Struct(),
		stateKeys = Object.keys(sanitizedInitialState);
		
	Struct.prototype.constructor.apply(stateStruct, stateKeys);
	stateStruct.merge(sanitizedInitialState);
	
	this.get = {};
	this.set = {};

	this.addState = this.addState.bind(this, stateStruct);
	stateKeys.foreach(this.attachStructMethods.bind(this, stateStruct));
}

State.prototype = {
	
	accessorBase: function (struct, key) {
		return j.clone(struct.get[key]());
	},
	
	attachStructMethods: function (struct, key) {
		this.get[key] = this.accessorBase.bind(this, struct, key);
		this.set[key] = struct.set[key];
	},
	
	addState: function (struct, key, value) {
		struct.addProperty(key);
		struct.set[key](maybe(value));
		
		this.attachStructMethods(struct, key);
	}
	
};
```

Our new state object also introduces the concept of an initial state.  This allows us to bootstrap our application into a particular state by making use of the struct merge behavior. We will want our stateFactory to account for this and only allow state bootstrapping once, throwing an error if someone tries to fully re-bootstrap the app in the middle of the user's experience.  Let's take a look at our final build behavior.

```javascript
(function () {
	
	/* ... State factory code here ... */
	
	function build (initialState) {
		if(typeof initialState !== 'undefined' && stateCache.data instanceof State) {
			throw new Error('Cannot bootstrap existing state object.');
		}
		
		stateCache.data = either(new State(initialState), stateCache.data, 'object');
		return stateCache.data;
	}
	
	/* ... Remaining state factory code here ... */
	
})();
```

This final iteration gives us the remaining stability we need to really handle state well. Now when we access state, we get a copy of the data, which may be all we need. If we need to actually update the data, we have exposed methods to merge new data back into the state system. Finally, we can make use of the merge functionality in our structs, which allows us to bootstrap our state with little effort, which takes the user to exactly the place they wanted to be when we pick up from a non-trivial state. Let's take a look at what our new interactions would look like.

```javascript
var statePointer = stateFactory.build({ 'foo': ['bar'] }),
    fooState = statePointer.get.foo();

console.log(fooState[0]); // bar

var secondStatePointer = stateFactory.build(),
    secondFooState = statePointer.get.foo();

console.log(secondFooState[0]); // bar

fooState[0] = 'baz';
statePointer.set.foo(fooState);

console.log(fooState[0]); // baz
console.log(secondFooState[0]); // bar

secondFooState = secondStatePointer.get.foo();
console.log(secondFooState[0]); // baz

stateFactory.build({ 'foo': ['bar', 'baz', 'quux'] }); //Throws error
```

By taking time to build out a stable state system, we shield our application from sudden, unexpected changes in our state. This means each of our modules can act on state data independently, and then feed the updates back into the system. Ideally, we would take care to merge state updates into our local data before we merge our changes back into the core state, but that's another post for a different day.

As you build your client-side applications, don't only think about state that your routing system provides, but also consider the true, robust state of your application. Create state data your application can access, make it obvious when that data changes and keep the original state data out of meddling hands. With just a little bit of preparation, your applications will be stable and fun to work on.
{% endraw %}
    