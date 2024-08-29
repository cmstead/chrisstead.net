---
layout: post
title:  "Refactoring with Boolean Algebra and De Morgan's Laws"
date:   2015-08-05 09:00:38 -0700
categories: Applied Math, Coding, Foundation, Functional Programming, Javascript
---
{% raw %}
Many junior and mid-level programmers working today have opted to skip a university education and, instead, have either gone through an Associate's program or a coding bootcamp.  Some programmers started their career out of college without a formal background in CS, getting degrees in physics, biology, chemistry or even liberal arts like journalism or design. Although these developers may be quite effective, there are many topics that are core to the standard Computer Science curriculum which developers without a formal CS education may not have been exposed to.

Today we start leveling the playing field. Dear reader, if you are programming, guess what, You're doing math! Are you surprised? Don't be. All of the logic that is key making programs work came out of mathematics.<sup>1</sup> We've all written some sort of condition statement at one point or another or we wouldn't be here, but could we do it better?

<strong>We can rebuild him. We have the technology.</strong>

Boolean algebra is the field of mathematics that provides us with the conditional logic we all know and use every day. In order to really understand, at a deeper level, what we are doing, it is important to really get a grasp on managing conditions using the rules uncovered by mathematicians who came before.  At the end of this post, we will look at De Morgan's laws and how they can be used to transform blocks of code with a couple of simple rules.

Before we dive into the bag of tricks, let's get a little bit of vocabulary and syntax out of the way.

Vocab:

<ul>
<li>Predicate expression - An expression that evaluates to either true or false</li>
<li>Tautology - An expression that always evaluates to true</li>
<li>Apenantology - An expression that always evaluates to false<sup>2</sup></li>
</ul>

Syntax:

<ul>
<li>&& - Logical and</li>
<li>|| - Logical or</li>
<li>! - Logical not</li>
<li><=> - Logical equivalence, technically means "can be replaced by"</li>
</ul>

Okay, now that we have that out of the way, let's talk predicates. The other day I was working through some older code which had been touched by several people. In this code was a conditional statement that looked roughly like this:

```javascript
if((Boolean(valueList) && (externalValue && (dataValueA || dataValueB))) || (Boolean(valueList) && !externalValue)){
    //Functionality went here.
}
```

This isn't the worst conditional I have ever seen, but it's pretty hard to read. It's not entirely clear what all of the condition states are, or why. Something I knew for sure, was there was a common factor here. Let's look all the way back to grade-school algebra at the distributive property.  We know this is true:

```default
5 * (3 + 7) <=> 15 + 35 <=> 50
```

The distributive property holds for Boolean algebra as well. Let's look at some boolean variables we'll call P, Q and R.<sup>3</sup> I won't present a formal proof for any of the claims I am going to make, mainly because that's not what this post is about, and they are already written and available on the web with a simple search on Google. Let's have a look at the distributive property for predicates.

```default
P && (Q || R) <=> (P && Q) || (P && Q)

// Similarly

P || (Q && R) <=> (P || Q) && (P || R);
```

Going back to our original problem, I could use the distributive law to pull one of the variables completely out of the predicate expression and simplify what I was looking at immediately.  Let's take a look at our new conditional.

```javascript
if(Boolean(valueList) && ((externalValue && (dataValueA || dataValueB))) || !externalValue){
    //Functionality went here.
}
```

That's already a lot easier to look at and we've barely even started. I see another value in the mix I really want to simplify, but somehow it just doesn't seem like it will be as easy as pulling out our valueList.  Let's do some distribution again and see where that leaves us.

```javascript
if(Boolean(valueList) && ((!externalValue || externalValue) && (!externalValue || (dataValueA || dataValueB)))){
    //Functionality went here.
}
```

Well, that's just about as ugly as it was when we started, except for one thing. We introduced the concept of a tautology in the vocab.  We actually have one right here.  Let's take a moment and look at a symbolic representation, first.

```default
P || !P <=> true // Always true. Try it out.
P && P <=> true // I feel like this speaks for itself.
```

This means we can do a little bit of trickery and get rid of some stuff.  Let's take a look at the tautology in our code.

```javascript
(!externalValue || externalValue) //AHA! Always true!

//So this means we can reduce like so

(true && (!externalValue || (dataValueA || dataValueB)))

//We don't need to leave the true in there.

(!externalValue || (dataValueA || dataValueB))
```

With this refactoring we are left with a much simpler expression to evaluate. Before presenting the reduced predicate expression, let's take a look at one other rule in Boolean Algebra, associativity.  When all operators are the same, you can freely associate any set of values.  Here's what it looks like:

```default
P && Q && R <=> (P && Q) && R <=> P && (Q && R)

//Also

P || Q || R <=> (P || Q) || R <=> P || (Q || R)
```

With all of that put together, we get a final reduced result which relies on just one instance of each variable.  This is, as far as I can see, about as far as the train goes.  Here's our final conditional statement:

```javascript
if(Boolean(valueList) && (!externalValue || dataValueA || dataValueB)){
    //Functionality went here.
}
```

