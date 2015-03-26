<style>
	.reveal section img {
		border-style: none;
	}

	.reveal {
		background-color: white;
		color: black;
	}

	h1, h2, h3, h4, h5, h6 {
		color: #d4645c !important;
	}
</style>

# Search

![search](http://creativeoverflow.net/wp-content/uploads/2012/10/26-31-sexy-search-boxes.png)

---

![old school](http://www.toplessrobot.com/2-searching.jpg)

---

![90s](http://www.everfunny.com/wp-content/uploads/2013/02/1990s-problem.jpg)

---

![databases](https://www.drupal.org/files/images/tsort_table_example.png)

---

![ui](http://cdn.mashable.com/wp-content/uploads/2010/08/BrowserElements.jpg)

---

![ui2](http://blog.canto.com/wp-content/uploads/2015/02/query1neu.jpg)

---

![query](http://rlv.zcache.com/sql_pub_time_t_shirts-re820e7150b85428780800345868f8e43_804gs_1024.jpg)

---

![query2](http://www.first8.nl/wp-content/uploads/2014/05/Screen-Shot-2014-05-13-at-16.29.png)

---

![human](http://static.fjcdn.com/pictures/Google+hacks+here+s+a+cheat+sheet+to+help+you+google_c857be_4992885.jpg)

---

![predictive](http://cdn.smosh.com/sites/default/files/bloguploads/google-search-suggestions-1.jpg)

---

![pizza](http://www.yext.com/blog/wp-content/uploads/2012/06/pizza-yelp.png)

---

## humanizing information retrieval

---

## design considerations

![design](https://navigatingdaedaluslabyrinth.files.wordpress.com/2013/02/01_misaligned_bridge_503.jpg)

---

### differentiation

- It's completely open-source and MIT licensed
- It's based on open-data, so you can run it yourself
- You can install it locally and modify to suit your needs
- It has an impressive list of features, such as **fast autocomplete**
- It's modular, so you don't need to be an expert to make changes
- It's easy to install and requires no external dependencies
- We run a continuous deployment cycle with a new version shipping weekly

---

### goals

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

## tasks

- importing data
- intuitive query logic / API
- administrative polygons
- postal addresses
- normalization / de-duplication
- natural language
- developer relations / feedback

---

### improvements

- Pelias has seen lots of import/API improvements
- import pipelines
  - preprocess and ingest data
  - OpenAddresses, OSM, Geonames, Quattroshapes
- API
  - queries elasticsearch
  - controls results composition, search logic

---

### improvements: imports

- defining and ironing out our workflow
  - faster imports
  - build environments
  - acceptance tests

---

### import speed

- decreased import time from a month to 30 hours
  - 144m POIs/addresses (Geonames, OSM, OpenAddresses)
  - 344k admin polygons (Quattroshapes)

---

### build environments

- *dev*/*staging* environments
- increased import automation
![](https://cloud.githubusercontent.com/assets/4467604/6786599/c805a04e-d163-11e4-9bac-d258a5dc3491.png)

---

### acceptance-tests

- introduced acceptance-tests (228 test-cases)
![](https://cloud.githubusercontent.com/assets/4467604/6786634/f7db1178-d163-11e4-894b-a3bc19ff81fb.png)

---

### workflow

- identify new features to work on
  - create test cases that we expect to pass
  - implement features in branches
- test features locally
- graduate to a dev import
- run tests for dev
- graduate to a staging import
- run tests for staging
- switch staging over to production
- merge branches, close issues, move on

---

### State
### Quality
### Synergy

---

## State

* Faster Imports
* Optional Geobias
* Smarter Scoring
* Better Documentation

---

## Quality

* Data Quality
* Search Quality
* Feedback

---

##Synergy

* Community Outreach
* Conference talks
* Sending Mail

---

<section data-background="https://s-media-cache-ak0.pinimg.com/originals/48/a1/c9/48a1c9d12ad1b9d98a055bb49a90bf4e.jpg">
<h3 align="right" style="color:black">building fences</h3>
</section>

---

### <font style="color:orange">fences?</font>

 * administrative boundaries
  * countries, states, provinces, cities, counties, boroughs, townships, neighborhoods, etc.
 * used for coarse (<i>reverse</i>) geocoding, routing

---

### <font style="color:orange">where can i get some?</font>

![](https://s-media-cache-ak0.pinimg.com/originals/e8/13/8a/e8138a20463874a0db75dcd8a8890b6b.jpg)

----

 * ~~google~~
 * Quattroshapes
 * ¯\\\_(ツ)\_/¯

---

### <font style="color:orange">good news</font>
#### <font style="color:orange;weight:ul"><u>openstreetmap</u></font> has boundaries

<font size="5"><i>...along with ~gazillion other things, so good luck with that<i/></font>

----

 * all relations with the following tags

| <font style="color:orange">key | <font style="color:orange">value |
| - |
| boundary | <i>administrative |
| admin_level | <i>1-11 |
| |

 * <b>~300K</b> relations matching this description
 * admin_level meaning varies by country

[see OSM wiki for admin_level breakdown](href="http://wiki.openstreetmap.org/wiki/Tag:boundary%3Dadministrative#admin_level")

---

<section data-background="https://raw.githubusercontent.com/pelias/presentation/master/mapzen-con-spring-2015/CountryPolygons.png"/>

---

<section data-background="https://raw.githubusercontent.com/pelias/presentation/master/mapzen-con-spring-2015/USStatesPolygons.png"/>

---

### <font style="color:orange">master plan</font>

 * <font style="color:green">&#10004;</font> naive extract
 * <font style="color:green">&#10004;</font> expose problematic data to encourage improvements
 * <font style="color:green">&#10004;</font> open-source tools for building your own <font style="color:orange">fences</font>
 * <font style="color:green">&#10004;</font> build at regular intervals = fresh data \\o/
 * <font style="color:green">&#10004;</font> raw extracts already on the internets [here](http://s3.amazonaws.com/osm-polygons.mapzen.com)

----

#### <font style="color:orange">work in progress</font>

 * build front-end for downloads
 * scrub and normalize data
 * inject additional data into extracts
   * postal codes
   * population
   * languages spoken
   * drive_on_left?
   * other really important stuff?
 * engage the community
