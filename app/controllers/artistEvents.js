var lastFmService = require('../services/LastFmApi');

exports.getEventsByLocation = function(req, res){
	// /api/events?artist=madonna&long=50.32345&lat=-0.634575
	var artist = req.query.artist;
	var cordinates = {longitude: req.query.long, latitude: req.query.lat}






	// lastFmService
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
