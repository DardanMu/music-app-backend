var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');


var eventfulApi = {

    getGeoEvents: function(cordinates, pageNumber) {
        var apikey = params.eventfulApi.key;
        var urlParams = params.eventfulApi.urlParams;
        var locationParams = '&where=' + cordinates['latitude'] + ',' + cordinates['longitude'] + '&within=50';
        var page = '&page_number=' + pageNumber;

        var url = params.eventfulApi.url + apikey + locationParams + urlParams + page;

        return request({uri: url, method: 'GET'});
    }
}

module.exports = eventfulApi;
