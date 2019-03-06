---
layout: post
title:  "Browser-side Isomorphic Javascript"
date:   2015-06-03 10:00:18 -0700
categories: Design Patterns, Javascript, Site Architecture
---
{% raw %}
With the advent of Node, there has been discussion of isomorphic Javascript.  The general idea behind this is code written for server-side purposes can also be used for UI purposes. The problem with this notion is, it doesn't account for browser UI/middleware considerations in the browser.

As client-side development progresses and software as a service (SaaS) and single-page applications (SPAs) become more common, UI developers continue to program based on user interactions with the view layer and the underlying logic gets woven into the UI code, littering data logic with DOM related code, which tightly couples the UI code to the data code, creating complicated, unmanageable software.

What ends up happening is code gets duplicated to serve the same purpose, and then the code gets out of sync. Bugs creep in and pretty soon the software starts getting cracks in the facade. Even frameworks that are intended to avoid this kind of behavior, like Angular, are built in a way that allows for divergent code.  Let's have a look at a snipped of code that could diverge quite quickly, in Angular.

```html

<!-- This is in the view somewhere -->
<input type="text" id="weird-id" ng-required="true" ng-pattern="^abc\d{3,5}$" />

```

```javascript

//This is data validation somewhere before submission
function validateId(value){
    return value.match(/^abc\d{3,5}$/) !== null;
}

```

Obviously there was some cutting and pasting that went on here.

What happens when the requirements are changed? Will this developer remember that the regex needs to be changed in two locations? Will this developer even still be working for the same company?

Even if this is remembered once, it is almost guaranteed to be forgotten about.  This is especially heinous because there are clearly two different concerns being served here.  One place the UI is handling input validation so the user can get immediate feedback, the other is likely to be related to handling validation before data is sent to a service somewhere.

It is not obvious even from this simple example that <acronym title="Don't Repeat Yourself">DRY</acronym> could be applied here. Of course it can, but the solution is not completely obvious.  Since this is not a post about Angular validation, I will leave the Angular-specific details as an exercise for the reader.  Instead, let's take a look at a more general solution.

Obviously the script handling the validation is pretty general so we're probably safe to start there. Let's keep it. That means all we really need is validation for the UI. Let's have a look at something that would give us the behavior we want:

```javascript
function attachIdValidator(element){
    element.addEventListener('change', function(event){
        var inputValue = element.value,
            validValue = validateId(inputValue),
            elementHasError = element.classList.contains('error');

        if(!validValue && !elementHasError) {
            element.classList.add('error');
        } else if(validValue) {
            element.classList.remove('error');
        }
    });
}
```

Now our element has the same validation attached that our outgoing data will use to ensure everything is on the up and up. Honestly, though, this is a fine first pass, but you and I both know this isn't the only validator you are going to use to handle your user inputs. Why don't we do a little more cleanup and write something we can really get some mileage out of.

```javascript
function setErrorState(element, validInput){
    if(!validInput && element.classList.contains('error'){
        element.classList.add('error');
    } else if(validInput){
        element.classList.remove('error');
    }
}

function attachValidator(element, validator){
    element.addEventListener('change', function(event){
        var inputValue = element.value,
            validValue = validator(inputValue);

        setErrorState(element, validValue);
    });
}

//Applying our new logic would look like this:
attachValidator(document.getElementById('weird-id'), validateId);

```

Now, that's what I call DRY code. Now we have taken one piece of logic, isolated it and applied it in the places we need it. Sure it took a little extra code to get us there, but you can see the difference it makes.  Now if someone comes along later and says "gosh, it would be great if the ID values could start with efg instead of abc," anyone who is currently working with the code can go and update the validation logic and it will update the requirements everywhere.

What's even better is, now we have a UI validator that we can apply any kind of validation logic and not need to continue writing and rewriting UI logic to handle all of that mess. Extra special bonus is this entire thing is written in vanilla Javascript, so it's extra small, tight and as fast as we could make it.

When you do this in your code, go ahead and pat yourself on the back. You deserve it.

In the end, what people are really talking about when they say isomorphism, what they really mean is "don't repeat yourself." When that's the goal, then isomorphism doesn't have to be limited to client/server applications. Take the lesson and run with it. Make your code better and your users (and your boss) happier. Let's use isomorphic code to make the world a better place.
{% endraw %}
    