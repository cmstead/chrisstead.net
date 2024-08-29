---
layout: post
title:  "Mainstay Monday: SOLID - Single Responsibility Principle"
date:   2015-07-27 09:00:58 -0700
categories:
	- Coding
	- Design Patterns
	- Foundation
	- Javascript
	- Mainstay Monday
	- SOLID
---
{% raw %}
This post is part of a series on the <a href="http://www.chrisstead.net/archives/category/design-patterns/solid/" target="_blank">SOLID programming principles</a>.

Starting this post and for the following four Mainstay Monday posts, I am going to go through the SOLID principles as put forth by Bob "Uncle Bob" Martin and Michael Feathers. SOLID is a foundational set of principles to allow programmers to evaluate their code by and refactor to in order to reduce bugs and increase stability. Originally SOLID was presented as a tool for object oriented design (OOD), but I contend that many of the principles apply to the functional paradigm as well.

The first principle of SOLID is the Single Responsibility Principle. As the name states, single responsibility is a heuristic we can use to evaluate whether code we wrote is trying to accomplish too many different tasks.  When code does too many things at once it allows bugs to creep in undetected. Following is a function that, at first glance, looks pretty small and innocuous, but actually tries to accomplish several different tasks at once.

```javascript
function returnAdder(){
	
	let latestSum = 0;
	
	return function addStuff(a, b){
		if(typeof a !== 'number' || typeof b !== 'number' || isNaN(a + b)){
			throw new Error('Something isn\'t a number, yo');
		}
		
		latestSum = a + b;
		
		return latestSum;
	}

}
```

Just as a brief review of what is happening here, we have a state variable captured in a closure, called latestSum. The returned function does a little validation, a little arithmetic and a little state modification. For 4 lines of executable code, that's actually quite a bit going on.

Let's do some refactoring and tease apart each of the different actions we're performing and create separate functions for each.  This may not immediately seem like the best way to go about things, but it will make our issues a little more transparent. Here's a new, refactored function that does the same job.

```javascript
function returnComplexAdder(){

	let latestSum = 0;

	function storeLatestSum(sum){
		latestSum = sum;
	}
	
	function validateArguments(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
		    bIsValid = typeof b === 'number' && !isNaN(b);
			
		return aIsValid && bIsValid;
	}

	function add(a, b){
		return a + b;
	}
	
	return function composedAdder(a, b){
		if(!validateArguments(a, b)){
			throw new Error(`Either ${a} or ${b} is not a valid number.`);
		}

		storeLatestSum(add(a, b));
		return latestSum;
	}
	
}
```

Composed adder is a little cleaner now. Each of the things it used to handle directly have been abstracted away and then reintroduced as function calls.  Now our function is a little less explicit about the discrete steps needed to accomplish the work, and our adder function can be considered more of an execution layer which merely combines the steps needed to fully process our request.

As it turns out, however, a big mess of functions like this can turn ugly in a heartbeat.  Beyond the obvious trend toward one or more pyramids of doom, we are handling a memory state in a rather sub-optimal way. When state and functions that modify that state live closely together it can sometimes be helpful to collect the entire block of data and functions into an object which manages its own state.

When we create a class around this concept of an adder with a persistent memory, we can make nearly a one-to-one conversion from a functional form to an instantiable object. Let's refactor and take a look at the resulting object.

```javascript
class memAdder{
	constructor(){
		// Since the world can access this and we haven't done anything yet
		// we want to use a non-number falsey value that accurately describes
		// the current state of our object.
		this.latestResult = null;
	}
	
	storeLatestResult(result){
		this.latestResult = result;
	}
	
	validateArguments(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
		    bIsValid = typeof b === 'number' && !isNaN(b);
		
		return aIsValid && bIsValid;
	}
	
	add(a, b){
		a + b;
	}
	
	computeAndStore(a, b){
		if(this.validateArguments(a, b)){
			throw new Error(`Either ${a} or ${b} is not a valid number.`);
		}
		
		this.storeLatestResult(this.add(a, b));
		return this.latestResult;
	}
}
```

