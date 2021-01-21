const fetch = require('node-fetch');
const PlayerModel = require('./mongooseModels/playerModel');
const mongo = require('./mongodb_config');

class PlayersManager {
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
    let playerUrl = "https://api.sportsdata.io/v3/nba/stats/json/Players/bkn";

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
    mongo.setUpConnection();
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
    console.log(`${results.length} Player documents From the SPORT DATA IO have been inserted into MongoDB`);
    }

    /**
     * this is used to Retrieve data from Mongodb
     */
    findPlayerData(callback) {
    // setting up the connection
    mongo.setUpConnection();
    //sort name alphabetically or ascending using {team_name: 1}; and  descending{team_name: -1};
    let mysort = {lastName: 'asc'}; 
    // compile schema to model
    PlayerModel.find({}, (err, docs) => {
      if(err) throw err
        console.log("display data from collection PlayerInfos");
        callback(docs);
    }).sort(mysort);
  }
}
module.exports = PlayersManager;