This isn't where the story for Boolean Algebra ends.  I introduced a new word, created using some Greek roots, apenantology. This is as useful for evaluating conditional statements as our buddy, the tautology.  Apenantology is the state where something always evaluates to false.<sup>4</sup>  Let's have a look at a symbolic example.

```default
P && !P <=> false //Always false. Try plugging in values.
!P || !P <=> false //Always false, unsurprisingly
```

Here's where it gets interesting. Where a tautology can be removed from a predicate expression, an apenantology can either be eliminated, or it will actually define the entire expression.  Here's how it works:

```default
//Apenantology in an or condition
P && !P || (Q && R) //This can be simplified to
false || (Q && R) //Since this is an or expression, we can remove the false
Q && R //These are the only variables that matter.

//Apenantology in an and condition
P && !P && (Q && R) //Reducing
false && (Q && R) //Because the first value is false, the expression is false
false
```

Let's take our predicate expression from when we did our second distribution.  Let's replace the or with and and see what we get instead.

```default
//Here was our original expression:
((!externalValue || externalValue) && (!externalValue || (dataValueA || dataValueB)))

//I'm going to modify it a bit.
((!externalValue && externalValue) && (!externalValue && (dataValueA || dataValueB)))
(!externalValue && externalValue) //Apenantology

//Now let's simplify.
(false && (!externalValue && (dataValueA || dataValueB))) //Whoops! false && (P && Q)
false  //Anything inside the conditional block would never run. This is dead code.
```

What about De Morgan's laws?

De Morgan's laws are named for the mathematician Augustus De Morgan. He discovered two very useful little rules that can be applied with assurance to any logical statements and guarantee equivalence and maintain truth values.

De Morgan's laws are actually pretty simple, but they give us some tools that can help to either simplify an expression or identify an expression that would give us the negation of the original expression. When I was learning these rules I kind of liked to think of them as the either/or rules. There are two and they look like this:

```default
!(P && Q) <=> !P || !Q
!(P || Q) <=> !P && !Q
```

For something that was named for a mathematician, these seem like a couple of really simple rules.  As it turns out, these can be really useful when working with conditional logic to either reverse or simplify a conditional block. For an example, let's take a look at a conditional reversal using one of De Morgan's laws

```javascript
//This is a conditional statement we want to reverse
if(valueA || valueB){
    //Do one thing
} else {
    //Do another
}

//Reverse order
if(!(valueA || valueB)){
    //Do another
} else {
    //Do one thing
}

//Distribute

if(!valueA && !valueB){
    //Do another
} else {
    //Do one thing
}
```

Whoa. That was kind of a drink from the proverbial firehose. For someone who is seeing this material for the first time, all of this math and its relation with code might seem a little dense. I wouldn't worry too much about getting it all at once. The important thing is to start looking at your code and identifying places where it seems like simplification should be doable. The more complicated your conditional statements are, the more likely a bug is lurking in the dark.

I would recommend you start getting your feet wet with the concept of tautologies. By simply recognizing where an idea is repeated and removing the repetition, your conditional blocks will become clearer and more precise.  After you have applied tautologies comfortably to your code, try playing with the distributive and associative laws. These three ideas will clean most of the garbage out of complex, messy conditionals.

Once the foundation work is comfortably in your arsenal, come back and start playing with the ideas around identifying apenantologies and flipping conditionals around to identify the best order for your conditions to be presented in.  Sometimes reordering conditions is all you need to make your code clean, clear and the best it can be. These principles of logic lay the foundation for what is crucial to make a program do all the things you ever wanted, so use them and make your code shine.

<h4>Blog Post Notes</h4>

<ol>
<li>Technically the logical paradigm came from a combination of Mathematics and Philosophy. A guy by the name of Bertrand Russell worked with mathematicians early in the 20th century to create a formal language which could be used to describe mathematics work that was being done. He and several important mathematicians helped to make formal proofs work in a predictable, and readable way. Thanks, forebears! Without you, computing might not be where it is today.</li>

<li>Apenantology is a neologism I am introducing here in order to accurately describe a situation which is diametrically opposed to a tautology. Tautology is built from the greek roots tautos, meaning identical, and logos meaning word. I constructed apenantology from apenanti, meaning opposite and logos meaning word.</li>

<li>This naming is common for mathematics and it makes it easier to read the expressions we are tinkering with. Most logical expressions are written using P, Q, R, S and occasionally T. When more than five variables are involved, I personally start to worry about complexity.</li>

<li>A rough proof is <a href="https://gist.github.com/cmstead/1ab28f1e30f9d6d43218" target="_blank">provided as a gist</a> for those curious as to whether apenantologies are supportable mathematically.</li>
</ol>

<ul>
<li><a href="https://gist.github.com/cmstead/1ab28f1e30f9d6d43218" target="_blank">Proof that apenantologies are always false</a> (largely a mechanical proof)</li>
<li><a href="https://en.wikipedia.org/wiki/De_Morgan%27s_laws" target="_blank">De Morgan's Laws</a></li>
</ul>
{% endraw %}
    