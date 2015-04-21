var geonames = require('geonames-stream'),
	fs       = require('fs'),
	through  = require('through2');
 
fs.createReadStream('NZ.zip')
	   .pipe( geonames.pipeline )
	   .pipe( through.obj( function( data, enc, next ){
	   		console.log( data._id, data.name, data.latitude, data.longitude );
	   		next();
	   	}));