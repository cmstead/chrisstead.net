---
layout: post
title:  "Method Injection for Testing"
date:   2020-07-19 00:00:00 -0800
categories:
  - testing
  - legacy-code
  - javascript
---

There is certainly more legacy code in this world than any other kind of code. I say this with only anecdotal evidence, but given the amount of time people have been writing software, the amount of time people have been creating new software, and the number of people who talk about the pains and repairs of legacy code, it seems reasonable to assume that legacy code is out there in abundance.

What is legacy code, then?

I like Michael Feathers' definition of legacy code, which is, roughly, any code without tests.

Truthfully, the tests aren't really what makes legacy code hard. If you have someone who is adept at, and used to writing tests and testable code, the legacy code they create may not be terribly difficult to get tests around.  This is not to say someone skilled in testing won't write hard-to-test code, but they have a leg up on the people who haven't yet developed the muscle.

Lately, I have been working in a codebase which actually has tests, but the tests are so large and have so many real-world dependencies that trying to use them as a safety check for modifications to the existing system is rather untenable.

It is worth noting that the code which is in this state has been touched by many hands over the past 15 years. This means people of varying skill levels and depth of domain understanding have worked in the code, making it, honestly, kind of a typical "older" codebase.

The tests which are in place now were created to go from a state of no tests to the state of some tests, which are really too big. It's a good step, and I respect it.

With all of that in mind, I still need to be able to work with the team on this older codebase, and both fix bugs, and introduce new behaviors. The area of the code we are working on right now is some of the oldest and there is a particular file (a class) which really is the beating heart of the application. All 5-10K lines of it.

We have been working on introducing tests into the middle of this giant class. Of course the problem is this class is complicated, has many dependencies, is modified from the outside, hides many of the internal object instances under private variables, etc.

You get the idea.

In order to test a method you must instantiate the entire class, which is tricky, but doable. Once instantiated, you have to make sure all dependencies are properly set up. This is the tough part.  The actual setup is scattered throughout multiple files buried deep in the codebase, and getting a clear bead on what needs to happen is tremendously difficult. Any method assumes the entire object is set up, and reads object instance dependencies from the core object, which could be viewed as global instances, for the purposes of this code.

What we really need is a seam (Feathers) to get our test hooks in. A seam would be best if all dependencies were broken and the code we were attempting to test was effectively isolated from the world.

In walks good old dependency injection.

## Dependency Injection ##

Rather than diving deep into the history of dependency injection, we will talk about what it is, briefly, and what it looks like (CODE!!).

Dependency injection is the practice of providing object instances, as well as other dependencies, to the object which needs them, rather than having the object new them up, or otherwise create them itself.  The most common form looks like this:

```javascript
class AComplicatedSystem {
  constructor (someDBService, networkingAGoGo, stateIncorporated) {
    this.someDBService = someDBService;
    this.networkingAGoGo = networkingAGoGo;
    this.stateIncorporated = stateIncorporated;
  }

  doComplicatedThing() {
    // ... do some stuff with the dependencies
  }
}
```

This particular form of dependency injection is known as "constructor injection." It gets this, rather unimaginative, name from the fact that the dependencies are provided to the constructor at the time of object instantiation.

There is, however, another way to inject dependencies. You can inject them straight into the method which will use them. An object with methods supporting dependency injection would look something more like this:

```javascript
class AComplicatedSystem {
  constructor () {
    // There might still be stuff here
  }

  doComplicatedThing(someDBService, networkingAGoGo, stateIncorporated) {
    // ... do some stuff with the dependencies
  }
}
```

You'll note the constructor knows nothing about the dependencies, whatsoever. This is, unsurprisingly, called "method injection."

The constructor is Jon Snow.

## Method Injection Saves the Day ##

So, let's go back to this giant class (sometimes referred to as a God class). We have methods which depend on things which are set up at arbitrary times, including instantiation, execution of behaviors from other classes, etc.

We have no way to safely call this method!

Or do we?

