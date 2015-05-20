
# Pelias

### An open source geocoder built with elasticsearch and node.js

---

![](https://raw.githubusercontent.com/pelias/presentation/master/foss4gna-2015/mapzen.png)

#### Mapping Lab
#### Open Source Tools
#### Open Source Data

---

# Geocoding

Geocoding is the process of transforming input text, such as an address, or a name of a place—to a location on the earth's surface.

![](https://raw.githubusercontent.com/pelias/presentation/master/nyc-node.js-meetup/geocoding_times_square.gif)

<aside class="notes">
  Its that thing you do when you search for a place on a map
</aside>

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/airbnb.png)

NOTE: location based services, such as airbnb, uber, hotels.com all require geocoding

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/shopping_cart.png)

NOTE: company use geocoding for assisting customers in form completion

----

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/calendar.png)

NOTE: even something like a calendar app uses geocoding to specify the location of an event

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

## Pelias <span class="monospace"><3</span> Elasticsearch

- schema free, document-oriented data store
- full-text search & autocomplete
- geo capabilities
- designed for horizontal scale

NOTE: Instead of building text search capabilities on top of a regular data store, we took a data store built for full text (elasticsearch) and figured a way to use it efficiently. 

---

## Pelias <span class="monospace"><3</span> Node.js

* community
* easy setup
* async I/O
* modularity
* streams

NOTE: 
- community is the biggest factor in open source project.
- Modularity allows us to build reusable geo components.
- Since most of the operations involve I/O, node is the perfect solution.
- Easy setup is huge for people looking to spin up their own instance or contribute to the codebase.
- Dealing with huge files is much easier with streams.

---

## Data in, Data out

![image](https://raw.githubusercontent.com/pelias/presentation/master/foss4gna-2015/pelias_diagram.png)

NOTE: Every geocoder has two main components - a way to put data into a data store and a way to retrieve data out smartly.<br/>
  Each of these datasets have to implement the import pipeline to make sure the data is standardized and complete. <br/>
  At mapzen, we are actively developing importers for some of these open datasets

---

## Modularity + Streams = Awesome

![](https://raw.githubusercontent.com/pelias/presentation/master/node.js-meetup/pelias_overview.png)

----

## Modular Design | Challenges

* can lead to too many packages
* tangled dependencies
* visualizing multiple packages
* pelias has around [30 modules](https://github.com/pelias/pelias/blob/master/package_outline.md)

---

## Things to consider before building a local geocoder

----

## Know your data

* What kind of addresses do you have?
* is it consistent?
* Issues? (missing parts of addresses)

----

## Know your geocoder

* Does it standardize data? 
* Relevancy and accuracy
* Search Logic
* Is it fast and secure?

----

## How to build a local Geocoder

#### without jumping through too many hoops
***https://github.com/pelias/vagrant***
***https://mapzen.com/blog/pelias-setup-tutorial***

---

# Thank you!

***harish@mapzen.com*** <br/>
***diana@mapzen.com*** 

<p style="margin-top:80px">Slides: <em>https://github.com/pelias/presentation</em></p>

<style>
.reveal section img {
	border-style: none;
	box-shadow: none;
}

.reveal {
	background-color: white;
	color: black;
}

h1, h2, h3, h4, h5, h6 {
	color: #d4645c !important;
}
</style>
