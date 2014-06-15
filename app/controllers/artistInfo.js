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
	  
	  if (artist != null) {
	  	//artist already exists in the db. Just update it.
	  	artist.update({$inc: {numberOfRequests:1}}, function (err){
	  		if (err) return handleError(err);
	  	});

	  }else{
	  	//add the artist to the db.
	  	var newArtist = new Artist({ name: postedArtist, numberOfRequests:1});

		newArtist.save(function (err, newArtist) {
		  if (err) return handleError(err);
		  console.log("saved into db: " + newArtist.name);
		});
	  }

	});

	res.json(200, {"error": null, "artist": postedArtist});

};