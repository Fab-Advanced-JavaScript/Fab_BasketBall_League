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

router.get('/trivia', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/trivia.html'));
});

router.get('/draft', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/draft.html'));
});

router.get('/scores', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/scores.html'));
});

router.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/quiz.html'));
});
router.get('/players', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/players.html'));
});

module.exports = router;