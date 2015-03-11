
# Pelias

### An open source geocoder built with elasticsearch and node.js
<img class="custom" src="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/mapzen.png" />

---

# Geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://github.com/pelias/pelias/raw/master/img/geocoding.gif)

<aside class="notes">
  Its that thing you do when you search for a place on a map
</aside>

---

# Reverse geocoding

transforms your current geographic location in to a list of places nearby

![](https://raw.githubusercontent.com/pelias/pelias/master/img/reverse.gif)

<aside class="notes">
  When you geotag your photo or tweet; or check in to a restaurant - you reverse geocode!
</aside>

---

## Why is geocoding so important

- useful for visualization 
- mapping locations where events of interest occur
- searching for an address/ routing
- knowing where you are (reverse geocoders)

<aside class="notes">
  Without geocoders, its hard to find places on a map.<br/>And without reverse geocoders its impossible to communicate to another human being about your whereabouts in a foreign land for example..
</aside>

---

## State of open source geocoders

- Not quite there yet (relevancy and flexibilty)
- Not all are data agnostic
- Not all can support autocomplete
- Not all have easy build process

<aside class="notes">
  Its a great time for open source geocoders as more and more projects such as Photon, two fishes are gaining momentum and are doing great things. Nominatum is another open source geocodert hat works with OSM<br/>Most of the geocoders are tied to a certain dataset or certain type of dataset<br/>I dont know about you but when I use my maps app on my phone, often times I start typing for an address or a restaurant name and just wait for the auto complete to suggest places - I almost never touch the magnifying glass button.<br/> autocomplete is tricky, because you hit the service upon every keystroke - so you need a service that can handle that kind of load.
</aside>

---

<section>  
  <h2>Geocoding is an art and a science</h2>
  <ul>
    <li>
      <p><strong><em>What kind of geocoder are you building?</em></strong></p>
      <ul>
        <li>coarse? (neighborhoods ex: 'Mission')</li>
        <li>address? (street addresses ex: '1 main st, new york')</li>
        <li>poi? (points of interest ex: 'golden gate bridge')</li>
        <li>global? (all things combined)</li>
      </ul>
    </li>
  </ul>
  <aside class="notes">
    Often times, data users are not well versed in the complexities of software and data essential to produce the best quality geocoder for their business needs. Here are some things to consider..
  <aside>
</section>

<section>
  <h2>Geocoding is a science and an art</h2>
  <ul>
    <li>
      <p><strong><em>Know your data</em></strong></p>
      <ul>
        <li>What kind of addresses do you have?</li>
        <li>is it consistent? </li>
        <li>Issues? (missing parts of addresses)</li>
      </ul>
    </li>
    <li>
      <p><strong><em>Know your geocoder</em></strong></p>
      <ul>
        <li>Does it standardize data? </li>
        <li>Relevancy and accuracy</li>
        <li>Search Logic</li>
        <li>Is it fast and secure?</li>
      </ul>
    </li>
  </ul>
  <aside class="notes">
    [TALK] Data Issues <br/>
    street/ buildings/ intersections?<br/><br/>two identical points from different sources: same lat/lon?<br/><br/>Some address can have missing hierarchies - for a given lat/lon, you may have street address but no neighborhood/city/state information is provided.<br/><br/>
    Standardizing data is one way to make sure your address points have no missing information - this is typically done by a hierarchy lookup [TALK ABOUT admin-lookup]
  </aside>
</section>

---

## Pelias

- built with ***elasticsearch and node.js***
- completely open-source and ***MIT licensed***
- based on ***open data*** primarily but it is ***data agnostic***
- ***install it locally*** and modify to suit your geocoding needs
- supports ***fast autocomplete***
- it's ***modular***
- ***easy to install***
- requires ***no external dependencies***

<aside class='notes'>
  Pelias is currently a product and a service. Its a product - you can set up your own geocoder based on your custom dataset. You can use it as a service soon if you just want a geocoder for your app and dont want to set one up yourself.
</aside>

---

## architecture

- ***elasticsearch***
  - schema free, document-oriented data store
  - designed for horizontal scale
  - full-text search & autocomplete
  - completion suggester, stored in memory at index time
  - geo capabilities

- ***nodejs***
  - streams
  - modularity
  - easy to use

<aside class="notes">
  Streams are like unix pipes - they handle reading/writing to relatively slow interfaces and provide a nice abstraction. <br/> Streams in node are one of the rare occasions when doing something the fast way is actually easier.
</aside>

---

## One Document per point

```json
  {
     "name": {
        "default": "Mission Dolores Park",
        "alternative": "Dolores Park"
     },
     "type": "way",
     "address": {
        "zip": "94114"
     },
     "center_point": {
        "lat": "37.759755",
        "lon": "-122.427111"
     },
     "alpha3": "USA",
     "admin0": "United States",
     "admin1": "California",
     "admin1_abbr": "CA",
     "admin2": "San Francisco",
     "locality": "San Francisco",
     "neighborhood": "Mission District",
     "suggest": {
        "input": [
           "mission dolores park",
           "dolores park"
        ],
        "output": "osmway:23871270",
        "weight": 6
     }
  }
```

---

## Data in, Data out

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_diagram.png)

