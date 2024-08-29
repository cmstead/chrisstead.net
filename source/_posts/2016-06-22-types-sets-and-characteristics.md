---
layout: post
title:  "Types, Sets and Characteristics"
date:   2016-06-22 09:00:46 -0700
categories:
    - Coding
    - Functional Programming
    - Javascript
    - Types
---
{% raw %}
A couple weeks ago, we looked at using Signet and some of the core types <a href="http://www.chrisstead.net/archives/1160/enforcing-endpoints-types-and-signet/" target="_blank">to add type information to function calls</a>. Although it is handy to have a variety of base types available to provide signatures for your functions, sometimes you want more control and finer-grained behavior.

At the most foundational level, applied types can be viewed as sets of values. This means, for any type, we can easily construct a set which will describe that type.  For instance, the type 'string' can be written as the set of all values which are strings.  Although this may seem like a trivial way to perform a conversion of a type to a set, it gives us a way to start rethinking the way we interact with type information.

<h3>Sets as Types</h3>

We can, somewhat informally, say that sets are types.  Although this doesn't capture the nuance of types, it allows us to capture a lot of power in a simple idea.  We looked at defining the string type as a set of values.  What this really means is, strings are a certain set of values within all values assignable.

If we begin our sets by considering all values assignable and available in within Javascript, we can refer to that set as our "universe."  Within that universe, we could choose a variety of different sets, but regardless of which set we choose, the new set will be contained completely within the original universe.

Using this universal definition, we can consider our strings again and consider how we might describe our set of all strings.  First of all, we can ask if a value is contained within our universe.  A good example of a value which is distinctly NOT in the Javascript universe is 1000! (1000 factorial). Although this is an integer which actually exists, Javascript will simply evaluate it as infinity. This is not something we will need to test for, it is simply the indication of an upper bound in Javascript.

We could, however, define a set of numbers we declare as our domain set.  We can call this an explicit set definition.  By turns, we can define a set by way of excluding items which are not in the set.  This inverse set can, equally, be declared explicitly, or we can define a function which will simply tell us whether something is in the set or not.  This implicit method of creating a set can be referred to as an induced set.

Let's take a look at a meaningful question we could ask. Let's ask if a value is a number.  This means we are going to call a function which accepts type of * and returns a boolean. This kind of function is called a characteristic function.

```javascript
function isNumber (value) {
    return typeof value === 'number';
}
```

Although this function, by itself, is not a big step away from what we already know, it lays the groundwork for defining a richer set of types we can interact with.  From the function isNumber, we get an induced set of all values which are numbers, rather than defining the type set explicitly.

<h3>Propositions and Predicates</h3>

It has been shown in the academic community that <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=2&cad=rja&uact=8&ved=0ahUKEwikjMjcq7LNAhVP7GMKHVTTADEQtwIIJjAB&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DIOiZatlZtGU&usg=AFQjCNG2bGRvqMzyXUgApuaNuMSwjiCMyQ&sig2=pZD9rwyiBUnL7Jh56z0zqg&bvm=bv.124817099,d.cGc" target="_blank">propositions are types</a>. What this means is we can actually consider propositions such as A and B in the expression A &or; B as types unto themselves.

Any proposition can either resolve to a theorem (&top;) or an antitheorem (&bottom;) which roughly equates to the idea of true or false.  In other words, we can ask a question and the answer will either be "yes" or "no."  Although this seems non-obvious, at its face, this is the foundation we will use to construct a richer set of types within Javascript.

We have already seen type construction where we use a predicate to manage inclusion in a type set. We are stating that a value &alpha; must be in the set of numbers if &alpha; is a number.  Even stronger than that, we can say, since our set contains ONLY values which are numbers that if &alpha; is in the set of numbers it has a type of number.  This relationship between sets and type implementations is important for capturing greater amounts of information about a value as we construct subsets from sets we have defined.  Let's have a look at the logical notation to see predicates in action, so we can tie that together with our predicate notation.

N<sub>js</sub> = the set of all values which are Javascript numbers
A: &alpha; is a Javascript number
B: &alpha; &in; N<sub>js</sub>;

A &rarr; B
B &rarr; A

Of course in our implementation we really only worry about the second relation, i.e. that if a value is in the set of values which conform to the number type, the value must also conform to the number type.  Given the definition of B, &alpha; &in; N<sub>js</sub>;, we can actually conclude that the first relation is true given the definition of N<sub>js</sub>.

