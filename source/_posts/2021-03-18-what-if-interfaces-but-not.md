---
layout: post
title:  "What If Interfaces... But Not?"
date:   2021-03-18 00:00:00 -0800
categories: object-oriented programming design-patterns
---

Imagine this scenario:

Two people are sitting at a conference, side by side.

One of them says, "interfaces aren't everything".
The other person says, "I would never work in a language without interfaces".

This actually happened. The first person is me, and the second person is someone I happened to sit next to for a session. I don't know them and was actually mumbling to myself.

Every once in a while something comes around which reminds me of this interchange. Me, talking to myself about interfaces, the other person interrupting my conversation with myself.

So, here's the deal: not every programming language has interfaces. Even object oriented languages don't have interfaces.<!--more-->

## WAT ##

If you work in one such interfaceless language, here's the gist:

```csharp
public interface IDBConnector {
  public IEnumerable<DataType> GetSomeData(string query, List<string> params);
}
```

This jumble of words is defining what a class would look like that behaves like `IDBConnector`. If it doesn't all mean something to you right now, that's alright. All it really means is, anything that uses this interface MUST adhere to the definition.

I can think of two object-oriented languages offhand which do not have the notion of interfaces at all: JavaScript and Io.

The rest of this post will use JavaScript to demonstrate:

1. Why we should care
2. How we can gain some of the goodness that comes from having an interface

## But First, Dependency Injection ##

In case you aren't familiar with **_dependency injection_**, and specifically **_constructor injection_**, I'm going to give a very fast crash course in the topic.

### Dependencies, Dependencies ###

With any sufficiently complicated program, you will eventually need to break things into separate files. Ideally those files will represent some **_contextually meaningful_** part of the program. Moreover, things may get reused.

All of these smaller parts of your program are **_dependencies_**. Something, somewhere will depend on some code written in another file, module, class, whatever. It's a fact of life.

### Object Oriented Dependencies ###

In object oriented languages it is common to see dependencies introduced in the constructor of the object they will be used. For those of you who are familiar with dependency management, I apologize for what you are about to see.

You may have something like this:

```javascript
const DBConnector = require('./DBConnector');

class TodoDataService{
  constructor() {
    this.dbConnector = new DBConnector();
  }

  getTodos(userId) {
    return this.dbConnector.query(
      'SELECT * FROM todos WHERE userid = ?',
      [userId]
    )
  }

  saveTodo(todo, userId) {
    return this.dbConnector.query(
      'INSERT INTO todos',
      {
        todo: todo,
        userid: userId
      }
    );
  }
}

module.exports = TodoDataService;
```

At first blush, this might seem fine, until you want to test things, or... you know, change your `DBConnector`. All of a sudden you find yourself in dependency management hell, or worse, testing hell.

If your dependencies are created where they are going to be used, you can't break them out to get tests in. By the same token, if everything, everywhere, is depending on that EXACT `DBConnector` file, changing to a NEW connector will require going around and touching every file that used the old one.

This is sometimes referred to as **_shotgun surgery_**.

Ew.

### Dependency Injection ###

We can take a different approach to handling object instances and dependencies. We can declare a constructor which takes dependencies as arguments, eliminating the need to instantiate (new up) every object in our constructor, and **_decoupling_** our code.

```javascript
class TodoDataService{
  constructor(dbConnector) {
    this.dbConnector = dbConnector;
  }

  getTodos(userId) {
    return this.dbConnector.query(
      'SELECT * FROM todos WHERE userid = ?',
      [userId]
    )
  }

  saveTodo(todo, userId) {
    return this.dbConnector.query(
      'INSERT INTO todos',
      {
        todo: todo,
        userid: userId
      }
    );
  }
}

module.exports = TodoDataService;
```

All at once, if you change your `DBConnector`, as long as it behaves like the old one, you can swap the file in one place, and be done. Everything will get the new one for free.

...and testing. Testing becomes magical!

Since you can jam anything you want into that constructor, your test can provide a fake `DBConnector` and your code will be none-the-wiser.

SO COOL!

(or so it would seem...)

## Back To The Interface ##

Dependency injection in JavaScript breaks some very important stuff. If you aren't requiring (or importing) your files, you don't have a direct line of sight to the **_contract_** for your dependencies. Since you don't have a link to the file, you also lose all of your code hinting in your editor.

BOOOOO!!

HOWEVER, you can pull your fat out of the fire by emulating interfaces!

