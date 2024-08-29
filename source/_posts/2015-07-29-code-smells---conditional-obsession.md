---
layout: post
title:  "Code Smells - Conditional Obsession"
date:   2015-07-29 09:00:29 -0700
categories:
    - Code Smells
    - Coding
    - Foundation
    - Javascript
---
{% raw %}
Jeff Atwood of Stack Exchange and Coding Horror fame wrote a post quite a long time ago about <a href="http://blog.codinghorror.com/code-smells/" target="_blank">code smells</a> and what they mean. A couple weeks ago, I discussed <a href="http://www.chrisstead.net/archives/759/eliminating-switch-statements-with-hashmaps/" target="_blank">eliminating switch statements using hashmaps</a>. In that post, I introduced a new code smell that I want to discuss in a little more depth - conditional obsession.

Conditional obsession is when a programmer introduces more conditional logic than would ever be necessary to solve a particular problem. Sometimes conditional obsession comes in the form of a conditional structure taking the place of a common data structure, such as switches and hashmaps, while other times, it is just overwrought code that grew block by block until it became so unmanageable that developers are now afraid to even touch it.

Following is a dramatization of the kind of code I am talking about. This has been taken from real code I have encountered in the wild, but the variable names have been changed to protect the innocent.

```javascript
function initCriteriaAssets() {
    var $this = this,
        dataAssets = null,
        coreData = $this.$scope.coreData,
        criteria = $this.$scope.criteria;

    if (coreData && criteria) {
        dataAssets = coreData.criteriaAssets;
        if (criteria.length > 0 && dataAssets.length > 0) {
            var count = 0,
                callback = function (data) {
                    count--;
                    if (data) {
                        for (var i in dataAssets) {
                            if (dataAssets[i].assetId === data.id) {
                                for (var j in criteria) {
                                    if (criteria[j].criteriaId === dataAssets[i].criteriaId) {
                                        criteria[j].asset = data;

                                        if (data.metaData.recordId) {
                                            criteria[j].showDialog = false;
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    if (count === 0) {
                        $this.setDataTemplate();
                    }
                };
            for (var k in dataAssets) {
                if (typeof dataAssets[k].assetId !== "undefined") {
                    count++;
                    $this.$dataModel.initById(dataAssets[k].assetId, callback);
                }
            }
        } else {
            $this.setDataTemplate();
        }
    }
}
```

It's a little like the Twilight Zone movie where Dan Aykroyd says, "do you want to see something really scary," isn't it?

Clearly there are more smells at work here than conditional obsession, but you can see that this programmer was clearly testing every possible situation under the sun. Even with the original variable names in place, I would defy you to explain to me what this code actually does.  This code is so incomprehensible I'm not going to even attempt to restructure it in a single blog.  This could take anywhere from a day to a full sprint to unravel and clean up, depending on how pathological the problem is.

I have reached a point in my programming life where I view conditional blocks as a code smell. Sometimes they are necessary, but, often, they are just a bug magnet. The more conditions you attempt to satisfy, the more likely you are to get one of them wrong.  The deeper in a code block your condition is, the more likely it is to only occasionally surface, making it extremely difficult to diagnose.

No good code smell exists without some sort of remedy. Conditional obsession is no different.  Let's have a look at different ways we can fix up our code and make it easier on ourselves and nicer for the next programmer who has to take over what we have written.

<h3>Refactoring 1 - Reduce nesting depth</h3>

If you have your conditions nested two or more layers deep, consider refactoring your logic to handle the cases at a single layer, instead.  This will reduce the number of cases where your code becomes unreachable except for a very specific, difficult-to-identify edge case.  Let's take a look at an example.

```javascript
function myFunction(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [];
    
    if (myList.length > 0) {
        if (aValue !== null) {
            newList = myList.map(value => value + aValue);
        } else {
            newList = myList.map(value => value + defaultValue);
        }
    } else if (aValue !== null) {
        newList.push(aValue);
    } else {
        newList.push(defaultValue);
    }
    
    return newList;
}
```

<strong>Now let's apply refactoring 1.</strong>

```javascript
function refactoredFunction1(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [];
    
    if (myList.length > 0 && aValue !== null) {
        newList = myList.map(value => value + aValue);
    } else if (myList.length > 0) {
        newList = myList.map(value => value + defaultValue);
    } else if (aValue !== null) {
        newList.push(aValue);
    } else {
        newList.push(defaultValue);
    }
    
    return newList;
}
```

Even with just the first refactoring, we get code that is easier to reason about.  It's not perfect, and it's not DRY, but it's a step in the right direction.  Now that we have applied the refactoring, we can identify what some of the conditionals we had in our original code were really trying to accomplish.

<h3>Refactoring 2 - Factor conditionals</h3>

Factoring conditionals is a lot like factoring in algebra.  Suppose we had the following expression from Algebra 1:

5x + 10

We know that a simple factorization would look like the following:

5(x + 2)

Clearly the second expression describes the outcome of the first expression directly.  The main difference is, we now know that we are simply dealing in a linear expression, x + 2, which is being multiplied by 5.

The same can be done with conditional statements to help clarify meaning and help us to reduce complexity in our applications.  We can factor out common conditionals and separate our logical concerns, simplifying what we must digest to improve our program's readability and/or maintainability.

```javascript
function conditionalFactoredFunction(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [],
        postfix = '';
    
    // aValue comparison to null is a common factor
    // Our conditionals continually switched between aValue and defaultValue
    if (aValue === null) {
        postfix = defaultValue;
    } else {
        postfix = aValue;
    }
    
    // Since we are always setting postfix to a sane value
    // we don't need to perform any conditional assessments here
    if (myList.length > 0) {
        newList = myList.map(value => value + postfix);
    } else {
        newList.push(postfix);
    }
    
    return newList;
}
```

Now that we've performed our conditional factorization, it becomes trivial to finish the function cleanup. We are doing a lot of variable manipulation here. This kind of juggling leads to small, difficult to spot bugs, so let's just get rid of all the unnecessary assignments.

```javascript
function finalRefactoring(myList, aValue){
    let postfix = aValue !== null ? aValue : 'defaultStr',
        newList = [];
	
	if(myList.length > 0){
		newList = myList.map(value => value + postfix);
	} else {
		newList.push(postfix);
	}
    
    return newList;
}
```

By identifying the conditional obsession code smell, we were able to take a function that was small, but still difficult to read and reduce complexity while improving readability. We trimmed about 33% of the bulk from the code and cut closer to the real goal the original code was trying to accomplish.

A nose for code smells is generally developed over time and with practice, but once you learn to identify distinct smells, you can become a code sommelier and make quick, accurate assessments of code that could use the careful work that refactoring provides. While you code, watch out for conditional obsession and work to reduce the complexity of your application.
{% endraw %}
    