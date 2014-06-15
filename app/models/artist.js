var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ArtistSchema = new Schema({
  name: String,
  numberOfRequests: Number
});

ArtistSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('Artist', ArtistSchema);
