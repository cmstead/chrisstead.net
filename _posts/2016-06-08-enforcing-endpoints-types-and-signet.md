---
layout: post
title:  "Enforcing Endpoints: Types and Signet"
date:   2016-06-08 09:00:09 -0700
categories: Coding, Design Patterns, Functional Programming, Javascript
---
{% raw %}
What a ride! I spent the last month preparing a talk for and presenting at Lambdaconf.  If you haven't been, you should. Of the conferences and coding-related events I have been to, this was probably the coolest, toughest, mind-bendiest one. It was awesome.  I learned a lot about myself while I was there and a lot about the world beyond the horizon of what we consider "conventional production development." More than that, it's all coming to a developer shop near you sooner than you think.

You should go.

I have been talking about types in Javascript lately and this post continues the tradition. As I have been working on, and with, Signet, it becomes more and more obvious why types and signatures are fantastic in simple, raw Javascript code.

There is a lot of discussion about languages which compile to Javascript which support types.  This includes Elm, TypeScript and PureScript, though there are more out there.  Although I feel these languages may bring something interesting to the table, I feel they are largely akin to writing a language which compiles to C. If there is a flaw in the underlying language, compiling to the flawed language without actually addressing the problem is a band-aid, not a fix.  We actually need real types in real Javascript.

I am not a die-hard type convert who wants everything to be typed to a ridiculous degree.  Instead, I actually believe that blended dynamic and static typing can lead to an amazing, joyful programming experience. Imagine a world where you can bolt down the contract on things the world touches while leaving the internals to move fluidly through refactorings without having to worry about whether you're violating a contract.

<h3>Programming in a Dynamic World</h3>

Let's imagine you have a bit of code which takes a single purchase record and computes the final total for that record including tax.  The code might look a little like what I have outlined below:

```javascript
    function computeTax(percent) {
        return function (total) {
            return percent * total;
        };
    }

    function computeTotal(taxCalculator) {
        return function (total) {
            return total + taxCalculator(total);
        };
    }

    function computePrice(purchase) {
        return purchase.price * purchase.quantity;
    }

    var api = {
        computeTax: computeTax,
        computeTotal: computeTotal,
        computePrice: computePrice
    };
```

We're not going to dive into why some of the functions are curried, let's just accept that's the way they are for this post.

Everything in this code has a clear name and, ultimately, speaks to the intent of the behavior. I'll assume you are in an agile shop where your code is not thoroughly documented.  Instead, you are relying on tribal knowledge to ensure people understand what this code does and how to interact with it.

The likelihood is someone is going to do it wrong.

This brings us to the way Javascript behaves.  Javascript will, with all the best intent in mind, try to do the "right" thing.  This means, passing numbers instead of objects, strings instead of numbers and NaN could all result in a running, though wholly incorrect program.

The internals of this small module might not need to be protected since anyone working in the file will be compelled to read the code and make sense of the words on the screen, but people who have never seen this code, and perhaps never will, still need to understand what correctness means.  Do they know the functions are curried? No. Do they know the names of the variables? Probably not.

The fluid awesomeness of Javascript's dynamic nature just bit us. Hard.

<h3>If You Liked It You Should'a Put A Type On It</h3>

One of the greatest failings of assuming clear names will make things manageable is that the names are rarely if ever seen outside of code they are used in. Some editors like WebStorm and Visual Studio Code will pick up the names within modules given the programmer is working with node imports and everything is properly exported, named and referenced.

Even TypeScript can't save us from this kind of problem since the types are only supported at transpile time, so type erasure eats our one standing bastion of truth.  What if we added a little signature and type help to tell others what we are expecting and what they can expect in return?

This is where Signet comes in.  By using a modified Hindley-Milner type notation we can actually read what the API does and how we can interact with it.  On top of that, we get real, fast type checking at runtime, which means type erasure is a thing of the past.  Let's have a look at our API definition with type enforcement.

```javascript
    var api = {
        computeTax: signet.enforce('number => number => number', computeTax),
        computeTotal: signet.enforce('function => number => number', computeTotal),
        computePrice: signet.enforce('object => number', computePrice)
    };
```

The signature annotation not only tells us the kinds of values our function expects, it actually tells us that after the first execution we can expect a function back again. This means we can gain a tremendous amount of insight about our function without knowing anything about the internal workings of the function.  Instead of having a true black box, we now have a black box with instructions on the side telling us how to use the thing. We don't know how it is implemented, but we know it works the same way every time.

With this new enforcement, we get the following behavior:

```javascript
console.log('computeTax: ' + api.computeTax.signature);
// computeTax: number => number => number

var computeLocalTax = api.computeTax(0.08);
console.log('computeLocalTax: ' + computeLocalTax.signature);
// computeLocalTax: number => number

computeLocalTax('9.99');
// Expected value of type number but got string
```

<h3>Closing up Shop</h3>

In the end, the challenge in any programming project is not about whether or not you can write simply maintainable code, or whether you should use types or not.  Really, it is about making sure you are clearly communicating with the people who rely on your code to do what it says on the label.  This means, within the code itself, it should be clear, obvious and intentional. From the outside, any code which is accessible to others, including your future self, should declare what it does, and we should make use of every tool we can to simplify the process of gaining an understanding of what to expect.

By signing and enforcing your API, you get all the benefits of a type checker, plus signature metadata which means you don't have to go rifling through code that is not immediately related to the task at hand. Meanwhile, under the covers, we can rely on patterns, good naming and clean code to ensure our code continues to deliver value and convey meaning. Now, go add some types to your code and make life better for your team!
{% endraw %}
    