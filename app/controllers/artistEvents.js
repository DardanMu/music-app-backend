var googleGeocodingService = require('../services/googleGeocodingApi');
var lastFmService = require('../services/LastFmApi');

exports.getEventsByLocation = function(req, res){
	// /api/events?artist=madonna&long=50.32345&lat=-0.634575
	var artist = req.query.artist;
	var cordinates = {latitude: req.query.lat, longitude: req.query.long};

    googleGeocodingService
	   .getlocationData(cordinates)
       .then(function(locData){
            var usersLocation = JSON.parse(locData[0].body);

            // var city = ;
            // var country = ;

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


            // res.json(usersLocation);

	        lastFmService
				.getData(artist, 'events')
				.then(function(events){
					var eventData = JSON.parse(events[0].body);

					var releventEvents = [];

					//event location is in the same city as the users, return it.
					for (var i = 0; i < eventData.events.event.length; i++) {
						var artistEvent = eventData.events.event[i];

						if (artistEvent.venue.location.city.toLowerCase() == usersCity && artistEvent.venue.location.country.toLowerCase() == usersCountry) {
							releventEvents.push(artistEvent); 
						}
					};

					eventData.events = releventEvents;

					
					res.json(eventData);
				});
       });


	// 	}).fail(function(error){
	// 		//if any of the above promises fail, we come here...
	// 		console.log(error);
	// 		res.json(500, { error: "error" });
	// 	});
};
