---
layout: post
title:  "Working with Strings and Regular Expressions"
date:   2016-03-09 08:00:28 -0800
categories: Algorithms, Applied Math, Coding, Foundation, Javascript
---
{% raw %}
An exchange at work got me thinking this last week. Someone said "I really hate regex." For those of you not in the loop on the lingo, regex means regular expressions.  After a little  prying, it turned out the reason they didn't like regular expressions was really rooted in the fact that they didn't have a chance to use them very often, so the concept is unfamiliar.

In this post I am not going to go into some of the more advanced parts of regular expressions because, a: they complicate things significantly and b: because I'm not experienced enough with them to give good guidance.  Foundational regular expressions are still more than enough to discuss for a single blog post, nonetheless. For now, I am going to cover how to leverage a lot of power from a very small subset of the entire set of tools.

Along with this post I am also going to give screen casting another go and provide a bunch of examples in a video which, hopefully, will be a good supplement to the information I will present in my blog.  In the video I am using approval testing to demonstrate the output from various regular expressions, which should make applying regex easier to do.

<iframe width="420" height="315" src="https://www.youtube.com/embed/5E9j_ZTyk-I" frameborder="0" allowfullscreen></iframe>

<h3>States and Strings</h3>

For the brave and the true, let's start at the beginning. Regular expressions are a form of finite state machine with an accept state.  What this means in English is, regular expressions go through a set of predefined states and, if enough of the characteristics are found in a string in the right order, then the pattern is considered a match.

A way to see this in action is the following:

```javascript
var pattern = /abb/;
var testStr1 = 'abb';
var testStr2 = 'cabaabbac';
var testStr3 = 'ababcabadc';

testStr1.match(pattern) !== null; // true
testStr2.match(pattern) !== null; // true
testStr3.match(pattern) !== null; // false
```

We can see the pattern of characters in the first test string matches the pattern exactly. We expect this to pass. The second string also contains abb roughly in the middle. This means our pattern will also result in a match. The third string comes very close three times, but abb is not actually found anywhere in the entire string.  Let's take a look at the way the search is conducted in the second string since it is the more interesting of the passing two:

```default
c
aba
b
aa
abb <- accept.
```

What this demonstration is showing is, the pattern matching mechanism starts verifying on a character and will continue to test until either a character does not pass one of the rules or a set of characters matches all of the rules and reaches what is referred to as an accept state. Regardless of how complex a regular expression ever gets, the underlying function always comes back to reaching an accept state or not. This means if something goes horribly awry and you can't figure out what happened, simplify your expression and build piece by piece, extending the states in your pattern one by one until you get to the pattern you need.

<h3>Special Case Behaviors</h3>

Regular expressions come with a whole array of special case definitions and characters which match those cases. For now we are going to look at some of the simpler parts which you can use to make your pattern matching more expressive as you go.

<h4>The Optional Pattern</h4>

The first special case is the optional modifier, '?'.  By adding a question mark after a character or expression, you can set a rule that the last part of the pattern was optional in nature and may or may not actually exist.  A very common example for this is the American versus British spelling of color/colour.  Here's how it works:

```javascript
var pattern = /colou?r/;

'color'.match(pattern) !== null; // true
'colour'.match(pattern) !== null; // true
'coolour'.match(pattern) !== null; // false
```

Obviously, the last string doesn't match a valid spelling of color for any English standard defined, so no matches are returned, i.e. the result of the match expression is null.  We can also see that both color and colour are considered valid matches, which means match will return correctly matched strings in the matches array.

<h4>Testing for Any Character</h4>

Sometimes you are less certain about the particular character which you want to match.  For instance, let's suppose we want to find any word which starts with ca, but we don't care what the last letter is.  We can use the '.' pattern to match any word of this form, even if they aren't valid words.  Here's an example:

```javascript
var pattern = /ca./;

'car'.match(pattern) !== null; // true
'cam'.match(pattern) !== null; // true
'Occam\'s razor'.match(pattern) !== null; // true
```

The last string actually demonstrates the problem we run up against with regular expressions of this type. Regular expressions are not particularly discriminatory. The only rules we provided were that there must be the characters c and a, followed by another character.  "Occam's" satisfies this just fine even though cam is in the middle of a string of characters.

