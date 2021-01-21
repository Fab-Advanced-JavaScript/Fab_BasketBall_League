const express = require("express");
const router = express.Router();
const mysql = require('../mysql_config');
const session = require('express-session');

let obj = {};
let connection  = mysql.getConnection();


/**
 * this section the route for the authentication
 */
router.get('/draft_home', (req, res) => {
    // let userId = req.session.userId
    if(session == null) {
        res.redirect('/login')
        return;
    } else {
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
    }     
});
//..
router.get('/draft', (req, res) => {
    obj = { 
        title: "Pick Page",
        header: "Pick Up a Prospect",
        message: ""
    };
    res.render('pages/draft', obj);
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
    // session.destroy();
    // req.session.destroy();
    // res.redirect('/login')

});
module.exports = router;