var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');


var groovesharkApi = {

	getSongs: function(artist) {
		var apikey = '&key=' + params.groovesharkApi.key;
		var urlParams = params.groovesharkApi.urlParams;

		var url = params.groovesharkApi.url + artist + urlParams + apikey;

		return request({uri: url, method: 'GET'});
	}
}

module.exports = groovesharkApi;