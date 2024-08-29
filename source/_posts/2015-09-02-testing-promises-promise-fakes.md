---
layout: post
title:  "Testing Promises: Promise Fakes"
date:   2015-09-02 09:00:12 -0700
categories:
    - Coding
    - Design Patterns
    - Javascript
    - Unit Testing
---
{% raw %}
Javascript developers notoriously say unit testing in hard. I think the problem is actually more specific than that. Unit testing pure functions and business logic actually pretty easy.You put a value in, you get a value out. If the value you get back is what you expected, your test passes. Something that is hard to unit test is asynchronous logic.

Asynchronous logic is so hard to test, the angular team actually built a special mocking system for testing calls made through the $http service. In reality, though, if your unit tests are littered with $httpBackend references, you're doing it wrong.

I won't go into philosophical discussions about promises and callbacks, so let's just agree that people use promises. A lot. Promises have become the currency for modern asynchronous requests, whether to another thread or across the internet, if you have to wait for your execution to come back from an asynchronous behavior, you might see a promise in the mix. Your code might look a little like this:

```javascript
class MyUsefulClass{
    constructor(myService){
        this.myService = myService;
    }
    
    myFunctionUnderTest(callback){
        var promise = this.myService.asyncMethod();
        
        promise.then(callback);
    }
}
```

Let's cut to the chase, promises are easy to throw into the middle of your code, but they are really hard to test... until today.

In unit testing there is a concept known as fakes. Fakes are often, mistakenly called mocks, but mocks actually store something to use for later when you are handing your test expectations. No, fakes are just what they sound like: a fake something.

Fakes contain the minimum amount of code to satisfy your functionality and nothing more. Sometimes fakes are nothing more than an empty object or function. Other times they are a little more involved, doing stuff like calling passed functions and returning values, but at the end of the day, a fake is a placeholder used for guaranteeing your unit under test won't fail and will be isolated.

So, promises and fakes.

It is a law of unit testing that you do not talk to the outside world and you do not talk about fight club. This means, if you have a function that is going to call a service which will, in turn, interact with the world at large, you have a big problem. Fortunately, you probably wrapped that up in a promise and that is the crack in the armor we can use to break our unit out into its own isolated space.

Underneath it all, promises are nothing more than objects with a bunch of trickery hidden inside.  With the knowledge of fakes and a general understanding of the promise syntax, we can build a stand-in object.  A stunt promise, if you will. It's pretty common to use Chris Kowal's concept of promises, as developed in Q, so let's build our fake around that.

Here's what a promise fake might look like:

```javascript
function PromiseFake(){
    this.failState = false;
    this.error = null;
    this.response = null;
}

PromiseFake.prototype = {
    setFailState: function(failState){
        this.failState = failState;
    },
    
    setError: function(error){
        this.error = error;
    },
    
    setResponse: function(response){
        this.response = response;
    },
    
    then: function(success, failure){
        if(this.failState){
            failure(this.error);
        } else {
            success(this.response);
        }
        
        return this;
    },
    
    catch: function(callback){
        if(this.failState){
            callback(this.error);
        }
        
        return this;
    }
};
```

It's about 40 lines of code, but now we have something we can work with. This promise fake can be instantiated for each test we write and it won't muddy the state from test to test. It's chainable, so if there is code using chained promises, it can be tested. Finally, success and failure states can be set with errors and response values so any function that might be relying on a specific response value will be testable with little extra effort.

Faking can be hard work, but if you do it right, you only ever have to do it once. Hooray! Now let's look at a test for our method.

```javascript
describe('MyUsefulClass', function(){
    
    var myInstance,
        myService;
    
    beforeEach(function(){
        myService = {
            asyncMethod: function(){}
        };
        
        myInstance = new MyUsefulClass(myService);
    });
    
    if('should call spy on success', function(){
        var spy = jasmine.createSpy('callback');
        
        myService.asyncMethod = function(){
            return new PromiseFake();
        }
        
        myInstance.myFunctionUnderTest(spy);
        
        expect(spy).toHaveBeenCalled();
    });
    
});
```

That was easy! We didn't have to do a whole mess of monkey patching to our code and we didn't have to use some crazy mechanism to intercept HTTP requests way down the stack. Fakes are great, when used for the powers of good. The goodness doesn't stop there, though. Here's how we can actually test our promise fake actually works as expected.

```javascript
describe('Do somethig that uses a promise', function(){
    
    it('should call success spy', function(){
        var myPromise = new PromiseFake(),
            spy = jasmine.createSpy('successCallback');
        
        myPromise.then(spy, function(){});
        
        expect(spy).toHaveBeenCalled();
    });
    
    it('should call failure spy', function(){
        var myPromise = new PromiseFake(),
            spy = jasmine.createSpy('failureCallback');
        
        myPromise.setFailState(true);
        myPromise.then(function(){}, spy);
        
        expect(spy).toHaveBeenCalled();
    });
    
    it('should chain', function(){
        var myPromise = new PromiseFake(),
            spy = jasmine.createSpy('callback');
        
        myPromise.response('foo');
        myPromise.then(function(){}, function(){}).then(spy, function(){});
        
        expect(spy).toHaveBeenCalledWith('foo');
    });
    
});
```

That's pretty much it!

We had to do a little grunt work at the beginning, but after we built our class, we could fake promises all day long and save ourselves headaches forever more. The best part is, now we have eliminated the asynchronous behavior from our code and made everything testable. This makes our tests easier to read, easier to maintain and clearer to write. Who could argue with that?

What this all really leads us to is this, promises are tough to test, but when we absolutely, positively have to have them, we can trim the fat, clean out the code and fake our way to a brighter tomorrow.  Isn't that what we all really want? Go write some tests and make your code a better place to live.
{% endraw %}
    