---
layout: post
title:  "Domain Modeling For Better Contracts"
date:   2016-06-29 09:00:52 -0700
categories:
- Coding
- Data Structures
- Design Patterns
- Foundation
- Functional Programming
- Javascript
- Types
---
{% raw %}
In the post about communicating contracts through <a href="http://www.chrisstead.net/archives/1160/enforcing-endpoints-types-and-signet/" target="_blank">enforcing endpoint contracts</a>, we took a look at some basic types which are available in Signet. Today we are going to talk about how to add more information to your types by creating your own data types.

Last week we took a look at <a href="http://www.chrisstead.net/archives/1173/types-sets-and-characteristics/" target="_blank">how to build types as sets</a> with characteristic functions.  This week we will apply that information in order to add extra information to our types.

By this point I'm certain there are plenty of people who are thinking I've gone completely off the rails.  Javascript, after all, is a dynamically typed language. Don't burden yourself with all of this type stuff and just write some code!

Although this is true, most people view types as a constraint which only causes pain.  Though this might be true if you are coming from a language like Java which contains lots of artificial constraints around type creation, and after all is said and done, the types are still weak and restrictive.

On the other hand, if we consider types as a way to add a layer of correctness checking and a tool for communicating with others, types become less a restriction and more a tool we can use to make our programs better.  Good types will make a program transparent and predictable.  These are traits we definitely want in our programs.

Just as a refresher, let's have a look at where we left off with our purchase API from the enforcing endpoints blog post.  This way we have a common position to understand where we started and where we're going.

```javascript
    var api = {
        computeTax: signet.enforce('number => number => number', computeTax),
        computeTotal: signet.enforce('function => number => number', computeTotal),
        computeSubtotal: signet.enforce('array => number', computeSubtotal)
    };

    let computePurchaseTotal = signet.enforce(
        'number, array => number',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );
```

Now that we have our API defined with regard to basic types, we can start to ask more meaningful questions.  Instead of asking things like "what does this function do," we can ask directed questions to inform our programming better:  What kind of numbers are they? What is in the array? What kind of argument must the function take?

The last two questions are easiest to answer since we don't have to look any farther than higher-kinded types.  This is, of course, scary sounding the first time you hear it. I had no clue what a higher-kinded type was the first time I heard the word.  Fortunately, many of you may already be familiar with them even if you don't know the word.  Java and C# both support higher-kinded types.

<h3>Higher-Kinded Types and You</h3>

First and foremost, let's discuss what a higher-kinded type actually is. (It's a type.)  Once we have a better grasp on that, we will use it in code to make everything a little more clear.

A higher-kinded type is simply a type which takes a type as an argument and returns a type. I know, that sounds weird.  How does a number take a string and return a type?  I asked the same thing.

It turns out, however, that it's not nearly as foreign as it might seem. One very common type we rarely think about in Javascript which could easily be handled as a higher-kinded type is an array. An array is, itself, a type, but it contains values which are also typed.  This means, if we had a language to express it, we could declare an array which contains only a single type.

As it turns out, there are potentially infinite different types which are, or could be, higher-kinded.  In this post we are going to look at just two: array and function.  With the type signature language available with signet, we can explicitly declare an array type as needed.  This means we can do things like the following.

```javascript
var isArrayOfNumbers = signet.isTypeOf('array<number>');

isArrayOfNumbers([1, 2, 3, 4, 5]); // true
isArrayOfNumbers([1, 2, 3, 4, 'foo', 'bar', 'baz']); // false
```

We can see both of the tested arrays are completely valid Javascript arrays, but the second is not an array of exclusively numbers.  There are ways we could create an array which would support numbers and strings, but that's beyond the scope of this post.

Just like we can declare information about arrays, we can also say something about the expectations around a function.  Instead of simply saying a value is "function," we can actually say a value is a "function which takes a number."  In much the same way we declare our types in arrays, our function type declaration is "function<number>."

Now that we have an expanded type language to draw upon, let's update our API and clarify the communication of our domain model.

```javascript
    var api = {
        computeTax: signet.enforce('number => number => number', computeTax),
        computeTotal: signet.enforce('function<number> => number => number', computeTotal),
        computeSubtotal: signet.enforce('array<object> => number', computeSubtotal)
    };

    let computePurchaseTotal = signet.enforce(
        'number, array<object> => number',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );
```

<h3>Subtyping With Characteristics</h3>

Now we just have the 'number' type scattered everywhere throughout our code. Although this is better than nothing, it would be SO MUCH better if we actually knew something about those numbers.  What do they mean? How are they used? What are the constraints?

