var mongoose = require('mongoose'),
  Article = mongoose.model('Article');
var request = require('request');
var params = require('../../config/parameters');

exports.index = function(req, res){
  Article.find(function(err, articles){
    if(err) throw new Error(err);
    res.render('home/index', {
      title: 'Generator-Express MVC',
      articles: articles
    });
  });
};

exports.songs = function(req, res){

	var apikey = '&apikey' + params.groovesharkApi.key;
	var artist = req.query.artist;

	var url = params.groovesharkApi.url + artist +'?format=json&limit=10' + apikey;

	request(url, function (error, response, songs) {
		if (!error && response.statusCode == 200) {
			// res.render('home/songs', {
			// 	data: JSON.parse(songs)
			// });
	 		res.send(songs);
		}
	});
};