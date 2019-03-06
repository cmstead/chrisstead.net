---
layout: post
title:  "Static Methods on Javascript Objects"
date:   2016-05-04 09:00:28 -0700
categories: Coding, Design Patterns, Functional Programming, Javascript
---
{% raw %}
I'm a big proponent of unit testing. This means that any code I can test, I do.  When I work in the browser, however, it becomes more challenging to effectively unit test all of the code I write without spinning up an instance of PhantomJS. On top of that, most of the code I write in the browser, now, uses Angular as the underlying framework, which means my requirements are even more restricted since the go-to testing environment for Angular is Karma, which uses PhantomJS to satisfy Angular's dependency on a live DOM.

When we consider testing requirements along with the desire to share code between Node and client-side Javascript, it becomes critically important to decouple our core functionality from the framework and environment it runs within.  Although some projects can benefit from Browserify and Webpack, it is equally common for developers to fight against the build step which happens before running everything in the browser.

I have spent a fair amount of time off and on trying to find the best solution for each of these problems, which would solve all of them together. Ultimately, the solution came to me while working with Scala.  In Scala, it is possible to define a class and an associated object.  The object exposes functions as static methods on a namespace, while the class acts as an instantiable object which can be used in Classical OO applications.

<h3>A Basic Object</h3>

This inspired my thinking and I started looking at ways I could drop this same philosophy into Javascript. Ultimately, I landed on the concept of static functions on an object.  In order to get some perspective on where this train of thought will take us, let's take a look at a simple controller object like we might create in Angular.

```javascript
    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = this.transactionList.filter(function (item) {
                item.id !== itemId;
            });
        },

        setTotal: function () {
            this.total = this.transactionList.reduce(function (total, item) {
                return total + item.price * item.quantity;
            }, 0);
        }

    };
```

This controller is actually pretty typical.  There is a little bit of functionality which goes through and modifies the controller state. In order to properly test this behavior, we have to modify the controller state, then run each method and test that the mutation was correct.  In a world where good functional practices are possible, this seems unnecessarily fiddly.

<h3>Moving to Static</h3>

If we rewrite this controller just a little bit, we can start separating behaviors and decouple the computational bits from the state mutation.  This means the bulk of the work can be bundled up inside a pure function which is easy to test and think about.  Once that is complete, the mutation behavior becomes trivial to test and reason about because it is merely setting a variable.

```javascript
function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController.removeItem = function removeItem(itemId, transactionList) {
        return transactionList.filter(function (item) {
            return item.id !== itemId;
        });
    };

    TransactionController.getTotal = function getTotal(transactionList) {
        return transactionList.reduce(function (total, item) {
            return total + item.price * item.quantity;
        }, 0);
    };

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = TransactionController.removeItem(itemId, this.transactionList);
        },

        setTotal: function () {
            this.total = TransactionController.getTotal(this.transactionList);
        }
    };
```

This change is important because we are actually modifying the base object which introduces functions which are not part of the instantiable object.  Due to this, we can actually start moving the functionality out of the primary object scope altogether and, instead, only reveal the parts of our code which we really want to expose for use.

<h3>Full Extraction and Namespacing</h3>

Once we have extracted the base functionality, we can actually move all of our logic into a factory function.  This will allow us to close over utility functions and reveal just the resulting composite functions which can be attached to our object just in time.

```javascript
    function getTransactionBehaviors() {
        function isNotSelected(itemId, item) {
            return item.id !== itemId;
        }

        function removeItem(itemId, transactionList) {
            return transactionList.filter(isNotSelected.bind(null, itemId));
        }

        function addToTotal(total, item) {
            return total + item.price * item.quantity;
        }

        function getTotal(transactionList) {
            return transactionList.reduce(addToTotal, 0);
        };
        
        return {
            getTotal: getTotal,
            removeItem: removeItem
        };
    }
```

We can actually call our factory function within our tests to ensure the logic is correct, meanwhile, nothing is exposed to the outside world accidentally.  This means we can attach these functions to the controller, if desired, just before we use them in our prototypal functions.

By attaching the functions as static methods, we give them a unique namespace, perform safe data hiding and ensure that our controller functions can refer to them without needing to be bound to a local context.  This actually frees us quite a bit since much of the complexity related to Classical OO in Javascript is related to context switching depending on whether a function is called within the object scope or not.

I created a <a href="https://gist.github.com/cmstead/0c3acdae372380baf4c3e703069fd66e" target="_blank">small utility to perform a no-frills merge</a> of properties onto an object.  This is only for illustration and would probably be best done with a reliable library like lodash or JFP.  Let's take a look at attaching our functions to our object for namespacing purposes.

```javascript
    function TransactionController(transactionList) {
        this.transactionList = transactionList;
        this.setTotal();
    }

    TransactionController = simpleMerge(TransactionController, getTransactionBehaviors());

    TransactionController.prototype = {
        deleteItem: function (itemId) {
            this.transactionList = TransactionController.removeItem(itemId, this.transactionList);
        },

        setTotal: function () {
            this.total = TransactionController.getTotal(this.transactionList);
        }
    };
```

We can see here the attachment of our functions is exclusively for the purpose of namespacing, much the same way we might see this in Scala or other functional language. Now that our functions are separated and declared within a factory function, we can actually work toward our second goal.

<h3>Externalizing Our Code</h3>

By separating our functionality, we can actually lift the entire factory function into a conditionally exported node module.  On top of that, we get extra security because our factory function closes over our functions, making them completely inaccessible to tampering.  This means, once our app is loaded in a browser, we get the same kind of separation from the world we normally see from an IIFE.

Moreover, because our code can be conditionally exported, we can require our behaviors directly and test them outside of the browser context.  This means our tests will run faster and we don't need to rely on as many, potentially flaky, integration tests.  Here's our final behavior code.

```javascript
var getTransactionBehaviors = (function () {
    'use strict';

    function getTransactionBehaviors(transactionController) {
        function isNotSelected(itemId, item) {
            return item.id !== itemId;
        }

        function removeItem(itemId, transactionList) {
            return transactionList.filter(isNotSelected.bind(null, itemId));
        }

        function addToTotal(total, item) {
            return total + item.price * item.quantity;
        }

        function getTotal(transactionList) {
            return transactionList.reduce(addToTotal, 0);
        };

        return {
            getTotal: getTotal,
            removeItem: removeItem
        };
    }

    if(typeof module !== 'undefined' && typeof module.exports !== undefined) {
        module.exports = getTransactionBehaviors;
    }

    return getTransactionBehaviors;

})();
```

<h3>Summary</h3>

In the face of a new world for Javascript, it is important to capture every advantage we can in order to make our code clean, efficient and stable.  By splitting our behaviors out of the strict confines of a framework structure and pulling them into a file for easy testing, we simplify the testing story and make it easier to share behavior between the browser and the server.

We can use simple patterns to build well defined, pure functions which give us a clear way to write and share code, while keeping it safe from attackers and stable for our users. The next time you find yourself working on a full-stack Javascript application, how are you going to split your app?
{% endraw %}
    