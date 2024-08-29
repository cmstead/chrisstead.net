---
layout: post
title:  "Mainstay Monday: Managing Type Coercion"
date:   2015-07-13 10:00:11 -0700
categories: Coding, Foundation, Javascript, Mainstay Monday
---
{% raw %}
If you are new to programming and, especially, to a dynamically typed language like Javascript you are likely not familiar with <a href="https://en.wikipedia.org/wiki/Type_conversion" target="_blank">type coercion</a>.  The best way to think about type coercion is, when dealing with two values of different types, the two variables will be normalized to a single variable type for the sake of comparison or other common interaction. The important thing to understand with type coercion is the <a href="https://en.wikipedia.org/wiki/Interpreter_(computing)" target="_blank">language interpreter</a> or <a href="https://en.wikipedia.org/wiki/Just-in-time_compilation" target="_blank">just in time compiler (JIT)</a> will guess what the type is that you meant to work with and do the "right thing" with it.

Let's take a look at what type coercion looks like in Javascript.

```javascript
//Equality
5 == '5'; //true -- presumably '5' is converted to a number
'5' == 5; //also true -- presumably 5 is converted to a string
true == '5'; //true -- 1 is converted to boolean true
true == 10; //true -- 10 -> boolean

true == 'foo'; //false -- string doesn't coerce
false == 'foo'; //false -- as you can see, 'foo' isn't true or false

//Concatenation (or not)
console.log("The answer is " + 55); //55 is converted to a string and concatenated
1 + '2'; //12 -- 1 is converted to a string
5 - '1'; //4 -- '1' is converted to a number

//Inequality
1 < '2'; //true -- '2' is converted to a number
'3' > 2; //true -- '3' is converted to a number
1 < 'foo'; //false
1 > 'foo'; //false

//Arithmetic
5 + 2; //7 -- although under the covers this is actually 7.0
10 + 8.123; //18.123 -- 10 is immediately converted to a floating point number
0x0F + 3; //18 -- Hexidecimal number is converted directly to number type

//Other oddities
1 == true && -1 == true; //true, and
null == false; //true
'abc'.indexOf('e'); //-1, NOT null, so
'abc'.indexOf('e') == true; //true, but we wanted
'abc'.indexOf('e') >= 0;
```

As you can see, there isn't a particularly hard and fast rule that one type is always converted to another. More importantly, you can see that the most common cases are strings to and from numbers and vice versa. Numbers coerce to booleans, but strings don't. For concatenation numbers coerce to strings. For equality it's unclear which direction the coercion goes and for inequality, strings are coerced to numbers as long as they convert cleanly.

Type coercion is intended to be a convenience feature in Javascript so new programmers don't need to understand value types deeply enough to perform <a href="https://en.wikipedia.org/wiki/Typecasting" target="_blank">typecasting</a>. Unfortunately the confusion that comes with type coercion mitigates any benefit even the beginner programmer would gain from it, since it is relatively unpredictable.

<h3>Managing Expectations</h3>

Since type coercion is unpredictable, we should manage values ourselves and try to be as explicit as possible so we always get results back that we expect. We don't want addition to concatenate our members if one is accidentally a string. We don't want to coerce boolean values to numbers or the other way around since the only number that evaluates to false is 0 and there are many times we get values which mean something failed, but the coercion would make them true.

We, basically, don't want the language to guess what we mean because it is likely to guess wrong. Let's have a look at some of the things we can do to help improve the reliability of our applications and manage the type coercion that happens with our values throughout our source code.

First, let's take a look at triple-equals (===). Performing a value conversion at comparison time has two pitfalls. The lesser of the two is, it's slow. It's not slow in the way that an O(n^4) algorithm is slow, but it is slower than comparing values directly without conversion.  Let's take a look:

```javascript
1 == '1'; //true -- We saw this above.
true == 'true'; //false -- a string cannot convert directly to a boolean
-1 == true; //false
1 == true; //true -- true and 1 cross-convert to be equivalent

//Let's normalize.
1 === '1'; //false -- a number is never equal to a string
true === 'true'; //false -- a boolean is never equal to a string
-1 === true; //false -- a boolean is never equal to a number
1 === true; //false -- same as above
```

