---
layout: post
title:  "URLs for Web Developers"
date:   2015-11-04 08:00:52 -0800
categories:
    - Coding
    - Foundation
    - Javascript
    - World Wide Weird
---
{% raw %}
At this point it seems like everyone knows about URLs. People can rattle off google.com and myfavoritesportsteam.net, but knowing domain names is not the same as really understanding URLs. URLs, AKA Uniform Resource Locators, actually adhere to a set of standards and behaviors which apply to the way your application interacts with the browser and services which provide data and resources.

First, let's take a look at the anatomy of a URL and break it down piece by piece regarding how each part directs the browser and informs your application. Once we have a common language to discuss the elements, we can make sense of how the pieces impact a web application.

```default
protocol://subdomain.domain-name.top-level-domain:port-number/path?query-string#fragment
```

<strong>Protocol</strong>

Commonly, the protocol is http or https, however it doesn't stop there. Browsers can support a variety of protocols such as ftp, mailto and even gopher. If you opt for an alternate protocol, be aware there is no promise that all browsers will support it. Mailto, for instance, used to function for sending emails since mail servers were wide open, but browsers typically attempt to open a mail client on your computer instead, now. Some browsers may have dropped mailto support altogether. In short, your mileage may vary.

The protocol can be accessed directly via Javascript.  The window object contains a location property. Location contains several properties including protocol.  Knowing the protocol can be useful, especially when it is not clear whether your site will be communicating via standard http or through a secure channel.  The protocol is typically returned with a trailing colon, so you may want to strip the colon.  Let's take a look at two different lines of code for interacting with the protocol.

```javascript
var fullProtocol = window.location.protocol,
    trimmedProtocol = window.location.protocol.replace(':', '');

console.log(fullProtocol)); // http:
console.log(trimmedProtocol); // http
```

<strong>Domain</strong>

Although the domain is broken into three parts in our diagram, domains are hard to actually split programmatically. Domain names, including the subdomain, domain name and top-level domain may be as simple as foo.bar.com, domains can also look like foo.bar.baz.quux.co.uk. Clearly co is not the domain name since co.uk is the top-level domain for companies in the United Kingdom. This means that quux is the domain name and foo.bar.baz is the subdomain.

Unfortunately, this means we can't parse a fully-qualified domain without some sort of prior knowledge. However, if we make certain assumptions, we can safely work backwards through a fully-qualified domain, specifically, if we assume that all domains we are interacting with are .com, .net, .org, .gov or .edu top level domains, we can then parse out the pieces pretty easily.

```javascript
function parseHost (hostname) {
    var domainTokens = hostname.split('.');

    return {
        topLevelDomain: domainTokens.pop(),
        domainName: domainTokens.pop(),
        subdomain: domainTokens.join('.')
    };
}

var parsedDomain = parseHost('foo.bar.baz.quux.com');

console.log(parsedDomain.subdomain); // foo.bar.baz
console.log(parsedDomain.domainName); // quux
console.log(parsedDomain.topLevelDomain); // com
```

This knowledge actually lines us up for beginning to understand an HTTP header as it is compiled by the browser for requests to a server.  Let's take a look at what a basic HTTP header would look like using a url like http://www.chrisstead.net/.

```default
GET / HTTP/1.1
host: www.chrisstead.net

```

That header information is a fully-formed acceptable HTTP request. If you were to issue this header through a telnet client you would get the front page of this site. This makes the relation between a URL and the request that is issued fairly transparent.

<strong>Port</strong>

The port is precisely as it sounds: a number representing the port to communicate through. HTTP typically goes through port 80, however other ports can and have been used for HTTP communication like 8080 and 8000.  Express (a Node web service framework) defaults to port 3000.  We can specify a different port like the following.

```javascript
http://www.chrisstead.net:8080
```

This call will, of course, result in a refused connection. This website uses the default web port and does not respond on 8080 or any other non-standard ports.  If, however, this site were to accept requests on port 8080, you could open a connection with a telnet connection in the following way.

