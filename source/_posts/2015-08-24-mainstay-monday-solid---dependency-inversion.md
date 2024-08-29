---
layout: post
title:  "Mainstay Monday: SOLID - Dependency Inversion"
date:   2015-08-24 09:00:43 -0700
categories:
    - Coding
    - Design Patterns
    - Javascript
    - Mainstay Monday
    - SOLID
    - Unit Testing
---
{% raw %}
This post is part of a series on the <a href="http://www.chrisstead.net/archives/category/design-patterns/solid/" target="_blank">SOLID programming principles</a>.

This is it, the final SOLID principle. Dependency inversion is probably one of the most talked about SOLID principles since it drives so much of what we see in programming today.  From Inversion of Control (IoC) libraries to the dependency injection in modern Javascript frameworks like Angular and Ember, popular OO programming has embraced this principle more than any other.  It's possible that the success of dependency inversion is related to the fact that it can be enforced with a technical solution.

Let's start by talking about what dependency inversion is. As Uncle Bob Martin says, dependency inversion is the dependency on abstractions instead of concretions.  More specifically, this means that any object or function should not rely on the existence of specific concrete parts of an object, but instead, it should expect and use a contract while letting an outside entity define the concrete object that will be used.

To demonstrate this idea, let's first take a look at a counter-example to our principle.  This is probably one of the most flagrant violations of the dependency inversion principle I have encountered in Javascript and it is right on a popular examples page. The following example is lifted directly from that examples page:

```javascript
var Mailbox = Backbone.Model.extend({

  initialize: function() {
    this.messages = new Messages;
    this.messages.url = '/mailbox/' + this.id + '/messages';
    this.messages.on("reset", this.updateCounts);
  }

  /* ... */

});

var inbox = new Mailbox;
/* ... */
```

Clearly, this is an example from the Backbone site. Backbone, you're doing it wrong.

If you look back to <a href="http://www.chrisstead.net/archives/776/dependency-injection-without-a-framework-or-pain/" target="_blank">my post on dependency injection</a>, you'll see we could easily create a factory for each of these instance-creation lines. It could be simple, like the following code:

```javascript
var messageFactory = {
        build: function(url){
            var message = new Message;
            message.url = url;
            return message;
        }
    },
    mailboxFactory = {
        build: function(){
            return new Mailbox;
        }
    };

var Mailbox = Backbone.Model.extend({

  initialize: function() {
    var url = '/mailbox/' + this.id + '/messages';

    this.messages = messageFactory.build(url);
    this.messages.on("reset", this.updateCounts);
  }

  /* ... */

});

var inbox = mailboxFactory.build();
/* ... */
```

It's a few extra lines of code, but the separation of concerns you get can make a huge difference when you write unit tests or if the creation of a message or mailbox ever becomes more complicated than simply calling new. By inverting the dependency chain on this small example, we centralize our creation, eliminate the new keyword from our code and provide a facility for easily injecting a substitute factory to help in testing that our code does only what it is supposed to do.

The other thing that happens when we break out the creation logic is, it becomes obvious what is really happening in the code: we are creating a messages object that is, really, an event handler. Now we can isolate this behavior fully and put guarantees around the actions our model will take when we trigger certain events.

Let's take a look at the other side of the picture and write a little Jasmine code to test our message model.

```javascript
describe('messages', function(){
    
    var factory;
    
    beforeEach(function(){
        factory = {
            build: function(){
                /* noop */
            }
        };
    });
    
    it('should set an event on the messages object', function(){
        var spy = jamine.createSpy('on');
        
        messageFactory = Object.create(factory);
        messageFactory.build = function(){ return { on: spy }; };
        
        mailboxFactory.build();
        
        expect(spy.calls.mostRecent().args[0]).toBe('reset');
        expect(typeof spy.calls.mostRecent().args[1]).toBe(function);
    });
    
});
```

If we had tried to do that without our factory, it would have been a lot more challenging to wrap everything up in tests. Since we broke out the new object from the mailbox definition testing became as easy as replacing our definition for the factory and we got direct access to everything we needed inside the object setup.

Finally, when we separate our object instantiation out from the core body of our code, it becomes much easier to modularize all of our code and separate pieces as they become unwieldy. This gives us better guarantees around the stability of each part of our code, since each module can be written and tested independently, breaking the code apart at intentional seams.

The takeaway from all of this is, when we invert our dependencies in our code and rely on abstractions to define our program, we improve stability, guarantee contract integrity and improve the testing story. All of these things add up to better programming and more stable output.  Isn't that really what we all want?
{% endraw %}
    