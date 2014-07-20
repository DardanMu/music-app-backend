var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');

var googleGeocodingApi = {

	getlocationData: function(cordinates) {

		var url       = params.googleGeocodingApi.url;
		var urlParams = params.googleGeocodingApi.urlParams;
        var apikey    = params.googleGeocodingApi.key;
        var latlng    = cordinates['latitude'] + ','+ cordinates['longitude'];

		var fullUrl   = url + urlParams + latlng + apikey;

        console.log(fullUrl);

		return request({uri: fullUrl, method: 'GET'});
	}
}

module.exports = googleGeocodingApi;