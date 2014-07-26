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

	        lastFmService
				.getData(artist, 'events')
				.then(function(events){
					var eventData = JSON.parse(events[0].body);

					//array of events located within the users city
					var releventEvents = [];
					if (eventData.events.event) {
						for (var i = 0; i < eventData.events.event.length; i++) {
							var artistEvent = eventData.events.event[i];

							if (artistEvent.venue.location.city.toLowerCase() == usersCity && artistEvent.venue.location.country.toLowerCase() == usersCountry) {
								releventEvents.push(artistEvent); 
							}
			    		};
			    		//if releventEvents.length() < 3
			    			//run the above for code again, but only check if the event location is the country
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
