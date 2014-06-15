var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

var lastFmService = require('../services/LastFmApi');

exports.getArtist = function(req, res){
	// /api/artist?name=madonna
	var artist = req.query.name;

	var artistData = lastFmService.getData(artist, function(error, response, artistData){
		if (!error) {
			res.send(artistData);
		}else{
			res.send(error);
		}
	});
};

exports.storeArtist = function(req, res){

	var postedArtist = req.body.name;

	Artist.findOne({ 'name': postedArtist }, 'name numberOfRequests', function (err, artist) {
	  if (err) return handleError(err);

	  console.log("in here1");
	  
	  if (artist != null) {
	  	console.log("in here2");
	  	// console.log("numofreq:" + artist.numberOfRequests);
	  	//just update atist
	  	// artist.numberOfRequests = artist.numberOfRequests+ 1;

	  	artist.update({$inc: {numberOfRequests:1}}, function (err){
	  		console.log("updated");
	  	});


	 //  	artist.save(function (err) {
		//     if (err) return console.error(err);
		//     console.log("saved existing artist: numofreq:" + artist.numberOfRequests);
		// });

	  }else{
	  	console.log("in here3");
	  	//create it
	  	var newArtist = new Artist({ name: postedArtist, numberOfRequests: 1 });

		newArtist.save(function (err, newArtist) {
		  if (err) return console.error(err);
		  console.log("saved into db: " + newArtist.name);
		});
	  }

	});


	res.json(200, {"error": "null", "artist": postedArtist});

	res.send();

};