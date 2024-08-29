---
layout: post
title:  "Visual Studio Code Extensions: Editing the Document"
date:   2016-02-17 08:00:23 -0800
categories:
    - Coding
    - General Blogging
    - Internet Culture
    - Javascript
---
{% raw %}
I have been supporting an extension for Visual Studio Code for about a month now. In that time I have learned a lot about building extensions for an editor and static analysis of Javascript. Today is more about the former and less about the latter.  Nevertheless, I have found that creating snippets, modifying the status bar and displaying messages is trivial, but modifying the current document is hard when you don't know how to even get started.

The other important thing I have noted about writing extensions for VS Code is, although the documentation exists and is a, seemingly, exhaustive catalog of the extension API, it is quite lacking in examples and instructions. By the end of this post I hope to demystify one of the most challenging parts of document management I have found so far.

<h3>The VSCode Module</h3>

The first thing to note is anything you do in VS Code which interacts with the core API will require the vscode module. It might seem strange to bring this up, but it is rather less than obvious that you will have to interact with the vscode module often.

Under the hood, the vscode module contains pretty much everything you need to know about the editor and its current state. The module also contains all of the functions, objects and prototypes which you will need in order to make any headway in your code whatsoever.  With that in mind, there are two ways you can get this module or any of its data into your current solution.  The first option is to require it like any other node module.

```javascript
var vscode = require('vscode');
```

As of the latest release of VS Code, you now have to explicitly specify the vscode module in dev-dependencies in your packages.json file. Below is what my dependencies object looks like:

```javascript
  "devDependencies": {
    "chai": "^3.4.1",
    "mocha": "^2.3.4",
    "mockery": "^1.4.0",
    "sinon": "^1.17.2",
    "vscode": "^0.11.x"
  },
```

For now, don't sweat the other stuff I have required. It is all test library stuff, which we will look at in a future post. Anyway, that last line is my vscode requirement. By adding this dependency, vscode will be available in your development environment, which makes actually getting work done possible. To install and include vscode, copy and paste the following at the command line inside your extension project:

```default
npm install vscode --save-dev
```

<h3>Making a Document Edit</h3>

The reason it was important to briefly cover the actual vscode module is, we are going to live on it for the rest of the post. It will be in just about ever code sample from here to the end of the post.

So...

By reading the VS Code extension API it is really, really easy to get lost when trying to push an edit into the view. There are, in fact, 5 different object types which must be instantiated in order and injected into one another to create a rather large, deeply nested edit object hierarchy. As I was trying to figure it out, I had to take notes and keep bookmarks so I could cross-compare objects and sort out which goes where.

I will start off by looking at the last object in the sequence and then jump to the very first objects which need to be instantiated and work to our final implementation. When you want to make an edit to the code in the current document, you need to create a new WorkspaceEdit which will handle all of the internal workings for actually propagating the edit.  This new WorkspaceEdit object will be passed, when ready, into an applyEdit function.  Here's what the final code will look like, so it is clear what we are working toward in the end:

```javascript
    function applyEdit (vsEditor, coords, content){
        var vsDocument = getDocument(vsEditor);
        var edit = setEditFactory(vsDocument._uri, coords, content);
        vscode.workspace.applyEdit(edit);
    }
```

In this sample code, the _uri refers to the document we are interacting with, coords contains the start and end position for our edit and content contains the actual text content we want to put in our editor document. I feel we could almost spend an entire blog post just discussing what each of these pieces entails and how to construct each one. For now, however, let's just assume the vsEditor is coming from outside our script and provided by the initial editor call, the coords are an object which we will dig into a little more soon, and content is just a block of text containing anything.

<h3>The Position Object</h3>

In our previous code sample, there is a function called setEditFactory. In VS Code there are two types of document edits, set and replace. So far I have only used a set edit and it seems to work quite nicely. With that in mind, however, there is a reason we are using a factory function to construct our edit. A document edit contains so many moving parts it is essential to limit exposure of the reusable pieces to the rest of the world since they largely illuminate nothing when you are in the middle of trying to simply add some text to the document.

Let's actually dig into the other end of our edit manufacture process and look at the very first object which need to be constructed in order to actually produce a change in our document: the position. Every edit must have a position specified. Without a position, the editor won't know where to place the changes you are about to make.