<h4>Initial and Terminating Patterns</h4>

Next let's have a look at two more modifying patterns.  We can actually express position of a string by using '^' and '$'.  The '^' pattern expresses that anything which follows that character must be positioned at the very beginning of the string.  '$' is the polar opposite, saying that the string must match and terminate at that point. These are probably easiest seen in action.

```javascript
var pattern1 = /^ca./;

'car mechanic'.match(pattern) !== null; // true
'cam shaft'.match(pattern) !== null; // true
'Occam\'s razor'.match(pattern) !== null; // false

var pattern2 = /ca.$/;

'riding in a cab'.match(pattern) !== null; // true
'a crow says caw'.match(pattern) !== null; // true
'Occam\'s razor'.match(pattern) !== null; // false
```

As you can see, pattern 1 only matched patterns which started with ca and pattern 2 only matched strings ending with ca followed by another character. This can be really handy for testing that a string either starts or ends with an expected value. The initializing and terminating patterns are also very useful in testing that a given string contains only characters which match an acceptable pattern.  This is common for testing things like postal codes, phone numbers and email addresses.

<h4>Multiple Patterns</h4>

Where '?' will make a pattern optional, there are broader reaching patterns like '*' and '+'.  The '*' pattern means 0 or more matches of the previous character or pattern are acceptable. Similarly, the '+' pattern means 1 or more matches of the previous character or pattern are acceptable.

```javascript
var pattern1 = /colou*r/;
var pattern2 = /colou+r/;

'color'.match(pattern1) !== null; // true
'color'.match(pattern2) !== null; // false

'colouuur'.match(pattern1) !== null; // true
'colouuur'.match(pattern2) !== null; // true
```

With two pattern characters which are so close in meaning, it seems reasonable to ask why both?  As it turns out, the case of 1 or more is common enough it is actually quite valuable to address that situation directly.

<h4>Any In Matching</h4>

The last pattern we are going to cover, quickly, is the match any in case specified as '[]'.  Anything contained within the brackets will be used as an acceptable match. This means, if you have a very specific set of acceptable characters, it is easy to simply list them all and match against the definition. This is a common use case if numbers and letters are acceptable, but punctuation is not.

```javascript
var pattern = /^ca[a-z]+$/;

'cabby'.match(pattern) !== null; // true
'cantina'.match(pattern) !== null; // true
'candl\'d'.match(pattern) !== null; // false
```

Since cabby and cantina both start with ca and contain only letters, they were proper matches for our pattern.  Since candl'd (which is basically a nonsense spelling) has punctuation, it is not an acceptable match, so we get null as our match result.

<h4>Regex Flags</h4>

In Javascript (as well as Perl and potentially other languages) there are flags which accompany a regex search.  Up to this point we have been, largely, looking at lower-case matches. In regular expressions, case matters.  This means it is useful to be able to declare when case should or should not matter.  For example Chris and chris are different strings, so a search for /chris/ won't match Chris. That's not helpful when case is unimportant.  We can flag a pattern as case insensitive with 'i'.

```javascript
'Occam\'s razor'.match(/occam/) !== null; // false
'Occam\'s razor'.match(/occam/i) !== null; // true
```

The search string remains the same, but by adding the 'i' flag, we increase the allowable characters in our search and broaden the results which are returned.

In much the same way 'i' allows us to broaden our search by ignoring case, the 'g' flag will tell the regular expression engine to find all matches instead of just the first.  Let's have a look at that as well.

```javascript
'Can we go to the can-can?'.match(/can/).length; // 1
'Can we go to the can-can?'.match(/can/g).length; // 2
'Can we go to the can-can?'.match(/can/ig).length; // 3
```

As you can see, as we add flags to our search, the results expand to capture more cases and instances.  This is especially helpful when trying to replace values or split strings on complex patterns.

<h4>Summary</h4>

Regular expressions are a fairly rich way to describe string patterns for performing all kinds of matching and checks.  Along with matching and checks, regular expressions make it easy to perform complex find and replace operations and string tokenizing.

With particularly complex expressions, regex can look rather cryptic, but when small, focused checks and behaviors are being performed regular expressions can be a great benefit to the programmer for working with strings and reducing pain.
{% endraw %}
    