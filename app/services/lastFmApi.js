var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');

var lastFmApi = {

	getData: function(artist, dataType) {
		
		if (dataType === 'info') {
			var url = params.lastFmApi.infoUrl;
		}else if(dataType === 'events'){
			var url = params.lastFmApi.eventsUrl;
		}

		var apikey    = params.lastFmApi.key;
		var urlParams = params.lastFmApi.urlParams;
		var fullUrl   = url + artist + urlParams + apikey;

		return request({uri: fullUrl, method: 'GET'});
	}
}

module.exports = lastFmApi;