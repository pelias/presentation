
# Build your own geocoder

<br /><br />

SOTMUS 2015 --- peter.johnson@mapzen.com

---

# Geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://github.com/pelias/pelias/raw/master/img/geocoding.gif)

---

# Reverse geocoding

Reverse geocoding is the opposite, it transforms your current geographic location in to a list of places nearby.

![](https://github.com/pelias/pelias/raw/master/img/reverse.gif)

---

# Pelias

- MIT licensed / open source / open data
- **demo** https://mapzen.com/pelias
- **code** https://github.com/pelias/pelias
- **quick start** https://github.com/pelias/vagrant

---

# Features?

- open source
- fast autocomplete
- location bias
- filtering + sorting
- tf / idf
- fuzziness
- planet-wide / small city
- batch geocoding
- address interpolation
- cross-streets
- easy to set up + test

---

# Coarse Geocoding

![coarse](http://peter.johnson.s3.amazonaws.com/coarse.png)

- airbnb.com
- tinder.com
- weather.com

---

# Place Geocoding

![place](http://peter.johnson.s3.amazonaws.com/place.png)

- foursquare.com
- instagram.com
- facebook.com

---

# Address Geocoding

![address](http://peter.johnson.s3.amazonaws.com/address.png)

- uber.com
- amazon.com
- flowers.com

---

# Disciplines

- computer science
  - information retrieval
  - programming / testing
  - data science
- linguistics
- geography
- community management
- user experience UI/UX

---

# Choosing a database

- **read** optimized *not* **write** optimized
- **eventually consistent** *not* **transactionally secure**
- has both **sharding** and **replication** so we can scale
- supports large indeces totalling 50GB-100GB of RAM
- has a feature rich **geographic API** built in
- supports **multilingual language analysis**
- capable of **peformant full text search**

---

# Data structure

- Relational tables (Spreadsheets, SQL)
- Document store (MongoDB, RethinkDB)
- Key -> Value store (eg. REDIS, LevelDB)
- Inverted index (Lucene, Custom)
- FST (Lucene, Graph)
- Graph (Neo4j, OrientDB)

---

![relational](https://cdn.tutsplus.com/net/authors/lalith-polepeddi/relational-databases-for-dummies-fig4.png)

---

![document store](https://developer.ibm.com/bluemix/wp-content/uploads/sites/20/2014/10/Figure5a.png)

---

![key value](http://scraping.pro/res/nosql/keyvalue_database.png)

---

![graph](http://www.future-processing.pl/wp-content/uploads/2014/08/NoSQL-Graph-database1.png)

---

![inverted](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/SearchKitConcepts/art/inverted_index_textposition.jpg)

---

<section>
  <pre><code>
    1. welcome to state of the map!
    2. mappers meet-up in the united states
  </code></pre>
  <pre><code>
index = {
  'welcome': [ 1 ],
  'state': [ 1, 2 ]
  'map': [ 1, 2 ]
}
  </code></pre>
</section>

---

![fst](http://www.elasticsearch.org/content/uploads/2013/08/suggest_1.png)

---

<section>
  <pre><code>
    1. pizza
    2. pisa
  </code></pre>
  <pre><code>
fst = {
  'p->i': [ 1, 2 ],
  'i->z': [ 1 ],
  'i->s': [ 2 ]
}
  </code></pre>
</section>

---

# Spatial prefix tree

( geohash / quadtree )

- http://mapzen.github.io/leaflet-spatial-prefix-tree
- https://github.com/mapzen/leaflet-spatial-prefix-tree

---

# Programming Language

- easy to accept contributions / pull requests
- strong **geo** libraries
- **linguistic** algorithms + **multibyte** support
- **I/O** performance
- multi-core artichecture / parallel processing
- unit / functional **testing** librarires
- good support for data **streams**

---

# Data sources

- http://planet.osm.org
- https://mapzen.com/data/metro-extracts
- http://openaddresses.io
- http://quattroshapes.com
- http://www.geonames.org
- other / civic / proprietary

---

- Points ( lat/lon centroids )
 - place
 - address

---

- Polygon ( multiple points joined )
 - place
 - address
 - boundary

---

![image](http://quattroshapes.com/images/qs_adm1.png)

---

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/admin1.png)

---

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/locality.png)

---

# polygons intersection

<br />

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/intersection.gif)


---

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/osm-london.png)

---

### https://mapzen.com/data/borders/

---

---

![stats](http://peter.johnson.s3.amazonaws.com/stats.png)

---

![cat](http://www.themarysue.com/wp-content/uploads/2013/03/Cat-on-a-Map.jpg)

---

# use cases

<br />

- full planet build
- regional geocoder
- mobile apps
- attach location data to forms
- postcode finder
- autocomplete airports for flight search
- correct postal addresses

---

# where we're at

- full planet build
  - 62.3MM points-of-interest
- no strict language requirement, currently written in node
- no postgres

---

![cat](http://www.townsandtrails.com/blog/wp-content/uploads/2010/05/Map-Cat.jpg)

---

# sub projects

- import pipelines
  - polygons
  - centroids
  - geopipes

<br />

- api (search logic)

- street addresses

- operations

- developer/public relations


# geonames

<br />

- ~9M records
- centroids
- population counts
- alt names
- mostly USA ~2M vs. 50k for UK

---

# openstreetmap

<br />

- centroids & polygons
- street addresses
- stats
 - nodes: 2,640,202,473
 - ways: 263,788,642
 - relations: 2,978,242
- free tagging
- alternate names/languages
- global coverage

---

# denormalization

<br />

![image](http://osm.analysesig.net/osm2pgsql_schema/diagrams/planet_osm_nodes.implied2degrees.png)

---

# feature list

```javascript
var features = [
  "amenity",
  "building",
  "shop",
  "office",
  "public_transport",
  "cuisine",
  "railway",
  "sport",
  "natural",
  "tourism",
  "leisure",
  "historic",
  "man_made",
  "landuse",
  "waterway",
  "aerialway",
  "aeroway",
  "craft",
  "military"
];
```

---

![cat](https://c2.staticflickr.com/6/5121/5192869874_2514188528.jpg)

---

# geopipes

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/geopipes.png)

---

# architecture

<br />

- elasticsearch
  - full text search
  - geo capabilities
  - sharding

<br />

- nodejs
  - streams
  - modularity
  - easy to use

<br />

- golang / c++

---

![cat](http://www.lolcats.com/images/u/08/23/lolcatsdotcomlzhksdvmkt1i1t2y.jpg)

---

![image](https://s3.amazonaws.com/kinlane-productions/api-evangelist/elasticsearch/elastic-search-logo.jpg)

<br />

- java
- enterprisey
- lucene
- full text search
- geo capabilities
- sharding

---

![index](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/SearchKitConcepts/art/inverted_index_textposition.jpg)

---

# stemming

<br />

![stem](https://leanjavaengineering.files.wordpress.com/2012/02/figure3.png)

---

# FST

![fst](http://www.elasticsearch.org/content/uploads/2013/08/suggest_1.png)

---

# api

- endpoints
  - /search
  - /suggest
  - /reverse
  - /hierarchy
- modifiers
  - ?size=
  - ?layers=
  - ?lat=&lon=
- public contributions

---

![cat](http://ecx.images-amazon.com/images/I/31iaim9GeOL.jpg)

---

# search logic

- just nearby
  - geodistance from lat/lon
- results from neighboring cities/states/countries
  - uses different precision levels (5+3+1)
- include admin values
  - based on the zoom level
  - Ex: show countries at zoom<8 & neighborhoods zoom 12+
- taking weights into account
  - admin1 > neighborhood > osmnode > geoname
- fuzzy matching
  - generates an edit distance based on the search term length
  - 'layd moody' -> 'lady moody', 'maysbille' -> 'maysville'

---

# search logic (experimental)

- search term analysis on the fly
- if search term starts with a number, prioritize street addresses
- if search term is less than x characters without a space, show higher admins
- tokenize on comma and ignore the tokens that follow
- improve general search quality based on relevance & feedback (future)

---

# search quality

- what does good search quality mean?
  - personalization?
  - being smart (creepy?)
  - doing the right thing (what?)
- testing
  - unit tests
  - regression testing

---

![cat](https://c1.staticflickr.com/1/8/6734519_569a7e0947.jpg)

---

# addresses pipeline

- import pipeline for all (most) address data
- bundles together:
  - normalized address schema
  - address deduplication
  - suggester payload addition
- imports:
  - *OpenAddresses*
  - *OSM*
  - *TIGER*
  - etc.

---

# custom address imports

- abstracts away boilerplate, manual configuration
- simplify custom address imports for users
- cut redundancy in our import codebase

---

# addresses: future

- currently running test imports
- next step might be a geocoder for the US
- iterate, integrate into production

---

![cat](http://assets.diylol.com/hfs/2c9/925/2b4/resized/street-cat-meme-generator-the-streets-need-me-550389.jpg)

---

# operations

### overview

- config management with Chef/Opsworks
- monitoring via Sensu/Cloudwatch/Pingdom
 - standard host metrics alerting
 - cluster state
 - ELB unhealthy hosts
- multiple independent systems
 - switchover via DNS (Route53)

---

# operations

### index metrics

- 62.3 million documents
- 371GB on disk (with 1 replica)
- 64GB FST size (down from ~190GB)

---

![stats](http://www.quickmeme.com/img/33/33fadfa1e97738f6bd7692f6e4b3fe7e329b989d257566fe0a1a2482999ddc29.jpg)

---

# operations

### architecture

- Internet >> (ELB) Repose >> (ELB) API >> (ELB) Elasticsearch
 - Repose: rate limiting proxy, java, on the fly config changes
 - Elasticsearch: 1.3.4
  - sharding determined largely by memory requirements which currently dictate node count
  - replicas for redundancy
   - more replicas influence FST requirements

---

# operations

### concerns

- load testing
- data ingestion time
- rollback
 - grace period on old cluster before new load?
 - index snapshots?

---

![cat](http://cache.desktopnexus.com/thumbnails/513548-bigthumbnail.jpg)

---

# retrospective

- geonames, what is the quality
- quattro, excellent but needs quality review
- osm import speed issues
- versioning

---

# roadmap

- search quality
 - classification capital/city/transport/cafe etc.
 - population weights

- data visualization tools
- ease of imports

- split polygons & intersections to new repo?
  - import osm boundaries?
  - quattroshapes fixes work

---

# roadmap continued

<br />

- integrating addresses pipeline with osm/pelias (@severyn)

- open issues:
  - guesswho
    - global suggest
  - node-osmium

- ngram?

- aliases?

---

# community

- triage + assignment
- booking some speaking events (@alyssa)
- waffle.io?
- gitter?

---

![tourist](http://hellogiggles.com/wp-content/uploads/2014/09/20/lost-tourist.jpg)
