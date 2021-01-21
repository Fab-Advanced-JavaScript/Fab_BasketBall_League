// Import moogose Module
const fetch = require('node-fetch');
const express = require("express");
const Router = require('router')
const path = require('path');
const router = express.Router();

/**
 * this function will fetch data from api and return it
 */  
const getTeamData = async() => { 
    let options = {
        method: 'GET',
        headers: {
          'Ocp-Apim-Subscription-Key': 'ab0f3c59802f404aa70cf7d34db79da8',
          useQueryString: true
        }
    };
    // urls      
    let teamApiUrl = "https://api.sportsdata.io/v3/nba/scores/json/AllTeams"; 

    return await fetch(teamApiUrl, options)
            .then(res => res.json())
            .then(data  => {
                console.log('what is in data: ' + data);
                return data
            }).catch(err => {
                console.error(err);
            });  
}

/**
 * fbl team rest page information 
 * 
 */
getTeamData()
        .then(data => {
            obj ={};
            //..
            router.get('/fbl/teams/washington', (req, res) =>{  
                obj = {
                    title : "Wizards page",
                    print: data[0]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/charlotte', (req, res) =>{  
                obj = {
                    title : "Hornets page ",
                    print: data[1]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/atlanta', (req, res) =>{  
                obj = {
                    title : "Hawks Page",
                    print: data[2]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/miami', (req, res) =>{  
                obj = {
                    title : "Miami Page",
                    print: data[3]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/orlando', (req, res) =>{  
                obj = {
                    title : "Orlando Page",
                    print: data[4]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/new', (req, res) =>{  
                obj = {
                    title : "Orlando Page",
                    print: data[5]
                }
                res.render('teams/team_page', obj);
            });
        })

module.exports = router;
