---
layout: post
title:  "Getting Started Writing Visual Studio Code Extensions: Action Handlers"
date:   2016-01-20 16:19:50 -0800
categories:
    - General Blogging
    - Internet Culture
    - Javascript
---
{% raw %}
I started writing a Visual Studio Code extension about two and a half weeks ago and, as is little surprise, writing an extension with new, uncharted functionality takes more knowledge than you can find in the basic tutorial for creating a hello world extension. As I learned, I thought, I should write what I learned down so other people would have a little more illumination than I had.

If you haven't read the Hello World tutorial, <a href="https://code.visualstudio.com/docs/extensions/example-hello-world" target="_blank">you should</a>. It has a handy step-by-step recipe for creating a baseline extension. No, really, go read it. I'll wait.

Great, now that you have Hello World set up, we're ready to start really building something. So the first thing that I ran into was I wanted to change things a little and see if everything still worked. Text changes were obvious, so I decided I wanted to scrape something out of the editor and show that instead.

I made small changes... and broke the extension.

The first challenge I ran into is, these extensions give you almost no visibility into what you are doing.  You can use the debugger, but, if you are like me, you probably have one screen to work on, so you will have a lot of flipping back and forth to spot the broken stuff.  The best friend you have during this entire process is your debugger output. Log to it. A lot.

This is kind of like old school web development. If you want to see what you are doing, use console log. If you want to see what the data looks like you are tinkering with, use console log.  When you really need to dig deep, hey, you're already in an editor!

Anyway, like I said, I broke my extension right away. The first thing I did wrong was I messed up the action name. Don't worry about what a disposable function is for now. We can cover that next time.  The important issue is I mismatched my action name. Let's take a look at a bit of the code in my main extension file.

```javascript
context.subscriptions.push(vscode.commands.registerCommand('cmstead.jsRefactor.wrapInCondition', function () {
    wrapInCondition(vscode.window.activeTextEditor);
}));
```

<h3>Action handler names</h3>

Our action name tells VS Code what our action is named. Our action name is shared between the extension file where we set up our action behaviors and two locations in our package file. I may have missed it, but I didn't see anything in the documentation regarding lining up the name in several locations. Here's what it looks like in the package file:

```json
"activationEvents": [
    "onCommand:cmstead.jsRefactor.wrapInCondition"
],
"commands": [
    {
        "command": "cmstead.jsRefactor.wrapInCondition",
        "title": "Wrap In Condition",
        "description": "Wrap code in a condition block"
    }
]
```

All of these separate lines need to match or when you try to test run your extension, your new action won't work. This is surprisingly hard to debug. There is no unit test, scenario or any other process to properly check that all of the command name strings properly match. This is probably the first problem you are going to run into.

If you try to run a named action that isn't fully declared, you will get an error.  "No handler found for the command: 'cmstead.jsRefactor.wrapInCondition'. Ensure there is an activation event defined, if you are an extension."

The takeaway of today's post is this: if you see this handler error, check that your action is declared in your extension Javascript, in actionEvents and in commands.  If any of these identifiers are missing, your action will fail.  By double checking your action declarations, you will have a smoother experience getting your extension up and running. Happy coding!
{% endraw %}
    