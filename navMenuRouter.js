const express = require("express");
const path = require('path');
const router = express.Router();


let title = "";
let headerTitle = "";

//... routers for nav bar menu
router.get('/',(req,res) => {
    // res.sendFile(path.join(__dirname+'/public/index.html'));
    title = "Home Page"
    headerTitle = "Fab BasketBall League";
    res.render('pages/index', {title: title , header: headerTitle});
});
  
router.get('/scores',(req,res) => {
    // res.sendFile(path.join(__dirname+'/public/scores.html'));
    title = "Score Page"
    headerTitle = "Fab BasketBall League";
    res.render('pages/index', {title: title , header: headerTitle});
});
  
router.get('/teams',(req,res) => {
    // res.sendFile(path.join(__dirname+'/public/teams.html'));
    title = "Teams Page"
    headerTitle = "Teams";
    res.render('pages/teams', {title: title , header: headerTitle});
});

router.get('/trivia_home', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/trivia.html'));
    title = "Trivia Page"
    headerTitle = "Trivia";
    res.render('pages/triviaHome', {title: title , header: headerTitle});
});

router.get('/trivia', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/quiz.html'));
    title = "Quiz Page"
    headerTitle = "Quiz";
    res.render('pages/trivia', {title: title , header: headerTitle});
});

router.get('/draft_login', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/draft.html'));
    title = "Draft Login Page"
    headerTitle = "Draft";
    res.render('pages/draftLogin', {title: title, header: headerTitle});
});

router.get('/scores', (req, res) => {
    res.sendFile(path.join(__dirname+'/public/scores.html'));
});

router.get('/players', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/players.html'));

    title = "Players Page"
    headerTitle = "Players";
    res.render('pages/players', {title: title , header: headerTitle});
});

module.exports = router;