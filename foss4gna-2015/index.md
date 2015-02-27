
# Pelias

---

## Pelias

- built with ***elasticsearch and node.js***
- completely open-source and ***MIT licensed***
- based on ***open-data***
- You can ***install it locally*** and modify to suit your needs
- supports ***fast autocomplete***
- It's ***modular***
- ***easy to install*** 
- requires ***no external dependencies***

---

## architecture

- ***elasticsearch***
  - full text search
  - completion suggester
  - geo capabilities
  - sharding

- ***nodejs***
  - streams
  - modularity
  - easy to use

---

## github.com/pelias

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/github-pelias.png)

---

## Data in, Data out

![image](https://raw.githubusercontent.com/pelias/presentation/foss4gna-2015/foss4gna-2015/pelias-diagram.png)

---

## Create an Elasticsearch Index

- Pelias Schema
- ```npm install pelias-schema```
- https://github.com/pelias/schema
- Update the schema to your needs and then

```javascript
  node scripts/create_index.js;
```

---

## Open datasets used in Pelias

- ***Geonames*** 
  - ~9M pois; has population count, 2M US
  - ***https://github.com/pelias/geonames***
- ***Openstreetmap*** 
  - street addresses, poi & polygons
  - ***https://github.com/pelias/openstreetmap***
- ***Quattroshapes*** 
  - polygons; has foursquare checkins, Flickr data
  - ***https://github.com/pelias/quattroshapes***
- ***OpenAddresses*** 
  - more street addresses
  - ***https://github.com/pelias/openaddresses***

---

## Getting data into Elasticsearch

- Pelias Data Model
- Suggester Pipeline
- Hierarchy lookup
- Address Deduper
- dbclient (elasticsearch)

---

## Pelias Data Model 

- ```npm install pelias-model```
- https://github.com/pelias/model
- convenient way of modelling POI and admin records 
- so that they are compatible with the Pelias import pipeline

```javascript
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
```

---

## Address Deduplicator

- ```npm install pelias-address-deduplicator```
- https://github.com/pelias/address-deduplicator
- expects pelias/model Document objects
- needs to be running across different data import pipelines
- uses its own data store to figure out duplicates

---

## Hierarchy Lookup

- ```npm install pelias-admin-lookup```
- https://github.com/pelias/admin-lookup
- populates a dataset with country/state/county/neighborhood names (if missing)

```javascript 
  var peliasAdminLookup = require( 'pelias-admin-lookup' );

  var dataStream = /* some stream of Document objects */;
  peliasAdminLookup.stream( function( lookupStream ){
      dataStream
          .pipe( lookupStream )
          .pipe( /* down the pelias pipeline */ );
  });
```

---

## Suggester pipeline

- ```npm install pelias-suggester-pipeline```
- https://github.com/pelias/suggester-pipeline
- exports a transform stream that builds the suggester payload (```/suggest```)

```javascript
  var peliasSuggesterPipeline = require( 'pelias-suggester-pipeline' );

  someDocumentStream
    .pipe( peliasSuggesterPipeline.pipeline )
    .pipe( /* rest of pelias pipeline */ );
```

---

## dbclient

- ```npm install pelias-dbclient```
- https://github.com/pelias/dbclient
- Database client for pelias import pipelines
- Last step in the import pipeline

```javascript
  module.exports = function( filename ){
    resolvers.selectSource( filename )
      .pipe( geonames.pipeline )
      .pipe( through.obj( model ) )
      .pipe( suggester.pipeline )
      .pipe( dbclient );
  };

```

---

## How to build a local Geocoder

#### without jumping too many hoops
***https://github.com/pelias/vagrant***
***https://mapzen.com/blog/pelias-setup-tutorial***

---

## Getting data out of Elasticsearch

- Queries
- API

---

## Queries

- ```npm install geopipes-elasticsearch-backend```
- https://github.com/geopipes/elasticsearch-backend
- supports the following
  - get, mget
  - put
  - search (with geo_distance, geo_bbox, geo_shape)

---

## API

- endpoints
  - /search
  - /suggest
  - /reverse
  - /doc
- params
  - ?input=
  - ?lat=&lon=
  - ?bbox=
  - ?size=
  - ?layers=

---

## use cases

- full planet build
- regional geocoder
- mobile apps
- attach location data to forms
- postcode finder
- autocomplete airports for flight search
- correct postal addresses