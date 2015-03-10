
# Pelias

### An open source geocoder built with elasticsearch and node.js

---

# Geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://github.com/pelias/pelias/raw/master/img/geocoding.gif)

---

# Reverse geocoding

transforms your current geographic location in to a list of places nearby

![](https://raw.githubusercontent.com/pelias/pelias/master/img/reverse.gif)

---

## Why is geocoding so important

- useful for visualization 
- mapping locations where events of interest occur
- searching for an address/ routing
- knowing where you are (reverse geocoders)

---

## State of open source geocoders

- Not quite there yet (relevancy and flexibilty)
- Not all are data agnostic
- Not all can support autocomplete
- Not all have easy build process

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

---

## github.com/pelias

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/github-pelias.png)

---

## Data in, Data out

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_diagram.png)

---

## Open datasets - Pelias importers

- ***OpenStreetMap*** 
  - street addresses, poi & polygons
  - https://github.com/pelias/openstreetmap
- ***OpenAddresses*** 
  - more street addresses
  - https://github.com/pelias/openaddresses
- ***Quattroshapes*** 
  - polygons; has foursquare checkins, Flickr data
  - https://github.com/pelias/quattroshapes-pipeline
- ***Geonames*** 
  - ~9M pois; has population count, 2M US
  - https://github.com/pelias/geonames

---

<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/modular.jpeg">
  <h1>Pelias is modular! </h1>
</section>

---

## Pelias Architecture

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_architecture.png)

---

## Data flow 

<img style="border:0 none;background:transparent;box-shadow:none" src="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias_architecture_2.png" height="600"/>

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
</section>
<section data-background="https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/deduper.png"><h2>Address Deduplicator</h2>
<ul>
<li><code>npm install pelias-address-deduplicator</code></li>
<li><a href="https://github.com/pelias/address-deduplicator">https://github.com/pelias/address-deduplicator</a></li>
<li>expects pelias/model Document objects</li>
<li>needs to be running across different data import pipelines</li>
<li>uses its own data store to figure out duplicates</li>
</ul>
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

<section><h2>API Issues</h2>
<ul>
<li>Context suggester doesn't work without location information</li>
<li>So, ***/suggest*** autocomplete only works with lat/lon</li>
<li>This is expected to land in Elasticsearch v2.0.0</li>
<li><a href="https://github.com/pelias/api">https://github.com/pelias/api</a></li>
</ul>
</section>

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
</section>

---

## How to build a local Geocoder

#### without jumping through too many hoops
***https://github.com/pelias/vagrant***
***https://mapzen.com/blog/pelias-setup-tutorial***

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

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/foss4g_evaluation.png)

<style>
 .highlight, .reveal em{color:#13daec}
</style>
