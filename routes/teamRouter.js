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
    };
    let teamApiUrl = "http://localhost:8080/api/allTeams";
    

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
            router.get('/fbl/teams/atlanta', (req, res) =>{  
                obj = {
                    title : "Wizards page",
                    print: data[0]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/brooklyn', (req, res) =>{  
                obj = {
                    title : "Hornets page ",
                    print: data[1]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/boston', (req, res) =>{  
                obj = {
                    title : "Hawks Page",
                    print: data[2]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/charlotte', (req, res) =>{  
                obj = {
                    title : "Miami Page",
                    print: data[3]
                }
                res.render('teams/team_page', obj);
            });
            //..
            router.get('/fbl/teams/chicago', (req, res) =>{  
                obj = {
                    title : "Orlando Page",
                    print: data[4]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/cleveland', (req, res) =>{  
                obj = {
                    title : "Orlando Page",
                    print: data[5]
                }
                res.render('teams/team_page', obj);
            });

             //..
             router.get('/fbl/teams/dallas', (req, res) =>{  
                obj = {
                    title : "Orlando Page",
                    print: data[6]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/denver', (req, res) =>{  
                obj = {
                    title : "Denver Page",
                    print: data[7]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/detroit', (req, res) =>{  
                obj = {
                    title : "Detroit Page",
                    print: data[8]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/Golden', (req, res) =>{  
                obj = {
                    title : "Golden Page",
                    print: data[9]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/houston', (req, res) =>{  
                obj = {
                    title : "Houston Page",
                    print: data[10]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/indiana', (req, res) =>{  
                obj = {
                    title : "Indiana Page",
                    print: data[11]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/lac', (req, res) =>{  
                obj = {
                    title : "Clippers Page",
                    print: data[12]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/lal', (req, res) =>{  
                obj = {
                    title : "Lakers Page",
                    print: data[13]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/memphis', (req, res) =>{  
                obj = {
                    title : "Memphis Page",
                    print: data[14]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/miami', (req, res) =>{  
                obj = {
                    title : "Miami Page",
                    print: data[15]
                }
                res.render('teams/team_page', obj);
            });
             //..
             router.get('/fbl/teams/milwaukee', (req, res) =>{  
                obj = {
                    title : "Milwaukee Page",
                    print: data[16]
                }
                res.render('teams/team_page', obj);
            });
        })

module.exports = router;
