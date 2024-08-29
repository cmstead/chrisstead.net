---
layout: post
title:  "Sanitary Data: Maybe, Either and Deref"
date:   2015-08-19 09:00:55 -0700
categories: Coding, Design Patterns, Foundation, Functional Programming, Javascript
---
{% raw %}
Although there are times when conditional blocks are necessary for functionality, it is common that conditions simply wrap up data which may be null or undefined.  These kinds of conditional blocks have become so common that they are considered idiomatic code. The underlying goal, however, is to guarantee sanitary data.  

Sanitary data is data that is guaranteed to be safe for use in your function without worrying about edge cases which could arise around data that could be subtly wrong or unsafe. Sanitary data is more than just data that exists. It is data that adheres to a set of qualifications which make the program stable and safe. These qualifications include things such as truthyness and type guarantees.

Since it is considered idiomatic to bundle up data in conditional blocks, often times functionality is wrapped up in the condition, muddying the waters between sanitary data and function execution. I would like to break that idiom with a concept introduced in Haskell, known as <a href="https://hackage.haskell.org/package/base-4.8.1.0/docs/Data-Maybe.html" target="_blank">maybe</a>.

In Haskell, maybe(a) returns Just(a) or nil.  Javascript does not have algebraic data types, Just or nil, so we are going to have to adjust a little.  That said, there are still some guarantees we can put into our maybe that will flow forward to other variables.  Let's have a look at an implementation of maybe that will set the foundation.

```javascript
function maybe(value, expectedType){
    let sanitizedType = typeof expectedType === 'string' ? expectedType : '',
        valueOkay = typeof value === sanitizedType ? true : Boolean(value);
    
    return valueOkay ? value : null;
}

// Usage looks like this:
maybe('foo'); // foo
maybe('foo', 'object'); // null
maybe(0); // null
maybe(0, 'number'); // 0
maybe(false); // null
maybe(false, 'boolean'); // false

function myFn(value){
    let sanitizedValue = maybe(value, 'string');
    sanitizedValue = sanitizedValue === null ? 'default' : value;

    // do more stuff
}
```

As you can see, it gives you a strong guarantee of what your data should look like. If your data is acceptable, you will just get your data back, or Just(a).  If your data fails the provided conditions, you will get null, which is as close as we can come to nil in Javascript.

Maybe alone will not give us the kind of data integrity we want. This reduces the conditions we have to consider down to 2, which is much better than the open landscape of the unknown, but it is not sufficient alone. As you can see in the usage section above, we still are testing our 'sanitized' value. Our goal is to remove as many of our data conditions as possible, so we still have more work to go.

When maybe isn't enough, we can look to another function: either. I use either so often that if I am ever without my functional library which provides either, I build it in as a utility. It's honestly that important. Let's take a look at what either looks like.

```javascript
function either(defaultValue, value, expectedType){
    let sanitizedValue = maybe(value, expectedType);
    return sanitizedValue === null ? defaultValue : value;
}

// Usage goes a little like this:
either('bar', 'foo'); // foo
either(42, 'foo', 'number'); // 42
either('baz', 0); // baz
either(false, 0, 'boolean'); // false

function myFn(value){
    let sanitizedValue = either('default', value, 'string');
    // do more stuff
}
```

As you can see, either gives us the strength of maybe with the sanitary nature of a safe default. Now we have removed all of the conditions from our small function. This is excellent! Now we can guarantee our data is sanitary even in a hurricane of strange calls and bad user data, and it's a tiny helper function that declares exactly what it does every time we use it.

The extra benefit we have with functions like maybe and either is they really do introduce the idea of function purity in a way that works with our everyday, practical application.  We can write functions that should never throw type errors, never get null pointers and always give us clean, safe data.

Except...

What happens when you need a value that is buried deep in an object? What if any layer in your object might not exist? This happens a lot. Actually it happens so much that I found myself using large blocks of either statements to guarantee I didn't break my function.  This is bad. We don't want big blocks of function calls when our entire goal was to remove large blocks of code around data to begin with.

Enter deref. Deref is the automated application of either over and over, ensuring we always get good data all the way through our object. Let's take a look at what deref could look like:

```javascript
function deref(userObj, keyStr){
    var keyTokens = keyStr.split('.'),
        keyToken = keyTokens.shift().trim(),
        derefResult = keyToken === '' ? userObj : either({}, userObj, 'object')[keyToken];
    
    // NEVER return undefined
    derefResult = typeof derefResult === 'undefined' ? null : derefResult;
    
    return keyTokens.length === 0 ? derefResult : deref(derefResult, keyTokens.join('.'));
}

// Usage:
deref(null, 'foo.bar.baz'); // null
deref({ test: [ 'foo', 'bar' ] }, 'test.1'); // bar

function myNewFn(valueObj){
    let refOutput = deref(valueObj, 'my.object.deep.reference.valueList.3'),
        sanitizedData  = either('default', refOutput, 'string');

    // Do stuff with ultimate certainty!!
}
```

Now we really have a set of functions that break us out of the data conditional cycle of madness! With as few as one or two lines, we can provide strong guarantees that our data will always match the expectations of our code.  By introducing three simple helper functions, we have reduced our code down to the essence of what we mean. We no longer have to spin our wheels cleaning up data or ensuring we aren't sending bad values through functions that could introduce dangerous runtime errors that could crash our applications when the user does something unexpected.

What is really happening underneath these helper functions is, we are creating sanitary data in an isolated way. Most programs, when you scratch beneath the surface, are little more than data manipulations. By placing strong guarantees on the data we are interacting with, we can stabilize our programs and reduce the amount of stress we feel about strange data circumstances and edge cases that are, largely, unimportant to producing meaningful output.

If you don't want to litter your code with copy/paste functions from a blog post, download the <a href="https://github.com/cmstead/JFP" target="_blank">JFP library</a> and use these functions which are pre-built to make your code sane. <a href="http://cmstead.github.io/JFP/conditional/" target="_blank">Read the docs</a> to see other ways you can make these functions work for you.

The next time you find yourself writing large conditional blocks to handle strange data, think about maybe, either and deref and then breathe a sigh of relief. When we introduce sanitary data into our code and think a little more functionally, the world looks a little brighter, so make your unit tests and your QA person happier and sanitize that data!
{% endraw %}
    