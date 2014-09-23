var googleGeocodingService = require('../../services/googleGeocodingApi');
var lastFmService = require('../../services/LastFmApi');

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

exports.getArtistEventsByLocation = function(req, res){
    // /api/events?artist=madonna&long=50.32345&lat=-0.634575
    var artist = req.query.artist;
    var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    //step 1: decode users coordinates to get their city and country.
    googleGeocodingService
       .getlocationData(cordinates)
       .then(function(locData){
            var usersLocation = googleGeocodingService.getUsersCityAndCountry(locData);

            //step 2: search for events by artist, then return all events in the users city
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
                    //return only event data relevent to the user
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
