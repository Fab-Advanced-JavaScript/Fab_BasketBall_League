const express = require("express");
const router = express.Router();
const mysql = require('../mysql_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

let title = "";
let headerTitle = "Sign Up";
let message = "";

let connection = mysql.getConnection();
router.post('/signup', (req, res) => {
    //...
    let signdata = req.body;
    console.log(signdata);
    const {first_name, last_name, email, password, password_confirm} = req.body;
    let selectquery = "SELECT EMAIL FROM users WHERE email=?";
    connection.query(selectquery, [email], async(err, data) => {
        if(err) throw err;

        if(data.length > 0) {
            message = 'That email already exist';
            return res.render('pages/signup', { title: title, header:headerTitle, message: message})
        } else if (password != password_confirm) {
            message = 'The Password entered does not match';
            return res.render('pages/signup', { title: title, header:headerTitle, message: message});
        }
        let hashedPass = await bcrypt.hash(password, 8);
           //.. display the has password on the console
        console.log('encrypted password: ' + hashedPass);
        let insertquery = 'INSERT INTO users SET ?';
        connection.query(insertquery, {first_name: first_name, last_name: last_name, email: email, password: hashedPass}, (err, data) => {
            if (err) throw err;
            console.log(data);
            message = 'User Registered';
            return res.render("pages/signup", {title: title, header:headerTitle, message: message})
        })
    })
})
// res.send(' <span> A user has submitted a form </span>');

module.exports = router;