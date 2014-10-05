var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: String,
  numberOfRequests: Number,
  dates: [Date]
});

mongoose.model('Artist', ArtistSchema);

//need to change schema to :
// date: Date,
// artists: [{artistName, numberOfRequests, times}]
