---
layout: post
title:  "Speeding Up Your App with Request Caching"
date:   2015-09-23 09:00:56 -0700
categories: Algorithms, Coding, Data Structures, Design Patterns, Javascript, User Experience
---
{% raw %}
Recently in my Mainstay Monday posts I've talked about creating linked lists and queues in Javascript. Each of those topics is so dense that just writing about the basics of creating and using them took full blog posts.  Really all of that was the lead up to today's post.

I've worked in a couple of different, large single page applications and in every one I have, ultimately, encountered a need to cache requested data and respond to multiple functions needing that data before the original request is complete. No promise framework or other specialized library ever fit the need because, really, the call should only ever be made once.

I've had team members solve this problem in a naive way and simply make the call over and over again. What happens, though, if the data you're requesting is large and takes a long time to retrieve? This means you have now introduced multiple seconds of latency into your app. I think we can all agree that waiting for 5-20 seconds for data to come back is about the worst thing you can do to a user. They get frustrated and confused. They think the app has stalled or their browser has crashed.

<strong>Problem #1:</strong> I need to store the data when I get it.

This is easy. If you just need to store the data and retrieve it upon request, you can create a hashmap with keys and values. Now, when a request comes in, first your data service will look in the hashmap and see if the data already exists. If not, you go fetch it, bring it back and then, upon return, you hand the data back into your app.

This is the most basic kind of cache and it will suffice for calls that are made infrequently. Initial data for your app to bootstrap can be handled this way. Typically a single request will be made and you can just go fetch it, then cache it. If the app wants to rebootstrap for some reason, the data is in memory and you can skip the wire call.

The more challenging issue is this: what if you have data that is requested often?

<strong>Problem #2:</strong> I need cached data to only be requested once, but the program asks for it everywhere.

This is where it gets really interesting. It's quite common for a program to need to refer back to permissions and user capabilities often. ACL tables can get quite large and it is preferable to only request these once.  The problem is, the program will need access, possibly multiple times, for even a single page. This means your application will request the same data multiple times before the service you're accessing can return.

I've seen a page make 100+ requests at the same time to get data from a service. It's not pretty.

Fortunately, queues provide the solution for this. We can queue all of the callbacks that our application generates and resolve them at once when we get the data back. This means we could, in theory, request the data on app bootstrap and never request it again. Worst case scenario is we request it just in time and the user has to wait once.

This is where the real meat of the problem is. We need to construct a queue backed request system with a cache layer to manage our data. This all sounds a bit scary but, once we break it down, it's all just bite-sized pieces we can easily manage. We have even already decided on the data cache structure.

Before we start down this road, I would like to point out, a friend of mine introduced me to a rule I use all the time. It makes testing easier and it makes coding easier.

<strong>Never create and use an object in the same place.</strong>

The easiest way to answer this rule, for our current problem is with the factory pattern. Our factories are going to be relatively uninteresting, but because it creates good seams to work with in our code, and it does a nice job of separating our concerns so we can reasonable, correct abstractions.

So, since we know our mechanism is going to be queue-backed, we need a linked list. I went ahead and created a linked list item factory as a gist. It creates generic linked list items, so you could really use it for anything. We're going to use it to construct our queue.  Here's our first factory, linked list items:

<script src="https://gist.github.com/cmstead/97de395eacc0c18c8395.js"></script>

Once we have our linked list item factory set to go, we are ready to construct our queue.  Once again, we are going to want to work with a factory. Our queue logic comes straight out of the queues post, it's just wrapped up in a factory so we can easily separate it and work with it alone. Here's our queue:

<script src="https://gist.github.com/cmstead/d779522f43c54374cd9e.js"></script>

Now is where we start breaking new ground. Our cache, and its factory, are going to handle a few things. Consider this a little like learning to juggle. We have to get things in the right order, and it's all interconnected, so you might want to read the code a couple times.  Let's have a look at the cache factory and then we can talk about it.

<script src="https://gist.github.com/cmstead/163632c67ba7d6bebeeb.js"></script>

The short and sweet version of this is, we receive a local request for data, if it is in the cache, we resolve the request and move on. If we don't have the data, we queue the callback with any other outstanding callbacks and wait for our service to return the data we need. In order to ensure we don't have overlapping concerns, we rely on a cache instance per unique data request.  Basically, this means if you make a request with { id: 1 }, it should always go through the { id: 1 } cache. This way if your application needs to come back later and request data using a different id, it can without colliding with the original data cache.

To expand this idea, let's take a look at the steps that happen.

First, we have a cache factory. The factory takes in a request function, which it assumes only needs a callback to be complete. With this function, it news up an instance of the cache object. By using a factory, we can guarantee instantiation correctly, every time. Here's what it would look like in code:

```javascript
permissionDataService = {
    localCache: {},
    get: function(id, callback){
        if(!Boolean(localCache[id])){
            this.addCache(id);
        }

        localCache[id].request(callback);
    },

    addCache: function(id){
        var requestMethod = permissionService.get.bind(permissionService, id);
        localCache[key] = cacheFactory.build(requestMethod);
        
    }
};
```

I'm assuming permissionService is already created and get is a method to perform a standard HTTP GET. Honestly, this could be anything, just as long as all of the correct parameters are bound.

It's important to note that no request has been made yet. All we have done is create a cache we can make requests against. Our app is still sitting there patiently awaiting instructions for what to do. This entire setup process takes microseconds to complete and you now have everything you need to manage bursts of traffic gracefully.

Once we have our cache ready to go, we can make a whole bunch of calls and it will only make a single call across the wire. This gives us a major performance boost, which allowing our app to carry on blissfully unaware that anything has changed. Here's what it looks like:

```javascript

// Deep in a script somewhere
permissionDataService.get(123, checkCredentials);

// Somewhere else
permissionDataService.get(123, isAllowedToView);

// Some other widget wants to know, too
permissionDataService.get(123, setDisplayState);

```

The first request, regardless of which it is, will cause our service to create the cache. Each subsequent call will just end up the queue. Once the request comes back from our remote service, all callbacks will be resolved in the order they were received. Even better, if something else is kicked off in the meanwhile, this will simply be added to the queue and all is set and ready to go.

Adding this kind of data management to an application adds some complexity, so it may not be worthwhile to manage all data requests this way, however, when a particular behavior starts making lots of requests across the wire, this is a great way to throttle the requests back and improve efficiency in your app. The best part, as long as you are working modularly, is that you will only need to introduce changes in one place.  This means the bulk of your application will remain precisely the way it is today while repairing a bottleneck that can slow your app down and frustrate users. So, get to profiling your apps and cache some data.
{% endraw %}
    