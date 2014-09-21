var googleGeocodingService = require('../services/googleGeocodingApi');
var lastFmService = require('../services/LastFmApi');

var searchForEventsByLocation = function(locationType, eventData, usersCity, usersCountry)
{
    var eventsByLoc = [];
    for (var i = 0; i < eventData.events.event.length; i++) {
    var artistEvent = eventData.events.event[i];

        if (locationType === 'city') {
            if (artistEvent.venue.location.city.toLowerCase() == usersCity && artistEvent.venue.location.country.toLowerCase() == usersCountry) {
                eventsByLoc.push(artistEvent);
            }

        }else if(locationType === 'country') {
            if (artistEvent.venue.location.country.toLowerCase() == usersCountry) {
                eventsByLoc.push(artistEvent);
            }
        }

    }

    return eventsByLoc;

}

exports.getEventsByLocation = function(req, res){
    // /api/events?artist=madonna&long=50.32345&lat=-0.634575
    var artist = req.query.artist;
    var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    //step 1: decode users coordinates to get their city and country.
    googleGeocodingService
       .getlocationData(cordinates)
       .then(function(locData){
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

            //step 2: search for events by artist, then return all events in the users city
            lastFmService
                .getData(artist, 'events')
                .then(function(events){
                    var eventData = JSON.parse(events[0].body);

                    //array of events located close to the user
                    var releventEvents = [];
                    if (eventData.events.event) {

                        releventEvents.concat(searchForEventsByLocation('city', eventData, usersCity, usersCountry));

                        if (releventEvents.length < 3) {
                            releventEvents.concat(searchForEventsByLocation('country', eventData, usersCity, usersCountry));
                        }
                    }

                    eventData.events = releventEvents;

                    res.json(eventData);
                }).fail(function(error){
                    console.log(error);
                    res.json(500, { error: "error" });
                });
       }).fail(function(error){
            console.log(error);
            res.json(500, { error: "error" });
        });
};
