const express = require("express");
const Router = require('router')
const app = express();

const router = express.Router();

// // const getAtlanta =  app.get('/fbl/teams/atlanta', (req, res) => {
// //                         res.sendFile(path.join(__dirname + '/teams/hawks.html'));
// //                     });

// Home page route



router.get('/fbl/teams/atlanta',(req, res) =>{
    // res.setHeader('Content-Type', 'text/html; charset=utf-8')
    // res.sendFile(path.join(__dirname + '/teams/hawks.html'));
    send('about that....')
});

module.exports = router;
