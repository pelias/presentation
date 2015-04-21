var geonames = require('geonames-stream'),
	request  = require('request'),
	through  = require('through2');
 
request.get( 'http://download.geonames.org/export/dump/US.zip' )
	   .pipe( geonames.pipeline )
	   .pipe( through.obj( function( data, enc, next ){
	   		console.log( data._id, data.name, data.population );
	   		next();
	   	}));