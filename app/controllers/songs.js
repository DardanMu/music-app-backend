var groovesharkService = require('../services/groovesharkApi');

exports.index = function(req, res){

	var artist = req.query.artist;

	var songs = groovesharkService.getSongs(artist, function(error, response, songs){
		if (!error) {
			res.send(songs);
		}else{
			res.send(error);
		}
	});

};