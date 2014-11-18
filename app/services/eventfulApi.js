var Q = require('q'),
    request = Q.denodeify(require('request')),
    params = require('../../config/parameters');


var eventfulApi = {

    getGeoEvents: function(cordinates, pageNumber) {
        var apikey = params.eventfulApi.key,
            urlParams = params.eventfulApi.urlParams,
            locationParams = '&where=' + cordinates['latitude'] + ',' + cordinates['longitude'] + '&within=50',
            page = '&page_number=' + pageNumber;

        //we query for 4 weeks of events, starting from 1 week from now.
        var today = new Date(),
            startDate = new Date(today);
                startDate.setDate(today.getDate()+7),
            endDate = new Date(today);
                endDate.setDate(today.getDate()+35);

        var startDateString = '' + startDate.getFullYear() + ('0' + (startDate.getMonth() + 1)).slice(-2) + ('0' + startDate.getDate()).slice(-2) + 0 + 0,
            endDateString = '' + endDate.getFullYear() + ('0' + (endDate.getMonth() + 1)).slice(-2) + ('0' + endDate.getDate()).slice(-2) + 0 + 0;
        //YYYYMMDD00-YYYYMMDD00 format
        var dateRange = '&date=' + startDateString + '-' + endDateString;


        var url = params.eventfulApi.url + apikey + locationParams + urlParams + dateRange + page;

        return request({uri: url, method: 'GET'});
    }
}

module.exports = eventfulApi;
