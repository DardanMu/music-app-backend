var request = require('request');
var params = require('../../config/parameters');

var lastFmApi = {

	getData: function(artist, callback) {
		var apikey    = params.lastFmApi.key;
		var urlParams = params.lastFmApi.urlParams;
		var url       = params.lastFmApi.url + artist + urlParams + apikey;

		return request(url, callback);
	}
}

module.exports = lastFmApi;