<aside class="notes">
  Every geocoder has two main components - a way to put data into a data store and a way to retrieve data out smartly.<br/>
  Each of these datasets have to implement the import pipeline to make sure the data is standardized and complete. <br/>
  At mapzen, we are actively developing importers for some of these open datasets
</aside>

---

## Open datasets - Pelias importers

- ***OpenStreetMap*** 
  - street addresses, poi & polygons
  - https://github.com/pelias/openstreetmap
- ***OpenAddresses*** 
  - an aggregation of normalized municipal address datasets
  - https://github.com/pelias/openaddresses
- ***Quattroshapes*** 
  - polygons; has foursquare checkins, Flickr data
  - https://github.com/pelias/quattroshapes-pipeline
- ***Geonames*** 
  - ~9M pois; has population count, 2M US
  - https://github.com/pelias/geonames

<aside class="notes">
  Each of these importers use pelias's import pipeline modules. <br/>
  Writing an importer is easy because you only implement a way to extract data from the dataset and once you have it, you just run it by various import pipeline modules (such as deduper, model etc) by pipe-ing them together.<br/> 
  And this is possible because pelias is modular!
</aside>

---

<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/modular.jpeg">
  <h1>Pelias is modular! </h1>
</section>

---

## Pelias Architecture

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_architecture.png)

<aside class="notes">
  This is sort of a detailed look at the import pipeline and the API
</aside>

---

## Data flow 

<img class="custom" src="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_architecture_2.png" height="600"/>

<aside class="notes">
  Using nodejs streams, its easy to pipe data through various modules before going into elasticsearch
</aside>

---

<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias-vert-1.png">
  <h2>Import Pipeline</h2>
  <h5 class="highlight">Putting data into Elasticsearch</h5>
  <ul>
    <li>Create a ES index</li>
    <li>Adhere to Pelias Data Model</li>
    <li>Address Deduper</li>
    <li>Hierarchy lookup</li>
    <li>Suggester Pipeline</li>
    <li>dbclient (elasticsearch)</li>
  </ul>
</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias-vert-1.png">
  <h2>Create a Pelias Index</h2>
  <ul>
    <li>Pelias Schema</li>
    <li><code>npm install pelias-schema</code></li>
    <li><a href="https://github.com/pelias/schema">https://github.com/pelias/schema</a></li>
    <li>Update the schema to your needs and then</li>
  </ul>
  <pre><code class="javascript">          node scripts/create_index.js;</code></pre>
  <aside class="notes">
    It contains all the required mappings that elasticsearch expects when you create an index along with settings such as number of shards, replicas and the kind of analysis you want to perform on various fields including synonym expansion (st -> street)
  </aside>

</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/model.png"><h2>Pelias Data Model</h2>
<ul>
<li><code>npm install pelias-model</code></li>
<li><a href="https://github.com/pelias/model">https://github.com/pelias/model</a></li>
<li>convenient way of modelling POI and admin records </li>
<li>so that they are compatible with the Pelias import pipeline</li>
</ul>
<pre><code class="javascript">
  var Document = require('pelias-model').Document;

  var poi = new Document( 'geoname', 1003 )
    .setAlpha3( 'USA' )
    .setMeta( 'author', 'harish' )
    .setMeta( 'date', new Date().getTime() )
    .setName( 'default', 'the immigrant' )
    .setName( 'alt', 'The Immigrant' )
    .setAdmin( 'admin0', 'United States' )
    .setAdmin( 'neighborhood', 'East Village' )
    .setCentroid({ lon: -73.98, lat: 40.72 });
