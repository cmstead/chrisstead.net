---
layout: post
title:  "Pattern Matching in Javascript"
date:   2016-03-16 09:00:04 -0700
categories:
    - Applied Math
    - Coding
    - Data Structures
    - Functional Programming
    - General Blogging
    - Javascript
---
{% raw %}
For more than a year I have been considering the idea of pattern matching in Javascript. I know I am not the only one trying to solve this problem because there are a handful of resources where people have put together propositions for solutions, including a <a href="https://github.com/natefaubion/sparkler" target="_blank">Sweet.js macro called Sparkler</a>, and Bram Stein's <a href="https://www.bramstein.com/writing/pattern-matching.html" target="_blank">blog post</a> and <a href="https://github.com/bramstein/funcy" target="_blank">associated Github repo</a>.

Although I really, really like the idea of a macro to handle pattern matching, I fear people will throw it out immediately since pattern matching by itself is already an, sadly, obscure topic. This means anything that requires a macro package will probably turn the general populace off, especially since I haven't met anyone in my area who has heard of Sweet.js except me.

Although I like Bram's approach to handling macros with a function library, it looks like he didn't get a chance to make much headway.  That's really unfortunate since I think he was headed in a good, although kind of simple direction.

Before we go any further, it is important to discuss the idea of pattern matching for the uninitiated.  Pattern matching is a functional means to quickly look at the shape and signature of data and make a programmatic decision based on what is there.  In other words, pattern matching is like conditionals which have spent the last 10 years at the gym.

Imagine, if you will, conditional statements which looked like this:

```javascript
match(vector) {
    case [1, 2, 3]:
        return 'Low number sequence';
    case [_, _, 0]:
        return '2D vector in 3d plane';
    default:
        return 'I have no idea what you gave me';
}
```

Even this isn't really powerful enough to truly capture what pattern matching does, but I think it gives a little insight.  Nonetheless, if we had a construct which would give us the ability to match on an entire set of conditions within our data structures, the face of Javascript programming would be a very different place.

Pattern matching is not just about reducing keystrokes, but it actually redefines what it means to actually describe and interact with your data altogether. It would do for data structures what regular expressions have done for string manipulation.

Pattern matching is the dream.

So, after doing a lot of thinking, I think I have settled on a means to give this dream the breath of life.  Unfortunately, I believe it is unlikely that the path to data Nirvana will be easy.  I have a suspicion, this is the same issue Bram encountered. Looking at the ~1400 lines of code that make up the Sparkler macro, pattern matching could be a tricky problem.

<h3>Function and Contract</h3>

I looked at the Sweet.js macro, Bram Stein's early exploration and the match behavior in both Scala and Racket.  I decided I needed something which felt like fluent Javascript instead of succumbing to the Racket nut which lives inside me, so I opted to avoid the hardcore Lisp syntax.  Scala had a closer feel to what I wanted so I kept that in mind.  Bram's example felt close, but a little too muddy and the Sweet.js macro just felt a little too much like operators instead of functions.  What I landed on was this, () => () => any; that is to say a function ($match) which returns a function (pattern assembly) which returns the final result of the pattern matching. Here's an example of a simple exploration, drawing against Bram's factorial implementation.

```javascript
    function factorial(n) {
        return $match(n)(function (pattern) {
            return [
                [0, 1],
                [pattern.else(), () => n * factorial(n - 1)]
            ];
        });
    }
```

It's easy to see the first call is just $match(n).  This returns another function which takes a function as an argument; i.e. $match is a higher-order function which returns a higher order function, which takes a function as an argument, which then does stuff and returns a result. Another way of looking at this is $match is a function which chains to a function which is designed to perform pattern assembly.  Once the pattern is assembled, everything is executed and we get a result.

Clear as mud?

<h3>Expanding the Concept</h3>

This small example seems pretty simple.  Check for equality and if nothing works, then use the else clause. This is a little condition-block feeling, but I think people will understand the else clause better than anything else I might have put in there.

Anyway, digging in a little further, I wanted to also be able to quickly and easily match arrays, objects or other things as well. This simple equality checking was not enough, so I started expanding, moving into some sort of factory behavior to create matchers on the fly.  This brought me to an example which was a little more interesting and a lot more complex.

```javascript
    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [[pattern.number(), 0], 'x'],
            [[0, pattern.number()], 'y'],
            [[pattern.number(), pattern.number()], 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }
```

Here I am returning a string based on the pattern of a pair (2-valued array) array being treated like a vector.  If the first three patterns match, we get a string describing the axes the vector lives on.  If the vector is not a pair, or it contains something other than numbers, I want to return a type error with a message explaining the provided vector was invalid.

This bit of logic is significantly more complex than our previous factorial example and leaves us in a place where the code is descriptive, but perhaps not as readable as we would like.  Moreover, I thought about what I really want to be able to say and it made more sense to, perhaps, create something of a pattern matching DSL. (domain specific language)

<h3>Matching on a DSL</h3>

If I was going to invent any kind of simple language for expressing matching behaviors, I wanted it to be less cryptic than regular expressions, but I also wanted it to be terse enough that it didn't become some giant, sprawling string someone would have to mentally parse to really understand what was happening.  What I landed on was a simple near-Javascript expression of what the values should look like when they properly match our criteria.  This turns our earlier expression into the following.

```javascript
    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [pattern('[<n>, 0]'), 'x'],
            [pattern('[0, <n>]'), 'y'],
            [pattern('[<n>, <n>]'), 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }
```

I reduced the type descriptor for brevity, opting for an angle-bracketed character.  Now we can wrap up our expression in a single pattern call and get something the matcher can quickly and easily execute to verify whether the vector matches our requirements or not.  This, however, also means I am responsible for generating an AST (abstract syntax tree) for these expressions. Of course, if I am going to do that, it would be best to create one by hand so I can see what I am actually contending with.

<h3>Matcher Abstract Syntax Tree</h3>

The AST for my matcher language would, ultimately, link in with an underlying state machine of some sort, but I won't dig that deep right now. Nonetheless, what I ended up with, when constructing an AST is long, but relatively declarative. This means, I could, theoretically, start the entire process NOT at the language level, but instead at a place which people would more readily understand. Let's have a look at the AST replacement for our matching behavior.

```javascript
    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [pattern.array([
                pattern.number(),
                pattern.number(0)
            ]), 'x'],
            [pattern.array([
                pattern.number(0),
                pattern.number()
            ]), 'y'],
            [pattern.array([
                pattern.number(),
                pattern.number()
            ]), 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }
```

It's long, and probably overkill for the problem presented here, but it gives us a real view into the guts of the problem and a way out of the mud.  This is, also, unfortunately all I could pull together in time for this post, but I feel like we covered a tremendous amount of ground.  I will continue to experiment with pattern matching and, perhaps, by next time we could even have a working object model to build our tree with. Until the next post, keep coding!
{% endraw %}
    