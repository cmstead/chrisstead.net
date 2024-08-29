---
layout: post
title:  "Everyday Functional Programming in Javascript"
date:   2015-05-27 15:54:38 -0700
categories:
    - Coding
    - Functional Programming
    - Javascript
    - Site Architecture
---
{% raw %}
I gave a talk at the beginning of the year about <a href="http://www.chrisstead.net/presentations/functionaljs/#/1" target="_blank">functional programming</a>. Someone asked "can you do functional programming little by little or do you have to do it all, all the time?"

When I answered, I felt I didn't give them the answer they deserved or that I could have given.  This is my answer. Yes, you can do a little or a lot. You can write functional code little by little and solve things without changing your life and your career.  You can write programs that aren't academic or theoretical. You can write everyday functional code.

So what does everyday functional programming look like?  Unless you work somewhere that you write in Lisp, Clojure, ML, F#, Haskell, etc, then it doesn't look anything like the high-brow academic tutorials you see most often.  You don't talk in monads and exclusively pure functions.  It's not an ivory tower. At best you are a warrior acolyte of the functional cloth.

<strong>State is a thing.</strong>

So, when you are working in functional languages, state is a difficult knot to untie. Since values are immutable and shared state is the work of something unholy and evil, handling things like state machines becomes a chore. Who wants to go to work and think "today is the day I have to tackle the beast. I hate today?"

Not. Me. Thanks.

Sometimes you really need state. You actually need to know what happened and what is coming.  Sometimes you want something that you can mutate and something that is transitory, but still in memory. Hi to all of you Haskellians, yes I know there are other ways of doing that kind of monkey business, but I just don't wanna. It looks a little too much like work and a little too little like fun.

<strong>First class functions are for everyone.</strong>

Now that I got the state stuff out of the way that OO does just so well, let's talk about what functional workflow looks like in my happy little world. Arguably the thing I feel differentiates functional programming from programming that isn't is the beautiful higher order function.

I mean, it's magic right? Higher order functions, I mean look at this:
```javascript    
    function add(a, b){ return a + b; }

    function addTheseNumbers(numberArray){
         return numberArray.reduce(add, 0);
    }

```
That's what I am talking about. Functions that take functions as arguments. It's all kinds of awesome, right?

Okay, in all seriousness, the real awesome comes when you start blending pure functions in with your stateful code and moving all of that stateless logic into something that makes more sense for what you are trying to accomplish. Let's have a look at one of my all time favorite constructs. It's what makes my world go 'round: either.

Watch this.
```javascript    
    //What life was like before
    function doStuff(someData){
        var someProperty;

        if(!!someData){
            if(!!someData.someSubData){
                someProperty = someData.someSubData.someProperty;
            }
        } else {
            someProperty = 'default value';
        }
        //What the crap is this???
    }

    //What life is like now
    function doStuff(someData){
        var defaultData = {
                someSubData:{ someProperty: 'defaultValue }
            },
            someProperty = either(defaultData, someData).someProperty;
        //Hooray! Now we can set a default
    }

```
All of this because, honestly, who needs all the conditionals? Do you care about the conditional logic or do you just care about the data? Personally, I think conditional logic is the devil. I mean, honestly, the worst bugs and the most  difficult mess comes from all of these horrible, horrible conditionals. Let's cut to the chase and just make it right.

Here's something even more amazing, ready for this? ARE YOU READY? Yeah, you're ready.
```javascript    //I mean, it MIGHT be an array or it might just be null. Who knows, right?
    function doFunctionalStuff(myArrayMaybe){
        return either([], myArrayMaybe).filter(somePredicate)
                                       .map(transformStuff)
                                       .reduce(reducerFunction);
    }

```
I mean, DUDE, you can skip all of the worrying. If something null happens, you just pretend it never existed and everything turns out just fine. With just one new function, all of a sudden you get  all of the functional goodness that Javascript has to offer.

What does either look like?
```javascript    function either(defaultValue, maybeValue){
        return !!maybeValue ? maybeValue : defaultValue;
    }

```
That's it. It's the gift that keeps on giving.

At the end of the day, what I am really getting at is this: everyday functional programming is all about cutting to the core of what you want to do and eliminating the conditions, unnecessary shared state and error prone code so you can keep your sanity. It's not about all pure functions all the time. It's not always about monads and currying. It's about the little things that make a big difference so you can do your best work.
{% endraw %}
    