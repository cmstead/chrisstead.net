---
layout: post
title:  "Data, Types, Objects and Creating A New Generic Type"
date:   2015-10-21 12:43:57 -0700
categories: Coding, Data Structures, Foundation, Javascript
---
{% raw %}
Javascript comes with a variety of types, and with ES 2015 and beyond, we are seeing new types emerge like sets and symbols.  The primitive data types come with a standard set of comparison rules and default behaviors which make them especially nice to work with, however, complex data like arrays and objects are not so friendly. Objects have no means for comparison (unsurprising) and arrays have no simple, idiomatic way to distinguish them from objects. Even null, which is referred to as a primitive data type, can lie to us.  See the example below.

```javascript
typeof {}; // object
typeof null; // object
typeof []; // object

// Null check
foo === null;

// Array check
Object.prototype.toString.call(foo); // old way
foo.isArray(); // new way, throws an error on objects, not available in node
```

It gets worse if we want to compare any of these. If we compare two distinct arrays which contain the same data in the same order, we will get false every single time. Comparisons only happen on pointer references in Javascript and it makes checking equality really tough.  There really isn't much you can do about all of this except monkey patching data prototypes, which I always discourage for a variety of reasons.

I know I write a lot of posts about functional programming and, typically, it is the way to enlightenment and a land of wonder and elegance. Even with functional programming paradigms, sometimes what you need is not a function, but a data type... An object. The data type Javascript doesn't have, but is older than (programming) time itself is a struct.

Structs are complex data types of a generic sort, which are used to store data in a predictable way. C and C++ have them, Ruby has them and even Go has them. Javascript has object literals which are similar, however, they lack something that is built into other languages.  Let's look at structs in a couple different languages, Ruby and C.

```c
// Point struct in C
struct point {
    int x;
    int y;
}

point p = { .x = 0, .y = 5 };
printf("x is %d, y is %d", p.x, p.y); // x is 0, y is 5
```

```ruby
# Point struct in Ruby

Point = Struct.new(:x, :y)
myPoint = Point.new(0, 5)

puts "x is #{myPoint[:x]}, y is #{myPoint[:y]}" # x is 0, y is 5
```

As I looked at these rather convenient data structures I wonder why we can't have nice things in Javascript. This is especially apparent when we look at things like someStruct.merge() in Ruby, since we typically need a third party function to accomplish this for objects or arrays. What if we just had a really cool new data type?

This kind of construction is where object oriented programming really shines. Instead of lusting after something other languages have, but Javascript is missing, let's just create our own data type! First thing we are going to want is a foundation to put our data into. Let's create a constructor that sets up our struct with the stuff we need.

```javascript
function Struct () {
    var keys = Array.prototype.slice.call(arguments, 0);

    this.dataStore = keys.reduce(this.addProperty.bind(this), {});
}

Struct.prototype = {
    addProperty: function (dataObj, key) {
        dataObj[key] = null;
    }
};
```

This really isn's anything more than an object literal wrapped in a class, but it sets us up for a lot more. The first big problem we encounter with this is, we have a data object backing our struct object, but the way we access our data is kind of strange; myStruct.dataStore[key]. Let's do a little bit of data hiding and add accessors and mutators so we can define an interface for our struct. By creating an API with a standard naming convention, we make our struct stable and predictable.

```javascript
function Struct () {
    var keys = Array.prototype.slice.call(arguments, 0),
        dataStore = keys.reduce(this.addProperty.bind(this), {});
}

Struct.prototype = {
    accessorBase: function (dataStore, key) {
        return dataStore[key];
    },

    mutatorBase: function (dataStore, key, value) {
        dataStore[key] = value;
        return this;
    },

    addProperty: function (dataStore, key) {
        let accessorName = 'get.' + key,
            mutatorName = 'set.' + key;
        
        dataStore[key] = null;
        
        this[accessorName] = this.accessorBase.bind(this, dataStore, key);
        this[mutatorName] = this.mutatorBase.bind(this, dataStore, key);    
    }
};
```

If this step feels pretty abstract, that's because it is. We have wandered into the world of metaprogramming and generic programming. We won't go into detail on those topics because they are whole realms of computer science unto themselves. Instead, let's discuss what we added and why.

AttachProperty adds a key initialized to null to our backing object literal, then it takes the pointer to the object literal and creates two object-bound methods: get.keyName and set.keyName. This gives us a clean, obvious API to interact with.  Even better than that, we now know exactly which keys are supported by our struct and if someone tries to interact with a property which isn't defined, they will get a useful error. This is a lot more stable than just allowing someone to come and modify the data directly. Let's take a look at creating a point with our new struct.

