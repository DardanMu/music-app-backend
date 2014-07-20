var googleGeocodingService = require('../services/googleGeocodingApi');

exports.getEventsByLocation = function(req, res){
	// /api/events?artist=madonna&long=50.32345&lat=-0.634575
	var artist = req.query.artist;
	var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    googleGeocodingService
	   .getlocationData(cordinates)
       .then(function(locData){
            var usersLocation = JSON.parse(locData[0].body);
            res.json(usersLocation);
       });


	// googleGeocodingService
	// 	.getData(artist, 'info')
	// 	.then(function(infoRes){
	// 		var artistData = JSON.parse(infoRes[0].body);
	// 		//store the requested artist in the DB.
	// 		//this runs asynchronously, so no delay to send the data
	// 		storeArtist(artistData.artist.name, function(){
	// 		});
			
	// 		res.json(artistData);
	// 	}).fail(function(error){
	// 		//if any of the above promises fail, we come here...
	// 		console.log(error);
	// 		res.json(500, { error: "error" });
	// 	});
};