Let's suppose the code looked like this:

```javascript
class AReallyMassiveClass {
  constructor () {
    // does a whole bunch of stuff
  }

  init () {
    // does even more stuff
  }

  // ~2500 lines later

  theMethodWeWantToTest (dataToProcess, dataToStore) {
    const conditionOk = await this.dbService.checkConditionFromDB();

    // 30 lines later

    if(conditionOk) {
      const newDataToStore = await this.processingService.processData(dataToProcess, dataToStore);

      // do some business logic

      await this.dbService.storeData(newDataToStore)
    } else {
      // do a bunch of business logic

      await this.dbService.storeData(dataToStore);
    }

    return something;
  }

  // Just so much more work after this.
}
```

Yes, even the code, abbreviated for the sake of time, is like a wall of text. Sorry about that.

By inspection we can see there are a few different async behaviors in there, but if we look a little closer, there are really just two dependencies which are causing the most pain. One of the dependencies is a database service of some sort. The other is a processing service which does... I just don't even know.

The takeaway, though, is we can actually get a test in here without having to refactor all of this code. In fact, we can modify this in such a small place the initial refactoring will be transparent to the current implementation even as we introduce it!

By using our friend method injection, we can just do the following, and we have an easy-in dependency break which can send us along the righteous path of testing the code we want to change. Here's what we need to do to the method declaration

```javascript
// This is the first thing we have to do:

  theMethodWeWantToTest (
      dataToProcess, 
      dataToStore, 
      dbService = this.dbService, 
      processingService = this.processingService) {
```

Now that we have our services defaulting to the current object services, we can safely clean out all references to `this` throughout the rest of the method.  Here's what it looks like:

```javascript
  theMethodWeWantToTest (
      dataToProcess, 
      dataToStore, 
      dbService = this.dbService, 
      processingService = this.processingService) {
        
    const conditionOk = await dbService.checkConditionFromDB();

    // 30 lines later

    if(conditionOk) {
      const newDataToStore = await processingService.processData(dataToProcess, dataToStore);

      // do some business logic

      await dbService.storeData(newDataToStore)
    } else {
      // do a bunch of business logic

      await dbService.storeData(dataToStore);
    }

    return something;
  }
```

And just like that, we're done. Now when the code is called in production, it behaves exactly as it always did before. If, on the other hand, we want to test our method, we have a direct injection point where we can provide test doubles and isolate our code from the rest of the world. We'll look at the tests in just a moment.

Hooray!

If you're working in a language which doesn't support parameters with default arguments, you can, likely, use method overloading to accomplish the same thing. That's what we did in the actual codebase my story was about.

## The Rest Is Just Test Doubles ##

Once you have a seam you can inject dependencies into, the hardest part of the journey is done. (Ha HA!)

Seriously, though, the tests will involve creating some test doubles. In JavaScript (or TypeScript) you can use Sinon to accomplish this without too much trouble.  Here's a really cheap test double you can inject into the method for each dependency:

```javascript
const dbServiceDouble = {
  storeData: sinon.stub()
};

const processingServiceDouble = {
  processData: sinon.stub()
}
```

Once you have your doubles, you can test like this:

```javascript
it('does the thing I expect when I expect it', function () {
  const dataToProcess = { something: 'something' };
  const dataToStore = { someOtherThing: 'some other thing' };

  return aReallyMassiveObject
    .theMethodWeWantToTest(
        dataToProcess,
        dataToStore,
        dbServiceDouble,
        processingServiceDouble)
    .then(function (result) {
      // assert on the result here
    })
    .catch(function (error) {
      // be ready for something to go wrong while you figure out this legacy stuff
    });
});
```

## In Conclusion ##

Legacy code is tough and there is often not a clear path forward. Nevertheless, there are times you can cut through the brambles of the old code and create a means to start testing the code. By using method injection, you can introduce the means by which you can create a seam and simplify your testing story without destabilizing the code in the system.

I hope this helps someone out there, and they can use this to make the world a better place.
