var groovesharkService = require('../services/groovesharkApi');

exports.index = function(req, res){

    var artist = req.query.artist;

    var songs = groovesharkService.getSongs(artist).then(function(response){
        if (response[0].statusCode <= 300) {
            res.set('Content-Type', 'text/plain');
            res.send(response[0].body);
        }else{
        	res.json(500, { error: "error" });
        }
    });
};