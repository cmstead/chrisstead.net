---
layout: post
title:  "Unit Testing Express Routing"
date:   2016-04-13 09:00:58 -0700
categories: Coding, Design Patterns, General Blogging, Javascript, Unit Testing
---
{% raw %}
If you are unit testing your code, and you should be, then it is likely you have encountered certain patterns which make testing more difficult. One of the patterns which pops up often is centered around Express.js routes.  Although the router has a nice, simple API to code against, the actual testing of the route action code can be a little challenging if you aren't used to using tools such as mocks, fakes and stubs.

Today we are going to explore using the Mockery library and an express router fake module to simplify the process of reaching into our modules and getting ahold of the route actions we provide to express for the sake of testing and ensuring program correctness.

<h3>The Libraries</h3>

The post today will make use of Mocha, Mockery and Express Route Fake.  The first two you may have heard of, the last you likely have not.  Let's walk the list and get a handle on what each of these tools does for us at a high level.

<h4><a href="https://www.npmjs.com/package/mocha" target="_blank">Mocha</a></h4>

If you have done any <acronym title="Test Driven Development">TDD</acronym> or unit testing in Javascript and especially in Node, you have likely already encountered Mocha.  Mocha is a popular <acronym title="Behavior Driven Development">BDD</acronym> tool for testing Javascript.  We will have examples of what test code in Mocha looks like later.

<h4><a href="https://www.npmjs.com/package/mockery" target="_blank">Mockery</a></h4>

Mockery is a tool for manipulating packages and modules which are required within script files for Node. Although Mockery is quite useful for breaking tight coupling, it is not as well known as Mocha.  Unit testing scripts which are tightly coupled through require statements is challenging since there is no clean way to inject a dependency into a dependency chain without a third party tool.  Mockery is key to getting good tests around Express route actions as we will see.

<h4><a href="https://www.npmjs.com/package/express-route-fake" target="_blank">Express Route Fake</a></h4>

Express Route Fake is a module I wrote to emulate behavior we use at Hunter to gain access to our route actions as we get tests written around our code.  The core idea of Express Route Fake is to substitute the fake module in for Express in order to capture references to the actions which are assigned to different routes. We will explore this shortly.

<h3>Registering Replacements with Mockery</h3>

I am assuming you are already familiar with a testing framework, so I am not going to cover the basics of using Mocha.  Instead we are going to start off looking at how to register a faked module with Mockery so we can break a dependency in Node.

Mockery actually manipulates the Node module cache and updates it with code of our choosing.  This gives us the ability, at test time, to dig in and create a fake chunk of code which we control so we can ensure our tests actually send and receive the right output without doing dangerous things like interacting with a network connection or a database.  We want the scope of our unit tests to be as tight as is reasonable so we can ensure the code under test actually performs the correct action every time.

This kind of guarantee around tests is called <em>determinism</em>. Deterministic tests are tests which, when provided a single input, always return the same output.  Ideally any interactions which would break the determinism of our functionality should be stripped away and replaced with code which always does the same thing.  This gives us guarantees and makes it easier to identify and test a variety of different cases.  Let's have a look at an example of breaking a dependency with Mockery and replacing the code with something else.

```javascript
    beforeEach(function() {
        var mysqlFake = {
            query: function(query, params, callback) {
                callback(null, []); // Returns a null error and an empty array
            }
        };

        mockery.enable({
            warnOnReplace: false,
            warnOnUnregistered: false
        });

        mockery.registerMock('mysql', mysqlFake);
        myModule = require('../app/myModule');
    });

    afterEach(function() {
        mockery.deregisterAll();
        mockery.disable();
    });
```

The beforeEach block sets up a fake MySQL module with a query method which immediately calls a passed callback. Mocking MySQL does two things for us.  First it removes the asynchronous behavior which comes from interacting with a database, ensuring all of our tests run inside the event loop.  The second thing this does for us is it allows us to provide a guarantee that the results passed back from our MySQL fake are always the same.  This means we don't have to set up and tear down an actual database instance.  We can simply test the code we care about and assume the database library does what it is supposed to.

Important items to note about the code in the beforeEach and afterEach blocks: Mockery takes a certain amount of work to get working.  The enable call in beforeEach starts Mockery working in memory and tells it not to post warning messages every time it does something.  It is safe to assume, if you see the results you want, that Mockery is working.  The code in afterEach returns the cache back to its original state, leaving everything clean for the following test.

<h3>Faking Router For Great Good</h3>

Now that we have looked a little bit at how Mockery works, we are ready to start digging into what we really care about.  Let's start testing our Express route actions. The first thing we should look at is a little bit of example Express routing code. Below is a simple route example which just receives a request and then responds with 200 and a little message.  It's not exciting code, but we can actually test it.

```javascript
    'use strict';
    
    var router = require('express').Router();

    router.get('/mypath/myentity', function(req, res) {
        // Do stuff here
        res.status(200).send('Everything worked out fine').end();
    });
    
    module.exports = router;
```

