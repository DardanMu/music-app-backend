var googleGeocodingService = require('../../services/googleGeocodingApi');
var lastFmService = require('../../services/LastFmApi');
var Q = require('q');

var getGeoTopArtists = function(usersLocation)
{
    var deferred = Q.defer();

    lastFmService
    .getGeoTopArtists(usersLocation)
    .then(function(results){
        var topArtists = JSON.parse(results[0].body);

            deferred.resolve(topArtists);

        }).fail(function(error){
            console.log(error);
            deferred.reject(error);
        });

    return deferred.promise;
}


exports.getTopArtistsByLocation = function(req, res){
    // /api/v1.0/topArtistsByLocation

    //check for location data in the users cookie,
    //if found: dont run googleGeocodingService functions, skip to getArtistEvents
    if (req.cookies.location) {

        var usersLocation = JSON.parse(req.cookies.location);

        getGeoTopArtists(usersLocation)
        .then(function(topArtists) {
            res.json(topArtists);
        }).fail(function(error){
            res.json(500, { error: '' + error });
        });

    }else{

        var cordinates = {latitude: req.query.lat, longitude: req.query.long};

        googleGeocodingService
        .getlocationData(cordinates)
        .then(function(locData){
            var usersLocation = googleGeocodingService.getUsersCityAndCountry(locData);

            res.cookie('location', JSON.stringify({city: usersLocation.city, country: usersLocation.country}));

            getGeoTopArtists(usersLocation)
            .then(function(topArtists) {
                res.json(topArtists);
            }).fail(function(error){
                res.json(500, { error: '' + error });
            });

        }).catch(function(error){
            console.log(error);
            res.json(500, { error: '' + error });
        });
    }
};

exports.getCurrentHypedArtists = function(req, res){
    // /api/v1.0/hypedArtists

    lastFmService
    .getHypedArtists()
    .then(function(hypedArtists) {
        var hypedArtists = JSON.parse(hypedArtists[0].body);

        res.json(hypedArtists);

    }).fail(function(error){
        res.json(500, { error: '' + error });
    });
};
