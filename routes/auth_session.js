const express = require("express");
const router = express.Router();
const mysql = require('../mysql_config');


let title = "";
let headerTitle = "";
let message = "";

let connection  = mysql.getConnection();

/**
 * this section the route for the authentication
 */
router.get('/draft_home', (req, res) => {
    title = "Home Page"
    headerTitle = "Welcome to FBL Draft";
    let dataObj = {};
    connection.query('SELECT * FROM playerlist', (err, data) => {
        console.log(data);
        if(err) throw err;
    
        dataObj = { 
            title: title,
            header: headerTitle,
            message: message,
            print: data
        };
        res.render('pages/draft_home', dataObj);                
    });
});
//..
router.get('/draft', (req, res) => {
    title = "Pick page"
    headerTitle = "Pick Up a Prospect";
    res.render('pages/draft', {title: title, header: headerTitle});
});
//..
router.get('/owners_signup', (req, res) => {
    title = "Owners Sign Up"
    headerTitle = "Team Manager registrations";
    res.render('pages/owners_signup', {title: title, header: headerTitle});
});
//..
router.get('/view_profiles', (req, res) => {
    title = "View Page"
    headerTitle = "View Team Manager Profiles";
    res.render('pages/view_profiles', {title: title, header: headerTitle});
});
//..
router.get('/summary', (req, res) => {
    title = "Summar Page"
    headerTitle = "Summary";
    res.render('pages/summary', {title: title, header: headerTitle});
});
//..
router.get('/logout', (req, res) => {
    title = "logout Page"
    res.render('pages/logout', {title: title, header: headerTitle});
});
module.exports = router;