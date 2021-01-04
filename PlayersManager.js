const mongoose = require('mongoose');
const fetch = require('node-fetch');
const PlayerModel = require('./playerModel');
const file = require('fs');

class PlayersManager {
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
    allPlayers() {
        let options = {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': 'ab0f3c59802f404aa70cf7d34db79da8',
                useQueryString: true
            }
        };
    // urls      
    let playerUrl = "https://api.sportsdata.io/v3/nba/stats/json/Players/por";

    fetch(playerUrl, options)
                .then(response => response.json())
                .then(data  => {
                    console.log(data);
                    this.insertPlayerData(data);
                }).catch(err => {
                    console.error(err);
                });
    }
    
    // this insert data to Mongodb
    insertPlayerData(results) {
    // setting up the connection
    this.setUpConnection();
    // loop through data
    results.map(data => {
        // defining the players object
        let playerObj =
        {
            firstName: data.FirstName,
            lastName: data.LastName,
            team: data.Team,
            jersey: data.Jersey,
            position: data.Position,
            height: data.Height,
            weight: data.Weight,
            college: data.College,
            country: data.BirthCountry,
            headShot: data.PhotoUrl
        };
        console.log(playerObj);
        PlayerModel.collection.insertOne(playerObj, (err, res) => {
            if(err) throw err
        });
    });
    console.log("Succesfully inserted Data From the SPORTS DATA IO end-point into MongoDB" );
    }

      // this is used to Retrieve data from Mongodb
    findPlayerData(callback) {
    // setting up the connection
    this.setUpConnection();

    //sort name alphabetically or ascending using {team_name: 1}; and  descending{team_name: -1};
    let mysort = {lastName: 'asc'}; 
    // compile schema to model
    PlayerModel.find({}, (err, docs) => {
      if(err) throw err
        console.log("display data from collection PlayerInfos");
        callback(docs);
    }).sort(mysort);
  }

   // this is used to read the heaShot.json file
   readHeadShotFile(callback) {
    let fileName = "headShot.json"
    file.readFile(fileName, (err, data) => {
      if(err) throw err;
      callback(data);
    })
  }
}
module.exports = PlayersManager;
