---
layout: post
title:  "Composition and Compose"
date:   2015-12-23 08:00:10 -0800
categories: Algorithms, Applied Math, Coding, Functional Programming, Javascript
---
{% raw %}
A while back we discussed composing functions together to blend behaviors and extend functions to solve more complex problems.  The discussion was all about composing two specific functions together.  In functional programming composing multiple functions together can actually be part and parcel of the entire new function.

<h3>The Lodash Way</h3>

If we take a moment and look at libraries like Lodash and Underscore, they handle function composition as function chaining like the following.

```javascript
_(myValue).chain().filter(fn1).map(fn2).reduce(fn3);
```

<h3>Naive Generic Composition</h3>

This is great except, if we want to drop in our own functions we have to either use tap, which is counterintuitive, or we have to devise our own strategy for composing multiple functions together.  First an aspect we would do well to avoid is the state management which happens under the covers. Second, an aspect we would like to favor is an ability to create our own transformation behaviors and chain them together in a clean, sane way.  Let's have a look at a simple, rather naive implementation of a generic composition function.

```javascript
// This is VERY close to mathematical composition, so let's
// not be coy and just use the mathematical function names i.e. f and g
function simpleCompose(f, g) {
    return function () {
        var args = Array.prototype.slice.call(arguments, 0);
        
        // equivalent to f(g(x)) where x = args
        return f.call(null, g.apply(null, args));
    };
}
```

So long as two functions are provided to simpleCompose, we will get a new, composite function.  We could actually create a new function which would perform the equivalent of x * (y + z) with an add and a multiply function.  This may seem like kind of the long way around, but with a more complex logic, composition actually simplifies the flow.  Let's take a look at the simple example in code.

```javascript
function add (a, b) {
    return a + b;
}

function multiply (a, b) {
    return a * b;
}

function multiplySumByX (x) {
    return compose(multiply.bind(null, x), add);
}

multiplySumByX(5)(6, 7); // 65
multiplySumByX(10)(9, 3); // 120

// 3 * (x + y)
var tripleSum = multiplySumByX(3);

tripleSum(15, 6); // 63
tripleSum(8, 4); // 36

// Thanks to user 'newbie' for catching my terrible arithmetic, edited for correctness.
```

Although this kind of composition is powerful and allows for a surprising amount of flexibility, it's rather rather limiting to only be able to compose two functions at a time.  It would be much better if we could compose multiple functions together to create a new function on the fly.  Let's take a look at an iterative approach to composing functions together.

<h3>Iterative Composition</h3>

Let's take our original compose function and turn it up a notch.  Instead of letting it be the final implementation we can use it as the foundation for a more powerful approach to composition.  We still want our compose function to accept two arguments and compose them, but we want to take two or more and compose them all.  We will need to make use of the arguments object available in a function, as well as the slice function from Array.prototype.  Anyway, less talk, more code.

```javascript
function identity (value) {
    return value;
}

function compositor (f, g) {
    return function () {
        var args = Array.prototype.slice(arguments, 0);
        return f.call(null, g.apply(null, args));
    };
}

function iteratingCompose (f, g) {
    var args = Array.prototype.slice(arguments, 0),
        finalFn = identity;
        
    args.forEach(function (fn) {
        finalFn = compositor(finalFn, fn);
    });
    
    return finalFn;
}

// Edited to fix arguments slicing. Thanks Bondi French for catching that.
```

This is a little more code, but it's a lot more power.  If we take iteratingCompose.length we get 2, but optionally, we can pass in as many functions as we want and it will compose them all! To get a perspective on the kind of power we are working with, let's make some new functions and compose them all.

```javascript
var add3 = add.bind(null, 3),
    double = multiply.bind(null, 2),
    subtract5 = add.bind(null, -5),
    divideBy10 = multiply.bind(null, 1/10),

    doSomeArithmetic = iteratingCompose(add3, double, subtract5, divideBy10);

doSomeArithmetic(8); // 1.7
doSomeArithmetic(99); // 19.9
```

