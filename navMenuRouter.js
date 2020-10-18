const express = require("express");
const path = require('path');
const router = express.Router();


//... routers for nav bar menu
router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
    //__dirname : It will resolve to your project folder.
});
  
router.get('/scores',(req,res) => {
    res.sendFile(path.join(__dirname+'/scores.html'));
});
  
router.get('/teams',(req,res) => {
    res.sendFile(path.join(__dirname+'/teams.html'));
});

module.exports = router;