</code></pre>

<aside class="notes">
  This module deals with creating a document for the given point - it has nice setters/getters to neatly add name, lat/lon and any other additional information to the document.
</aside>

</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/deduper.png"><h2>Address Deduplicator</h2>
<ul>
<li><code>npm install pelias-address-deduplicator</code></li>
<li><a href="https://github.com/pelias/address-deduplicator">https://github.com/pelias/address-deduplicator</a></li>
<li>expects pelias/model Document objects</li>
<li>needs to be running across different data import pipelines</li>
<li>uses its own data store to figure out duplicates</li>
</ul>
<aside class="notes">
  This is a big one. If we use more than one dataset, often times you will run into duplicates (yankee stadium appears in OSM and geonames) - this module deals with consolidating duplicates and adding any additional information from other sources as a meta tag in the original document.
</aside>
</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/hierarchy.png"><h2>Hierarchy Lookup</h2>
<ul>
<li><code>npm install pelias-admin-lookup</code></li>
<li><a href="https://github.com/pelias/admin-lookup">https://github.com/pelias/admin-lookup</a></li>
<li>populates a dataset with country/state/county/neighborhood names (if missing)</li>
</ul>
<pre><code class="javascript">
  var peliasAdminLookup = require( 'pelias-admin-lookup' );

  var dataStream = someStream; // some stream of Document objects
  peliasAdminLookup.stream( function( lookupStream ){
      dataStream
          .pipe( lookupStream )
          .pipe( someStream );
  });
</code></pre>

<aside class="notes">
  This module ensures that your data is complete by looking up the given point and sort of reverse geocoding and assigning neighborhood/state/country values.
</aside>
</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/suggester.png"><h2>Suggester pipeline</h2>
<ul>
<li><code>npm install pelias-suggester-pipeline</code></li>
<li><a href="https://github.com/pelias/suggester-pipeline">https://github.com/pelias/suggester-pipeline</a></li>
<li>exports a transform stream that builds the suggester payload (<code>/suggest</code>)</li>
</ul>
<pre><code class="javascript">
  var peliasSuggesterPipeline = require( 'pelias-suggester-pipeline' );

  someDocumentStream
    .pipe( peliasSuggesterPipeline.pipeline )
    .pipe( dataStream );
</code></pre>
<aside class="notes">
  Since we use the suggester for autocomplete, this module builds the payload - its just telling elasticsearch that when a user starts typing any of the inputs listed in the payload, refer it to this given point.
</aside>
</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/dbclient.png"><h2>dbclient</h2>
<ul>
<li><code>npm install pelias-dbclient</code></li>
<li><a href="https://github.com/pelias/dbclient">https://github.com/pelias/dbclient</a></li>
<li>Database client for pelias import pipelines</li>
<li>Last step in the import pipeline</li>
</ul>
<pre><code class="javascript">
  module.exports = function( filename ){
    resolvers.selectSource( filename )
      .pipe( geonames.pipeline )
      .pipe( through.obj( model ) )
      .pipe( suggester.pipeline )
      .pipe( dbclient );
  };
</code></pre>
<aside class="notes">
  And finally this module is responsible to put the massaged data into elasticsearch in bulk and in parallel.
</aside>
</section>

---

<section>
<h2>Getting data out of Elasticsearch</h2>
<ul>
<li>Search Logic</li>
<li>API</li>
</ul>
</section>

<section><h2>Search Logic</h2>
<ul>
<li><strong><em>population</em></strong><ul>
<li>portland, oregon &gt; portland, maine</li>
</ul>
</li>
<li><strong><em>popularity</em></strong><ul>
<li>times square, new york &gt; times square, south dakota</li>
</ul>
</li>
<li><strong><em>pop score</em></strong> of admin area it belongs to<ul>
<li>123 main st, san francisco &gt; 123 main st, pawnee</li>
</ul>
</li>
<li><strong><em>geo bias</em></strong> - lat/lon/bbox to sort the results.<ul>
<li>soho, new york &gt; soho, london (if searching from new york)</li>
</ul>
</li>
<li><strong><em>boosting</em></strong> certain admin values (<strong><em>admin0</em></strong> - countries)<ul>
<li>china &gt; chinatown</li>
</ul>
</li>
<li><strong><em>mixing</em></strong> popular locations in the search results regardless of where you are </li>
</ul>
<aside class="notes">
no search logic thats dependent on dataset (search logic has to be generic when you are working with a geocoder thats input dataset agnostic)
</aside>
</section>