I contend, what you want most from interfaces are:

1. insight into a code contract
2. communication when something that **_implements_** the interface missed a required method

Fortunately, you can do all of that in JavaScript with classes (or prototypal objects), and **_default parameters_**.

YAY!

### Creating the Interface ###

Let's dig into how we can create an interface using a simple class structure. What we will end up with is going to be more akin to an **_abstract class_**, but that's a discussion for a different day. We work with what we have.

Let's suppose I am creating a `DBConnector` class which will provide an API to send queries to a database. I want something to reflect what the API will look like, while keeping people from directly using the interface for anything. The approach I prefer is, any method attached to our interface-like structure would throw an error on call.

Let's list some of the expectations:

1. **There should be no constructor**. An interface has no logic, so there should be nothing to construct.
2. **All interface methods must represent the real contract** as closely as possible to the way methods will be defined in the classes which implement our interface.
3. **All methods attached to our interface should throw** if they are called directly.

Here's what I landed on for for a first pass:

```javascript
class DBConnectorInterface{
  query(queryString, params) {
    throw new Error(`Method 'query' not implemented`);
  }
}

module.exports = DBConnectorInterface;
```

### Using Our Interface ###

It's not a very exciting bit of code, but I believe it gives us the insight we are looking for. Now, if we construct a **_concrete class_** inheriting from this interface, it would probably look something like this:

```javascript
const DBConnectorInterface = require('./DBConnectorInterface');

class DBConnector extends DBConnectorInterface {
  constructor(connection) {
    this.connection = connection;
  }

  query(queryString, params) {
    return new Promise((resolve, reject) => {
      this.connection.query(
        queryString,
        params,
        (error, data) => {
          if(error) {
            reject(error);
          } else {
            resolve(data);
          }
        })
    });
  }
}

module.exports = DBConnector;
```

## Dependency Injection and the Interface ##

Now that we have our interface, and we know roughly what dependency injection looks like. Let's have a look at how our interface can help us in our day to day lives.

Our interface, as we've been calling it, is actually **_instantiable_** -- i.e. you can do something like `new InterfaceThing()` -- so we can use it like a real value. JavaScript is a **_dynamically typed_** language, so we can't get any feedback until our program is run. This means that an interface that is a value is likely just what we need!

If we use the magic of ES-Next default parameters, we can guarantee we always have a real, usable value. This might seem like a strange thing to want in our code, but we get a really nice side-effect. Since we can have an **_interface instance_**, that is linked to real code, our editor will actually be able to give us all of the code hints we know and love!

Let's look at what our final TodoDataService would look like with dependency injection, using our new, fancy interface value:

```javascript
const DBConnectorInterface = require('./DBConnectorInterface');

class TodoDataService{
  constructor(dbConnector = new DBConnectorInterface()) {
    this.dbConnector = dbConnector;
  }

  getTodos(userId) {
    return this.dbConnector.query(
      'SELECT * FROM todos WHERE userid = ?',
      [userId]
    )
  }

  saveTodo(todo, userId) {
    return this.dbConnector.query(
      'INSERT INTO todos',
      {
        todo: todo,
        userid: userId
      }
    );
  }
}

module.exports = TodoDataService;
```

_Voilà!_

Our data service hasn't undergone much of a change, however, the `DBConnectorInterface` instance as a default parameter for our constructor gives us a close enough approximation to a static interface that we get a bunch of benefits:

1. Our API surface is now clearly defined in a standalone, presumably easy to find source document.
2. We get IDE support! The editor can actually read our interface definition and use it to provide code hinting while we work.
3. The interface has no dependencies, so it is safe to require in anywhere, including tests, and documents with potentially unsafe dependencies -- like those that might interact with the outside world.
4. It's a totally inert change to the code, so if we have a class we want an interface for, we can introduce one without changing the outward behavior of the code.

## So What? ##

If you are using TypeScript, this might be a big "so what", you have interfaces. If you are not using dependency injection, this might also be a big "so what."

HOWEVER, even if you aren't using dependency injection, you may find it helpful to create an interface, especially if you rely on common patterns, like the factory pattern.

It can also be quite useful to have an interface to work from when writing test code. By providing a contract that must be followed, **_test doubles_** can be created more easily, if by no other means than simply inheriting from the original interface, and **_overriding_** what you need for your test.

In the end, the use of this pattern in JavaScript, or other language lacking interfaces, can provide significant help when creating software that needs to be easily understood and supported now, and into the future.
