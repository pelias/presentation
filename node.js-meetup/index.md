<style>
	.reveal section img {
		border-style: none;
		box-shadow: none;
	}

	.reveal {
		background-color: white;
		color: black;
	}

	h1, h2, h3, h4, h5, h6 {
		color: #d4645c !important;
	}
</style>


![](https://raw.githubusercontent.com/pelias/presentation/master/foss4gna-2015/mapzen.png)

<i>start where you are</i>

<small>[mapzen.com](http://mapzen.com)

---

### mission

viable
<br/>
<b><i>open-source</i></b>
<br/>
alternative to Google maps

---

### moving parts

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/mapping_parts.png)

NOTE: these are the traditional parts of a full stack mapping solution

---

### mapzen

|   |   |
| - | - |
| [Tangram](https://github.com/tangrams) | <i>2D / 3D maps with <br/> WebGL/OpenGL ES <br/> and vector tiles</i> |
| [Valhalla](https://github.com/valhalla) | <i>routing engine</i> |
| [Pelias](https://github.com/pelias) | <i> geocoder </i> |
| | |
<br/>

<i>* these projects are all in beta</i>

NOTE: each of the moving parts is being worked on by a dedicated Mapzen team

---

### pelias

is a <b>geocoder</b>

<small><i>oh, cool... wait, what's a geocoder?</i>

----

<blockquote cite="http://en.wikipedia.org/wiki/Geocoding">
    <u>`Geocoding`</u> (sometimes called `forward geocoding`) is the process of enriching 
    a description of a location, most typically a postal address or place name,
    with geographic coordinates from spatial reference data such as building 
    polygons, land parcels, street addresses, postal codes (e.g. ZIP codes, CEDEX)
    and so on.
</blockquote>   
<small>credit [wikipedia](http://en.wikipedia.org/wiki/Geocoding)

----

<b>in other words, it's geo search</b>
<br/>
<br/>
<small><i>...great, so where would I even use this?</i>

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

### features

any self-respecting geocoder should support

 - NLP
 - autocomplete
 - categories
 - coarse lookup
 - reverse lookup
 - detailed | simple result
 - batch lookup
 - pagination

NOTE: interface concerns

----

#### wait, there's more

 - correct / complete data
 - timely data updates
 - customizable data sources

NOTE: data concerns.
- the quality of a geocoder is significantly affected by the underlying data used.
- Getting your hands on a reliable data set that doesn't cost a large fortune is practically impossible.

---

### enter pelias

<small>
API instance: [pelias.mapzen.com](pelias.mapzen.com)
<br/>
Demo: [mapzen.com/pelias](mapzen.com/pelias)
<br/>
github: [pelias](https://github.com/pelias/pelias)

---

#### open. simple.

 - completely open source (`MIT license`)
 - no external dependencies
 - all dependencies also open source
    - `node.js`
    - `ElasticSearch`

----

#### simple setup

```bash
$ pelias schema create_index
$ pelias import openstreetmap
$ pelias import geonames
$ pelias api start
```

NOTE: setting up your own instance of pelias is just that easy

----

#### simple api

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

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/pelias_overview.png)

NOTE:
- an address is first copied into a pelias model document
- then it passes through the deduper to avoid multiple instances of the same address
- next the admin hierarchy is filled in
- after that the data gets added to the suggester (ElasticSearch FST)

---

### where does the data come from?

- OpenStreetMap
- OpenAddresses
- GeoNames
- Quattroshapes

<i>* all of these are open data sources</i>

----

#### challenges of open data

- quality control
- inconsistent coverage
- stale data
- inconsistent schemas / tagging

NOTE:
- the hope is that by creating tools that rely on this data, the quality of the data will begin to improve

---

## why node?

 * community
 * easy setup
 * async I/O
 * streams
 * modularity

NOTE: 
- community is the biggest factor in open source project.
- Modularity allows us to build reusable geo components.
- Easy setup is huge for people looking to spin up their own instance or contribute to the codebase.
- Since most of the operations involve I/O, node is the perfect solution.
- Dealing with huge files is much easier with streams.

---

### challenges with node.js

- modularity
- streams

NOTE:
- being modular sometimes means too many packages with tangled dependencies. (29 repos in our org)
- streams are hard to debug.

---

### challenges with open source

- maintaining transparency
- attracting contributors
- trying to support a large<br/>variety of usecases

NOTE:
- transparency when it comes to process, planning, identifying priorities
 - hard to do everything in github
- building a community around a project
- building a highly customizable architecture to support everyone's needs
