const mongoose = require('mongoose');

// instantiate Shema
const Schema = mongoose.Schema;

//Define a schema
let TeamSchema = new Schema({
  key: String,
  city: String,
  name: String,
  conference: String,
  division: String,
  teamLogo: String,
  teamUrl: String
  
});

// compile schema to model
const TeamModel = mongoose.model('Team_documents', TeamSchema);
module.exports = TeamModel;