<pre>
telnet www.chrisstead.net 80
```

This is effectively what the browser does when connecting to a website. Our URL model is actually getting pretty rich and we haven't introduced any of the other variables.  If we wanted to capture the port that was requested programmatically when your browser script loads up, we can do that with the port property on location.

```javascript
console.log(window.location.port); // typically returns 80
```

<strong>Path</strong>

The path in a URL is nearly as familiar as the .com in a big company URL. This path can represent a variety of different resources. It can be a path to a file resource like an HTML file or an image, or it could represent a path to a service resource with a specific data query associated. A good example of a non-physical resource is the page displaying this blog post.

```javascript
http://www.chrisstead.net/archives/970/urls-for-web-developers/
```

We need to be able to break this down, so let's take a look at how we can capture the path from the location. We can access the path from the location object in a similar fashion to the port. Window.location has a pathName property which will give you just the path without any other data attached to it.

```javascript
// The path for this page looks like this:
console.log(window.location.pathName); // /archives/970/urls-for-web-developers/
```

When a request is sent through the browser with a path, our request header changes a little to manage the enhanced request data. Our original header actually included a path, but it simply pointed at the root directory.  Our new header will reflect our correct path.

```default
GET /archives/970/urls-for-web-developers/ HTTP/1.1
host: www.chrisstead.net

```

<strong>Query String</strong>

The query string is one of the last and most interesting parts of the URL. This is traditionally where information can be stored and passed along to the server.  This ties in with REST, which we will discuss in another post. Let's take a look at a representation of user state in a query string and how to retrieve it with Javascript.

```javascript
// example query string: ?foo=bar&baz=quux

console.log(window.location.search); // ?foo=bar&bar=quux

function setPair (finalObj, keyValueStr) {
    var queryTokens = keyValueStr.split('='),
        key = queryTokens.shift(),
        value = queryTokens.join('=');

    finalObj[key] = value;

    return finalObj;
}

function parseQueryString (queryString) {
    return queryString.slice(1).split('&').reduce(setPair, {});
}

var queryData = parseQueryString('?foo=bar&baz=quux');

console.log(queryData.foo); // bar
console.log(queryData.baz); // quux
```

Unfortunately, Javascript doesn't provide any special facility for parsing or managing query strings, so we have to handle it ourselves. Fortunately parsing out the information is fairly simple.  Of course, if we want to change the data, we need to reconstruct the original string with updated values.  Let's add a new key/value pair and change one of our values, then we'll update and refresh the URL.

```javascript
function addPair (queryData, queryArray, key) {
    queryArray.push(key + '=' + queryData[key]);
    return queryArray;
}

function buildQueryString (queryData) {
    return '?' + Object.keys(queryData)
                       .reduce(addPair.bind(null, queryData), [])
                       .join('&');
}

queryData.foo = 'bar0';
queryData['test'] = 'quack';

window.location.search = buildQueryString(queryData);
console.log(window.location.search); // ?foo=bar0&baz=quux&test=quack
```

Most importantly, when we update the search string, the page is refreshed and a request is sent to the server for any data updates that might need to occur. This means, for standard page views, form data can be sent via query string to a service if an AJAX call is inappropriate.

Much like we did when we did with our previous request updates, let's have a look at the update to our request header including a query string. You'll note the change is merely an appended string on the request path.  Let's have a look.

```javascript
GET /archives/970/urls-for-web-developers/?foo=bar HTTP/1.1
host: www.chrisstead.net

```

<strong>Fragments</strong>

The final part of a url is the fragment, otherwise known as the hash.  The hash data is the only part of the URL which does not affect the request sent back to the server. Any fragment information that is included in the URL is only used for the browser to handle the document returned from the server. Originally the fragment information was used to move to the focus of the browser to a specific part of the document.

Now the fragment information has been claimed by single page applications (SPAa) to maintain state and route information.  This new use stems from the very same fact that the fragment is in place for browser use alone and does not refresh the page, or send any new information to the server.

The first application I can recall using a fragment was Twitter with a #!/ to denote the SPA route.  It seems they were borrowing against the Unix script shebang used to identify the executable to use when interpreting the script. Useless trivia. It won't be on the test.

Fragments can contain anything including #, and will be made available to any client-side script running in the window. Let's have a look at a URL containing a hash.

```default
http://www.chrisstead.net/#/foo/bar/baz
```

This setup is precisely what we would need to handle routing for a SPA. Without digging into the routing logic, let's access the fragment and log it.

```javascript
console.log(window.location.hash); // /foo/bar/baz
```

It might have been the long way around, but this is how URLs and web development tie together. Hopefully this filled in any information gaps you might have wondered about. It's really important for someone working in web development to understand how requests and URLs are related and what each does for the other.
{% endraw %}
    