---
layout: post
title:  "Callback Streams With Function Decoration"
date:   2015-10-07 09:00:02 -0700
categories: Code Smells, Coding, Design Patterns, Functional Programming, Javascript
---
{% raw %}
Regardless of whether you prefer raw callbacks or promises, there comes a time where asynchronous behavior pops up in your application. It's an artifact of working on the web and working with Javascript. This means that, although a function was originally written to solve a particular problem, eventually that function may need to be extended.  If we follow the <a href="http://www.chrisstead.net/archives/813/mainstay-monday-solid-openclosed-principle/" target="_blank">open/closed principle</a>, we should not modify the original function since it almost certainly still solves the original problem for which it was designed. What to do...

Function <a href="http://www.chrisstead.net/archives/924/extending-functions-with-decoration-through-composition/" target="_blank">decoration through composition</a> gives us a powerful way to enhance existing function behavior without modifying the original function.  This provides guarantees that our program remains more stable for more use cases and only introduces changes in a surgical, requirements-driven way.

Let's start off with a core request service.  It's important to note that this is written with certain assumptions being made, i.e. we have specific modules which are already defined and that we only care about the service because it is the foundation for our request construction.  This service only does a single thing: it makes a get call to a predefined endpoint with a provided ID.  It's uninteresting, but it helps to illuminate how we are going to construct our function stack.

```javascript
// This is created as an object so we can pass in mocks and fakes
// for testing and abstraction purposes.
function MyDataService(httpService, urlConstantsFactory){
    this.httpService = httpService;
    this.urlConstantsFactory = urlConstantsFactory;
}

MyDataService.prototype = {
    get: function(id, callback){
        var request = {
                url: this.urlConstantsFactory.get('myDataUrl'),
                data: {
                    id: id
                }
            };
        
        this.httpService.get(request, callback);
    }
};
```

This is the last piece of object oriented code we are going to look at in this post.  We are going to assume from here forward that this service has been instantiated with the correct <a href="http://www.chrisstead.net/archives/776/dependency-injection-without-a-framework-or-pain/" target="_blank">dependencies injected</a>.  Now, let's create a basic function that uses an instance of our service to make a request. This would look like the following.

```javascript
function getSomeData(id, callback){
    myDataServiceInstance.get(id, callback);
}
```

So far I know nothing about what the callback does, but that's okay. This is a simple wrapper to handle our request in some business-layer service.  The view-model or controller code will be able to blindly call this service with a request matching the <a href="http://www.chrisstead.net/archives/790/contracts-for-better-code/" target="_blank">contract</a>.

Technically we have already exposed everything that needs to be known about callback streams, but it's a little early to end the post, since there isn't much to be gained here, yet. If all we did was wrap up our request in another function, the goodness isn't going to be readily obvious to someone who is coming fresh to this concept.  Let's take a look at what a callback stream looks like as an image before we start really digging in.

<img src="./wp-content/uploads/images/callback-decoration.png" alt="Callback Decoration Diagram" />

The important thing to take away from our diagram is no one layer needs to know anything more than what is passed from the layer above.  It is unimportant to understand what the layer above does or why.  It is, however, very important to know how to respond to the callback that is passed in.  This is why contracts become so important in decoration.  If, at any point, we break a contract, our stream will break and our application will fail.  Fortunately, this adheres to the same requirements as calling any other function, so we are not introducing any greater rule strictness than we had before.

So, back to our business-layer abstraction. Suppose something changed at the data layer and a property name in the JSON that is returned was changed.  Although we would like to hope this would never happen, we live in the real world and things are never perfect.  Fortunately our abstraction layer allows us to handle this gracefully, rather than having our entire application break because of a database or service change.

Here's a transformation function.

```javascript
function myDataTransformation (data){
    var transformedData = utilityLibrary.copy(data);

    transformedData['expectedName'] = transformedData['newName'];

    return transformedData;
}
```

You've probably already noticed our transformation function isn't tied in with our callback at all.  That's actually a good thing.  This function is simple. but if there were complex logic, it would be important to isolate it, and <a href="http://www.chrisstead.net/archives/655/not-another-js-testing-how-to/" target="_blank">unit test it</a> appropriately. This function does exactly one thing and the declaration is clear.  Since callback streams already introduce an abstraction layer, anything we can do at each layer to make the code clear and clean will make debugging easier.

Now, let's take a look at an approach to handle transformation decoration.  We will start off with a simple pattern and expand from there.  If <a href="http://www.goodreads.com/book/show/85041.Refactoring_to_Patterns" target="_blank">Josh Kerievsky taught us anything</a> it's that we should identify patterns as they appear in the code and refactor to them instead of doing extra, unnecessary work.  Let's write some code.

```javascript
function transformationDecoration (callback, error, data){
    var transformedData = !error ? myDataTransformation(data) : data;
    callback(error, data);
}

function getSomeData (id, callback){
    // Oh noes! Our data changed at the service layer. : (
    var finalCallback = transformationDecoration.bind(callback);

    // We still make the same call, in the end.
    myDataServiceInstance.get(id, finalCallback);
}
```