We can actually reformulate this to express the type-set relation more generally.  If we simply replace our specific number set with a set of any type &Tau; we get a new, very useful formulation we can use to extend our type reach well beyond the specifics of the language.

&Tau;<sub>js</sub> = the set of all values expressible in Javascript of type &tau;
A: &alpha;<sub>&tau;</sub> is a Javascript value of type &tau;
B: &alpha;<sub>&tau;</sub> &in; &Tau;<sub>js</sub>

A &rarr; B
B &rarr; A

That's a lot of symbols, words and relations. What this really means is we can identify and define any arbitrary type logically and, in turn, define a set containing all values of that type, which will induce an "if and only if" (iff) relationship.  That's a lot of words and symbols. Let's take a look at how we might use this to implement our own type.

<h3>Defining a New Javascript Type</h3>

Clearly we won't be able to build our type into the core language without getting on TC39, issuing a new standard and waiting for several years while everyone adopts it, but we can induce our type through a new predicate function.  Let's suppose we want to define a new type, Integer. We could express our type in the following way:

Int<sub>js</sub> = the set of all values expressible in Javascript of type number which are integers
&alpha;<sub>int</sub> &in; Int<sub>js</sub>

With this, we can define a function expressing this relationship, which we can use to verify whether a value is in our set Int<sub>js</sub> or not.  With regard to the relation between types, expressible values in Javascript and our integer set, we can guarantee the stability of our type and the correctness of our verification.

```javascript
    function isInt (value) {
        return typeof value === number && Math.floor(value) === value;
    }

    isInt(5); // true
    isInt(9.3); // false
```

Although this function is sufficient for verifying whether a value is an integer, we are actually duplicating our efforts.  Moreover, it lacks a certain expressiveness which we might like to see.  Let's use our original isNumber function to say a little more about the meaning of our int type.

```javascript
    function isInt (value) {
        return isNumber(value) && Math.floor(value) === value;
    }
```

This new function performs the same check as the original, but it reflects a deeper relationship between our number set, N<sub>js</sub>, and our integer set, Int<sub>js</sub>.  In other words, what we can see expressed here is the typical inheritance property of the is-a relationship.

<h3>The Is-A Relationship of Types</h3>

As is true for objects in classical object oriented programming, types can also have an inheritance relationship where one type is a subtype of another.  This is what we mean by is-a relationship.  We can say an integer is a number, or a name is a string.  Although an integer can be a type in its own right, we know the number type is the foundation type in Javascript for any numeric representation.  This means, for any function which requires a number, an integer is an acceptable value.

Our isInt function demonstrates the is-a relationship by using the number set definition as the first requirement of our check for set inclusion.  Let's continue the chain and create a characteristic function to defining our natural number. Our natural number set will be a strict subset of our integer set.

```javascript
    function isNatural (value) {
        return isInt(value) && value >= 0;
    }
```

Now we can see that a natural number is an integer which is a number.  This, of course, is similar to OO subtyping with regard to relationship, but is compositional in nature.  In fact we can actually describe this type relationship as a relationship of sets, like so:

Natural<sub>js</sub> &sub; Int<sub>js</sub> &sub; Number<sub>js</sub>

With the repeated behavior of including a function call from the superset, we can start looking for a way to uniformly describe our sets and their relationships.  Let's create a new function, subtype, to help us create set relationships in order to streamline the process of defining type relationships.

```javascript
    function subtype(parentCharacteristic) {
        return function (childCharacteristic) {
            return function (value) {
                return parentCharacteristic(value) && childCharacteristic(value);
            };
        };
    }
```

Subtype allows us to define our types with functional composition and define our new characteristics with the assumption that we are already working from within a specific type.  Let's rewrite our isNatural check using subtype.

```javascript
    function isNaturalType (value) {
        return value >= 0;
    }
    
    var isNatural = subtype(isInt, isNaturalType);
```

Now the body of our characteristic function is expressed with an implicit relation to the superset of natural numbers, integers.  This kind of higher-order function use to express set relations is extremely powerful for defining and describing value types we can use in our development.

<h3>Wrapping Up</h3>

This was a somewhat dense tour of how we can construct types in Javascript, so don't worry if it takes a little while to pull the pieces together.  The important take-away is that we can construct our own types with meaningful names and clear relationships in order to better understand the way our programs work.

At the end of the day, we are human, so expecting us to actively deal in generalized abstractions such as strings and numbers may not be a reasonable request.  Instead, we can reclaim the reins and define our own type language which speaks to future developers in the language of our intent.  Go make types and make your programs better!
{% endraw %}
    