This would probably be more impressive if we did something more than just a little arithmetic.  Let's do something that takes a little more heavy lifting and see what we can really get out of our compose function.

```javascript
function filter (predicate, list) {
    return list.filter(predicate);
}

function map (fn, list) {
    return list.map(fn);
}

function reduce (fn, list) {
    return list.reduce(fn);
}

function isTaxable (record) {
    return record.taxable;
}

function computeSubtotal (record) {
    return record.price * record.quantity;
}

function salesTaxFactory (rate) {
    return multiply.bind(null, rate);
}

var getSalesTax = iteratingCompose(
                    filter.bind(null, isTaxable),
                    map.bind(null, computeSubtotal),
                    reduce.bind(null, add),
                    salesTaxFactory(0.075)
                  );

var saleItems = [
    {
        name: 'Paper Towels',
        quantity: 3,
        price: 2,
        taxable: true
    },
    {
        name: 'Paring Knife',
        quantity: 1,
        price: 7,
        taxable: true
    },
    {
        name: 'Bananas',
        quantity: 11,
        price: .7,
        taxable: false
    },
    {
        name: 'Trash Bags',
        quantity: 1,
        price: 11,
        taxable: true
    }
];

getSalesTax(saleItems); // 1.8
```

Clearly this problem is more meaningful and substantial than simply performing a sequence of arithmetic operations. By using composition for function chaining, we can define a simple set of functions to perform small steps toward our goal.  Each of the novel functions are simple and easy to understand, yet we can combine them to perform a complex operation.

<h3>Reducing Composition</h3>

Now that we've seen the power that compose brings to our programming life, let's look at ways we can make the current implementation better.  Instead of using a looping structure like forEach and maintaining state outside of the composing operation, let's use reduce instead.  Since our function arguments are being converted into an array, this is a simple refactoring.

```javascript
function identity (value) {
    return value;
}

function argsToArray (args) {
    return Array.prototype.slice(args, 0);
}

function compositor (f, g) {
    return function () {
        var args = argsToArray(arguments);
        return f.call(null, g.apply(null, args));
    };
}

function reducingCompose (f, g) {
    var args = argsToArray(arguments);
    return args.reduce(compositor, identity);
}
```

This refactoring tightened up the whole definition pretty nicely.  We identified a shared behavior, converting arguments to an array, and abstracted it.  Then we replaced our forEach loop with a reduction, which helps us remove the burden of tracking state at each iteration.  The only problem we could run into now is if one of the arguments provided is not a function.

<h3>The Final Iteration</h3>

There are two different approaches which could be taken here.  First, we can stop here and say our reducingCompose function is all we want for our final compose function.  This means, if someone mistakenly passes an argument which isn't a function, they will get an error when they try to execute their newly created function.

Although getting an error is good, getting it early is better.  What if we were to throw an error while compose is constructing the new function and alert our user, immediately, that they did something wrong?  Arguably this is more programmatically interesting and I think it's the right thing to do.  Let's hop to it.

```javascript
function identity (value) {
    return value;
}

function argsToArray (args) {
    return Array.prototype.slice(args, 0);
}

function compositor (f, g) {
    return function () {
        var args = argsToArray(arguments);
        return f.call(null, g.apply(null, args));
    };
}

function checkFunctionArgs (args) {
    var badArgs = args.filter(function (value) { typeof value !== 'function'; });
    
    if(badArgs.length) {
        throw new Error('Compose cannot be applied to non-function values', badArgs);
    }
}

function compose (f, g) {
    var args = argsToArray(arguments);
    
    checkFunctionArgs(args);
    
    return args.reduce(compositor, identity);
}
```

Now we have constructed a compose function which gives us the kind of power we would want from function composition, but with the safety of a well-checked library.  Through writing this generic compose function, we now have a new tool which can be pulled from our toolbox when we want all the power with none of the bloat.  I compose my functions, do you?
{% endraw %}
    