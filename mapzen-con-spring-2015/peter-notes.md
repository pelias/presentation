
In regards to the mapzencon presentation, I would like to cover 3 areas:
- market overview: describe the industry, the companies using geocoding and the closed/open ecosystems
- problem space: describe the different aspects of the project, why they are hard and who is doing similar stuff
- architecture: describe the failures in previous geocoding architectures and how to tackle building a complex open community-driven software project


What is Search

humanising information retrieval



Market Overview:

all of these comanies use geo bu it's not their core business

fortune 500 companies
startups
mobile
non-mapping eg. tinder, localisation
bulk geocoding
postal forms (postcode everywhere)
routing

uses for forward
uses for reverse

Software.

What are they using?
Closed proprietary solutions, domain specific, not sharing the effort

problems with proprietary:
- rate limits/cost
- cannot change the data/code

open source tools:






- natural language
- importing POI data
- polygons
- addresses
- normalization / de-duplication
- hosted API
- developer relations / feedback



bizzby: https://s-media-cache-ak0.pinimg.com/736x/8c/24/55/8c245553b7e26a97574a2591c6af2887.jpg



----

https://github.com/pelias/pelias/wiki/Search-Quality
http://www.alexa.com/topsites
https://www.google.com/calendar/render#eventpage_6
https://www.facebook.com/events/upcoming
http://cartodb.s3.amazonaws.com/static_vizz/sunrise.html?title=true&description=true&search=false&shareable=true&cartodb_logo=true&layer_selector=false&legends=false&scrollwheel=true&sublayer_options=1%7C1&sql=&zoom=2&center_lat=22.917922936146045&center_lon=51.328125#
https://www.flickr.com/map
http://www.yelp.com/nyc
https://foursquare.com/
http://www.accuweather.com/en/browse-locations
https://www.airbnb.com/
https://developers.google.com/places/documentation/images/Airbnb-Screenshot-2013-10-08.png
http://www.joestrandell.com/wp-content/uploads/2014/12/tinder-1800-1386265003.jpg
https://s-media-cache-ak0.pinimg.com/736x/8c/24/55/8c245553b7e26a97574a2591c6af2887.jpg
https://www.amazon.com/gp/css/account/address/view.html?ie=UTF8&ref_=ya_add_address&viewID=newAddress
https://www.thinkgeek.com/brain/checkout/address.cgi
http://geocod.io/
what software?
https://geoservices.tamu.edu/Services/Geocode/OtherGeocoders/
http://nominatim.openstreetmap.org/
https://github.com/twain47/Nominatim
http://photon.komoot.de/
http://demo.twofishes.net/static/geocoder.html?query=new%20york,%20ny
http://demo.twofishes.net/static/geocoder.html?query=pizza%20new%20york
architecture
https://mapzen.com/pelias#loc=12,40.7258,-73.9806
https://github.com/pelias/pelias