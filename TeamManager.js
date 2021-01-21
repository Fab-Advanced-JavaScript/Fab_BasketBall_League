// Import moogose Module
const fetch = require('node-fetch');
const TeamModel = require('./mongooseModels/teamModel');
const mongo = require('./mongodb_config');
const { options } = require('mongoose');
const mongodb_config = mongo.setUpConnection();

/**
 * class Team Manager
 */
class TeamManager {
  // this is used to get data from the api
  getAllData() {

      let options = {
            method: 'GET',
            headers: {
              'Ocp-Apim-Subscription-Key': 'ab0f3c59802f404aa70cf7d34db79da8',
              useQueryString: true
            }
          };
    // urls      
    let teamApiUrl = "https://api.sportsdata.io/v3/nba/scores/json/AllTeams"; 

    fetch(teamApiUrl, options)
          .then(response => response.json())
          .then(data  => {
            console.log('teams data' + data);
            this.insertTeamData(data);
            
          }).catch(err => {
            console.error(err);
          });   
  }

  // this insert data to Mongodb
  insertTeamData(teamDocs) {
    // setting up the connection
    mongo.setUpConnection();
    // loop through data
    teamDocs.map(el => {
      // defining the team object
      let teamObj =
        {
          key: el.Key,
          city: el.City,
          name: el.Name,
          conference: el.Conference,
          division: el.Division,
          teamLogo: el.WikipediaLogoUrl,
          teamUrl: el.team_url
        };
        console.log(teamObj);
        TeamModel.collection.insertOne(teamObj, (err, res) => {
          if(err) throw err
        });
    });
    console.log(`${teamDocs.length} Team documents From the SPORT DATA IO have been inserted into MongoDB`);
  }

  // this is used to Retrieve data from Mongodb
  findTeamData(callback) {
    // setting up the connection
    mongo.setUpConnection();
    //sort name alphabetically or ascending using {team_name: 1}; and  descending{team_name: -1};
    let mysort = {key: 'asc'}; 
    // compile schema to model
    TeamModel.find({}, (err, docs) => {
      if(err) throw err
        console.log("display data from collection TeamInfos");
        callback(docs);
    }).sort(mysort);
  }
}

module.exports = TeamManager;
