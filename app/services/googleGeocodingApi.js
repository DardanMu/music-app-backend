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

        return request({uri: fullUrl, method: 'GET'});
    },

    getUsersCityAndCountry: function(locData){

        var usersLocation = JSON.parse(locData[0].body);

        for (var i = 0; i < usersLocation.results[0].address_components.length; i++) {
            var location = usersLocation.results[0].address_components[i];

            if(location.types.indexOf('locality') != -1)
            {
               var usersCity = location.long_name.toLowerCase();
            }

            if(location.types.indexOf('country') != -1)
            {
               var usersCountry = location.long_name.toLowerCase();
            }
        };

        return {city: usersCity, country: usersCountry};
    }
}

module.exports = googleGeocodingApi;
