var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');

var lastFmApi = {

    getArtistData: function(artist, dataType) {

        if (dataType === 'info') {
            var url = params.lastFmApi.infoUrl;
        }else if(dataType === 'events'){
            var url = params.lastFmApi.eventsUrl;
        }

        var apikey    = params.lastFmApi.key;
        var urlParams = params.lastFmApi.urlParams;
        var fullUrl   = url + artist + urlParams + apikey;

        return request({uri: fullUrl, method: 'GET'});
    },

    getGeoEvents: function(cordinates) {

        var url = params.lastFmApi.geoEventsUrl;
        var latlng    = '&latitude=' + cordinates['latitude'] + '&longitude=' + cordinates['longitude'];

        var apikey    = params.lastFmApi.key;
        var urlParams = params.lastFmApi.urlParams;
        var fullUrl   = url + latlng + urlParams + apikey;

        return request({uri: fullUrl, method: 'GET'});
    },

    getHypedArtists: function() {

        var url = params.lastFmApi.hypedArtistsUrl;

        var apikey    = params.lastFmApi.key;
        var urlParams = params.lastFmApi.urlParams;
        var fullUrl   = url + urlParams + apikey;

        return request({uri: fullUrl, method: 'GET'});
    },

    getGeoTopArtists: function(location) {

        var url = params.lastFmApi.geoTopArtistsUrl;

        var apikey    = params.lastFmApi.key;
        var urlParams = params.lastFmApi.urlParams;
        var fullUrl   = url + location.country + urlParams + apikey;

        return request({uri: fullUrl, method: 'GET'});
    }
}

module.exports = lastFmApi;
