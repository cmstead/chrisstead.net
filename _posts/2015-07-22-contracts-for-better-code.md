---
layout: post
title:  "Contracts for Better Code"
date:   2015-07-22 09:00:44 -0700
categories: Coding, Design Patterns, Functional Programming, Javascript, Unit Testing
---
{% raw %}
With programming languages which have a greater draw for classically trained computer science types, there is a common discussion of contracts and data expectations. Contracts are so inherent in the code that it's hard to see a declaration without one. Type systems emerge from the idea of contracts and every function, constructor and return path comes with an expectation that is defined and declared in the code.

Javascript, being dynamically typed and a little loose with the morals, attempts to sidestep contracts altogether. Function arguments are little more than a strong suggestion to the programmer, and every function returns something even if that something is merely the undefined type.  Contracts are just not something we do.

Here's an example of exactly how squirrely Javascript can really be.

```javascript
function addBasic(a, b){
    return a + b;
}

function addArguments(){
    let a = arguments[0],
        b = arguments[1];

    return a + b;
}

function addSuggestion(a, b){
    let _a = Boolean(a) ? a : 0,
        _b = Boolean(b) ? b : 0;

    return _a + _b;
}
```

Obviously each of these functions does essentially the same thing, but in the last example a and b are nothing more than a suggestion of how you could use the function. You could run addSuggestion() and get 0 or you could run addSuggestion(1, 2) and get 3. There's no requirement that you actually adhere to the contract at all.

<em>You are doing it wrong.</em>

There, I said it. Mucking about with all of these bits and pieces that may or may not exist and allowing programmers to play fast and loose with your carefully constructed function is just plain wrong. I makes me want to take a shower.  It's like the midnight movie on the horror channel: gross.

Rule number one of contract club: You ALWAYS talk about contract club.

If someone created a contract in their function they are setting expectations. If you don't play by the rules someone set in the function, you should not expect the function to work properly. It's just that simple. The contract is there to save you from yourself.

At this point, I think I should mention, I understand that Javascript doesn't support function overloading, so you can't create optional variations on a function and the loose requirements around the contract are there so you can get something akin to overloaded functions.

To this I say hogwash!

Actually that's not true. Optional arguments are good, however it is better if we use them in a safe way. Overloaded functions, even in languages that allow them, can get dangerous.  It's preferable to write code that says what it means and does what it says.  Let's take a look.

```javascript
function buildBasicUrl(hostname){
	return 'http://' + hostname;
}

function buildBasicPathUrl(hostname, path){
	return buildBasicUrl(hostname) + path;
}

function buildProtocolSpecificUrl(hostname, path, protocol){
	return protocol + '://' + hostname + path;
}

function buildPortSpecificUrl(hostname, path, protocol, port){
	return protocol + '://' + hostname + ':' + port + path;
}

function buildUrl(hostname, path, protocol, port){
	let url = '';
	
	if(Boolean(port)){
		url = buildPortSpecificUrl(hostname, path, protocol, port);
	} else if(Boolean(protocol)){
		url = buildProtocolSpecificUrl(hostname, path, protocol);
	} else if(Boolean(path)){
		url = buildBasicPathUrl(hostname, path);
	} else {
		url = buildBasicUrl(hostname);
	}
	
	return url;
}
```

That may not be the most beautiful code I've written, but it illustrates the importance of what I am saying. Here we can see that there is a function, buildUrl, which takes four parameters. Hostname is required, but all of the rest are optional.  Once we get to the specific implementations of what we are actually doing, the contract becomes a firm handshake and it's backed by the interpreter threatening to throw an error if something goes wrong.  Mind you, the interpreter is going to just concatenate a whole bunch of undefined values, but that's beside the point.  You won't get what you want if you don't meet the contract.

So, there is another side to the contract that is also illustrated here. Regardless of what happens, you can guarantee you will always, ALWAYS get a string back when you run buildUrl. This is the promise made by the person who wrote the code before you came along. So, on the one hand, you must meet the requirements of the contract in order for the function to properly execute. On the other hand, you are allowed righteous indignation when you expect a string and you get a boolean or something else.

Return types are contracts.

When you, as the developer, write a function and claim you are returning a specific type, understand that the next person will hunt you down with hungry dogs if you promise a string, but sometimes return an object.  What is returned is really, REALLY important.  People rely on it.  Imagine if this happened:

```javascript
/*
 * I solemnly swear I always return an array.
 */

function listify(a, b, c, d){
	let finalArray = [a, b, c, d];
	
	if(finalArray.contains('foo')){
		finalArray = null; //This will totally never happen
	}
	
	return finalArray;
}

function removeVowels(value){
	return value.replace(/[aeiou]/gi, '');
}

let myListNoVowels = listify('foo', 'bar', 'baz', 'quux').map(removeVowels);

//BANG! BOOM! EXPLOSIONS! GUNFIRE! STACKTRACE!!!!
```

I mean, that was downright malicious. Who goes around saying they are returning an array and then they return null. That's seriously sadistic. What's worse is, if listify was buried somewhere in a library and all you had was the crummy documentation they wrote, you would never be able to figure out what you are doing wrong to cause listify to return null.

I dunno, it just blows up sometimes.

The short version of this post goes a little like this: When you write a function, you are writing a contract.  That is a contract you are required to honor and you can, almost always, expect the programmer who uses your function to adhere to that contract.

The longer sum-up goes more like this: A contract is a guarantee. The guarantee that is given states expectations for what the user will do and it provides assurances about what the user will get in return. Contracts revolve around data, and everything is data. This means that regardless of what you are writing or what you expect, in Javascript, you should always say what you mean and do what you say.

By providing a strong contract for the user to rely on, you are making the world a little better place to live in. You are giving guarantees when so many programmers around you might not. Best of all, when you write a good data contract in your functions you can come back after a year of looking at something completely unrelated and get back up to speed almost instantly on what goes in and what comes out.  Doesn't that sound like better code? It does to me.
{% endraw %}
    