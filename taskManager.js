// Import moogose Module
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const TeamModel = require('./teamModel')

class TaskManager {

  setUpConnection() {
    //set up moongose connection
    let dbUrl = "mongodb://localhost:27017/teamStore"
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true });

    // get reference to database
    let db = mongoose.connection;
    db.once('open', () => {
      console.log("Connection Successful!");
    });

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'connection error:'));
  }

  // this is used to get data from the api
  async getApiData() {
    let url = "https://free-nba.p.rapidapi.com/teams?page=0";

    let options = {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'free-nba.p.rapidapi.com',
              'x-rapidapi-key': '6fd3e95d14msh2e27349e73dc631p16c0e3jsn4206f1b7687b',
              useQueryString: true
            }
          };
    let teamData = fetch(url, options)
    return await teamData
                        .then(res => res.json())
                        .then(data => {
                          console.log(data);
                          this.insertTeamData(data)
                        })
                        .catch(err => {
                          console.error(err);
                        })
  }

  // this insert data to Mongodb
  insertTeamData(results) {
    // setting up the connection
    this.setUpConnection();

    // loop through data
    results.data.map(el => {
      // defining the team object
      let teamObj =
        {
          abbreviation: el.abbreviation,
          city: el.city,
          conference: el.conference,
          full_name: el.full_name
        };
        console.log(teamObj);
        TeamModel.collection.insertOne(teamObj, (err, res) => {
          if(err) throw err
        });
    });
    console.log("Succesfully inserted Data From the free-nba.p.rapidapi into MongoDB" );
  }

  // this is used to Retrieve data from Mongodb
  findTeamData(callback) {
    // setting up the connection
    this.setUpConnection();

    // compile schema to model
    TeamModel.find({}, (err, docs) => {
      if(err) throw err
      console.log("display data from  Mongodb");
        callback(docs);

    })
  }
}

module.exports = TaskManager;
