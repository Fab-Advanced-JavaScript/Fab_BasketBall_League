const mongoose = require('mongoose');

// instantiate Shema
const Schema = mongoose.Schema;

//Define a schema
let TeamSchema = new Schema({
  abbreviation: String,
  city: String,
  conference: String,
  full_name: String
});

// compile schema to model
const TeamModel = mongoose.model('TeamInfo', TeamSchema);
module.exports = TeamModel;