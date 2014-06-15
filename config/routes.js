module.exports = function(app){

	//home route
	var home = require('../app/controllers/home');
	var songs = require('../app/controllers/songs');
	var artistInfo = require('../app/controllers/artistInfo');

	app.get('/', home.index);
	app.get('/api/songs', songs.index);
	app.get('/api/artist', artistInfo.getArtist);
	app.post('/api/artist', artistInfo.storeArtist);
};
