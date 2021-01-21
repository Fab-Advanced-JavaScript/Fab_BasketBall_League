const express = require("express");
const path = require('path');
const router = express.Router();

let title = "";
let headerTitle = "";
let message = "";
let login ="";

//... routers for nav bar menu
router.get('/',(req,res) => {
    // res.sendFile(path.join(__dirname+'/public/index.html'));
    title = "Home Page"
    headerTitle = "Fab BasketBall League";
    res.render('pages/index', {title: title , header: headerTitle});
});
  
router.get('/teams',(req,res) => {
    // res.sendFile(path.join(__dirname+'/public/teams.html'));
    title = "Teams Page"
    headerTitle = "Teams";
    res.render('pages/teamList', {title: title , header: headerTitle});
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

router.get('/login', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/draft.html'));
    title = "Draft Login Page"
    headerTitle = "Draft Login";
    res.render('pages/login', {title: title, header: headerTitle, message: message});
});

router.get('/signup', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/draft.html'));
    title = "Create an Account"
    headerTitle = "Sign Up";
    res.render('pages/signup', {title: title, header: headerTitle, message: message, login: login});
});

router.get('/scores', (req, res) => {
    title = "Scores Page"
    headerTitle = "Scores";
    res.render('pages/scores', {title: title, header: headerTitle});
});

router.get('/players', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/players.html'));
    title = "Players Page"
    headerTitle = "Players";
    res.render('pages/players', {title: title , header: headerTitle});
});

module.exports = router;