```javascript
var point = new Struct('x', 'y');
point.set.x(0);
point.set.y(5);

point.set.foo('bar'); // undefined is not a function

console.log('x is ' + point.get.x() + ', y is ' + point.get.y()); // x is 0, y is 5
```

Hey! Our struct is starting to come together. We can create a new structure on the fly, it sets up our object with the right keys, adds appropriate functions and behaves something akin to a data-oriented class. That's pretty spiffy.

We could, theoretically, stop right here and be correct in saying we have defined our own data type, but there are so many things we are still missing. That setter behavior is fine for something small like a point. It's actually pretty terse. However, what if we have a bunch of keys and we want to be able to modify them all at once? This is what merge is good for. Let's define new syntax to handle batch mutation for properties.

```javascript
Struct.prototype = {
    /* Our prior functionality is here... */
    mergeKey: function (updateObj, key) {
        this['set.' + key](updateObj[key]);
    },
    
    merge: function (updateObj) {
        var keysToMerge = Object.keys(updateObj);
        keysToMerge.forEach(this.mergeKey.bind(this, updateObj));
        return this;
    }
};
```

MergeKey is little more than an alias for our mutator functions, but it gives us everything we need to keep merge nice and tidy. It also gives us a way to pluck values from an object at run-time and update just a single property in our struct. Merge on the other hand is built exclusively for power. We can hand in an object and merge will lift all of the properties and batch update our struct. This added syntax provides a short, powerful way to handle our struct data at initialization time, and on the fly for big updates.

```javascript
var point = (new Struct('x', 'y')).merge({ x: 0, y: 5 });
console.log('x is ' + point.get.x() + ', y is ' + point.get.y()); // x is 0, y is 5
```

Now that we've gotten this far, we have a fully functioning struct with a couple of conveniences. Rather than stepping through each new function we add, let's just take a look at a final struct class. Our final struct will have comparison extension and type checking through duck-typing. This post, quite possibly, could be broken into a whole set of posts discussing each of the minute topics within our struct, but I think it might be better to just see the final product and visit some of the deeper ideas at another time.

```javascript
function Struct () {
    var keys = Array.prototype.slice.call(arguments, 0),
        dataStore = {};
    
    this.get = {};
    this.set = {};
    
    keys.forEach(this.addProperty.bind(this, dataStore));
    
    // Bind data store to prototype functions
    this.addProperty = this.addProperty.bind(this, dataStore);
    this.equal = this.equal.bind(this, dataStore);
    this.dataStoresEqual = this.dataStoresEqual.bind(this, dataStore);
    this.instanceOf = this.instanceOf.bind(this, dataStore);
}

Struct.prototype = {
    
    compareValue: function (localDataStore, foreignDataStore, result, key) {
        return result && localDataStore[key] === foreignDataStore[key];
    },
    
    dataStoresEqual: function (localDataStore, foreignDataStore) {
        var localKeys = Object.keys(localDataStore),
            foreignKeys = Object.keys(foreignDataStore),
            
            compare = this.compareValue.bind(null, localDataStore, foreignDataStore),
            equalKeyCount = localKeys.length === foreignKeys.length;
            
        return equalKeyCount && localKeys.reduce(compare, true);
    },
    
    equal: function (localDataStore, foreignStruct) {
        return foreignStruct.dataStoresEqual(localDataStore);
    },
    
    containsKey: function (foreignStruct, result, key) {
        return result && typeof foreignStruct.get[key] === 'function';
    },
    
	instanceOf: function (localDataStore, foreignStruct){
        return Object.keys(localDataStore).reduce(this.containsKey.bind(this, foreignStruct), true);
	},
	
    mergeKey: function (updateObj, key) {
        this.set[key](updateObj[key]);
    },
    
    merge: function (updateObj) {
        var keysToMerge = Object.keys(updateObj);
        keysToMerge.forEach(this.mergeKey.bind(this, updateObj));
        return this;
    },

    // Generic accessor
    accessorBase: function (dataStore, key) {
        return dataStore[key];
    },
    
    // Generic mutator
    mutatorBase: function (dataStore, key, value) {
        dataStore[key] = value;
        return this;
    },
    
    // Generic property creation method. This will be bound and used later
    // to extend structs and maintain a homogenic interface.
    addProperty: function (dataStore, key) {
        dataStore[key] = null;
        
        this.get[key] = this.accessorBase.bind(this, dataStore, key);
        this.set[key] = this.mutatorBase.bind(this, dataStore, key);
        
        return dataStore;
    }
};
```
{% endraw %}
    