In order to create a position object, you need two number values, specifically integers. I'm not going to tell you where, exactly,  to get these numbers because that is really up to the logic of your specific extension, but I will say that a position requires a line number and a character number. If you are tinkering with code in your own extension, you can actually make up any two numbers you want as long as they exist as coordinates in your document. line 5, char 3 is a great one if it exists, so feel free to key the values in by hand to get an idea of how this works.

Anyway, once we have a line and a character number, we are ready to construct a position.

```javascript
    function positionFactory(line, char) {
        return new vscode.Position(line, char);
    }
```

That's actually all there is to it. If you new up a Position object with a line and character number, you will have a new position to work with in your extension.

<h3>The Range Object</h3>

The next object you will need to display your document change is a range object. The range object, one would think, would simply take bare coordinates.  Sadly this is not the case. What range actually takes is a start and end position object. The range tells VS Code what lines and characters to overwrite with your new content, so it must go from an existing line and character to an existing line and character, otherwise known as a start position and end position. Here's how we create a range object.

```javascript
    function rangeFactory(start, end) {
        return new vscode.Range(start, end);
    }
```

So far our factories are nice and clean, which makes their intent pretty obvious. This is handy because it gets really strange and hard to follow quickly without some care and feeding of clean code. Anyway, our range takes two positions, so we provide them as named above, start and end.

<h3>The TextEdit Object</h3>

The TextEdit object is where things start to really come together. Now that we have a range made of two positions, we can pass our range and our text content through to create a new edit object. The edit object is one of the key objects we need to actually perform our document change. It contains almost all of the necessary information to actually make a document change.  Let's look at how to construct a TextEdit object.

```javascript
    function textEditFactory(range, content) {
        return new vscode.TextEdit(range, content);
    }
```

Keep in mind, though we have only written a few short lines of code we have now constructed an object tree containing 4 nested objects. Are you still keeping up?

<h3>Building an Edit</h3>

Now that we have gotten through the nitty gritty of constructing individual objects for our tree, we are ready to actually build a full edit and pass it back to the caller. This next function will make use of our factories in order to construct an object containing all dependencies in the right nesting order.

Does anyone else feel like we are putting together a matryoshka doll?

Anyway our next function will also follow the factory pattern we have been using so we get a clean string of function calls all the way up and down our stack which will, hopefully, keep things easy to follow.

<pre class="language">
    function editFactory (coords, content){
        var start = positionFactory(coords.start.line, coords.start.char);
        var end = positionFactory(coords.end.line, coords.end.char);
        var range = rangeFactory(start, end);
        
        return textEditFactory(range, content);
    }
```

As you can see, we are assembling all of the pieces and the stacking them together to build our document edit. The fully constructed edit will contain all of the instructions VS Code needs to modify the selected document. This will be useful as we construct our next object to interact with.

Yes, there's more.

<h3>The WorkspaceEdit Object</h3>

In order to introduce our edit into a document, we need to build a workspace edit to interact with. This workspace edit is, you guessed it, another object. A workspace has no required dependencies up front, so we are safe to construct this bare and interact with it later.  Here's our factory:

```javascript
    function workspaceEditFactory() {
        return new vscode.WorkspaceEdit();
    }
```

This new workspace edit is where we will do our final setup before applying our edits into the document we started with, originally. Once we have a workspace edit, we can perform behaviors like set and replace.  Here's our last factory of the day, where we actually kick off the process. This actually brings us full circle, back to our edit application we looked at in the very first example.  Let's look at the code.

```javascript
    function setEditFactory(uri, coords, content) {
        var workspaceEdit = workspaceEditFactory();
        var edit = editFactory(coords, content);

        workspaceEdit.set(uri, [edit]);
        return workspaceEdit;
    }
```

Now we can see where all of our coordinates, content and that mysterious uri went. Our setEditFactory takes all of our bits and pieces and puts them together into a single edit which we can then apply to our workspace edit object, which is then passed back for the program to operate on.

<h3>Summary</h3>

Even after having figured this out from the VS Code documentation and implementing it in an extension, this is a lot to keep in your head. The bright side of all this work is, if done correctly, this can be wrapped up in a module and squirreled away to just be used outright. The surface area on this module is really only a single function, setEditFactory. This means, once you have it running correctly, it should be simple to call a single function with the right parts and get back a fully instantiated, usable object which can be applied to the editor.

Hopefully this is useful for someone. Identifying this and putting it all together with clear intent was a challenge with no examples. If there were ever one place I would complain about VS Code it is the documentation. I hope my post helps clear up the obscurities and makes it easier for people to dig into making their own extensions or contributing to an extension someone else has built.
{% endraw %}
    