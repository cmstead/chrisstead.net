---
layout: post
title:  "REST Verbs and HTTP"
date:   2015-11-11 08:00:10 -0800
categories: Coding, Foundation, Javascript
---
{% raw %}
If your journey to programming was anything like mine, you started by looking at HTML forms to understand data transfer across HTTP. There is a lot of talk about REST and what it means on the web. I have heard people talk about the formatting of URLs and the return behavior of documents. I have even heard people discuss REST and its relation to micro-services or hypermedia API behaviors.

I am not going to get into the deep philosophical debate about what properties emerge from REST, nor will I discuss how to break services down or any other oddball topics which diverge from what someone interacting with REST should understand to begin with. Instead, let's discuss what the REST acronym means, what REST verbs are and how we would interact with them through XMLHttpRequest (XHR).

<strong>What REST Is</strong>

REST stands for Representational State Transfer. What this means is, REST provides a standardized way to take state (user interaction created data) and transmit it across the Internet. I say "the Internet" because there is no requirement that we interact only with the standard HTTP port, 80. We can, theoretically, make an HTTP request to any port listening for and accepting HTTP requests conforming to the REST protocol.

Blah blah blah, what this really means is using the HTTP standard, if a service accepts requests passed with GET, POST, PUT or DELETE calls, it is probably RESTful. The primary reason I say it is "probably" RESTful is each of those four verbs come with a set of standards which define how the service should behave when a request is made.

Before we go further, let's create an XHR script so we can look at how we can make browser-side requests to RESTful services. I am offering this script with no explanation, but you are welcome to use it as you see fit.  I am also not promising this script is particularly robust, reliable or works at all, so use it for anything other than learning at your own risk.

<script src="https://gist.github.com/cmstead/2f0769dae8c9d7e4165a.js"></script>

Now that we have that lined up, let's have a look at making HTTP requests. There are four common methods we can use for sending HTTP requests, GET, POST, PUT and DELETE. Although there are other request types we're going to stick the common ones for now.

When working with REST verbs, there are certain rules we must follow. Different server technologies may or may not allow violation of the core REST rules, but when working in a RESTful system, it is best to know the conventional uses and deviate only as much as necessary to match your company or team conventions.

Before we dive into REST requests, I would recommend reviewing my post on <a href="http://www.chrisstead.net/archives/970/urls-for-web-developers/" target="_blank">URLs for web developers</a>. This post assumes you are comfortable with the way URLs and their structure impact HTTP requests.

<strong>GET</strong>

GET requests are the most common and best known requests used on the web. GET requests are used all the time to view web sites, get static files and retrieve data from service endpoints. You used a GET request to view this page and all of the links on this page will initiate a new GET request to retrieve a different page.

GET requests can only use a request URL to capture data from a server. Effectively, a GET request will use all parts of the URL, though it is not allowed to use any other means to communicate information about the resource it requests. This means any body information sent to the server will likely be ignored.

Suppose we used our XHR script to make a request, let's have a look at what the request would look like.

<pre class="language=javascript">
xhr.get('https://www.google.com/webhp', function (error, result) {
    if(!Boolean(error)) {
        console.log(result);
    }
}, { data: { q: 'chris stead programmer' } });

// Outputs a whole bunch of HTML

// final url -- https://www.google.com/webhp?q=chris%20stead%20programmer
```

We can see our request uses everything except the fragment, but it passes our data as a query string. This is the kind of behavior we should always expect with a GET request. HTML requests allow bodies to be included, however, if our data were to be included in the body, however, our GET URL would simply be https://www.google.com/webhp which would display the Google search page instead of the search results we wanted.

When a GET request is sent, the browser constructs an HTTP header which provides all of the information the server needs to resolve the request correctly.  Here's what a GET header looks like.

<pre class="language=default">
GET /webhp?q=chris%20stead%20programmer\n
host: www.google.com\n
\n
```

The new line character (\n) in these header examples is added to demonstrate the number of new lines that are actually part of the HTTP header. We can see the very first element in our request is the type of request, specifically GET. This is the key player in our REST methodologies.

The short version of this is, GET returns a document or resource. It always does. If something fails along the way, our browser will tell us with a different document.  Ultimately, GET always gets something, it should never write, update or delete.

<strong>DELETE</strong>

DELETE is the close cousin to the standard GET request. DELETE requests, much like GET requests, do not contain a body. In the standard REST behavior, any body in a GET or DELETE request should be ignored.  As it turns out, it is entirely likely you could make a DELETE request against your favorite website and the server would respond with the HTML content you get with a GET request.

What makes DELETE special is the way the server responds to the request. If a DELETE request is made against a service which accepts DELETE, it is likely you will receive an error.  This is due to the fact that DELETE is typically a privileged (authorization-restricted) command.

Let's construct a valid DELETE request with our XHR service with a header.  For the sake of this discussion, I am assuming the service we are calling is completely insecure and accepts credentials as clear text in the header.

```javascript
xhr.delete('http://www.insecure-service.com/", function (error, result) {
    if(!error) {
        console.log('Our record was deleted!');
    } else {
        console.log('Something bad happened.');
    }
}, {
    data: { id: 17 },
    headers: { credentials: 'chris@insecure-service.com;badpassword' }
});
```

This will send a request with extra header information.  I am not promising anything about the way credentials should be sent.  Every service will work differently.  That said, this new request is still informative. We can see credentials being provided and an id is given to tell our service what to delete.

