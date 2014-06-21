var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');
var lastFmService = require('../services/LastFmApi');

var storeArtist = function(postedArtist, callback){

	Artist.findOne({ 'name': postedArtist }, 'name numberOfRequests', function (err, artist) {
	  if (err) return console.log(err);
	  
	  if (artist != null) {
	  	//artist already exists in the db. Just update it.
	  	artist.update({$inc: {numberOfRequests:1}, $addToSet: {dates: new Date}}, function (err){
	  		if (err) return console.log(err);
	  	});

	  }else{
	  	//add the artist to the db.
	  	var newArtist = new Artist({ name: postedArtist, numberOfRequests:1, dates: [new Date]});
		newArtist.save(function (err, newArtist) {
		  if (err) return console.log(err);
		  console.log("saved into db: " + newArtist.name);
		});
	  }

	});
};


exports.getArtist = function(req, res){
	// /api/artist?name=madonna
	var artist = req.query.name;

	storeArtist(artist, function(){
	});

	var artistData = lastFmService.getData(artist).then(function(response){
		if (response[0].statusCode <= 300) {
	        res.set('Content-Type', 'text/plain');
			res.send(response[0].body);
		}else{
			res.json(500, { error: "error" });
		}
	});
};
