var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');

var lastFmApi = {

	getData: function(artist) {
		var apikey    = params.lastFmApi.key;
		var urlParams = params.lastFmApi.urlParams;
		var url       = params.lastFmApi.url + artist + urlParams + apikey;

		return request({uri: url, method: 'GET'});
	}
}

module.exports = lastFmApi;