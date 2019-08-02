# Test Driven Development: Are You Asking The Right Questions? #

<!-- Tests provide insights -->

Test driven development is a way to discover what you know about the code under test. It is also a means discover things you don't know. Hopefully your tests also help uncover ways of solving new problems as you discover them.

Well defined tests provide insight into how to use the code under test, what happens when everything runs as expected, and what happens when there is an error. Ultimately when you're writing communicative tests, the description, the test code, and the test data say something meaningful about the code that's under test.

<!-- Tests as questions -->

Every test we write is, ultimately, a question. The question we ask each time we start writing a test is, "does the code under tests do what it is expected to do given the requirements provided by the customer?" This question, however, is rarely as simple or straightforward as it initially seems.  Instead, the question often looks more like "when event x happens, y is the result." Ideally, this formulation of a question leads to clear, simple solution.  If your solution is both clear and simple, you likely uncovered a useful question.

There are cases where you can write a test, create a first description of the test, and declare what the test might mean, but miss the mark on describing the real customer need. This kind of test is not bad, but it does lead to interesting but unintentional consequences.

Suppose we are writing a test for an "add" function. It's pretty common for people to to write a test description like, "when I put in 5 and 6 it returns 11." This kind of description says less about the actual add function than it does about the fact that 5 + 6 = 11. This is particularly uninteresting since we can easily show that the sum of 5 and 6 is, in fact, 11.

What kind of question might we write to actually capture the intent of our add function?

<!-- Choosing a description using domain language -->

Perhaps we could describe our test as "'add' correctly produces the sum of two numbers," instead. With this description, we could continue to test summing 5, 6, and the result of 11. Our test implementation doesn't necessarily need to change just because our description says more about the domain than the actual implementation.

Although we could explicitly choose two numbers and a sum, we could, just as reasonably, randomly select two numbers, take the sum and compare it to the output from our add function.  This means our test no longer specifies anything about the implementation of either the test or the add function.  Instead it becomes, exclusively, the reflection of our domain concerns.

<!-- Operation safety and stabilty -->

Of course, we know that the scope of this test could become too wide if we actually chose two numbers completely at random.  Perhaps we chose unsafe numbers to add, e.g. we could choose to add MAX_SAFE_INTEGER to itself, which is an unstable operation. We might not have started thinking about this concern if we hadn't moved to a near-domain test question. Moreover, this one domain question bubbles up more useful questions like, what should we do if we encounter edge cases like MAX_SAFE_INTEGER?

After asking this question, we may discover that we aren't interested in the outcome and that we are satisfied with simply accepting the core language behavior.  On the other hand, we might be very interested in the edge cases because it would introduce an opportunity to alert the user that they have reached beyond the bounds of safe addition.

<!-- Refactoring Tests -->

When working with production code, we often refactor it.  Refactoring is a way of modifying code so the original behavior is preserved, but the code is left in a state which is easier to read or maintain. In much the same way, you can refactor tests. If you have a test that was passing, and you modify it in such a way that it continues to pass the same way, then that is an acceptable refactoring.

Let's suppose we start, again, with our question of "add computes the sum of 5 and 6, and returns 11."  If we make the move to update the description, we can actually refactor the test accordingly to better match the domain requirements we proposed.

```javascript
it('adds 5 and 6, and returns 11', function () {
    const summand1 = 5;
    const summand2 = 6;

    const expectedResult = 11;
    const actualResult = add(summand1, summand2);

    assert.equal(actualResult, expectedResult);
});
```

After rewriting the description, we can update expected result to simply contain the sum of summand1 and summand2 instead of the magic number '11.' This provides us enough freedom we can easily make the last couple of modifications we need to select two values and test our add function without regard to the specifics of our original design.

```javascript
it('adds correctly computes the sum of two safe, positive numbers', function () {
    const summand1 = 5;
    const summand2 = 6;

    const expectedResult = summand1 + summand2;
    const actualResult = add(summand1, summand2);

    assert.equal(actualResult, expectedResult);
});
```

With our test refactored to more closely align with our new question language, let's introduce random numbers for summand1 and summand2.  We want to capture as much interesting information as we can without taking on too much burden writing complex number generating code.

```javascript
it('adds correctly computes the sum of two safe, positive integers', function () {
    const maxSafeAddableInteger = Math.floor(Math.MAX_SAFE_INTEGER / 2);

    const summand1 = Math.floor(Math.random() * maxInteger);
    const summand2 = Math.floor(Math.random() * maxInteger);

    const expectedResult = summand1 + summand2;
    const actualResult = add(summand1, summand2);

    assert.equal(actualResult, expectedResult);
});
```

<!-- What constitutes a right or wrong question? -->

Something worth considering is this, suppose someone had found exactly the right question to ask of their solution as they worked through writing their test suite.  What would the outcomes of this question look like?

In the ideal situation, the right question would likely create some, or all of the following outcomes:

- It would generate new interesting questions, leading to new, interesting tests
- The test implementation would provide clear insight into how the code under test is used
- The solution to the question would be clear and easy to understand
- The actual solution would not be trivial (e.g. always return 'true')
- The solution would not be inordinately difficult to produce

Before we go any further, it is worth noting, a "wrong" question is not a "bad" question in any universal sense.  Instead, it is simply wrong for the problem at hand.  With that in mind, let's explore.

