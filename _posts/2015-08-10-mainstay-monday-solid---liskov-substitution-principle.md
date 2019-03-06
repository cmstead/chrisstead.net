---
layout: post
title:  "Mainstay Monday: SOLID - Liskov Substitution Principle"
date:   2015-08-10 09:00:39 -0700
categories: Coding, Design Patterns, Javascript, Mainstay Monday, SOLID
---
{% raw %}
This post is part of a series on the <a href="http://www.chrisstead.net/archives/category/design-patterns/solid/" target="_blank">SOLID programming principles</a>.

We've reached middle and, possibly, one of the more subtle principles in SOLID. Up to now we have dealt in ideas that either prescribe a way to separate and clean up your code, or provide rules for ways to maintain consistency in behavior while adding new functionality. Liskov substitution offers a means to guarantee expectations for developers are met when things change over time.

Arguably this is one of the most difficult principles to apply to functional programming since subclassing doesn't exist, method overriding is meaningless, however there are still some examples that we can look at to identify similarities.  Let's take a look at a function called deref, which dereferences an object value or returns null if the reference does not exist.

```javascript
function validateObject(dataObj){
    return typeof dataObj === 'object' && dataObj !== null;
}

function validateToken(token){
    return token !== '' && token !== undefined;
}

function deref(baseObj, ref){
    let refTokens = ref.split('.'),
        token = refTokens.shift(),
        result = validateToken(token) && validateObject(baseObj) ? baseObj[token] : baseObj;
    
    result = result === undefined ? null : result;
    
    return Boolean(refTokens.length) ? deref(result, refTokens.join('.')) : result;
}
```

This is a <a href="http://www.chrisstead.net/archives/783/mainstay-monday-solving-problems-with-recursion/" target="_blank">recursive algorithm</a>, which we discussed a couple weeks ago. As you can see, it has two return states, either the current result or the result from the next call on the stack. We'll assume that the key string passed in won't be long enough to overflow the stack.

Now, suppose we wanted to take our current deref implementation and extend it to return a default value if the reference we want doesn't exist.  We could, theoretically, add something else to this implementation, but that would violate Open/Closed at the very least.  Instead, let's create a wrapper function that extends the contract.

When we extend the contract for the function, we need to make sure that we don't break functionality for older code that is only using deref.  This means, the new argument must be managed in an optional way. In classical OO languages, we could use method overloading to accomplish this, and it purely functional languages, we would have pattern matching, but Javascript lives in two worlds, so we're going to handle this our own way.

```javascript
function derefWithDefault(baseObj, ref, defaultValue){
    let result = deref(baseObj, ref),
        sanitizedDefault = defaultValue === undefined ? null : defaultValue;
    
    return result === null ? sanitizedDefault : result;
}
```

It only took a couple extra lines of code and we've now created a new function that will give us some very powerful added functionality. What's better with this implementation is, we have maintained the original code, keeping our old functionality insulated from the new behavior.  This means any new code that is written can call our new pseudo-subclassed function just as it would have the old function, and get predictable behavior, and we can revisit old code in time and refactor to the new behavior with nothing more than a function name change. Code stability is the name of this game.

Now, let's have a look at an object oriented approach. Suppose we have a pet class, and we are describing pets which can do the trick "speak."  It's pretty safe to assume we're really talking about parrots and dogs, but we'll assume there are a whole large class of animals that could be pets and do the trick called "speak."  Let's have a look at our base class:

```javascript
class Pet{
    constructor(){
        this.phrase = 'Hello, world.';
    }

    speak(){
        console.log(this.phrase);
    }
}

var genericPet = new Pet();
genericPet.speak(); // Hello, world.
```

Obviously our base pet is some sort of program or computer.  Perhaps it's a highly-evolved <a href="http://www.ibtimes.co.uk/lego-robot-controlled-by-artificial-worm-brain-developed-by-openworm-project-1485174" target="_blank">open worm</a> or a Tamagotchi. At any rate, our pet isn't very interesting, but it's easy to extend and that's what we're going to do.

Let's make our pet a dog.  Dogs can speak, so we're okay there. Let's add another trick, too. Dogs can roll over.  Well, mine won't because they are stubborn, but you can teach a dog to roll over, so let's use that trick. Here's what our dog would look like:

```javascript
class Dog extends Pet{
    constructor(){
        super();
        this.phrase = 'Woof!';
    }
    
    rollOver(){
        console.log('I rolled over, where\'s my treat?');
    }
}

var myDog = new Dog();

myDog.speak(); // Woof!
myDog.rollOver(); // I rolled over, where's my treat?
```

If we look at this code, it's pretty clear that anywhere something is looking for a generic Pet instance, you could pass in Dog and it would be acceptable. It is critical to understand that we intentionally did not change speak.  Suppose we were to create another pet that would only speak if you gave it a cracker and it didn't do any other tricks.  This would definitely be a picky pet.  Let's go ahead and call it just that:

```javascript
class PickyPet extends Pet{
    constructor(){
        super();
        this.phrase = "Thanks for the cracker.";
    }
    
    speak(cracker){
        if(cracker !== 'cracker'){
            throw new Error ('No cracker, no speak.');
        }
        
        super.speak();
    }
}

var myPickyPet = new PickyPet();
myPickyPet.speak('cracker'); // Thanks for the cracker.
myPickyPet.speak(); // Throws error with message "No cracker, no speak."
```

As it turns out this is such a well-known violation of Liskov Substitution that my code editor highlighted the new speak method and informed me that it was an invalid extension of the base class. Obviously, anything expecting a conforming instance of Pet would have a problem with our new subclass. As it turns out, Javascript doesn't care about this violation until runtime and by then, it's too late.

There are more subtle violations that could also happen, but it's hard to list them all. Suppose speak did take an argument, but threw no error for any kind of type violation; this kind of code is still a violation since our new picky pet does throw an error. Other kinds of problems can be type mismatches, variations on what is returned by the method or function, removal of functionality that is critical for the parent class to work properly and so on.

Liskov Substitution is a fairly subtle principle which is meant to protect the deepest, most core parts of your program. I have a friend who claims that every other SOLID principle flows forth from Liskov and I would generally tend to agree, though that's a discussion for another day. Ultimately, if you adhere to the Liskov Substitution principle, your code is more likely to behave well under a broad set of conditions and remain stable even as you enhance you program over time. Think about Liskov Substitution as you work and you will write better code and craft better software.
{% endraw %}
    