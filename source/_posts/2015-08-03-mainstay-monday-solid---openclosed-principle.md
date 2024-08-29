---
layout: post
title:  "Mainstay Monday: SOLID - Open/Closed Principle"
date:   2015-08-03 09:00:45 -0700
categories: Coding, Design Patterns, Foundation, Javascript, Mainstay Monday, SOLID
---
{% raw %}
This post is part of a series on the <a href="http://www.chrisstead.net/archives/category/design-patterns/solid/" target="_blank">SOLID programming principles</a>.

Last week we discussed the concept of <a href="http://www.chrisstead.net/archives/795/mainstay-monday-solid-single-responsibility/" target="_blank">single responsibility</a> in programming. Continuing the process of discussing SOLID principles, let's take a look at the Open/Closed Principle. The name of the principle isn't quite enough to declare what it intends -- open to extension, closed to modification -- so we'll need to figure out how this applies to our daily life.

What does it really mean to be open to extension or closed to modification? Clearly, we can't strictly enforce that someone can't come along and change our code, so there has to be a certain amount of self control that comes along with this principle. Something else that might help us along the way is the discussion we had about <a href="http://www.chrisstead.net/archives/790/contracts-for-better-code/" target="_blank">contracts</a> a little while ago.

Uncle Bob Martin states, in his <a href="http://www.objectmentor.com/resources/articles/ocp.pdf" target="_blank">article on the open closed principle</a>, that when requirements change, it is incorrect to modify working code to manage new, or updated requirements, but rather, the existing code should be extended to support the updates. There is an assumption here that the code satisfies a single responsibility to the original requirement. When new requirements arise, an extension to the original functionality should be created instead of modifying the original code. Let's take a look at a functional approach to this.

```javascript
// Original requirement: Validation, must be a string

// Important note: contract states value can be type any, return type is boolean
function isString(value){
    return typeof value === 'string';
}

// New requirement: Validation, must be a short string -- 10 chars or less

// We adhere to the contract here, value {any}, return {boolean}
function isShortString(value){
    // We are extending the original function with a new criterion 
    // by calling the original function and then adding a new
    // predicate upon return
    return isString(value) && value.length <= 10;
}
```

In this example, isShortString is clearly an extension of the requirements that were defined in the original isString function. Both functions accept any kind of value and return a boolean, so they adhere to the contract, and isShortString is intentionally built off the assumption that isString will always perform the necessary check for for the basic string type before any further checks happen. This means that isShortString will, effectively, act as isString for any strings that are naturally shorter than the constraint.

Since SOLID was originally developed as a tool for people working in Object Oriented Programming (OOP) we can't overlook the original intent. If we want to apply this principle in an OO context, we need something to work with as a foundation.  Let's pick something easy that everyone can relate to from their grade-school years.  Let's have a look at a basic rectangle object, which defines the shape and has a function for getting the area and the perimeter.

```javascript
class Rectangle{
    constructor(height, width){
        this.height = height;
        this.width = width;
    }
    
    getArea(){
        return this.height * this.width;
    }
    
    getPerimeter(){
        return this.height * 2 + this.width * 2;
    }
}
```

For as unexciting as this is, rectangles have a special form we all know and love: squares.  Suppose we created a rectangle class and we're using it throughout our code.  One day the product owner says we need certain sections of the code to only support squares.  We could, theoretically, modify this code to handle rectangles and their regular form, squares, but that violates the single responsibility and open/closed principles.  This is a perfect opportunity to subclass and extend our original object.

```javascript
class Square extends Rectangle{
    constructor(height, width){
        this.checkSize(height, width);
        super(height, width);
    }
    
    checkSize(height, width){
        if(height !== width){
            throw new Error('Height and width must be equal.');
        }
    }
}
```

What makes our square class interesting is, the only addition to the original class we made is a check to make sure the height and width are equal. Rectangle does everything we need without modification, aside from add an assurance that business requirements are met. Another item of note is, we ensured the original contract was enforced so anything using the Rectangle class would be able to use the Square class without modification.

When we take time to carefully extend existing functionality there is a little bit of magic that happens - we end up writing less code! If we had created a rectangle and then created a square, independent of the rectangle definition, we would have created duplicate code.  If, for some reason, we needed to add something to Rectangle, we would have to go track down Square and add it there too. I don't know about you, but I hate doing double duty.

<strong>Being a good programmer is a combination of being diligent and lazy</strong>

By front-loading the effort of good, well-written code, you get the benefit of doing less work later when things change. I will trade ease of upkeep for a little work now any day. I have seen code bases that weren't crafted carefully and, as a result, required a tremendous amount of work to make even minor changes. In the foolishness of my youth, I might have even created code like that.

Coming back around to something Uncle Bob wrote in his article, expecting that all code will be closed to modification is generally unreasonable.  Sometimes things change in a way that the original code no longer works as desired at all. Due to the nature of changing business requirements, it's important to keep in mind that closure should be applied carefully and appropriately.

Since this is about Javascript, it's easy to point to view-related code.  Views can change on a whim and whole swaths of code may be rendered obsolete. This kind of sweeping change makes it important to clearly separate and define your business rules from the way information is presented to the user. Business rules seldom change. If someone wanted to write an accounting app, the view layer could change to enable easier entry. Common accounting principles like GAP are safe, and wise, to consider set in stone.

The Open/Closed Principle is designed as a tool to support good programming practice. By following the ideas presented, it becomes much easier to write an application that supports business rules and allows developers to safely and correctly enhance behavior as the business continues to grow and change over time. Consider your code as you write and ask yourself if you can define you work in extensible pieces which can support good development in the future without over-developing now.

<h4>Blog Post Notes<h4>

<ul>
<li><a href="http://www.chrisstead.net/archives/795/mainstay-monday-solid-single-responsibility/" target="_blank">Single Responsibility Principle</a></li>
<li><a href="http://www.chrisstead.net/archives/790/contracts-for-better-code/" target="_blank">Contracts</a></li>
<li>Robert C. "Uncle Bob" Martin - <a href="http://www.objectmentor.com/resources/articles/ocp.pdf" target="_blank">Open/Closed Principle</a></li>
</ul>
{% endraw %}
    