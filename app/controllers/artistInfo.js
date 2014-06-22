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

var artistData;
exports.getArtist = function(req, res){
	// /api/artist?name=madonna
	var artist = req.query.name;

	storeArtist(artist, function(){
	});

	lastFmService
		.getData(artist, 'info')
		.then(function(infoRes){
			artistData = JSON.parse(infoRes[0].body);
			return lastFmService.getData(artist, 'events');
		}).then(function(eventRes){
			var artistevents = JSON.parse(eventRes[0].body);
			artistData.events = artistevents;
			res.json(artistData);
		}).fail(function(error){
			console.log(error);
			res.json(500, { error: "error" });
		});
};