By making changes this way, we silently introduce changes to fix our application without having to go and touch every place where this call is made. All of a sudden data changes become a much smaller liability to mitigate.  We have broken a hard dependency that would be scattered throughout our code by adding an abstraction between our view layer and our data access layer.  This is one of the biggest wins the common n-tier architecture provides to us.  Let's take a look at what happens when we have a bunch of changes that happen over time.

```javascript
function transformationDecoration (callback, error, data){
    var transformedData = !error ? myDataTransformation(data) : data;
    callback(error, data);
}

function anotherTransformationDecoration (callback, error, data){
    var transformedData = !error ? anotherTransform(data) : data;
    callback(error, data);
}

function yetAnotherTransformationDecoration (callback, error, data){
    var transformedData = !error ? yetAnotherTransform(data) : data;
    callback(error, data);
}

function andYetAnotherTransformationDecoration (callback, error, data){
    var transformedData = !error ? andYetAnotherTransform(data) : data;
    callback(error, data);
}

function getSomeData (id, callback){
    // Oh noes! Our data changed at the service layer. : (
    var finalCallback = transformationDecoration.bind(callback);

    finalCallback = anotherTransformationDecoration.bind(finalCallback);
    finalCallback = yetAnotherTransformationDecoration.bind(finalCallback);
    finalCallback = andYetAnotherTransformationDecoration.bind(finalCallback);

    // We still make the same call, in the end.
    myDataServiceInstance.get(id, finalCallback);
}
```

The amount of cut and paste I had to do to create all those functions made me die a little inside.  This is really <a href="https://en.wikipedia.org/wiki/Code_smell" target="_blank">smelly code</a>.  This is where we can start recognizing patterns and cut out a bunch of duplication.  What we really care about is the set of data transformations that need to be managed in our call.  The rest of this has become boilerplate.  Unnecessary boilerplate in Javascript is bad. Don't do it.  Let's make a change and fix all this.  I like to do this one step at a time. Sometimes things appear as you refactor that might not have been immediately obvious.

```javascript
function transformDecorator (callback, transform) {
    return function (error, data){
        var finalData = !error ? transform(data) : data;
        callback(error, data);
    }
}

function getSomeData (id, callback){
    // Oh noes! Our data changed at the service layer. : (
    var finalCallback = transformDecorator(callback, myDataTransformation);

    finalCallback = transformDecorator(finalCallback, anotherTransform);
    finalCallback = transformDecorator(finalCallback, yetAnotherTransform);
    finalCallback = transformDecorator(finalCallback, andYetAnotherTransform);

    // We still make the same call, in the end.
    myDataServiceInstance.get(id, finalCallback);
}
```

That's a lot better already.  Now we don't have to struggle with a bunch of function duplication and copy/paste hoopla. All we care about is the set of transformations we are going to use on the data. We can practically read off the transformation functions we are using in order.  This is actually more descriptive of what we intended to begin with anyway!

Let's actually do one more refactoring on our code.  By eliminating one duplication problem, we introduced another, although less-painful, duplication.

```javascript
function transformDecorator (callback, transform) {
    return function (error, data){
        var finalData = !error ? transform(data) : data;
        callback(error, data);
    }
}

function getSomeData (id, callback){
    // Oh noes! Our data changed at the service layer. : (
    let transforms = [myDataTransformation,
                      anotherTransform,
                      yetAnotherTransform,
                      andYetAnotherTransform];

    let finalCallback = transforms.reduce(transformDecorator, callback);

    // We still make the same call, in the end.
    myDataServiceInstance.get(id, finalCallback);
}
```

Now we're cooking with gas! Our getSomeData function can be extended with almost no effort whatsoever now. We can simply create a new transform and then decorate the callback as many times as we need to.  This decoration process relies on our original idea: callback streams.  Since each layer only cares about adhering to a single contract, and we can wrap the callback as many times as we want, multiple decorations, all behaving asynchronously, can be created as a stream of decorated callbacks without worrying about a failure somewhere in the middle of it all.

The more important item to note is, this could be a single step in a long line of behaviors within a stream.  We are adhering to the callback contract in our getSomeData function, so we could, just as easily, use this as an intermediate step between the requesting function and the final request. We really only care about the behavior that happens at the edges of our function, so it really doesn't matter where this code lives!

This discussion fits in the middle of a couple of different common issues.  First, this kind of decoration and function streams behavior directly combats the "pyramids of doom" callback issue many people encounter.  The other issue this deals with is exposed promise objects that worm their way through many modern Javascript projects which force us to tightly couple our data access layer to our view code.  The abstractions are lost unless a new promise is created and resolved at every level throughout the stack.  By thinking about the goal of your code, you take back the power of tiered applications and provide smart, well-isolated functionality which can be enhanced while keeping the rest of your codebase blissfully unaware of the ever-changing data that lives just beyond the edges of your application.
{% endraw %}
    