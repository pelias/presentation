
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

![](https://raw.githubusercontent.com/pelias/presentation/master/nyc-node.js-meetup/geocoding_times_square.gif)

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
* `readable`, `writable`, `transform`, `duplex` or `classic`
* ex: HTTP server's ***request*** is a readable stream, ***response*** is writable

```shell
$ a | b | c | d
```

<small>can be written using node.js streams as</small>

```javascript
a.pipe(b);
b.pipe(c);
c.pipe(d);
```


NOTE: Whenever a stream has a "data" listener registered, it switches into "classic" mode and behaves according to the old API (node 0.4).

----

## Readable Streams

```javascript
var geonames = require('geonames-stream'),
    fs = require('fs');

// wget http://download.geonames.org/export/dump/US.zip
fs.createReadStream( 'US.zip' )
  .pipe( geonames.pipeline ); // parse CSV, extract req fields
```

* ***geonames.pipeline*** is a transform stream
* it pushes data on to the `Readable` stream
* when data is available, ***`readable`*** event fires
* ***`.read()`*** to fetch data from the buffer

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

* uses ***write*** and ***end*** functions
* when data is written to a writable stream it returns true/false
* true: _cool, keep em coming_
* false: _Uh-oh, I'm backed up - wait for 'drain' event_
* handles back pressure

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
```javascript
var geonames = require('geonames-stream'),request = require('request'),through = require('through2');
 
request.get( 'http://download.geonames.org/export/dump/US.zip' )
	   .pipe( geonames.pipeline )
	   .pipe( through.obj( function( data, enc, next ){
	   		console.log( data._id, data.name, data.population );
	   		next();
	   	}));
```

---

## Modularity + Streams = Awesome

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/pelias_overview.png)

----

## Modular Design | Challenges

* can lead to too many packages
* tangled dependencies
* visualizing multiple packages
* pelias has around [30 modules](https://github.com/pelias/pelias/blob/master/package_outline.md)

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

## Getting Data Out | API Features

 - autocomplete
 - localization (dynamic weighting)
 - coarse/reverse/street level lookup
 - smart scoring (population, popularity etc)
 - categories (bars, restaurants etc)
 - detailed | simple result
 - ***NLP***

----

## Simple API

<b>`/search`</b>
<small>

| param | required | description |
| - | - | - |
| `input` | yes | full text search string |
| `lat`, `lon` | no | geo-bias to help sort results |
| `bbox` | no | only results contained within that region will be returned |
| `size` | no | number of results, defaults to 10 |
| `layers` | no | result types to return, defaults to `poi`, `admin`, `address` |
| | | |

</small>

----

#_Demo_

[mapzen.com/pelias](mapzen.com/pelias)

---

### Open Source Project | Challenges

- maintaining transparency
- attracting contributors
- trying to support a large<br/>variety of usecases

NOTE:
- transparency when it comes to process, planning, identifying priorities
	- hard to do everything in github
- building a community around a project
- building a highly customizable architecture to support everyone's needs

---

## Collaborate with us!

***[github.com/pelias/pelias/issues](https://github.com/pelias/pelias/issues)***

![image](https://raw.githubusercontent.com/pelias/presentation/master/nyc-node.js-meetup/github_issues.png)

<aside class="notes">
- We would love to work with you<br/>
- Open an issue, contribute on an existing issue<br/>
- Discuss on topics like 'street intersections, NLP etc' <br/>
- Review our code, comment on our pull requests<br/>
- All our main stories/issues are opened here<br/>
- Get involved, Join the conversation
</aside>

---

# Thank you!

***Harish Krishna***

***[harish@mapzen.com](mailto:harish@mapzen.com)***

***[github.com/hkrishna](https://github.com/hkrishna)***

***[twitter: @harizh](https://twitter.com/harizh)***

<p style="margin-top:80px">Slides: <em>[github.com/pelias/presentation](https://github.com/pelias/presentation)</em></p>

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