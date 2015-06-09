
# Build your own geocoder

<br /><br />

SOTMUS 2015 --- peter.johnson@mapzen.com

https://github.com/pelias/presentation

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
- supports large indices totalling 50GB-100GB of RAM
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

![relational](https://web.archive.org/web/20141023055650/https://cdn.tutsplus.com/net/authors/lalith-polepeddi/relational-databases-for-dummies-fig4.png)

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

# Linguistics

- different languages (i18n)
- tokenization
 - stop words
 - stemming
 - synonyms
 - ngram, prefix ngram
 - shingles
 - ascii folding
 - fuzz and slop

---

# Standard tokenizer

<section>
  <pre><code>
    1. Welcome to state of the map!
  </code></pre>
  <pre><code>
[ "welcome", "to", "state", "of", "the", "map" ]
  </code></pre>
</section>

---

# Stop words

<section>
  <pre><code>
    1. Welcome to state of the map!
  </code></pre>
  <pre><code>
[ "welcome", "state", "map" ]
  </code></pre>
</section>

---

# Stemming

<section>
  <pre><code>
    1. The mappers walked the streets
    2. I used a map while walking the street
  </code></pre>
  <pre><code>
[ "map", "walk", "street" ]
[ "used", "map", "while", "walk", "street" ]
  </code></pre>
</section>

---

# Synonyms

<section>
  <pre><code>
    1. The mappers walked the streets
  </code></pre>
  <pre><code>
[ "map", "walk", "stroll", "street", "road", "avenue" ]
  </code></pre>
</section>

---

# NGRAM

<section>
  <pre><code>
    1. The mappers walked the streets
  </code></pre>
  <pre><code>
[ "t", "th", "he", "the", "m", "ma", "ap", "map", "app", "pp" .. ]
  </code></pre>
</section>

---

# Prefix 2-3GRAM

<section>
  <pre><code>
    1. The mappers walked the streets
  </code></pre>
  <pre><code>
[ "th", "ma", "map", "wa", "wal", "st", "str" ]
  </code></pre>
</section>

---

# Shingles

<section>
  <pre><code>
    1. The mappers walked the streets
  </code></pre>
  <pre><code>
[ "the mappers", "mappers walk", "walked the", "the streets" ]
  </code></pre>
</section>

---

# ASCII folding

<section>
  <pre><code>
    1. Café
  </code></pre>
  <pre><code>
[ "cafe" ]
  </code></pre>
</section>

---

# Fuzz & Slop

<section>
  <pre><code>
    1. 101 Mapzen Place
  </code></pre>
  <pre><code>
    101 Mapzen Place
    10 Map Place
    Mapzeen Place 102
  </code></pre>
</section>

---

# Programming Language

- easy to accept contributions / pull requests
- strong **geo** libraries
- **linguistic** algorithms + **multibyte** support
- **I/O** performance
- multi-core architecture / parallel processing
- unit / functional **testing** libraries
- good support for data **streams**

---

# Data sources

- http://planet.osm.org
- https://mapzen.com/data/metro-extracts
- http://openaddresses.io
- http://quattroshapes.com
- http://www.geonames.org
- other / civic / federal / proprietary

---

# interesting

- Points ( lat/lon centroids )
 - place
 - address

---

# more interesting

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

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/osm-london.png)

---

### https://mapzen.com/data/borders/

---

# Dirty Data

- all data is error prone
- duplicates need to be merged and removed
- character encoding issues
- more errors and inconsistencies
 - ALL CAPS!
 - incorrect name tags
 - suffixes / prefixes
 - etc.

---

# Formats

- OSM / PBF
- Shapefile
- CSV / TSV / text
- etc.

---

# Import Pipelines

- can run for hours / days
- potentially use large amounts of RAM
- code should prevent flooding / crashes

---

# stats

![stats](http://peter.johnson.s3.amazonaws.com/stats.png)

---

# cats

![cat](https://c2.staticflickr.com/6/5121/5192869874_2514188528.jpg)

---

# geography

- point in polygon
- polygon in polygon
- address ranges
- filtering / sorting by distance
- boundaries

---

## point intersection

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/intersection.gif)

---

![pic](http://i44.tinypic.com/pumpw.jpg)

---

## address interpolation

![interpolation](http://www.geoinformatics.com/layouts/cmediageoinformatics/img/backup2/online%20articles%202007/geo76%20p30-32%20route/route-directions075-03.gif)

---

## distance scoring

![distance](http://blogs.microsoft.co.il/blogs/gilf/image_176A42DD.png)

---

# running a service

- server operations
- deployment automation
- testing
- apis
- feedback
- rate limiting

---

# releasing a product

- testing
- extensibility
- versioning
- issue tracking
- feedback

---

# create a user interface

- UI / UX
- plugins
- versioning
- animations / interactions

---

# community

- open source
- open data
- open ticket tracking
- open roadmap
- open chat rooms
- support
- education / training / workshops
- collaborate!

---

# questions / open discussion

# :)
