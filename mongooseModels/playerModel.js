const mongoose = require('mongoose');

// instantiate Shema
const Schema = mongoose.Schema;

//Define a schema
let PlayerSchema = new Schema({
  firstName: String,
  lastName: String,
  team: String,
  jersey: Number,
  position: String,
  height: String,
  weight: String,
  college: String,
  country: String,
  headShot: String
});

// compile schema to model
const PlayerModel = mongoose.model('PlayerInfo', PlayerSchema);
module.exports = PlayerModel;