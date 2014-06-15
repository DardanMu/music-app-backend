var mongoose = require('mongoose');
var Artist = mongoose.model('Artist');

var lastFmService = require('../services/LastFmApi');

exports.getArtist = function(req, res){
	// /api/artist?name=madonna
	var artist = req.query.name;

	var artistData = lastFmService.getData(artist, function(error, response, artistData){
		if (!error) {
            // res.format({
            //   "text/plain": function(){
            //     res.send(artistData);
            //   }});
            res.set('Content-Type', 'text/plain');
			res.send(artistData);
		}else{
			res.send(error);
		}
	});
};

exports.storeArtist = function(req, res){

	var postedArtist = req.body.name;

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

	res.json(200, {"error": null, "artist": postedArtist});

};