<section><h2>API Endpoints</h2>
<ul>
<li><strong><em>/search</em></strong></li>
<li><strong><em>/search/coarse</em></strong></li>
<li><strong><em>/suggest</em></strong></li>
<li><strong><em>/suggest/coarse</em></strong></li>
<li><strong><em>/reverse</em></strong></li>
<li><strong><em>/doc</em></strong></li>
</ul>
</section>

<section><h2>API Parameters</h2>
<ul>
<li><strong><em>?input=</em></strong></li>
<li><strong><em>?lat=&amp;lon=</em></strong></li>
<li><strong><em>?bbox=</em></strong></li>
<li><strong><em>?size=</em></strong></li>
<li><strong><em>?layers=</em></strong></li>
</ul>
</section>

<!-- <section><h2>API Issues</h2>
<ul>
<li>Context suggester doesn't work without location information</li>
<li>So, ***/suggest*** autocomplete only works with lat/lon</li>
<li>This is expected to land in Elasticsearch v2.0.0</li>
<li><a href="https://github.com/pelias/api">https://github.com/pelias/api</a></li>
</ul>
</section> -->

<section><h2>Queries</h2>
<ul>
<li><code>npm install geopipes-elasticsearch-backend</code></li>
<li><a href="https://github.com/geopipes/elasticsearch-backend">https://github.com/geopipes/elasticsearch-backend</a></li>
<li>supports the following<ul>
<li>get, mget</li>
<li>put</li>
<li>search (with geo_distance, geo_bbox, geo_shape)</li>
</ul>
</li>
</ul>
<aside class="notes">
  All the elasticsearch base queries are neatly tucked away in this module.
</aside>
</section>

<section><h2>Customize your output address</h2>
<ul>
<li>Pelias API lets you set an output format per country basis</li>
<li><a href="https://github.com/pelias/api/blob/master/helper/outputSchema.json">helper/outputSchema.json</a></li>
</ul>
<pre><code>
  {
    "USA": {
      "local": ["local_admin", "locality", "neighborhood", "admin2"],
      "regional": ["admin1_abbr", "admin1", "admin0"]
    },
    "GBR": {
      "local": ["neighborhood", "admin2", "local_admin", "locality"],
      "regional": ["admin2","admin0","admin1"]
    },
    "default": {
      "local": ["local_admin", "locality", "neighborhood", "admin2"],
      "regional": ["admin1_abbr", "admin1", "admin0"]
    }
  }
</code></pre>
<aside class="notes">
  Pelias API gives you the flexibility to define the output format per country or per region. <br/>
  API returns a field called 'text' that contains the entire address with a street number followed by local and regional parts. outputSchema.json lets you modify it.
</aside>
</section>

---

## How to build a local Geocoder

#### without jumping through too many hoops
***https://github.com/pelias/vagrant***
***https://mapzen.com/blog/pelias-setup-tutorial***

---

## github.com/pelias

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/github-pelias.png)

---

## Collaborate with us!

***https://github.com/pelias/pelias/issues***

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias-issues.png)

<aside class="notes">
- We would love to work with you<br/><br/>
- Have a unique dataset? Write a pelias importer!<br/><br/>
- Open an issue, contribute on an existing issue<br/><br/>
- Discuss on topics like 'street intersections, NLP etc' <br/><br/>
- Review our code, comment on our pull requests<br/><br/>
- All our main stories/issues are opened here<br/><br/>
- Get involved, Join the conversation at
</aside>

---

# Thank you!

***Harish Krishna***

***harish@mapzen.com***

***@harizh***

<p style="margin-top:80px">Slides: <em>https://github.com/pelias/presentation</em></p>

---

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/foss4g_evaluation.png)

<style>
 .highlight, .reveal em{color:#13daec}
 .reveal section img.custom { border:0 none;background:transparent;box-shadow:none }
</style>
