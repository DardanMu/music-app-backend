var groovesharkService = require('../services/groovesharkApi');

exports.index = function(req, res){

	var artist = req.query.artist;

	var songs = groovesharkService.getSongs(artist, function(error, response, songs){
		console.log(response);
		res.send(songs);
	});

};