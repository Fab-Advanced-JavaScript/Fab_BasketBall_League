const express = require("express");
const router = express.Router();
const mysql = require('../mysql_config');
let connection  = mysql.getConnection();
let obj = {};


let title = "";
let headerTitle = "";

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
    // render the page and pass in any flash data if it exists
    res.render('pages/login', {title: title, header: headerTitle, message: req.flash('loginMessage')});
});

router.get('/signup', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/draft.html'));
    title = "Create an Account"
    headerTitle = "Sign Up";
    res.render('pages/signup', {title: title, header: headerTitle, message: req.flash('SignUpMessage')});
    // res.render('pages/signup', {title: title, header: headerTitle, message: message, login: login});
});

router.get('/scores', (req, res) => {
    title = "Scores Page"
    headerTitle = "Scores";
    res.render('pages/scores', {title: title, header: headerTitle});
});
/**
 * 
 */
 router.get('/draft_home', (req, res) => {

    connection.query('SELECT * FROM prospectlist', (err, data) => {
        console.log(data);
        if(err) throw err;
        obj = { 
            title: "Home Page",
            header: "Welcome to FBL Draft",
            message: "",
            print: data
        };
        res.render('pages/draft_home', obj);
    });   
});

router.get('/logout', (req, res) => {
    req.logout();
	res.redirect('/login');

});

router.get('/players', (req, res) => {
    // res.sendFile(path.join(__dirname+'/public/players.html'));
    title = "Players Page"
    headerTitle = "Players";
    res.render('pages/players', {title: title , header: headerTitle});
});

module.exports = router;