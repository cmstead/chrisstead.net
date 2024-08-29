---
layout: post
title:  "Node and Blended Tech Stacks"
date:   2015-12-04 11:00:12 -0800
categories: Design Patterns, General Blogging, Javascript, Site Architecture
---
{% raw %}
The longer people write single page applications, the more of them there are. The notion of a SPA harkens back to the concept of client server architecture, invented some time in the 1960's or 1970's. Now we build SPAs with services constructed with Java, C#, Scala and Node. Some of the stacks we use have names like MEAN, and others are a hand-selected composite of disparate technologies with no name.

I have quickly come to believe that any tech stack with a cute name is likely a solution looking for a problem.  Sometimes you want Mongo, Express, Angular and Node, but sometimes you want Couch, Ember, Spring and Java, do we call it JESC? Gross.

The important thing here is, we took Node out altogether for the Java stack. The benefit we get with choosing Java's history and broad set of packages, you lose the ability to share code between services and your client-side code.

We are in a unique situation in the current stage of technology where we can write a client application and provide it as a interpreted file which runs on a remote computer at request time. The code we can push to the client also will run on a server.  By ignoring this fact, we lose a great opportunity to write code once and share it client to server.

People call this isomorphic or universal Javascript.  If the services are all written in another language, there is no way to leverage the client code in the compiled server code.  There is, however, still a way to share business logic from the server layer with the client with a little fancy fingerwork.

First, let's write a little logic to verify a record doesn't have a quantity which is greater than the maxQuantity property. Once we have that simple function, we can then apply it across a list of records. 

```javascript
function validateQuantities (recordList) {
    return recordList.map(record => record.quantity <= record.maxQuantity)
                     .reduce((a, b) => Boolean(a &&b), true);
}
```

If this were in the client side code, and we wanted to do the same kind of check in Java, the code would look something like the following:

```java
Static Class Validator {
	
    public static boolean validateQuantities (List<Record> recordList) {
        return recordList.map((Record r) -> r.quantity <= r.maxQuantity)
                         .reduce(true, (a, b) -> a && b);
    }
	
}
```

Obviously this logic is almost the same, but two different developers probably would end up writing each of these.  This is problematic since we now have the same logic in two different files in two different languages.  This definitely a violation of DRY principles.  For a single validation like this, we can probably accept the duplicate code, but in large code bases, this kind of thing will go from being a one-off occurrence to a pervasive problem. Let's look at a way to consolidate this.
{% endraw %}
    