<style>
	.reveal section img {
		border-style: none;
	}
</style>

# Pelias

---

Note to team: the following are the points we wanted to discuss:

1. Intro / Problem overview / Challenges (10 minutes) (PeliasPete)
2. High-level overview of solutions / Current initiatives (10 minutes) (PeliasPete)
3. Year in review (improvements) (5 minutes) (Severyn)
4. API (10 minutes) (harish)
5. Feedback tool / Demos (10 minutes) (harish)

---

### improvements: imports

- decreased import time from a month to 30 hours
  - 144m POIs/addresses (Geonames, OSM, OpenAddresses)
  - 344k admin polygons (Quattroshapes)

---

### improvements: pelias-dashboard

- set up *dev*/*staging* environments
- increased import automation
![](https://cloud.githubusercontent.com/assets/4467604/6786599/c805a04e-d163-11e4-9bac-d258a5dc3491.png)

---

### improvements: acceptance-tests

- introduced acceptance-tests (228 test-cases)
![](https://cloud.githubusercontent.com/assets/4467604/6786634/f7db1178-d163-11e4-894b-a3bc19ff81fb.png)

---

### improvements: search

- increased adminstrative-level name accuracy


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

<section data-background="CountryPolygons.png"/>

---

<section data-background="USStatesPolygons.png"/>

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
