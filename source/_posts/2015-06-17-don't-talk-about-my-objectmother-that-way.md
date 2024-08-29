---
layout: post
title:  "Don't Talk About My ObjectMother That Way"
date:   2015-06-17 10:00:41 -0700
categories: Coding, Design Patterns, Javascript, Unit Testing
---
{% raw %}
When last we met, we talked about <a href="http://www.chrisstead.net/archives/655/not-another-js-testing-how-to/" target="_blank">setting up unit testing for Javascript</a>. I'm sure anyone reading this blog is at least aware of the idea of software design patterns.  There are all of these known challenges with canned solutions. If the solution isn't ready out of the box, it is with just a little bit of tweaking. Something you might not be aware of is there are unit testing design patterns too. 

Er... What?

I know, most people think of unit testing as either something they tolerate because it's required or, at best, a list of tiny little functions that guarantee that a particular behavior matches the expected business requirement. Where is there room for design patterns?

Many patterns come in the form of best practices, but there is one that is at the top of my list of all time favorites.  <a href="http://martinfowler.com/bliki/ObjectMother.html" target="_blank">The ObjectMother pattern</a> is a design pattern tailor made for unit testing.  Technically you could use ObjectMother in your everyday programming as a factory or something like that, but today it's all about testing.

Let's start by looking at a unit test for two different functions that require data from the same contract. I'm just going to hand-wave past what the functions do, because it doesn't really matter right now. Right? Right.

```javascript
describe('dataModule', function(){

    describe('firstFunction', function(){

        var myTestData;

        beforeEach(function(){
            myTestData = {
                records: [ { required: true }, { required: true}, { required: false } ]
            };
        });

        it('should return the number of required records', function(){
            expect(dataModule.firstFunction(myTestData)).toBe(2);
        });

    });

    describe('secondFunction', function(){

        var myTestData;

        beforeEach(function(){
            myTestData = {
                records: [ { id: 1 }, { id: 2 }, { id: 3 } ]
            };
        });

        it('should return an array of record ids', function(){
            var result = dataModule.secondFunction(myTestData);
            expect(JSON.stringify(result)).toBe(JSON.stringify([ 1, 2, 3 ]);
        });
    }

});
```

That is a LOT of typing for two little tests. It's especially bad since the two different objects are so similar. Now, we could combine the two object setup blocks into a single beforeEach at the top, but what if this same data object is necessary in another test in another file? What if, worse than that, there are several modules that might interact with this data, each capturing data for a particular purpose which could be unrelated to the data module we tested here?

The almighty DRY principle would tell us this is inherently flawed.  There is a code smell and that smell is one of the big reasons I hear people hate writing unit tests. What if we could actually DRY out our unit tests in a sane, maintainable way?

Enter the ObjectMother pattern.

Here's what the mother of this object might look like:

```javascript
function testDataMother(){
    return {
        records: [
            { id: 1, required: true },
            { id: 2, required: true },
            { id: 3, required: false }
        ],
        otherProperty1: 'foo',
        otherProperty2: 'bar'
    };
}
```

With this defined, our test code becomes much simpler to write, read and maintain. If we use our new object mother, here's what our tests become:

```javascript
describe('dataModule', function(){

    var myTestData;

    beforeEach(function(){
        myTestData = testDataMother();
    });

    describe('firstFunction', function(){

        it('should return the number of required records', function(){
            expect(dataModule.firstFunction(myTestData)).toBe(2);
        });

    });

    describe('secondFunction', function(){

        it('should return an array of record ids', function(){
            var result = dataModule.secondFunction(myTestData);
            expect(JSON.stringify(result)).toBe(JSON.stringify([ 1, 2, 3 ]);
        });
    }

});
```

It's like magic, right? We just eliminated 10 lines of code we were using in our original test file and now we are able to focus on the problem, testing our functions. What's even better, we have now centralized our data example so any other tests can use it too and we only have to modify it in one place to expand our tests.  If the contract were, heaven forbid, to change, we can change our data in our mother file to match the new contract and then identify any breakages, update functionality and guarantee function and data parity.  This is a HUGE win.

For small sets of tests, and relatively simple data structures, this is perfectly acceptable.  What happens when you have nested data structures and complex logic to interact with it? Now you have data interdependencies and our simple functions aren't going to be sufficient.

This calls for other, well known, patterns. We can draw upon the Factory and Dependency Injection patterns to make this better. We can employ initializing functions and initial condition objects to define a more robust interface.

Since these requirements arose as I was working through unit testing scenarios in my day to day life, I created a library, <a href="https://github.com/cmstead/DataMother.js/releases" target="_blank">DataMother.js.</a> DataMother allows you to isolate layers of objects and register them with an injection system.  At test time, you can use DataMother to handle your data requirements much like we did above which actually made unit testing with data so easy, I actually started looking forward to it.

Weird, right?

Anyway, whether you use the naive method outlined earlier or a more robust solution like DataMother.js, use the ObjectMother pattern in your testing and bring the joy to unit testing data-driven functions that you have in the rest of your programming life. Unit tests and data can be friends!

<strong>Blog Post Notes:</strong>

The ObjectMother pattern was first discussed (as far as I know) in 2006 by Martin Fowler.

The links below are assembled from the links in the post:

<ul>
<li><a href="http://www.chrisstead.net/archives/655/not-another-js-testing-how-to/" target="_blank">(Not) Another JS Testing How To</a></li>
<li><a href="http://martinfowler.com/bliki/ObjectMother.html" target="_blank">Martin Fowler, ObjectMother</a></li>
<li><a href="https://github.com/cmstead/DataMother.js/releases" target="_blank">DataMother.js -- Release package download</a></li>
<li><a href="https://github.com/cmstead/DataMother.js" target="_blank">DataMother.js API documentation and Github project</a></li>
</ul>
{% endraw %}
    