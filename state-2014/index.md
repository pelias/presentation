
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
- Two Fishes
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

![image](https://mail.google.com/mail/u/1/?ui=2&ik=108c18e453&view=fimg&th=14a30724c97760fe&attid=0.2&disp=emb&realattid=ii_i3hn237e2_14a307188d9c2f93&attbid=ANGjdJ9_Lc9E5NenpyrPx9dGWxrAfnY_s7Un34_qiyLdXmpEHnsXakNZc7biHubI79WEqF4uqkKv7cOxm01H2FS5v4k6f3uRa1hruThpxSKu7YcoIdkkAfScvLuqq-E&sz=w970-h806&ats=1418225924448&rm=14a30724c97760fe&zw&atsh=1)

---

![image](https://mail.google.com/mail/u/1/?ui=2&ik=108c18e453&view=fimg&th=14a30724c97760fe&attid=0.1&disp=emb&realattid=ii_i3hn235l0_14a307188d9c2f93&attbid=ANGjdJ8Y-QBcyi3cnbYhwAlScca32YsoiOipGA1M293bOq2niSOBsRmYk8HlgXxMIZBQS4Buj6nc98jxOB94hmeec84XpMBO6JOtfWf8B_LyJoQM1cYSOcJKcvywd0Y&sz=w970-h612&ats=1418225924448&rm=14a30724c97760fe&zw&atsh=1)

---

![image](https://raw.githubusercontent.com/pelias/presentation/master/state-2014/osm-london.png)

---

# polygons intersection

<br />

![](https://ci4.googleusercontent.com/proxy/ek1ah_F_PhZDTTO3eXhF3OxueE5wog6KCvb0dW4sV22hEROS_3ECyDP7nLOYkmYXKycWo4zOao3HzLpqSeNUPEGlhq_Fum-6o_mBG-kAN0ADvAE=s0-d-e1-ft#http://www.esenvironmental.com/picts/chemistry/gis_layers.gif)

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
- global coverage

---

# denormalization

<br />

![image](http://osm.analysesig.net/osm2pgsql_schema/diagrams/planet_osm_nodes.implied2degrees.png)

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

# street addresses

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
- simplify the process of running custom imports

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
