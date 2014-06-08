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

	var apikey = '&key=' + params.groovesharkApi.key;
	var artist = req.query.artist;
	var urlParams = params.groovesharkApi.urlParams;

	var url = params.groovesharkApi.url + artist + urlParams + apikey;

	request(url, function (error, response, songs) {
		if (!error && response.statusCode == 200) {
			// res.render('home/songs', {
			// 	data: JSON.parse(songs)
			// });
	 		res.send(songs);
		}
	});
};