Our list of properties which identify a "right" question can, likewise, be viewed as a heuristic for what a "wrong" question might look like. Suppose a question were wrong for the current project or work, it would likely violate one or more of our heuristics from the list above. 

If we suppose we asked a question which didn't generate any new insights.  In the case that we are testing a trivial function, it might be expected that the question we ask of our code be equally trivial.  On the other hand, most projects are not trivial and a question which doesn't generate any further insights is likely to be either too shallow, or too deep.

If a question is too shallow, we are likely to end up simply testing the implementation of our code without considering whether we are solving the problem we set out to work on.  If our question is too deep, we might be in a situation where we are trying to solve everything at once.  Both of these situations are likely to leave us in a situation where we will violate other heuristics.



So let's consider situations where you'd be asking the right question the wrong question what is it actually looks like what's that here Ristic that you can use to understand what you're asking the right or wrong question.
When you write it when you write a testing you describe that scenario.
If you find that you were working really hard to try to solve that test.
There are a number of situations you might have encountered.
You could have asked to test it or ask the questions far too broad.
You could have said I am going to test that this does everything that it's supposed to do within the desires of a user consuming this API.
That's a lot to think about.
Especially if it does things like reach out touch a database file system and then report something back to the user in some way I mean that's that's a lot.
And then you know there are various different conditions at a house passed through the more conditions you passing through.
The tree here it's going to be to test and especially if you want to test all conditions in one test that's a lot of testing and one little test.
So that's a scenario where you might be asking questions that you could consider the wrong question it's not that you're wrong or that you know the question that's a bad question it's just probably not.
The best question you could have asked to.
Test your system.
Conversely it could be far too easy to solve the problem.
When I say easy I don't mean.
Wow I already knew how to do that so this is it can't possibly be this easy to write unit tests and passed them no no I think you know it could be just that easy.
What I mean when I say that it's far too easy what if you asked a question.
Or ask a series of questions but after all was said and done.
You didn't actually implement anything you really cared about because it was so trivial to just.
Solve those problems.
And ignore what you really cared about.
That now.
The solution is trivial it doesn't it it doesn't actually.
Or it's ninety eight for haps it doesn't do what it's supposed to do it doesn't go through it doesn't execute our goal or exercise the solution in a way that that would actually.
Lead you to solving the problem in a real way.
So if we consider system once again that does touch the file system saying.
And it processes the data passes a back up.
Well if you say well I call it any gives me a okay.
And then I called in to give me be.
Okay.
Where a B. coming from now I just know I just tell it what to hand me back okay so you're not really testing.
The code you're not really testing the at the the implementation.
Underlying right because there's there's the business use you know you want your has to talk about what the business case it was more of a problem that needs solving the you don't want to lock yourself into the implementation details.
So you.
Even if you don't.
Locked down the implementation details you still want to exercise the full implementation right if you just if you write these tests you sell do this they do that but then you go off and write about you code your basically swapping out the code.
That is actually doing the work for some stuff that does nothing that just basically hands back what we told him back.
Even not trivialize the whole thing.
So what you really want to do in that case the saying.
When I retrieve data from the file system.
It should in.
Converted to a chase on document whatever.
It it should do something along those lines.
And so by asking that question now you're saying okay so we're in reality we're going to touch the file system we're going to go out and retrieve something from the file system and then hand it back for.
Now now we're in a situation where we can start talking about exercising implementation.
So let's let's assume the row some small chunk of code that just does file system access.
Probably under test.
You know that's that little piece.
You probably don't want to actually touch the file system while you're really.
Writing your tests.
For a few reasons first of all it's gonna be slow.
Second it is it's gonna be unreliable what happens you have if you have a file system read failure while you're trying to test your system that is interact with the data that comes back from the file system read.
So you probably don't really want to rely on file system rates actually do the implementation especially since in all likelihood you working in a language that actually has some sort of file system reading implementation that will give you.
The outcomes that you want.
I I don't you know let's assume we're writing and note I don't want to retest the entirety of their implementation of file system.
That's not that's not what I'm interested in I don't maintain that code if something were to go wrong with that code I could directly intervene and change that code.
So testing that code is just going to lead to headaches for me and a bunch of tests are going to help me.
So we can clip off that piece it's safe to say that I'm going to clip off the file system read part.
And just presume that it's either going to succeed or fail.
Because I can test for those conditions I can actually.
Say here's the data or here is this expected error here the kinds of errors that I can get back in this is what I'm going to have happened.
But once you've done that once you put off that file system part.
Then the rest of it is just in terms to your system.
Some.
Your test from there.
But now because you can clip off that piece you can say what happens when I make this call.
And the file system returns this.
Chunk of data.
In a predictable way.
Now you're now you're really talking about implementing a solution.
So it shouldn't be.
So easy it's trivial.
Because if if you really do have a function that just simply return to constant.
I mean you know you can go right the one test that says it always returns this constant.
Come hell or high water that's what you get.
The end that's your test.
But if you have if you have a some sort of implementation that actually should do different things depending on whatever seems you should probably test that in a way that reflects the actual domain problem.
So it can't be too trivial.
But it also can be too much you don't want to run through the entirety of the of the code all different cases everything in one pass that's too much.
See so you want to start looking at refining the questions you ask.
Based on the.
Work that needs to be done and refine your question as you write your test because if you find your writing a test that's too hard to write.
Our two areas you're running a test where the code is too hard right you've got a simplified down.
You got to find a smaller scale you can ask a better question for different question.