We can see a few things here which will be really important to get the tests right.  First, Router is a factory function.  This means anything that is going to stand in for express will have to implement this correctly.  The next thing we know is, the router object which is returned has methods on it like 'get.' We will want our fake object to replicate this as well.  Now is probably a good time to take a look at the source code for Express Route Fake.

<script src="https://gist.github.com/cmstead/9353f8cd5f2de44f10f6b05a446efdd0.js"></script>

Express Route Fake is a small module which packs a pretty massive punch.  Everything is set up for us to quickly capture and test our route actions.  The very first thing we have is a cache object which will store key/value pairs so we can request whichever function we want to test easily.

After the cache object we have a simple function which captures the route method, the route path and the route action.  This function is the real workhorse of the entire module. Every route call will go through this one function and be stored in our cache.  It is critical to understand that all of the methods, paths and actions will be captured and related so we can test them later.

Finally we have the Router factory fake, getRouteAction and reset functions.  Reset is exactly what one might expect, it resets the cache to empty so the entire process can be repeated without starting with a dirty object.  getRouteAction performs two critical activities.  First, it verifies the route exists and throws an error if it doesn't.  Secondly, it passes back the route action so we can test the function outside of the express framework.

A side note on the getRouteAction error behavior; it is important and useful to get clear errors from our fake in this case.  Over time my team has run into confusing situations because our implementation was home-grown and does not throw useful errors.  This means we get an error stating "undefined is not a function" which does not really tell us what is wrong.  By getting an error which informs you the route doesn't exist, you can immediately verify whether the route is being created correctly and not need to troubleshoot your tests.

<h3>Putting the Setup Together</h3>

Now that we have the tools and have taken a look at them, let's start constructing what our tests would look like. We know Mockery is going to substitute in our fake module and we also know that Express Route Fake will capture the actions.  All we really need to do is a little setup to get things rolling.

```javascript
    describe('Testing Express Routes', function() {
        var myRoutes;
        var req;
        var res;

        beforeEach(function() {
            req = {};
            res = {
                resData: {
                    status: 0,
                    response: ''
                },
                status: function(status) {
                    res.resData.status = status;
                },
                send: function(response) {
                    res.resData.response = response;
                },
                end: function() { }
            };

            mockery.enable({
                warnOnReplace: false,
                warnOnUnregistered: false
            });

            expressFake.reset();

            mockery.registerMock('express', expressFake);

            // It is critical to require our module AFTER we inject our fake, or Node will use the
            // original module, which defeats the entire purpose of this setup.
            myRoutes = require('../routes/myRoutes');
        });

        afterEach(function() {
            mockery.deregisterAll();
            mockery.disable();
        });

    });
```

In our setup we have a little bit of extra setup.  Since Node and Express interact with the http module through request and response objects (typically called req and res respectively), we will need to create objects we can pass through and use as well.  Considering the calls we are making on res, I just included the bare minimum functionality to actually test our route action: status, send and end.

Please note we are actually requiring the module under test AFTER we perform our Mockery setup.  It's really important to do this, otherwise Node will provide the actual Express module and our fake code won't be used.

Now that we have our code set up and ready to go, let's take a look at what our tests look like.

```javascript
        it('should set status to 200', function() {
            var routeAction = expressFake.getRouteAction('get', '/mypath/myentity');

            routeAction(req, res);

            assert(res.resData.status === 200);
        });

        it('should respond with appropriate message', function() {
            var routeAction = expressFake.getRouteAction('get', '/mypath/myentity');

            routeAction(req, res);

            assert(res.resData.message === 'Everything worked out fine');
        });
```

We can see that actually testing the actions, now, has become three simple lines of Javascript.  What is happening in each of these tests is, our module is registering actions against routes, which are stored by our Express Route Fake module. Once the test starts, we simply ask for the function and execute it as if it were called by Express because of an HTTP request.  We pass in our fake objects and capture the result of our action behavior.  This allows us to see directly inside of our method and test the interesting parts, throwing away the stuff that would be, otherwise, obscured by frameworks, libraries and Node itself.

A second, important item to note is that we get extra guarantees around our route paths.  If someone were to come along and change the path in our module, but not update the tests, or vice versa, we would get immediate feedback since getRouteAction would throw an error telling us the path does not exist. That's a whole lot of security for a little bit of up-front work!

<h3>Summing Up</h3>

Today, wee looked at how to use just a couple of modules to insert a fake for Express and get better tests around our code.  By using Mockery and Express Route Fake, you can capture route actions and get them under test.  Moreover, you can do this while only writing code that is specific to the tests you are writing.

As you write more tests, it might become useful to create a factory for creating custom request and response objects which would simplify the test code even more.  Of course, with all of this abstraction it does become more challenging to see what is happening under the covers.  Ultimately, this kind of tradeoff can be useful in situations like this where repeated code is more of a liability than a help.

The next time you sit down to create new functionality and wire it into an Express route, consider starting off with Mockery and Express Route Fake.  They will simplify the tests you need to write and limit the amount of code you have to change in order to get tests in place.  Happy coding!
{% endraw %}
    