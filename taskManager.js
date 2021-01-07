// Import moogose Module
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const file = require('fs');
const TeamModel = require('./mongooseModels/teamModel');
const TeamUrlModel = require('./mongooseModels/teamUrlModel');

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
  getAllData() {

      let options = {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'free-nba.p.rapidapi.com',
              'x-rapidapi-key': '6fd3e95d14msh2e27349e73dc631p16c0e3jsn4206f1b7687b',
              useQueryString: true
            }
          };
    // urls      
    let apiUrl = "https://free-nba.p.rapidapi.com/teams?page=0";
    let teamUrl = "http://localhost:8080/api/teamJson";

    fetch(apiUrl, options)
          .then(response => response.json())
          .then(data  => {
            console.log(data);
            this.insertTeamData(data);
            return fetch(teamUrl)
                                .then(response => response.json())
                                .then(imgItems => {
                                  console.log(imgItems);
                                  this.insertTeamUrlInfo(imgItems);
                                }).catch(err => {
                                  console.error(err);
                                });
          });
  }

  // this insert data to Mongodb
  insertTeamData(results) {
    // setting up the connection
    this.setUpConnection();
    console.log('team shema');
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

  // this insert data to Mongodb
  insertTeamUrlInfo(docs) {
  // setting up the connection
  this.setUpConnection();
  // loop through data
  docs.data.map(el => {
    // defining the team object
    let teamObjUrl =
    {
      team_name: el.team_name,
      imageUrl: el.image,
      teamUrl: el.url
    };
    console.log(teamObjUrl);
    TeamUrlModel.collection.insertOne(teamObjUrl, (err, res) => {
      if(err) throw err
      });
    });
    console.log("Succesfully inserted Data From restFul api name /api/teamInfo" );
  }

  // this is used to Retrieve data from Mongodb
  findTeamData(callback) {
    // setting up the connection
    this.setUpConnection();

    //sort name alphabetically or ascending using {team_name: 1}; and  descending{team_name: -1};
    let mysort = {full_name: 1}; 
    // compile schema to model
    TeamModel.find({}, (err, docs) => {
      if(err) throw err
        console.log("display data from collection TeamInfos");
        callback(docs);
    }).sort(mysort);
  }

  // this is used to Retrieve data from Mongodb
  findTeamUrl(callback) {
    // setting up the connection
    this.setUpConnection();

    //sort name alphabetically or ascending using {team_name: 1}; and  descending{team_name: -1};
    let mysort = {team_name: 1};
    // compile schema to model
    TeamUrlModel.find({}, (err, data) => {
      if(err) throw err
        console.log("display data from  collection teamUrl");
        callback(data);
    }).sort(mysort);
  }

  // this is used to read the teamInfo.json file
  readTeamFile(callback) {
    let fileName = "teamInfo.json"
    file.readFile(fileName, (err, data) => {
      if(err) throw err;
      callback(data);
    })
  }

}

module.exports = TaskManager;
