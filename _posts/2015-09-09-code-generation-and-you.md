---
layout: post
title:  "Code Generation and You"
date:   2015-09-09 09:00:12 -0700
categories: Coding, Javascript, Unit Testing
---
{% raw %}
A friend of mine and I have discussed code generation on several occasions. We both agree that any enterprise development process should involve code generation, without exception. Though it is possible for development from scratch may not provide enough identifiable boilerplate to justify building templates for your code, the moment a framework is in use, you will, undoubtedly, have a certain amount of boilerplate introduced which must be set up repeatedly for each new file you create.

I work with a team using Angular. We have certain style requirements for code, and Angular has a particular way for handling the setup for every code component you would create. Beyond this, we have certain patterns which have been uncovered which introduces sets of modules which we need to construct, which introduces even more boilerplate.

I have timed the setup for a standard controller and the baseline unit tests which need to be created before any new development and on average it takes about 10 minutes to create all of the files and type all of the boilerplate. For a one-time cost, this is a minimal requirement, but when working in an enterprise environment, this can add up to many lost hours each month.

Here's the worst part of losing those hours: no problem was solved in that time.

This means for any given person who is creating a new module, they are performing rote behavior over and over without adding any real value to the project. Programmers are not paid to simply pound keys. If key pounding was all that was necessary to create an application, they would pay the smallest wage possible. Data entry is a good example of a key-pounding job. I think we can all agree that programming is more than simply performing data entry.

If this kind of rote file creation and boilerplate typing is the most basic of work, then why do we continue to do it? It seems as though rote behavior is something we often look to automate, which is why the profession exists in the first place.

I say, are we not programmers?

Automation is the name of our game, so it seems reasonable that we would want to take this wasted time and have the computer do it for us. This is what computers are for. Fortunately, this is a solved problem!

My team uses Yeoman to create our boilerplate. We have a defined application file structure, and the modules we create always have a certain amount of boilerplate associated with them. Yeoman is really, really good and taking templates and creating files with them. Here's an example of what an Angular controller (in ES6) looks like, with no interesting bits:

```javascript
(function(){
    'use strict';
    
    var moduleName = 'basic.module';
    angular.module(moduleName, []);
    
    class Controller{
        
        constructor($scope){
            'ngInject';
            
            this.$scope = $scope;
        }
        
    }
    
    angular.module(moduleName)
           .controller('basic.controller', Controller);
})();
```

That is about 20 lines of boilerplate, and we haven't even created the unit tests for it, yet! Beyond that, most controllers are associated with a view or a directive, which means we have at least two or three more files, full of boilerplate, left to create. If we were using ES5, there would be even more code here that produced nothing of new value. This is not the reason we got into programming.

Let's take a look at what a Yeoman template would look like instead.

```default
(function(){
    'use strict';
    
    var moduleName = '<%= controllerName %>.module';
    angular.module(moduleName, []);
    
    class Controller{
        
        constructor($scope){
            'ngInject';
            
            this.$scope = $scope;
        }
        
    }
    
    angular.module(moduleName)
           .controller('<%= controllerName %>.controller', Controller);
})();
```

This is so similar to the code we wrote above it's difficult to see where one leaves off and the other picks up. Here's the big win, though, We spent 10 or 15 minutes creating this template and now we never have to do it again!

Let's have a look at what the actual script looks like to populate this controller:

```javascript
'use strict';

var generators = require('yeoman-generator'),
    path = require('path');

module.exports = generators.Base.extend({

    constructor: function(){
        generators.Base.apply(this, arguments);
        this.argument('controllerPath', { type: String, required: true });
    },

    setup: function(){
        this.controllerName = this.controllerPath.split('/').pop();
        this.localPath = this.controllerPath.split('/').join(path.sep);
        this.config.save();
    },

    performCopy: function(){
        var controllerDestination = ['app', 'controllers', this.localPath].join(path.sep),
            controllerOutput = [controllerDestination, this.controllerName + '.js'].join(path.sep),
            context = {
                controllerName: this.controllerName
            };

        this.template('controller.js', controllerOutput, context);
    }
});
```

That's it. This might not be the fanciest Yeoman generator, but it reliably outputs a controller, with the correct parameters filled, every. single. time. With just a few more lines of code and another couple templates for our tests and views, we can type one line into the shell and get all of our working files spun up in seconds.

Let's do a rough, back of the envelope comparison so we can see the amount of time saved by using generators.  Let's say you have a small to medium-sized SPA you are building and it contains 150 Javascript source files. On top of that, you will have unit test files for each of those source files, so that's another 150 files. Atop all of that, you have views that associate with, let's say, 1/3 of those files, so that's another 50 files. Let's say, for argument's sake that it takes 3 minutes per file to generate these files by hand.

350 * 3 / 60 = 1050 / 60 = 17.5 hours

Now, let's assume you created each of these files with a generator, and let's assume your computer is slow, so it takes 1.5 seconds per file. Let's do a little more math so we can see how long this takes in comparison:

350 * 1.5 / 60 = 525 / 60 = 8.75 minutes

Let's take the value that hired says is average pay for a Javascript developer in Los Angeles, $130,000US/year, and divide it by the number of hours in the average work year, 2087. This means we have an hourly rate of about $62. Now, let's multiply that $62 by 17.5 and we get $1085. That's some expensive boilerplate!

With our same numbers, a developer is working for a little more than $1/minute to generate boilerplate.  Let's assume this same developer generated all of their code with templates instead of by hand.  Now our code cost around $10 to generate on a slow computer. That is TWO ORDERS OF MAGNITUDE different.

People like to talk about exponential growth and this is exactly what we have here.  Using code generation versus writing boilerplate by hand literally increases the cost of each base file exponentially by a factor of 2.  Hand-typed boilerplate is 100 times as expensive.

The short version of all of this is, if you aren't using code generation, you should be. If your manager tells you that it takes too much time to get code generation integrated into your project, just send them to me. Does it take too much time to decrease the cost and time of production by a factor of 100? I think not.


{% endraw %}
    