Aha! Once we have made the transition to an object oriented paradigm, it becomes clear that we are still, in fact, not adhering to the single responsibility principle.  Our object, memAdder, is still doing all of the same things our original function was doing.  This is why our function looked so messy, we kept all the clutter!

As people who know me understand, I am a proponent of "everyday functional programming." This means that doing things in a purely functional way in theory sounds wonderful, but sometimes objects happen.  The beautiful thing that can happen, however, is sometimes we start looking at a big, ugly object and then functions happen.

Let's use a modified strategy/factory pattern returning functions instead of objects to abstract away all of our validation and computation logic and leave the object managing the thing objects manage best: state.  When we do this, we can fall back to our preferred pure functional approach for the grunt work, which will be selected and managed at runtime based on user need, meanwhile we have an object that can compose functions on the fly and maintain a running memory of the latest computation peformed.

```javascript
//IIFE ALL THE THINGS!
let arithmeticValidatorFactory = (function(){
	
	function numberValidator(a, b){
		let aIsValid = typeof a === 'number' && !isNaN(a),
		    bIsValid = typeof b === 'number' && !isNaN(b);
		
		return aIsValid && bIsValid;
	}
	
	function getValidator(key){
		let validators = {
			default: numberValidator
		};
		
		return Boolean(validators[key]) ? validators[key] : validators['default'];  
	}
	
	return {
		get: getValidator
	};
	
})();

//IIFEs keep the global space clean and happy
let arithmeticFunctionFactory = (function(){
	
	function zeroFunction(){
		return 0;
	}
	
	function add(a, b){
		return a + b;
	}
	
	function getFunction(key){
		let arithmeticFns = {
			addition: add,
			default: zeroFunction
		};
		
		return Boolean(arithmeticFns[key]) ? arithmeticFns[key] : arithmeticFns[default];
	}
	
	return {
		get: getFunction
	};
	
});

class memComputor{
	constructor(method, validator){
		this.compute = method;
		this.validator = validator;
		this.latestResult = null;
	}
	
	setLatestResult(result){
		this.latestResult = result;
	}
	
	computeAndStore(a, b){
		if(!this.validator(a, b)){
			throw new Error(`Either ${a} or ${b} is not an acceptable argument.`);
		}
		
		this.setLatestResult(this.compute(a, b));
		return this.latestResult;
	}
}
```

As we can see, the new object memComputor has been reduced to a single responsibility. Hooray! That's what we set out to do. memComputor is instantiated with a computation method and a validator, so it contains no computation or validation logic of its own. ComputeAndStore does exactly that. It takes the desired functionality, composes it on the fly, fails the attempt if it is invalid, otherwise the computation is performed and the output is stored and returned.

Meanwhile on the factory front, we have all of our actions lined up. We declare the methodology we need, receive functions and we have a pair of pure functions that are reliable, bug-free, or as close as we can make them, and ready for injection into our state-management object.

It seems like a lot of code to, ultimately, do a simple addition problem. If the goal were addition, I would agree. Ultimately, however, what we really built here was the foundation for a system to manage expensive actions that we might want to perform once and then reference again and again, like the union or intersection of a large list of data, perhaps.

To sum up everything we've gone over, the Single Responsibility Principle is a heuristic tool for evaluating whether a block of code, object-oriented or functional, is performing the correct actions to accomplish a single goal or if the code is taking on too much and should be refactored to solve the problem in a more granular way.

With many programming problems, identifying the right granularity can be difficult, but by using some of the well known and battle tested tools and solutions like the single responsibility principle. By adding SOLID principles to your arsenal of tools, your programming will get better and your ability to solve even greater and more complex problems will become a question of breaking them down into the right pieces.
{% endraw %}
    