It turns out we have just the thing to remedy this pain, it's called characteristic functions.  As we know from our <a href="http://www.chrisstead.net/archives/1173/types-sets-and-characteristics/" target="_blank">earlier discussions on characteristics</a>, we can add richness to our type system through set-describing predicate functions. (Protip: all predicates describe sets)

Before we dive into creating new types willy-nilly, let's take a moment to account for the different number types we have. By properly identifying the actual domain language we care about, we can create better types which will allow us to clearly describe our application to people who might know nothing about it.

Ultimately, we care about tax, price, amount of tax to pay (tax amount) and purchase total. If we were to simplify this list a bit, we can identify a couple of distinct bits of information.

First let's consider tax. Tax is a percentage amount.  Since, where I live, taxes are always greater than or equal to 0%, but always less than 100%, I am going to say tax is a percent value which will always fall between 0 and 1.  For example, in San Diego, sales tax is currently around 8% or 0.08.

Now, we can take a look at price, tax amount and purchase total.  Each of these is a value which is related to a value an amount our customer will be paying.  This means we can roll these all into some aspect of price.  We will say a price value will be greater than or equal to 0.  This describes our data pretty accurately for the moment, so let's go with that.

With our base types sorted out in a way we can jump off from, we can start building characteristics. By clearly defining our characteristics, we give our new types programmatic meaning. Let's see what our basic characteristic functions will look like for price and percent.

```javascript
    function checkTax(value) {
        return 0 <= value && value <= 1;
    }

    function checkPrice(value) {
        return 0 <= value;
    }
```

The other piece of this puzzle is, we need to register our types with Signet.  Fortunately, this is a simple process.  We know that each of these types is actually a number, so we can simply use the subtype function and declare these two functions as new types, inheriting from number.  This is also why we didn't need to test each value to see if it is a number, our subtyping will guarantee we only verify numbers.

```javascript
    signet.subtype('number')('tax', checkPercent);
    signet.subtype('number')('price', checkPrice);
```

We can use our price type to create our other two types by simply aliasing them and using the price definition to ensure our data constraints are clear.

```javascript
    signet.alias('taxAmount', 'price');
    signet.alias('purchaseTotal', 'price');
```

Let's have a look at our updated API and see how our types are coming along!

```javascript
    var api = {
        computeTax: signet.enforce('tax => price => taxAmount', computeTax),
        computeTotal: signet.enforce('function<price> => price => purchaseTotal', computeTotal),
        computeSubtotal: signet.enforce('array<object> => price', computeSubtotal)
    };

    let computePurchaseTotal = signet.enforce(
        'tax, array<object> => purchaseTotal',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );
```

<h3>Duck Typing our Object</h3>

At this point, our API is pretty clear, but there is still one last type which just doesn't quite convey the information we want to know.  Our array of purchases is still described, simply, as an array of objects.  This could be much better, if only there were a way to check it.

As it turns out, the Go language has popularized the notion of object similarity through duck typing and that is precisely what we are going to do here.  If we know enough information, we can tell whether our object satisfies the Liskov substitution principle, and can be used in place of our intended object.

Signet provides a means to perform duck typing as well, so we don't have to build our characteristic function from the ground up every time, because that could end up being a LOT of repeated code.  Let's build a duck typing characteristic and finish up our API types.

```javascript
    let checkPurchase = signet.duckTypeFactory({ price: 'price', quantity: 'int' });

    signet.subtype('object')('purchase', checkPurchase);
```

Now we have a name for our purchase object type, which means we can easily check whether our array of purchases actually adheres to our expectations.  Plus this will provide a way for others to understand what we intended when we wrote the code, making it much easier to write new code against the existing API.

```javascript
    api = {
        computeTax: signet.enforce('tax => price => taxAmount', computeTax),
        computeTotal: signet.enforce('function<price> => price => purchaseTotal', computeTotal),
        computeSubtotal: signet.enforce('array<purchase> => price', computeSubtotal)
    };

    computePurchaseTotal = signet.enforce(
        'tax, array<purchase> => purchaseTotal',
        function computePurchaseTotal(tax, purchases) {
            return enforcedApi.computeTotal(enforcedApi.computeTax(tax))(enforcedApi.computeSubtotal(purchases));
        }
    );
```

<h3>Wrapping Things Up</h3>

Although this just scratches the surface of using types in your program, hopefully this exercise helps you communicate intent and define a clear domain model. By taking core types we already know and applying a small amount of predicate logic, we surface a new way to talk about our program and the data we use.

Instead of simply using old code as a reference for what it does, add a little annotation, a little bit of logic and get a lot more bang for your buck.  In the end, types don't make everything correct all the time, but they do a lot to make you and others like you a lot more awesome!
{% endraw %}
    