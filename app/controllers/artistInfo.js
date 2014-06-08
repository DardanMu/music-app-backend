var lastFmService = require('../services/LastFmApi');

exports.index = function(req, res){

	var artist = req.query.artist;

	var artistData = lastFmService.getData(artist, function(error, response, artistData){
		if (!error) {
			res.send(artistData);
		}else{
			res.send(error);
		}
	});
};