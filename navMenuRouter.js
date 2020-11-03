const express = require("express");
const path = require('path');
const router = express.Router();


//... routers for nav bar menu
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/public/index.html'));
    //__dirname : It will resolve to your project folder.
});
  
router.get('/scores',(req,res) => {
    res.sendFile(path.join(__dirname+'/public/scores.html'));
});
  
router.get('/teams',(req,res) => {
    res.sendFile(path.join(__dirname+'/public/teams.html'));
});

module.exports = router;