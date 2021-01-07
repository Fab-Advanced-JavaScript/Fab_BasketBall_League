const mongoose = require('mongoose');

// instantiate Shema
const Schema = mongoose.Schema;

//Define a schema
let TeamUrlShema = new Schema({
  team_name: String,
  image: String,
  teamUrl: String
});

// compile schema to model
const TeamUrlModel = mongoose.model('TeamUrl', TeamUrlShema);
module.exports = TeamUrlModel;