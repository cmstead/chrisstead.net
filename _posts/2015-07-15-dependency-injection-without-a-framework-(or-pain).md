---
layout: post
title:  "Dependency Injection Without A Framework (Or Pain)"
date:   2015-07-15 10:00:39 -0700
categories: Coding, Design Patterns, Javascript, Unit Testing
---
{% raw %}
If you've come from one of those big name, big OO frameworks, you are probably used to the idea of an Inversion of Control (IoC) container and dependency injection. If you have worked with Angular, you're probably familiar with their dependency injection system. That's all great, but what if you aren't one of those people?

As it turns out, dependency injection (DI) just isn't that hard to wrap your head around. When you talk to someone who has worked with one of the big DI systems like AutoFac or Spring, it can sound like DI is an enormous deal and could take years of practice and experience to get comfortable with. Here's a little secret: there's no magic. It's not hard.

First, let's talk about what DI is; it's injecting stuff into your environment that you depend on. Dependency. Injection. That's it.

You're welcome.

Seriously, though, let's have a little look at what DI looks like in a very hand-wavy kind of way with a class in ES6.

```javascript
class Widget{

    constructor(componentFactory, widgetizer){
        this.componentFactory = componentFactory;
        this.widgetizer = wigetizer;

        this.context = {};
    }

    build(){
        let processedContext = this.widgetizer.processContext(context);
        //Here we do some stuff, maybe
        return this.componentFactory.create(processedContext);
    }

    setContextValue(key, value){
        this.context[key] = value;
    }

}
```

Obviously we know nothing about compontentFactory or widgetizer, but that's alright. All we really care about is that we know widgetizer has a method that processes a context and componentFactory has a create method that takes a processed context. The black boxes that are these objects really doesn't matter at this point in the application. All that matters is the API.

Most of the time when people see this kind of implementation, they construct each of the dependencies one of two ways. Either they instantiate the objects inside of their class or they instantiate their objects as they construct their class. To this I say 'gross.' The practice is so bad I can't bring myself to give an example.

Instead, here's how we are going to do this. We're going to use the factory pattern and create objects as we need them. Once we have a factory, we can build new widgets without breaking a sweat. Here's what that would look like.

```javascript
var widgetFactory = (function(){
    var componentFactory = new ComponentFactory(),
        widgetizer = new Widgetizer();

    function build(){
        return new Widget(componentFactory, widgetizer);
    }

    return {
        build: build
    };
})();

//Somewhere in the code
let myWidget = widgetFactory.build();
```

The code is so simple it practically writes itself. What's even better, if you are writing unit tests (you should be <a href="https://www.youtube.com/watch?v=iwUR0kOVNs8" target="_blank">testing all the f**king time</a>) then the setup for your tests becomes so easy even a junior Wordpress developer could figure it out. Here's a little Jasmine for flavor:

```javascript
describe('Widget', function(){
    var testWidget;

    beforeEach(function(){
        var componentFactory = { build: function(){ return {}; } },
            widgetizer = { processContext: function(){ return {}; } };

        testWidget = new Widget(componentFactory, widgetizer);
    });
});
```

Your unit test setup is seriously only 8 lines of executable code. Let me repeat that... EIGHT LINES. Since the instantiation of your dependencies is completely disconnected from the instantiation of your object, you can easily swap them out for testing, or replacement with a new, better version, or... whatever. There is no need to hunt down every place you instantiated your dependencies because, if they have dependencies of their own, you can just build factories for them, too.

Now, I will say that all of the factories of factories of factories is going to get a little heavy and become a burden on your immortal soul, but that's okay. I have another trick up my sleeve for you. Let's create a registry and automatically handle factories out of a central object. Automatic factory... AutoFac... hmm.

Public Service Announcement: Before we start into the next part, I want to make this clear -- If you aren't using a framework, you're building one.

Anyway, let's build our registry.

```javascript
//This quick hack is probably not safe for production code.
//Always understand and test code before you use it.
var objectRegistry = (function(){
    let registrations = {};

    function register(key, definition, dependencies){
        if(registrations[key] !== undefined){
            throw new Error(`${key} already exists in object registry.`);
        }

        registrations[key] = {
            definition: definition,
            dependencies: dependencies
        };
    }

    function build(key){
        let dependencyInstances = [null], //Trust me, you need this
            definition = registration[key].definition,
            dependencyList = registration[key].dependencies
            dependencyLength = dependencyList.length;

        for(let i = 0; i < dependencyLength; i++){
            let dependencyInstance = build(dependencyList[i]);
            dependencyInstances.push(dependencyInstance);
        }

        return new (definition.bind.apply(definition, dependencyInstances));
    }

    return {
        register: register,
        build: build
    };

})();
```

Creating a whole registry system really wasn't so bad. A little bit of recursion and line of slightly tricky Javascript later, you have a registry and object factory all set. Let's take a look at what our registration and instantiation code would look like now.

```javascript
objectRegistry.register('ComponentFactory', ComponentFactory, []);
objectRegistry.register('Widgetizer', Widgetizer, []);
objectRegistry.register('Widget', Widget, ['ComponentFactory', 'Widgetizer']);

//You want a widget? You got a widget.
let myWidget = objectRegistry.build('Widget');
```

A little recap, dependency injection is nothing more than providing your object with instances of the dependencies it needs. If your system is simple and your dependency tree is flat, you can easily get away with a factory to manage your dependency needs. If your system is more complex, you may need to create a registry to handle your components and the dependency tree. For better or worse, your dependencies are going to be complicated at that point anyway so avoid the pain.

The moral of this story is simple: never manage your dependencies along side the code that depends on them. Use factories to make your life better. If you take care of your dependencies, they will take care of you, so manage them wisely and profit.
{% endraw %}
    