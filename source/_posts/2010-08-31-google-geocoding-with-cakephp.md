---
layout: post
title:  "Google Geocoding with CakePHP"
date:   2010-08-31 14:26:54 -0700
categories:
     - Coding
     - PHP
     - Site Architecture
     - World Wide Weird
---
{% raw %}
Google has some pretty neat toys for developers and CakePHP is a pretty friendly framework to quickly build applications on which is well supported.  That said, when I went looking for a Google geocoding component, I was a little surprised to discover that nobody had created one to do the hand-shakey business between a CakePHP application and Google.

That is, I didn't find anyone, though they may well be out there.

I did find several references to a Google Maps helper, but, that didn't help too much since I had an address and no geodata.  The helpers I found looked, well... helpful once you had the correct data, mind you.  Before you can do all of the maps-type stuff, you have collect the geodata and that's where I came in.<!--more-->

I built a quick little script which takes an address and returns geodata.  It isn't a ton of code, it doesn't handle paid accounts and it isn't fancy.  What it lacks in bells and whistles, it makes up for in pure, unadulterated Google Maps API query ability.  Let's have a look at how to implement the code.

First, <a href="/media/googlegeocode.zip">download the file</a> and unzip it.  Place it in /app/controllers/components.  That's the bulk of the work.  Once you have the component added to your components directory, just add it to the components array in your controller and call the getCoords() function like in the code below.

<pre class="brush:php">
class FakeController extends AppController
{

     var $components = array("Googlegeocode");

     /* functions and whatever other code ... */

     function getGeoData()
     {

          $address = $this->data["ModelName"]["address"];
          $coords = NULL;
          if($address)
          {
               $coords = $this->Googlegeocode->getCoords($address);
          }
          $this->set("coords", $coords);

     } // End of function

} // End of class
```

There is more code there in general class setup and comments than there is in actually making the coordinate request.  Note, do not URL encode your address before passing it into the function.  This can have unexpected results as the geocoding component will properly encode the address for you.

There are a couple of other functions in case you need them.  First is a call to retrieve the data set which is returned from Google.

<pre class="brush:php">
// ... code ...
$geodataRecord = 
     $this->Googlegeocode->getGeodataRecord($address);
// ... code ...
```

This will return an array built directly from the XML returned by Google.  From this you can extract all of the information they typically return, including status, address information and geodata as well as several other odds and ends.  There is actually quite a bit of data returned for each address.

Two other useful functions are the lastCoords() and lastGeodataRecord() functions.  They are called as follows:

<pre class="brush:php">
// ... code ...
$coords = $this->Googlegeodata->lastCoords();
$geodataRecord = $this->Googlegeodata->lastGeodataRecord();
// ... code ...
```

Once a record is retrieved, it is stored in memory until a new record is requested.  You can refer to these as needed to recall the latest records retrieved from Google until the script finishes executing.

Though this isn't the typical user experience related post, hopefully this will help you get moving more quickly on your project involving geocoding addresses for use with the Google Maps UI API.  I hope you find my component useful and you use it to make the web a better place.
{% endraw %}
    