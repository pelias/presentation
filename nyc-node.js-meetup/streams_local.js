var geonames = require('geonames-stream'),
	fs       = require('fs'),
	through  = require('through2');
 
fs.createReadStream('NZ.zip')
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