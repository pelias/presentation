var geonames = require('geonames-stream'),
	request  = require('request'),
	through  = require('through2');
 
request.get( 'http://download.geonames.org/export/dump/US.zip' )
	   .pipe( geonames.pipeline ) // parse CSV, extract req fields, JSONify
	   .pipe( through.obj( function( data, enc, next ){
	   		var selected = {
	   			id: data._id,
	   			name: data.name,
	   			geo: data.latitude + ',' + data.longitude,
	   			state: data.admin1_code
	   		}
	   		console.log( selected );
	   		next();
	   	}));