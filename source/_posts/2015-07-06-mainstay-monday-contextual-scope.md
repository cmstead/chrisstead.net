---
layout: post
title:  "Mainstay Monday: Contextual Scope"
date:   2015-07-06 10:00:54 -0700
categories: Coding, Foundation, Javascript, Mainstay Monday
---
{% raw %}
Last week we kicked off a discussion of scope in source code. <a href="http://www.chrisstead.net/archives/735/mainstay-monday-lexical-scoping/" target="_blank">We talked about lexical scope</a> and how that impacts the way variables are accessed. There is another element of scoping called contextual binding, which is what gives people the most trouble.

Contextual binding is the scoping of variables based on the execution context of a particular function at the time of execution. This is least visible when dealing with the functional aspects of Javascript and most visible when interacting with objects.  Let's take a look at a little bit of Java to start.

```java
class Thingy{

    protected String someVar;

    public Thingy(String aVar){
        //I am using this for clarity. This is not idiomatic Java.
        this.someVar = aVar;
    }

    public void printVar(){
        System.out.println(this.someVar);
    }

}

//Begin ceremonial main class
class Main{

    public void main(String[] args){
        Thingy myInstance = new Thingy("Hello!");
        myInstance.printVar(); //Hello!
    }

}
```

Although there are a few things here and there that might not seem familiar to the average Javascript developer, I'm sure everyone can largely follow along with what is happening here. We're creating an object that takes a string in its constructor and then prints it to System.out when printVar is called.

Let's take a look at the equivalent code in Javascript.  I'm going to keep this old-school so we can talk about what is happening here without trying to remember all that new-fangled ES6 syntax. (I originally wrote this with a class)

```javascript
function Thingy(aVar){
    this.someVar = aVar;
}

Thingy.prototype.printVar = function printVar(){
    console.log(this.someVar);
};

var myInstance = new Thingy('Hello!');
myInstance.printVar(); //Hello!
```

So far, no surprises. Handy thing, that. We did essentially the same thing: we created an object Thingy, instantiated it and then called myInstance.printVar.  Everything worked out just as we expected it. Suppose, on the other hand, we were to do something like, hand our function off as a delegate to another function or object. Let's take a look at what that produces:

```javascript
function AnotherThingy(delegate){
    this.delegate = delegate;
}

AnotherThingy.prototype.doStuff = function doStuff(){
    delegate();
}

var myOtherInstance = new AnotherThingy(myInstance.printvar);
myOtherInstance.doStuff(); //undefined
```

I'm sorry, what?

We defined printVar inside myInstance and pointed it at this.someVar. It seems like it shouldn't return undefined when we call it. This is a product of contextual binding. Although the original context inside our object Thingy provides a value someVar, once the function is passed to another function as a delegate, the context changes.  This NEW contextual binding doesn't provide the same variables as the original, so this.someVar doesn't mean what it once did.

This behavior is really difficult for people who are new to Javascript. They expect, much like Java, that the original object context is bound up with the functions from the same context. What we can't do with Java, however, is break a function from its object context and produce a delegate like we are doing here.

Fortunately, Javascript has a way to provide some guarantees! Don't fret, young padawan, we have the bind function.  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank">Bind</a> is a function that is defined on <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype" target="_blank">Function.prototype</a>, and allows us to guarantee that a function will execute within a specific context.

Here's what using bind does for us:

```javascript
var myLastInstance = new AnotherThingy(myInstance.printVar.bind(myInstance));
myLastInstance.doStuff(); //Hello!
```

Hooray!

With simple examples like this it's easy to think that all contextual binding is obvious and simple. I wish it were true.  Contextual binding, however, can get a little tricky as functions start getting passed around and you start editing not only your own code, but others' code too.  The important thing to see is that contextual binding is a good place to look when you start coming up against disappearing variables and suddenly undefined values.

By combining lexical scoping and contextual binding, you can get your variable management under control and start writing safe, stable, internally consistent code. You'll impress your coworkers, be better at sports, your teeth will be whiter and your car will get an extra 5 miles to the gallon. Well, you code will be more stable, so there is that.  Watch your scope and context and your code will thank you.

<h3>Blog Post Notes</h3>

<ul>
<li><a href="http://www.chrisstead.net/archives/735/mainstay-monday-lexical-scoping/" target="_blank">Lexical Scope Post</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind" target="_blank">Function.prototype.bind</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype" target="_blank">Function.prototype</a></li>
</ul>
{% endraw %}
    