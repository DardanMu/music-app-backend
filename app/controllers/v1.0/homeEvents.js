var googleGeocodingService = require('../../services/googleGeocodingApi');
var lastFmService = require('../../services/LastFmApi');
var Q = require('q');

var getGeoEvents = function(usersLocation)
{
    var deferred = Q.defer();

    lastFmService
    .getGeoEvents(usersLocation)
    .then(function(events){
        var eventData = JSON.parse(events[0].body);

            deferred.resolve(eventData);

        }).fail(function(error){
            console.log(error);
            deferred.reject(error);
        });

    return deferred.promise;
}

exports.getAllEventsByLocation = function(req, res){
    // /api/v1.0/eventsByLocation?lat=30.276391&long=-97.732422
    var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    //check for location data in the users cookie,
    //if found: dont run googleGeocodingService functions, skip to getGeoEvents
    if (req.cookies.location) {

        var usersLocation = JSON.parse(req.cookies.location);

        getGeoEvents(usersLocation.city)
        .then(function(eventData) {
            res.json(eventData);
        }).fail(function(error){
            res.json(500, { error: '' + error });
        });

    }else{
        googleGeocodingService
        .getlocationData(cordinates)
        .then(function(locData){
            var usersLocation = googleGeocodingService.getUsersCityAndCountry(locData);

            res.cookie('location', JSON.stringify({city: usersLocation.city, country: usersLocation.country}));

            getGeoEvents(usersLocation.city)
            .then(function(eventData) {
                res.json(eventData);
            }).fail(function(error){
                res.json(500, { error: '' + error });
            });

        }).catch(function(error){
            console.log(error);
            res.json(500, { error: '' + error });
        });
    }
};
