---
layout: post
title:  "(Not) Another JS Testing How-To"
date:   2015-06-10 16:10:26 -0700
categories: Coding, Javascript, Unit Testing
---
{% raw %}
There are lots of posts about how to write your first unit test in Jasmine or Mocha, and many of them draw directly from the Jasmine how to. Let's pretend, for a moment, that you are a developer who is already familiar with unit testing and what you really, REALLY need is a way to actually get things started without having to read a whole host of how-tos, setup documentation etc, when all you really want to do is get to unit testing.

First, let's get the Grunt versus Gulp conversation out of the way. I say neither! Though task runners can make CI much easier, this post is about getting a quick start into actually doing unit testing. By setting up a good, solid base configuration, moving to a task runner can be as simple as just applying the configuration you have with the runner you choose. Perhaps you like Tup...

Anyway, now that we have all that out of the way, let's talk tooling:

When we are done, this is the toolset you will have for your testing needs:
<ul>
	<li>Node and NPM</li>
	<li>Jasmine</li>
	<li>PhantomJS</li>
	<li>Karma</li>
</ul>

The biggest hurdle you have to cover to get everything up and running is to get Node.js up and running.  For most reading this article, all you have to do is visit the <a href="https://nodejs.org/" target="_blank">Node.js website</a> and click install. You will get the right binary and you will be off and running.

Once Node.js is installed, it is all downhill. I created a Github project that you can use to quickly get started with unit testing on just about any platform. You can either <a href="https://github.com/cmstead/jsTestDemo/archive/v1.0.0.zip">download the release</a>, or follow the directions below:

```shell
git clone https://github.com/cmstead/jsTestDemo.git
```

Once you've copied this repo one way or another, setup is really simple. You will need to install Karma and Phantomjs globally, so I created a handy one-time use script you can run. After the global installs are finished, you can run the project specific installer and you'll be ready to rock and roll. Open a console wherever you cloned the repository and run the following commands:

```shell
#This does your one-time setup
npm run-script globalinstaller

#This is your project-specific setup
npm install
```

No fuss, no muss. You're welcome. ; )

You'll see lots of packages stream by in the console. Once everything installs, you're ready to start testing. It's not exactly exciting bedtime reading, but I definitely recommend looking at the Jasmine <a href="http://jasmine.github.io/2.0/introduction.html" target="_blank">website</a>. Their documentation is written as a set of unit tests for the framework, which is novel, but it makes things a little hard to figure out on first read.

Let's have a look at a (barely) annotated first unit test:

<pre src="language:javascript">

describe('testObject', function () {

    var testObject;

    //test setup
    beforeEach(function () {
        testObject = {
            foo: 'bar',
            baz: 'quux'
        };
    });
	
    //test teardown
    afterEach(function () {
        testObject = null;
    });

    //A single unit test
    it('should be an object', function () {
        //The equivalence of an assertiion
        expect(typeof testObject).toBe('object');
    });
});

```

When you start writing unit tests for your code, be sure to review the Karma configuration file in the spec folder.  Most settings can be left exactly as they are, but the paths should be updated to match your project structure.  I've included the code below so you can see the lines which need to be updated:

```javascript
files: [
            //Uncomment the following line and change the directory
            //to match your project structure.
            //'../scripts/**/*.js', //change me
            './**/*.spec.js'
        ],

        preprocessors: {
            //Change this to match your project directory structure
            '../scripts/**/*.js': ['coverage'] //change me too
        }
```

Although this isn't the snappiest blog post I have written, I have gone through this process so many times I have created templates for different kinds of projects just to save time and simplify the process of setting up unit tests, linting, ES6 transpilation, code coverage, etc.

With so many different configuration options, limited documentation and roadblocks I have encountered as I have gotten systems set up, I wanted to put something together that might help save someone else a little pain and suffering. If you have feared unit testing in Javascript because of setup troubles, consider this your personalized invitation. Unit test your code and make the web a better place!
{% endraw %}
    