
# Pelias

---

# geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://github.com/pelias/pelias/raw/master/img/geocoding.gif)

---

# reverse geocoding

Reverse geocoding is the opposite, it transforms your current geographic location in to a list of places nearby.

![](https://github.com/pelias/pelias/raw/master/img/reverse.gif)

---

# ecosystem - free tier

<br />

- Google maps API (15,000/day)
- Yahoo (5,000/day)
- Nokia HERE (10,000 per day)
- opencagedata
- ... many more

---

# ecosystem - open source

<br />

- Nominatim
- Photon
- ??

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

# use cases

- full planet build
- regional geocoder
- attach location data to forms
- postcode finder
- autocomplete airports for flight search
- correct postal addresses

---

# where we're at

- full planet build
  - 62.3MM points-of-interest
  - total: 185GB of disk
  - total: ~32GB FST (down from ~80GB)
  - 8x r3.xlarge servers (down from 20x)
    - 4 core
    - 30.5 GB RAM
    - 1 x 80GB SSD
- no strict language requirement, currently written in node
- no postgres

---

# sub projects

- import pipeline
  - polygons
  - centroids
  - geopipes

<br />

- api (search logic)

- street addresses

- operations

- relations


---

# import pipeline

- polygons
  - quattroshapes
- centroid
  - geonames
  - openstreetmap

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

# geopipes

- @see import pipeline, architecture

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
  - public contributions

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

- integrating addresses pipeline with osm/pelias (@severyn)

- open issues:
  - guesswho
    - global suggest
  - node-osmium

- use cases
  - closest food
  - airports
  - postcodes


- ngram?

- aliases?

---

# community

- triage + assignment
- booking some speaking events (@alyssa)

---

# tooling

- waffle.io
- gitter