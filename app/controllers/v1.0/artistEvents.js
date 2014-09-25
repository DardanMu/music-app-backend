var googleGeocodingService = require('../../services/googleGeocodingApi');
var lastFmService = require('../../services/LastFmApi');
var Q = require('q');

var searchForEventsByLocation = function(locationType, eventData, usersCity, usersCountry)
{
    var eventsByLoc = [];
    for (var i = 0; i < eventData.events.event.length; i++) {
        var artistEvent = eventData.events.event[i];

        if (locationType === 'city') {
            if (artistEvent.venue.location.city.toLowerCase() == usersCity && artistEvent.venue.location.country.toLowerCase() == usersCountry) {
                eventsByLoc.push(artistEvent);
            }

        //to prevent duplicated events in the releventEvents array, we dont add in events from the users city again.
        }else if(locationType === 'country') {
            if (artistEvent.venue.location.country.toLowerCase() == usersCountry && artistEvent.venue.location.city.toLowerCase() != usersCity) {
                eventsByLoc.push(artistEvent);
            }
        }
    }

    return eventsByLoc;
}

var getArtistEvents = function(artist, usersLocation)
{
    var deferred = Q.defer();

    lastFmService
    .getArtistData(artist, 'events')
    .then(function(events){
        var eventData = JSON.parse(events[0].body);
        var releventEvents = [];
            //if the returned artist data has events, pick out the events held in the users city;
            if (eventData.events.event) {
                releventEvents = searchForEventsByLocation('city', eventData, usersLocation.city, usersLocation.country);
                //if there are less than 3 events in the users city, pick out events in their country too.
                if (releventEvents.length < 3) {
                    releventEvents = releventEvents.concat(searchForEventsByLocation('country', eventData, usersLocation.city, usersLocation.country));
                }
            }

            eventData.events = releventEvents;
            eventData.location = usersLocation;

            //return only event data relevent to the user
            deferred.resolve(eventData);

        }).fail(function(error){
            console.log(error);
            deferred.reject(error);
        });

    return deferred.promise;
}


exports.getArtistEventsByLocation = function(req, res){
    // /api/v1.0/eventsByArtist?artist=cher&lat=30.276391&long=-97.732422
    var artist = req.query.artist;
    var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    //check for location data in the users cookie,
    //if found: dont run googleGeocodingService functions, skip to getArtistEvents
    if (req.cookies.location) {

        var usersLocation = JSON.parse(req.cookies.location);

        getArtistEvents(artist, usersLocation)
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

            getArtistEvents(artist, usersLocation)
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
