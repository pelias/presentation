
# Pelias

---

# history

- previous versions
- difficult and lengthly build
- search quality

---

![cat](http://i.imgur.com/Kq94a.jpg)

---

# geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://github.com/pelias/pelias/raw/master/img/geocoding.gif)

---

# reverse geocoding

Reverse geocoding is the opposite, it transforms your current geographic location in to a list of places nearby.

![](https://github.com/pelias/pelias/raw/master/img/reverse.gif)

---

# free tier

<br />

- Google maps API (15,000/day)
- Yahoo (5,000/day)
- Nokia HERE (10,000 per day)
- opencagedata
- ... many more

---

![cat](https://gigaom2.files.wordpress.com/2012/05/fat-cat-money.jpg)

---

# open source

<br />

- Nominatim
- Photon
- Two Fishes
- ??

---

![cat](http://origin.arstechnica.com/journals/linux.media/300/funny-pictures-crazy-cat-bird-window-open.jpg)

---

# points of differentiation

- It's completely open-source and MIT licensed
- It's based on open-data, so you can run it yourself
- You can install it locally and modify to suit your needs
- It has an impressive list of features, such as fast autocomplete
- It's modular, so you don't need to be an expert to make changes
- It's easy to install and requires no external dependencies
- We run a continuous deployment cycle with a new version shipping weekly

---

# high level goals

- Provide accurate search results
- Give users query suggestions (typeahead in the search box)
- Account for location bias (places nearer to you appear higher in the results)
- Support multiple data sources (OSM, geonames, quattroshapes etc)
- Flexible software architecture
- Easy to contribute software patches and features to
- Easy to set-up and configure your own instance
- No external dependencies (such as postgres)
- Reliable, configurable & fast import process
- Work equally well for a small city and the entire planet

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


---

# quattroshapes

<br />

This work is based on foursquare checkins, geo tagged photos from Flickr, an extended version of Natural Earth, and open government data.

<br />

Concordance is provided between quattroshapes, geonames.org, and Yahoo! GeoPlanet unique IDs in the gazetteer.

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

![stats](https://fd-files-production.s3.amazonaws.com/70073/nd1azQDR8GKp3qwZ9JAmqQ?AWSAccessKeyId=AKIAIA2QBI5WP5HA3ZEA&Signature=Gd0GntKrb82BELuJ4aB%2BnLRFSIA%3D&Expires=1418229499)

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
