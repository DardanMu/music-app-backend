var request = require('request');
var params = require('../../config/parameters');

//use the bottom two modules if you want to use promises
// var Q = require('q')
// var request = Q.denodeify(require('request'))

var groovesharkApi = {

	getSongs: function(artist, callback) {
		var apikey = '&key=' + params.groovesharkApi.key;
		var urlParams = params.groovesharkApi.urlParams;

		var url = params.groovesharkApi.url + artist + urlParams + apikey;

		return request(url, callback);
	}
}

module.exports = groovesharkApi;