We can see how eliminating coercion from our comparison operations, we get a normalized, type-safe experience while programming. This provides guarantees we otherwise could never get. If the code is changed, potentially in an unstable way, issues will start to emerge that will give us more immediate insight into what is happening.

Let's have a look at another method for handling type differences: typecasting. Typecasting is something that is very common in strongly typed languages, but is often overlooked in dynamically typed languages like Javascript because it is not immediately obvious why it could be valuable.  Let's compare some of the common ways people manage type differences and how typecasting can help normalize your code and eliminate hacks to get around a common problem.

```javascript
//Numbers
1*'4' + 1; //5 -- This feels like a hack
+'4' + 1; //5 -- This looks like a mistake

//Typecasting to numbers instead
Number('4') + 1; //5

//Booleans
!'foo'; //false -- strange feeling, but it works
!!'foo'; //true -- Gross. It's hacky and I'm just as guilty as anyone of doing this
!!''; //false -- What does not-not empty string even really mean?

//Typecasting to booleans instead
Boolean('foo'); //true
!Boolean('foo'); //false
Boolean(''); //false

//Strings; Yes, I have seen this example in the wild
'' + 1234; //'1234' -- This relies on that weird coercion we were talking about

//Typecasting to strings instead
String(1234); //'1234'
```

Typecasting might take a few more keystrokes than one of the hack methods, but it does two things for us that other methods don't provide. First, typecasting is declarative of intent. By using Boolean or Number, you know precisely what you should be expecting. You will also, get a highly normalized, safe value back. The second thing typecasting offers is a 100% guaranteed type safe expression every time. This means that every comparison, computation, concatenation, etc, will produce a predictable result. Predictability is stability.

Before we finish up, let's take a look at a couple of other built-in functions that are useful for handling common conversion cases. These functions are specifically for managing number and string outputs.  These three functions are parseFloat, parseInt and toString.

ParseFloat takes a single value parameter. ParseInt takes two mandatory values, the value to parse and a radix. A radix is the base the original number is in, which is important for handling things like binary, octal and hexadecimal strings.  ToString is a function that exists on the prototype for just about every object in the Javascript ecosystem.  Let's take a look at what 

``` javascript
parseFloat('123.45'); //123.45
parseFloat('0xFF'); //0 -- x and F are not valid numbers in decimal floating point
parseFloat('0107'); //107 -- Octal string is resolved as a decimal

parseInt('1234', 10); //1234 -- base 10 numbering; the most common output
parseInt('0xFF', 16); //255 -- Hexadecimal string
parseInt('0107', 8); //71 -- Octal string
parseInt('101', 2); //5 -- Binary string

['a', 'b', 'c'].toString(); //'a, b, c'
1234.toString(); //'1234'
```

What is happening in Javascript is this, there are language features, i.e. type coercion, that were introduced to make it friendly for people who might not be strong programmers, or may not be programmers at all. Now that Javascript has taken hold as the language of choice for many different applications and we begin solving real problems with focus on real programming, this kind of low-entry-barrier kind of behavior is not preferable.

Like many other high-level, application type programming languages, Javascript has means to handle types with grace and stability.  The concept of a type-safe comparison, i.e. triple-equals (===), gives us type guarantees for a variety of conditional cases. Typecasting allows us to explicitly declare the manner in which we intend to use a value, affording us stability when operating with unexpected type variances. Finally, build-in conversion functions and methods allow us to convert a value, store it and use it in a predictable way. This conversion gives us guarantees around the type of a variable as we develop.

The important take-away here is using type coercion is, at best, an unstable way to write programs which could introduce bugs that are difficult to identify and, at worst, a hack that makes code obscure and difficult to maintain. Instead of using type coercion, prefer stable, predictable methods for guaranteeing type and maintain type safety in your programs.

<h3>Blog Post Notes</h3>

<ul>
<li><a href="https://en.wikipedia.org/wiki/Type_conversion" target="_blank">Type Conversion</a></li>
<li><a href="https://en.wikipedia.org/wiki/Interpreter_(computing)" target="_blank">Language Interpreter</a></li>
<li><a href="https://en.wikipedia.org/wiki/Just-in-time_compilation" target="_blank">Just In Time Compilation</a></li>
<li><a href="https://en.wikipedia.org/wiki/Typecasting" target="_blank">Typecasting</a></li>
</ul>
{% endraw %}
    