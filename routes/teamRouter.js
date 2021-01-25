// Import moogose Module
const fetch = require('node-fetch');
const express = require("express");
const Router = require('router')
const path = require('path');
const router = express.Router();


let player = "";
let team = "";
let obj ={};


/**
 * this function will fetch data from api and return it
 */  

let teamApiUrl = "http://localhost:8080/api/allTeams";
let playerApiUrl = "http://localhost:8080/api/allPlayers";

let teamData = fetch(teamApiUrl)
let playerData = fetch(playerApiUrl)

Promise.all([teamData, playerData])
        .then(data => {
            team = data[0].json(); // team data[0] is the response and .json()
            player = data[1].json();
            Promise.all([team, player]) // team and player are 2 promises that return a JSON obj
                    .then(components => processData(components[0], components[1])) // the data are resolved here
            
        }).catch(err => {
            console.error(err);
        });


/**
 * 
 * 
 */
const processData = (team, player) => {         
    //..
    router.get('/fbl/teams/hawks', (req, res) => {  
        obj = {
            title : "Atlanta page",
            teams: team[0],
            players: player.filter(p => p.team == team[0].key)
        }
        res.render('teams/team_page', obj);
        
    })
    router.get('/fbl/teams/nets', (req, res) =>{  
        obj = {
            title : "Atlanta page",
            teams: team[1],
            players: player.filter(p => p.team == team[1].key)
        }
        res.render('teams/team_page', obj);
        });
        //..
        router.get('/fbl/teams/celtics', (req, res) =>{    
            obj = {
                title : "Atlanta page",
                teams: team[2],
                players: player.filter(p => p.team == team[2].key)
            }
            res.render('teams/team_page', obj);
        });
         //..
         router.get('/fbl/teams/hornets', (req, res) =>{    
            obj = {
                title : "Atlanta page",
                teams: team[3],
                players: player.filter(p => p.team == team[3].key)
            }
            res.render('teams/team_page', obj);
        });
}
module.exports = router;
