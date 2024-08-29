---
layout: post
title:  "Types and Functions in Javascript"
date:   2016-02-24 08:00:02 -0800
categories:
    - Applied Math
    - Coding
    - Data Structures
    - Design Patterns
    - Functional Programming
    - Javascript
---
{% raw %}
A while ago we talked about <a href="http://www.chrisstead.net/archives/949/data-types-objects-and-creating-a-new-generic-type/" target="_blank">creating a custom type in Javascript</a> using object inheritance. There were a couple of fundamental issues with this post: first it was fairly academic and was unlikely to be applicable to the real world; second we didn't actually do anything with our resulting type.

I decided it was time to revisit the topic, spending less time on the hows of creating a new type more time on the whys. I created a gist with a full definition of a Vector object so we could start looking at how we can interact with a type and why it's valuable to isolate object-oriented patterns to type system related activities rather than bundling everything in a class because "it's the way things are done."

<script src="https://gist.github.com/cmstead/504184633bf0d5b402ff.js"></script>

<h3>A First Look</h3>

Something you might note right away is we have done some fancy finger work with our definition and created a combination of inheritable behaviors and static functions. This gives us the ability to fall back to the factory pattern for our object instead of instantiating it directly in the middle of our code. This kind of action is similar to how someone writing Scala might handle an object.

In fact this very kind of behavior is precisely the reason I really, REALLY want to love Scala. I don't but I want to.

Vector also has both valueOf and toString methods which override the base object definition behaviors. This is really important since we don't want some giant object output blob if we stringify our vector. Really, we want something akin to the mathematical representation, so if we can get this kind of behavior: <i>Vector.build(1, 2, 3).toString(); // &lt;1,2,3&gt;</i>

In much the same way we want a sane output when we call toString, valueOf should also give us something useful. Instead of returning the whole vector object, which is not easy to interact with in code, it would be preferable if valueOf actually gave us a meaningful data structure like an array.  ValueOf will be especially important as we get into interacting with our vector.

Finally, we want our vector to be something we can interact with directly if necessary. Hiding the data away into a list somewhere is far less useful than putting it somewhere predictable.  By using numeric indices on our object, if we reference <i>Vector.build(4, 5, 6)[1];</i> we get 5, which is what we were hoping for. Our Vector object is looking less and less like a classical object and more like a real type with strong intention driving the API.

<h3>Writing Functions for Vectors</h3>

Vectors are a mathematical construct which means we have real actions we might want to do with them. In a classical approach to development, we would start adding methods to our Vector and extending the API through dumping a bunch of functionality on our final output data type.

The real world doesn't work like that. A vector is simply a set of ordered values describing a mathematical idea. Vectors don't actually do anything and they definitely don't add or magnitude. At most it makes sense to ask a vector its length and a point at an index. Anything else is really an action we do TO a vector.

A common action to take with a vector is to figure out its size, better known as its magnitude. This is a pretty simple process and is directly related to the Pythagorean theorem we learned in grade school: a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup> or (a<sup>2</sup> + b<sup>2</sup>)<sup>1/2</sup> = c.

Let's take an implementation of a generic magnitude function for a vector.

```javascript
    function addSquare(sum, value) {
        return sum + Math.pow(value, 2);
    }

    // (Vector) -> number
    function magnitude(vector) {
        var sumOfSquares = vector.valueOf().reduce(addSquare, 0);

        return Math.pow(sumOfSquares, 0.5);
    }

    // Magnitude example
    var vector = Vector.build(3, 4);
    magnitude(vector); // 5
```

I'd like to point out the annotation above the magnitude function.  What this says is magnitude is a function which takes a vector and returns a number. The reason this annotation is so important is it describes an action we can take on a Vector type which will return a usable value. Our function is not interested in the object-orientedness of Vector, it assumes Vector is a type just like any other and acts upon it accordingly.

The other particularly important item is where we refer to <i>vector.valueOf()</i>.  Vectors don't get nice functions like reduce, since they aren't inherited from the Object prototype.  Instead, valueOf gives us a Javascript core data type we can interact with. This means we can limit the amount of custom code we must write in order to actually accomplish work with our vector.

<h3>Expanding Our Vector Functions</h3>

A better example, even, than magnitude when working with vectors is the concept of adding vectors together.  In a purely object-oriented world, adding vectors involves either creating an object which has no real relation to vectors aside from the purpose of housing functions which act on vectors, or adding an add method to our vector creating a syntax that looks like this: <i>vector1.add(vector2)</i>.

At best this kind of syntax is kind of odd looking since it doesn't read quite right, where we would probably say something like "add vector1 and vector2," this says "vector1 add, vector2" which is kind of awkward to write let alone say.  What's worse is there is an implied order of operations here. Vector addition, much like regular addition, is commutative. This means whether we do vector1 + vector2 or vector2 + vector1, we get the same result.  It's a good thing too. Could you imagine if changing the order you added two things together actually changed the outcome? Bad news.

Let's take a look at a functional implementation to add two vectors.  In this case we will, again, make use of the valueOf method and we will also take advantage of the fact that our vectors are indexed appropriately, so we can capture values without needing to perform valueOf just to get an array.  Let's have a look at the code.

```javascript
    function addParallelValue (vector, value, index){
        return vector[index] + value;
    }

    // (Vector, Vector) -> Vector
    function addVectors(vector1, vector2) {
        if (vector1.length !== vector2.length) {
            throw new Error('Cannot add two vectors of different lengths.');
        }
        
        var newPoints = vector1.valueOf().map(addParallelValue.bind(null, vector2));

        return Vector.build.apply(null, newPoints);
    }

    // Addition example
    var vector1 = Vector.build(1, 2, 3);
    var vector2 = Vector.build(4, 5, 6);
    addVectors(vector1, vector2).toString(); // <5,7,9>
```

Our annotation this time states addVectors is a function which takes two vectors and returns a vector. Add vectors is actually a far more complex operation than taking the magnitude since we have to interact with two different vectors simultaneously, adding the values.  Once we have the new values for our resulting vector, we must create a vector to return.

With the kind of variadic behavior our Vector constructor follows, performing this operation in a purely object oriented manner would be rather challenging, though not impossible. By building our Vector object with a factory, we get the added benefit of using the built-in apply function which all functions inherit.  This makes creation of a new vector a trivial affair.  In the end, we actually manage to accomplish the core computation in the same number of lines as our simpler magnitude computation.

<h3>Summary</h3>

Javascript's blended object oriented/functional paradigm provides a lot of power when we redraw computation and type lines. Instead of bundling all functionality into objects and trying to force-fit a single solution, we get the greatest power object-orientation gives us, flexible type definitions, with the power functional programming provides, declarative, powerful computation syntax.

As you develop applications with Javascript take a look at what you are trying to accomplish and consider whether your current work is data- or computation-centric.  Let this differentiating characteristic guide your hand and develop your apps to be powerful, clean and well defined.
{% endraw %}
    