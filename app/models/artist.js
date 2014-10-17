var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: String,
  numberOfRequests: Number
});

mongoose.model('Artist', ArtistSchema);
