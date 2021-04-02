---
layout: post
title:  "Naming Things Part 4: Methods and Modalities"
date:   2021-04-01 00:00:00 -0800
categories: programming human-centered-source design names
---

>This is part four of a multi-part series on naming things. [You may want to review part 3](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html)<sup>1</sup>.

Let's be honest, our source code does a lot of work. Not only is it the specification for a program that will be run at some point, but it also needs to communicate the hows, and whys of what will happen when the program runs. Source code is the means by which people communicate with each other about what a program will do.

With all of the work it does, many of us spend very little time thinking about what is being communicated and how. We sling logical structures into place, build Byzantine algorithms with symbolic language, and still, somehow, expect we can maintain the code, AND other people can read it.

Yikes.

It turns out there is a lot of meaning which can be extracted from our code. By doing some judicious **_thematic grouping_**<sup>2</sup> we can start to tease apart how the code is interconnected. We can also begin to capture information about the human intent behind the code we create.

Some of our code is simple. Data transformations, direct computation, and other transparent data-in, data-out type functions require little in the way of further dissection. On the other hand, there is code which, no matter how you slice it, remains relatively opaque. This opacity is actually not due to the inability for a programmer to lend clarity through a more straightforward implementation. In fact, it is the intended program behavior which leads to the very nature of this opaque code.

## Modality ##

In linguistics, there is the notion of **_modality_**<sup>3</sup>, which is the way people talk about possible situations, or states of the world. Modality has been linked, in one particular book, to the notion of "multiple worlds". Ultimately, modality can be spotted with words like _could_, _should_, _might_, _shall_, _must_, etc.

Due to the human nature of software, our source code also must carry this sense of modality. We see modality arise from _conditional statements_ (if/then), _rule validation_, and even patterns, like the _singleton_ and _factory_. Some of the modal expressions we see define a sense of possibility, others describe a sense of what must be.

In a modal expression, there are two distinct modal types: necessity, and possibility. Necessity represents something which must be. Possibility represents something which may be. Let's have a look at modal expressions with regard to business context:

Necessity:

1. Passwords must contain numbers, and both upper and lower case letters.
2. Usernames must be longer than 3 characters.

Possibility:

1. A user may have entered an email.
2. The invoice might be missing data.

At a high level, we can represent these as rules and conditions. It's easy, when looking at the English description, to see how necessity translates to rules, and possibility translates to conditions, but it's trickier once we are in the code. Everything which was natural language is translated into conditional blocks. Without the original context it may not be immediately clear why a conditional is in place, and whether it is a rule or a condition.

## Predicates ##

When considering conditional execution of any kind in a program, predicates are the bread and butter of our decision logic. Predicates will also be the way we can characterize wants and needs of the person who will, ultimately, be using the software we design and build.

In natural language, a **_predicate_**<sup>4</sup> is a claim made about a subject, without regard to whether it is true. For instance, "the sky is blue" is a claim about the color of the sky. Likewise, "an elephant honks" is a claim about an elephant. The first claim is likely true given some point during the day. The second claim is unlikely at any point since elephants don't have a means to create a honking noise (as far as I'm aware).

In programming (like in mathematical logic), a predicate<sup>5</sup> is an expression which evaluates to either true or false. Predicates are typically expressed as a comparison, like `currentCount < maximum`, or `userInput == expectedValue`. Though this is presented as a claim, much like in natural language, the outcome is not knowable until the program is run.

## Rules ##

Generally speaking, anything that is stated as a _necessity_ in natural language, could be categorized as a _rule_ for the purposes of software development. If we consider the examples of necessity arising from a modal expression:

1. Passwords must contain numbers, and both upper and lower case letters.
2. Usernames must be longer than 3 characters.

We can represent these same expressions in code:

```python
if not re.search("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])", password):
    raise Exception("Password must contain numbers, and both upper and lower case letters.")

if len(username) <= 3:
    raise Exception("Username must be longer than 3 characters.")
```

In both of these cases, we can see the rule not from the state of what _should_ be, rather we see what _can not_ be. This is an unusual way for people to talk, but it is very common in programming. If we start by **_naming these expressions_**<sup>6</sup>, we can simplify the logic and bring some order to the source code at hand.

```python
password_is_invalid = not re.search("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])", password)

if password_is_invalid:
    raise Exception("Password must contain numbers, and both upper and lower case letters.")

username_is_too_short = len(username) <= 3

if username_is_too_short:
    raise Exception("Username must be longer than 3 characters.")
```

All at once we have transformed a mathematical predicate into a natural language predicate. By expressing our programmatic logic in natural language we move closer to capturing the original business intent was in our software.

We have, however, obscured the nature of our rule. Neither rule was stated in the negative, but creating two variables, one directly before the other, might make the source code harder to understand instead of easier.

When I think of predicates in source code, I generally imagine them less as a statement, and more a question. Since any claim about a value cannot be known until the program is run, it strikes me as reasonable to name predicate functions by way of a question. By doing this, we get both insight into the rule we care about, and the failure we need to understand when resolving any errors.

```python
def is_password_valid(password):
    return re.search("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])", password)

password_is_invalid = not is_password_valid(password)

if password_is_invalid:
    raise Exception("Password must contain numbers, and both upper and lower case letters.")

def is_username_length_ok(username):
    return len(username) > 3

username_is_too_short = not is_username_length_ok(username)

if username_is_too_short:
    raise Exception("Username must be longer than 3 characters.")
```

The benefit we get from this approach is the explicit definition of rules, centered on a question about the value to be evaluated. The question spells out what we care about. On the other hand, this does extend the length of the code some, which involves more reading. Ultimately, it is a balancing act.

**_References_**

1. "Naming Things Part 3: Using Methods for Context" [http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/25/naming-things-part-3-using-methods-for-context.html)
2. "The Theme of Your Code" [http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html](http://chrisstead.net/programming/software-linguistics/human-centered-source/design/2021/03/27/the-theme-of-your-code.html)
3. "Modality (natural language)" [https://en.wikipedia.org/wiki/Modality_(natural_language)](https://en.wikipedia.org/wiki/Modality_(natural_language))
4. "Predicates (grammar)" [https://en.wikipedia.org/wiki/Predicate_(grammar)](https://en.wikipedia.org/wiki/Predicate_(grammar))
5. "Predicate (mathematical logic)" [https://en.wikipedia.org/wiki/Predicate_(mathematical_logic)](https://en.wikipedia.org/wiki/Predicate_(mathematical_logic))
6. "Naming Things Part the Second, or Simple Expressions" [http://chrisstead.net/programming/human-centered-source/design/names/2021/03/15/naming-things-part-the-second-simple-expressions.html](http://chrisstead.net/programming/human-centered-source/design/names/2021/03/15/naming-things-part-the-second-simple-expressions.html)
