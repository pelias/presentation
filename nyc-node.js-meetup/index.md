
# Pelias

### An open source geocoder built with elasticsearch and node.js

---

![](https://raw.githubusercontent.com/pelias/presentation/master/foss4gna-2015/mapzen.png)

#### Mapping Lab
#### Open Source Tools
#### Open Source Data

---

# Geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://raw.githubusercontent.com/pelias/presentation/master/nyc-node.js-meetup/geocoding.gif)

<aside class="notes">
  Its that thing you do when you search for a place on a map
</aside>

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/airbnb.png)

NOTE: location based services, such as airbnb, uber, hotels.com all require geocoding

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/shopping_cart.png)

NOTE: company use geocoding for assisting customers in form completion

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/calendar.png)

NOTE: even something like a calendar app uses geocoding to specify the location of an event

---

## Data in, Data out

![image](https://raw.githubusercontent.com/pelias/presentation/master/foss4gna-2015/pelias_diagram.png)

NOTE: Every geocoder has two main components - a way to put data into a data store and a way to retrieve data out smartly.<br/>
  Each of these datasets have to implement the import pipeline to make sure the data is standardized and complete. <br/>
  At mapzen, we are actively developing importers for some of these open datasets

---

## Pelias <span class="monospace"><3</span> Elasticsearch

- schema free, document-oriented data store
- full-text search & autocomplete
- geo capabilities
- designed for horizontal scale

NOTE: Instead of building text search capabilities on top of a regular data store, we took a data store built for full text (elasticsearch) and figured a way to use it efficiently. 

---

## Pelias <span class="monospace"><3</span> Node.js

* community
* easy setup
* async I/O
* modularity
* streams

NOTE: 
- community is the biggest factor in open source project.
- Modularity allows us to build reusable geo components.
- Since most of the operations involve I/O, node is the perfect solution.
- Easy setup is huge for people looking to spin up their own instance or contribute to the codebase.
- Dealing with huge files is much easier with streams.

----

## Modular | Node.js

* require, exports and module.exports
* Export a Namespace
* Export a Function
* Export a Higher Order Function
* Export a Constructor
* Export a Singleton

NOTE:http://bites.goodeggs.com/posts/export-this/

----

## Streams | Node.js

* ***unix pipes*** - read data from a source & pipe it to a destination
* stream is an ***```EventEmitter```***
* stream can be readable, writable or both
* for ex: HTTP server's ***request*** is a readable stream, ***response*** is writable

----

## Readable Streams

```javascript
var geonames = require('geonames-stream'),
    fs = require('fs');

// wget http://download.geonames.org/export/dump/US.zip
fs.createReadStream( 'US.zip' )
  .pipe( geonames.pipeline );
```

***geonames.pipeline*** listens to ***data*** event and attaches a callback.

NOTE: When a chunk of data is available, the readable stream emits a data event and your callback executes

----

## Writable Streams

```javascript
var geonames = require('geonames-stream'),
	dbclient = require('pelias-dbclient'),
    fs = require('fs');

fs.createReadStream( 'US.zip' )
  .pipe( geonames.pipeline )
  .pipe( dbclient );
```

* implements ***write*** and ***end*** functions
* when data is written to a writable stream it returns true/false
* true: _cool, keep em coming_
* false: _Uh-oh, I'm backed up - wait for 'drain' event_
* back pressure

NOTE: This is a form of back pressure which is a very powerful feature as it lets stream communicate "upstream" to their writers. Most of the back pressure related APIs are advisory so there is sort of a gentlemens agreement to honor requests to start or stop writing as timely as possible.

----

## Piping & Chaining

Piping is a great mechanism in which you can read data from the source and write to destination without managing the flow yourself

```javascript
request.get( 'http://download.geonames.org/export/dump/US.zip' )
	   .pipe( geonames.pipeline )
	   .pipe( through.obj( model ) )
	   .pipe( deduper )
	   .pipe( peliasAdminLookup.stream() )
	   .pipe( suggester.pipeline )
	   .pipe( dbclient );
```

----

#_Demo_

NOTE:
var geonames = require('geonames-stream'),request = require('request'),through = require('through2');
 
request.get( 'http://download.geonames.org/export/dump/US.zip' )
	   .pipe( geonames.pipeline )
	   .pipe( through.obj( function( data, enc, next ){
	   		console.log( data._id, data.name, data.population );
	   		next();
	   	}));

---

## Modularity + Streams = Awesome

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/pelias_overview.png)

----

## Modular Design | Challenges

* can lead to too many packages
* tangled dependencies
* visualizing pelias' 29 packages

----

## Streams | Challenges

* debugging is hard 
* stack traces dont work as expected
* stack stops at the event loop
* infamous EPIPE, ECONNRESET

```
Error: write EPIPE
  at errnoException (net.js:904:11)
  at Object.afterWrite (net.js:720:19)
```

* TRY: logging statements FTW
* TRY: ***stream_spy*** (for error context)

---

## Links

API instance: [pelias.mapzen.com](pelias.mapzen.com)
<br/>
Demo: [mapzen.com/pelias](mapzen.com/pelias)
<br/>
github: [pelias/pelias](https://github.com/pelias/pelias)

---

<style>
	.reveal section img {
		border-style: none;
		box-shadow: none;
	}
	.monospace {
		font-family: monospace !important;
		color: #666;
		letter-spacing: -10px;
	}
	.reveal {
		background-color: white;
		color: #666;
	}

	h1, h2, h3, h4, h5, h6, a {
		color: #d4645c !important;
	}
</style>