Our callback also makes an assumption which can be considered common. DELETE requests often do not provide any data in their response body.  The response code may actually be <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.2.5" target="_blank">204 No Content</a>. This tells us the request was successful, but there is no content to return, so the response body is empty.  Let's take a look at the request and response headers.

DELETE Request:

```default
DELETE /?id:17 HTTP/1.1
host: www.insecure-service.com
credentials: chris@insecure-service;badpassword

```

DELETE Response:

```default
HTTP/1.1 204 No Content
Date: Sat, 07 Nov 2015 20:59:30 GMT
... More header info

```

If we were to make a GET request after deleting record at id 17, we should get the following response:

```default
HTTP/1.1 404 Not Found

<html>
<body>
That record isn't here.
</body>
</html>

```

The HTML may vary, but the header should contain a <a href="http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html#sec10.4.5" target="_blank">404 status code</a> to inform the browser or client application that the record does not exist at that address.

<strong>POST</strong>

POST requests are primary request type for sending large amounts of data in a request body. Typically in a RESTful service, POST requests are used for creating a record or asset.  Our xhr service does not support all the ways information could be sent in a request body. Instead we are set up, primarily, to send JSON blobs.

JSON has become one of the most common ways to transmit information to and from web services. Most languages support JSON natively or they have a well-used, stable library for managing and manipulating JSON data.

Let's create a new POST request and create some data we can interact with. Much like DELETE, we are going to treat POST as a privileged endpoint and send our credential data.

```javascript
xhr.post('http://www.insecure-service/', function (error, response) { /* our function body */ },
{
    data: {
        foo: ['bar', 'baz', 'quux'],
        parentId: 97
    },
    headers: {
        credentials: 'chris@insecure-service.com;badpassword'
    }
});
```

Our post request will generate a rather different request structure. We will have the request header as we have seen before, but this will also pass a request body, which contains all of the information we added in the data property.  Let's take a look.

```default
POST / HTTP/1.1
host: www.insecure-service.com
credentials: chris@insecure-service.com;badpassword

{"foo":["bar","baz","quux"],"parentId":97}

```

This is actually quite similar to the response message we received when we got our 404. The header contains all of the important HTTP request information and the body contains all of the representational state, i.e. user data. Our response message may vary, but, traditionally, a representation of the record id, or some other identifying information is returned with the success response.

```default
HTTP/1.1 200 OK
asset: http://www.insecure-service/?id=103

{ id: 103 }

```

The asset URL may or may not exist in the header.  If a service provides this kind of header information is is referred to as an affordance.  Essentially, an affordance in REST and hypermedia APIs is essentially a URL to retrieve the record the service just created. This makes it convenient for the program to capture the URL and immediately request the asset from the service via GET. The JSON blob in the body contains the record ID. This service is assuming, since all data sent to create the record was assembled by the client, the only information the client doesn't currently have is the new record id.

We can use the provided ID to create a delete request if the user decides they don't want to persist that data, or we can use it to update the information when the user changes their input options.

<strong>PUT</strong>

The final REST verb we are taking a look at is PUT. PUT is the update variation on POST.  Some older, or less robust services may either not recognize PUT or they may treat PUT in the same way they handle POST requests. In either of these cases, they are not adhering to common modern expectations of REST endpoints.

It's important to understand the original specification for REST does not necessarily cover or agree with what current development practices enforce.  This means, what most places refer to as REST may not match what the originator intended, but understanding what most developers consider REST behaviors today is far more important to effective, new development than adhering to the original documentation.

PUT requests function almost identically to POST requests from the client perspective. We can actually copy our original request, make a couple small modifications and update the information stored on the server with any changes we like.  Let's take a look.

```javascript
xhr.put('http://www.insecure-service/', function (error, response) { /* our function body */ },
{
    data: {
        id: 103
        foo: ['bar', 'baz', 'quux', 'test1', 'test2', 'test3']
    },
    headers: {
        credentials: 'chris@insecure-service.com;badpassword'
    }
});
```

This xhr request would create the following HTTP request.  Please note, we did not specify a parentId.  We will take a look at how that works out at the service layer in a moment.

```default
PUT / HTTP/1.1
host: www.insecure-service.com
credentials: chris@insecure-service.com;badpassword

{id:103,"foo":["bar","baz","quux","test1","test2","test3"]}

```

Let's send a get request and see what we get back from the service.

```javascript
xhr.get("http://www.insecure-service.com/", function (error, response) {
    if (!error) {
        console.log(JSON.parse(response));
    }
}, { data: { id: 103 } });

// {
//     id: 103,
//     foo: [
//         'bar',
//         'baz',
//         'quux',
//         'test1',
//         'test2',
//         'test3'
//     ],
//     parentId: 97
// }
```

The parentId property was persisted as it was originally defined.  This behavior is common for services supporting PUT. Typically, the only properties in a record which get updated are the ones which are defined in the request. This provides security when sending data that, if the entire set of data is not known, a property isn't deleted or modified accidentally.

<strong>Conclusion</strong>

This was a rather long post for what ends up being a relatively simple concept.  The big take-away from this discussion is the interrelation between the kinds of requests that can be made and how they are interpreted and managed through HTTP and the service layer.

HTTP supports a variety of verbs which reach beyond the list of four we reviewed in this post, but these are the most common. The next time you make an asynchronous request to a server somewhere on the web, think about how that request is being processed and represented by the browser. When data comes back from the your service, take a look at the response message and see what kind of information you can uncover that you might not have known.
{% endraw %}
    