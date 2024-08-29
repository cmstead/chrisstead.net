---
layout: post
title:  "Eliminating Switch Statements with Hashmaps"
date:   2015-07-08 10:00:58 -0700
categories: Code Smells, Coding, Design Patterns, Foundation, Javascript
---
{% raw %}
It has been a really, really long time since I created a switch statement. I'm not saying there is no place for switch statements in programming, I'm just saying, I haven't had a reason to use one in a long time. Even though I haven't written a switch in a long time, I have seen them popping up in code examples at work, online and other places a lot lately.

After seeing several different uses, I started asking "what is the programmer really trying to say with these?" Most of the examples I have seen look like the following:

```javascript
function sendError(message){
    notification.error(message);
}

function doStuff(){
    //Code doing some stuff that might have an error

    if(errorCode !== undefined){
        switch(errorCode){
            case 123:
                sendError('some error message');
                break;
            case 234:
                sendError('some other error message');
                break;
            // more cases here
            // ...
            // finally
            default:
                sendError('An unexpected error occurred');
                break;
        }
    }
}
```

This has a very particular code smell that I haven't encountered a name for yet.  I'm going to call it conditional obsession. In this particular case, the programmer has opted for conditional logic to emulate a well-known and commonly used data structure.  Reducing this kind of conditional overhead is akin to using a stack to eliminate recursion.

Switch statements are intended to be a way to simplify multiple conditionals in a more readable way. Since this code is not really, actually handling a set of conditionals, the switch statement has become little more than an extravagant replacement for a hashmap.

For those of you in Javascript land who aren't familiar with hashmaps, they are a very close relative to the object literal we have all come to know and love. They are so close, in fact, that you can substitute an object literal in for a hashmap at any point in order to maintain an idiomatic look and feel to your code.

Let's take a look at what a data structure containing our error messages would look like:

```javascript
var errors = {
    123: 'some error message',
    234: 'some other error message',
    345: 'an error message from some other place in the local code',
    // Just add your error message here.
};
```

Hey, that makes a lot more sense to me. I can look at this and, in a glance I can immediately tell you what our hashmap contains and what the relation means.  This, of course, still doesn't satisfy one thing that a switch statement can do: default behaviors.

Fortunately, we can build a quick, painless mechanism to handle default values and keep all of the readability we have started here.

```javascript
function getErrorMessage(errorCode){
    let message = errors[errorCode];
    return message !== undefined ? message : 'An unexpected error occurred.';
}
```

Now we have reduced our switch statement down to what we really meant to say: find my error message in this set of keys; if a message can't be found, then provide a default value instead. This leaves us with a single data structure and one conditional that handles the case we were really interested in: when the error code is unknown.

We will need to make one more modification to our original code to really clean it up and give us the clarity we are looking for:

```javascript
function sendError(errorCode){
    let message = getErrorMessage(errorCode);
    notification.error(message);
}
```

Now sendError doesn't require every function to perform some preprocessing to capture the error message it needs to send.  This reduces the complexity of our code every place an error code switch statement might have existed and allows us to centralize our error messaging and let our core functionality do what it is intended to do.

Here's our final, refactored code:

```javascript
var errors = {
    123: 'some error message',
    234: 'some other error message',
    345: 'an error message from some other place in the local code',
    // Just add your error message here.
};

function getErrorMessage(errorCode){
    let message = errors[errorCode];
    return message !== undefined ? message : 'An unexpected error occurred.';
}

function sendError(errorCode){
    let message = getErrorMessage(errorCode);
    notification.error(message);
}

function doStuff(){
    //Code doing some stuff that might have an error

    if(errorCode !== undefined){
        sendError(errorCode);
    }
}
```

Depending on the size and complexity of your code, this refactoring provides the perfect opportunity to abstract all of your error codes out into a centralized configuration file and then provide an error service that will allow you to simply capture an error code and then send it up through the stack and abstract your error messaging away from your core code altogether.

Switch statements, along with other conditional statements, should be used when an action should be taken only when the condition is satisfied. When conditionals are used to replicate core language data structures, it is often preferable to fall back to the core data structure and reduce the complexity of your code. Hashmaps are faster and more intuitive than a switch statement will ever be, so think about your data, refactor your code, then take a couple minutes to marvel at how your code will say what you really meant to say.
{% endraw %}
    