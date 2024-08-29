---
layout: post
title:  "Objects Are Still Shared State"
date:   2016-03-30 09:00:12 -0700
categories:
    - Code Smells
    - Coding
    - Data Structures
    - Design Patterns
    - Functional Programming
    - Javascript
---
{% raw %}
Dear programmers coming from Classical Object Oriented programming, please stop thinking that encapsulation of variables eliminates the "globalness" of your variable. It's a hard truth, but you had to hear it from someone; you have a problem. Consider this an intervention.

I had a conversation a couple months ago where I looked at some code a senior developer had written and asked, "why are you using a global variable?"  The response I got was "it's the exposing module pattern, so it's local and encapsulated. It's not global."  The variable was a cache object exposed outside of the module; and it was global anyway.

When I say global, it is not about whether the entire program, or the entire world, can access your value, it's about how your variable gets managed and modified. Really, the problematic aspect of a global variable comes from the fact that global variables, in many popular languages, represent shared, mutable state.

Consider a world where every variable is actually immutable, i.e. once you create a variable, you can't change the value.  In this particular case, a global variable is really nothing more than a globally readable value.  You can't write to it, so you can't impact the rest of the running program.  Is that global variable actually a problem?  Decidedly less so, that's for sure.

<h3>Mutating Object State</h3>

Let's take a look at a very simple, though rather common, example of the way variables are often managed inside objects.

```javascript
    function SneakyObj () {
        this.value = 0;
    }
    
    SneakyObj.prototype = {
        getValue: function () {
            var current = this.value;
            this.value++;
            return current;
        }
    };
```

There are two things wrong with this if value is actually important to the internal state of the object.  First, since Javascript does not support private variables (explicitly, but we'll come back to that), then this suffers from the Indecent Exposure code smell.  Essentially, anyone in the world can directly access and modify the internal state of this object.  That's bad news.

The second issue with this object is the getter actually modifies the internal value of our object and returns a representation of the previous object state.  Effectively, our getter is modifying the internal state of the object and lying to us about it.

Before you proclaim "I never do that! How very dare you," keep in mind that this pattern shows up all the time.  Popular frameworks like Angular and Ember actually encourage this kind of thing through the controller pattern.  This is a sneaky trap that is hard to avoid.

Although we can't quickly resolve the code smell, let's take a look at a remedy for the lie that is our "get" method name.

```javascript
    function LessSneakyObj () {
        this.value = 0;
    }
    
    LessSneakyObj.prototype = {
        getAndUpdateValue: function () {
            var current = this.value;
            this.value++;
            return current;
        }
    };
```

Now we understand and declare what the method does.  For some people this is enough and we need to go no further.  I, on the other hand, feel this is still rather suspect and would prefer to see a cleaner, more elegant construction.

<h3>Separate The Activity</h3>

The issue I draw with our updated object is, we have one method which does all the things.  This is a really bad idea since it really doesn't protect the programmer from a micro-god function.  (Hey, You can have micro-frameworks and micro-services.) Effectively we have fixed the naming problem, but we haven't actually resolved the smelly code which lives within our method.

Typically I prefer a single function which will return the current state of affairs and other function, if you MUST, which modifies the internal state.  This kind of separation of concerns actually helps to keep object state sane and useful.  If not for the exposed internal value of the object, we would be on our way to saner code.

```javascript
    function ObviousObj () {
        this.value = 0;
    }
    
    ObviousObj.prototype = {
        get: function () {
            return this.value
        },
        
        update: function () {
            this.value++;
        }
    };
```

We can see this code actually separates the functionality and has the lovely side effect of making the code more readable. If I were working in a project using an MVC paradigm, I would call this good and move on.  We have separated the behaviors and tried to keep everything clean, tidy and meaningful.  Our view would be able to access the values it needs and we keep our state management safe from accidental update.

<h3>Turn Up The Encapsulation</h3>

From here we can start looking at working on our fine detail.  Up to now, we have accepted that our internal values are exposed and available for the world to manipulate, AKA Indecent Exposure.  It's time to fix that little bit of nastiness and make our object water- and tamper-proof.

The only way to actually protect a variable from external access in Javascript is through closures.  Since functions are objects and objects are built atop function constructors, we can perform a little scope management surgery and make our object really safe and secure.  Let's take a look and see what we can do to lock things down.

```javascript
    function EncapsulatedObj () {
        var internalState = {
            value: 0
        };
        
        this.get = this.get.bind(null, internalState);
        this.update = this.update.bind(null, internalState);
    }
    
    EncapsulatedObj.prototype = {
        get: function (state) {
            return state.value;
        },
        
        update: function (state) {
            state.value++;
        }
    };
```

This code does a little fiddling around with scope by partially applying the object's internal state to our get and set functions.  This protects our variable from being accessed by the outside world, but allows our get and update methods to access our value freely.  When your data must be locked away, this will get you there.

<h3>Our Code Goes to 11</h3>

In order to finish up this journey, it seemed only right to create a completely pure, immutable object just to see where it would lead us.  If we were to really go all the way, we would need to do a little more work to ensure everything still worked as we would expect.

We know the variable "value" maintains a count for some reason, so it will be important to ensure value is always an integer.  We also want to make sure the get method always gives the current count.  Finally, update should do just that: update the count value. What does it mean to make an update if everything is immutable?  Let's have a look and find out.

```javascript
    function isNumber (value){
        return typeof value === 'number';
    }
    
    function isInt (value){
        return isNumber(value) && Math.floor(value) === value;
    }
    
    function SafeObj (initialValue) {
        var value = SafeObj.cleanValue(initialValue);
        
        this.get = this.get.bind(null, value);
        this.update = this.update.bind(null, value);
    }

    SafeObj.cleanValue = function (value) {
        return isInt(value) ? value : 0;
    };
    
    SafeObj.prototype = {
        get: function (value) {
            return value;
        },
        
        update: function (value) {
            return new SafeObj(value + 1);
        }
    };
```

This is just chock full pure functions and added behavior. With all of that added behavior, we get something magical.  Instead of having an object which is mutable and, ultimately, somewhat unpredictable and hard to test, we end up with an object which has the following properties:

<ul>
<li>Immutable</li>
<li>Contains pure methods</li>
<li>Has a single, pure, static method</li>
<li>Is compositionally built</li>
<li>Updates through new object construction</li>
</ul>

This whole object construction could lead us down many discussions which would get into types, values, mutability, function composition and more.  For now, it will suffice to say, this kind of development creates the ideal situation for developing safely and really turns our code up to 11.

<img src="http://media.tumblr.com/10430abfede9cebe9776f7de26e302e4/tumblr_inline_muruf3LBUw1qlasi4.gif" alt="The numbers all go to 11." />

<h3>Summing Up</h3>

Although we got a little spacey at the end, the important thing to take away from this whole thing is, any time an object is built and modifies its own state through method calls, the methods are actually relying on shared, mutable state.

Shared mutable state in an object really is just a micro-global and should be viewed as such.  This means, any value which can be accessed and modified should be considered unsafe and untrustworthy.  Untrustworthy data should never be viewed as the source of truth.

From here forward, if you start to add a variable to an object or module, ask yourself, does this really need to be global, or can I localize it?  Perhaps you will find a better way to keep your code clean and easy to reason about.
{% endraw %}
    