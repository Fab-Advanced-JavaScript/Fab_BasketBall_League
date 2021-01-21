// Import moogose Module
const mongoose = require('mongoose');

const setUpConnection = () => {
    //set up moongose connection
    let dbUrl = "mongodb://localhost:27017/teamStore"
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

    // get reference to database
    let db = mongoose.connection;
    db.once('open', () => {
      console.log("Mongodb Connection Successful!");
    });

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'connection error:'));
  }
   exports.setUpConnection = setUpConnection;