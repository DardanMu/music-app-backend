module.exports = function(app){

    var homeEvents = require('../app/controllers/v1.0/homeEvents');
    var homeTrends = require('../app/controllers/v1.0/homeTrends');

    var artistSongs = require('../app/controllers/v1.0/artistSongs');
    var artistInfo = require('../app/controllers/v1.0/artistInfo');
    var artistEvents = require('../app/controllers/v1.0/artistEvents');

    //general/homepage api endpoints
    // app.get('/', home.index);
    app.get('/api/v1.0/eventsByLocation', homeEvents.getAllEventsByLocation);
    app.get('/api/v1.0/hypedArtists', homeTrends.getCurrentHypedArtists);
    app.get('/api/v1.0/topArtistsByLocation', homeTrends.getTopArtistsByLocation);

    //artist specific api endpoints
    app.get('/api/v1.0/songsByArtist', artistSongs.getSongsByArtist);
    app.get('/api/v1.0/eventsByArtist', artistEvents.getArtistEventsByLocation);
    app.get('/api/v1.0/artist', artistInfo.getArtist);
    // app.post('/api/v1.0/artist', artistInfo.storeArtist);

};
