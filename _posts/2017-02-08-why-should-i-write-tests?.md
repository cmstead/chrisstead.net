---
layout: post
title:  "Why Should I Write Tests?"
date:   2017-02-08 08:00:34 -0800
categories: Automated Testing, Coding, General Blogging, Javascript, Testing
---
{% raw %}
There has been an ongoing discussion for quite some time about whether automated tests are or are not a good idea.  This is especially common when talking about testing web applications, where the argument is often made that it is faster to simply hack in a solution and immediately refreshed the browser.

Rather than trying to make the argument that tests are worthwhile and they save time in the long run I would rather take a look at what it looks like to start with no tests and build from there.  Beyond the case for writing tests at all, I thought it would be useful to take a look at the progression of testing when we start with nothing.

Without further ado, let's take a look at a small, simple application which computes a couple of statistical values from a set of sample numbers. Following are the source files for our stats app.

<script src="https://gist.github.com/cmstead/cb4328c627fedb3ccad9467e68af4416.js"></script>
<script src="https://gist.github.com/cmstead/837bcf73f87136bd6fe16eb6b25758f5.js"></script>
<script src="https://gist.github.com/cmstead/53f684144a13d4d1b213c06c32594570.js"></script>

Now, this application is simple enough we could easily write it and refresh the browser to test it.  We can just add a few numbers to the input field and then get results back.  The hard part, from there, is to perform the computation by hand and then verify the values we get back.

[caption width="390" align="aligncenter"]<img src="http://www.chrisstead.net/assets/uploads/2017/02/ui-manual-test.png" width="390" height="190" alt="Example of manual test output" class /> Manual test example[/caption]
<br clear="all"/>

Doing several of these tests should be sufficient to prove we are seeing the results we expect.  This gives us a reasonable first pass at whether our application is working as it should or not.  Beyond testing successful cases, we can try things like putting in numbers and letters, leaving the field blank or adding unicode or other strange input.  In each of these cases we will get NaN as a result.  Let's simply accept the NaN result as an expected value and codify that as part of our test suite.  My test script contains the following values:

<table>
<tr>
<th>Input</th>
<th>Mean</th>
<th>Standard Deviation</th>
</tr>
<tr>
<th colspan="3">Success Cases</th>
</tr>
<tr>
<td>1, 2, 1, 2</td>
<td>1.5</td>
<td>0.5</td>
</tr>
<tr>
<td>1, 2, 3, 1, 2, 3</td>
<td>2</td>
<td>0.816496580927726</td>
</tr>
<tr>
<th colspan="3">Failure Cases</th>
</tr>
<tr>
<td></td>
<td>NaN</td>
<td>NaN</td>
</tr>
<tr>
<td>a, b</td>
<td>NaN</td>
<td>NaN</td>
</tr>
</table>

Obviously, this is not a complete test of the system, but I think it's enough to show the kinds of tests we might throw at our application. Now that we have explored our application, we have a simple test script we can follow each time we modify our code.

This is, of course, a set up. Each time that we modify our code, we will have to copy and paste each input and manually check the output to ensure all previous behavior is preserved, while adding to our script.  This is the way manual QA is typically done and it takes a long time.

Because we are programmers, we can do better. Let's, instead, automate some of this and see if we can speed up the testing process a little.  Below is the source code for a simple test behavior for our single-screen application.

<script src="https://gist.github.com/cmstead/6547be46df5a92dbfa5f7b7989bcd701.js"></script>

With our new test runner, we can simply call the function and pass in our test values to verify the behavior of the application.  This small step helps us to speed the process of checking the behaviors we already have tests for and we only need to explore the app for any new functionality we have added.

Once the app is loaded into our browser, we can open the console and start running test cases against the UI with a small amount of effort.  The output would look something like the image below.

[caption width="518" align="aligncenter"]<img src="http://www.chrisstead.net/assets/uploads/2017/02/simple-ui-test-runs.png" width="518" height="238" alt="Single-run tests scripted against the UI" class /> Single-run tests scripted against the UI[/caption]
<br clear="all"/>

We can see this adds a certain amount of value to our development effort by automating away the "copy, paste, click, check" tests we would be doing again and again to ensure our app continued to work the way we wanted it.  Of course, there is still a fair amount of manual work we are doing to type or paste our values into the console.  Fortunately we have a testing API ready to use for more scripting.  Let's extend our API a little bit and add some test cases.

<script src="https://gist.github.com/cmstead/418dd9844292709cdfb173a8754141c8.js"></script>

Now, this is the kind of automated power we can get from being programmers.  We have combined our test value table and our UI tests into a single script which will allow us to simply run the test suite over and over.  We are still close enough to the original edit/refresh cycle that our development feels fast, but we also have test suites we can run without having to constantly refer back to our test value table.

As we write new code, we can guarantee in milliseconds whether our app is still working as designed or not.  Moreover, we are able to perform exploratory tests on the app and add the new-found results to our test suite, ensuring our app is quick to test from one run to the next.  Let's have a look at running the test suite from the console.

[caption width="704" align="aligncenter"]<img src="http://www.chrisstead.net/assets/uploads/2017/02/batched-ui-test-runs.png" width="704" height="198" alt="Test suite run from the browser console" class /> Test suite run from the browser console[/caption]
<br clear="all"/>

Being able to rerun our tests from the console helps to speed the manual write/refresh/check loop significantly.  Of course, this is also no longer just a manual process.  We have started relying on automated tests to speed our job.

This is exactly where I expected we would end up.  Although this is a far cry from using a full framework to test our code, we can see how this walks us much closer to the act of writing automated tests to remove manual hurdles from our development process.

With this simple framework, it would even be possible to anticipate the results we would want and code them into the tests before writing our code so we can simply modify the code, refresh and run our tests to see if the new results appear as we expected.  This kind of behavior would allow us to prove we are inserting required functionality into our programs as we work.

Though I don't expect this single post to convince anyone they should completely change the way they develop, hopefully this gives anyone who reads it something to think about when they start working on their next project, or when they go back to revisit existing code.  In the next post, we'll take a look at separating the UI and business logic so we can test the logic in greater depth. Until then, go build software that makes the world awesome!
{% endraw %}
    