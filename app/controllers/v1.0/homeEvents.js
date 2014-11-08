// var lastFmService = require('../../services/LastFmApi');

// exports.getAllEventsByLocation = function(req, res){
//     // /api/v1.0/eventsByLocation?lat=30.276391&long=-97.732422
//     var cordinates = {latitude: req.query.lat, longitude: req.query.long};

//     lastFmService
//     .getGeoEvents(cordinates)
//     .then(function(events){
//         var eventData = JSON.parse(events[0].body);
//         res.json(eventData);

//     }).fail(function(error){
//         console.log(error);
//         res.json(500, { error: '' + error });
//     });

// };

var eventfulService = require('../../services/eventfulApi');

exports.getAllEventsByLocation = function(req, res){
    // /api/v1.0/eventsByLocation?lat=30.276391&long=-97.732422&page=1
    var cordinates = {latitude: req.query.lat, longitude: req.query.long};
    var pageNumber = req.query.page;

    eventfulService
    .getGeoEvents(cordinates, pageNumber)
    .then(function(events){
        var eventData = JSON.parse(events[0].body);
        res.json(eventData);

    }).fail(function(error){
        console.log(error);
        res.json(500, { error: '' + error });
    });

};

