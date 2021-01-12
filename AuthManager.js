const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let connection  = mysql.getConnection()
let sql = "";
let title = ""
let headerTitle = "";
let message = "";

class AuthManager {
    //...
    loginData(req, res) {
        title = "Draft Login Page"
        let headerTitle = "Draft Login";
        const {email, password} = req.body;
        if(!email && !password) {
            message = 'Please Enter an email and a password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        } else if (!email && password) {
            message = 'Provide an Email';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }  else if (email && !password) {
            message = 'Provide an Email or a Password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }
        sql = "SELECT * FROM users WHERE email = ?";
        connection.query(sql, [email], async(err, data) => {
            console.log('sql data : ' + data);
            if(err) throw err;
            //..
            if(!data || !(await bcrypt.compare(password, data[0].password))) {
                message = "Email or Password is Incorrect"
                res.status(401).render('pages/login', { title: title, header:headerTitle, message:message})
            } else {
                const id = data[0].id;
                const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
                console.log('token is: ' + token);
                const cookiesOptions = {
                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000), httpOnly: true
                }
                // httpOnly: true means that we set our cookie if we are only in the browser environment
                res.cookie('jwt', token, cookiesOptions); // set up the cookie in the browser
                res.status(200).redirect('/draft_home');
            }
        });
    }
    /**
     * this function get data from mysql 
     * then display them to a page using EJS templating
     */
    registerData(req, res) {

        const {first_name, last_name, email, password, password_confirm} = req.body;
        //..
        let selectquery = "SELECT EMAIL FROM users WHERE email=?";
        connection.query(selectquery, [email], async(err, data) => {
            console.log(data);
            if(err) throw err;
        
            if(data.length > 0) {
                message = 'That email already exist';
                return res.render('pages/signup', { title: title, header:headerTitle, message: message})
            } else if (password != password_confirm) {
                message = 'The Password entered does not match';
                return res.render('pages/signup', { title: title, header:headerTitle, message: message});
            }
            //.. display the has password on the console
            let hashedPass = await bcrypt.hash(password, 8);
            console.log('encrypted password: ' + hashedPass);
            //.. insert data to users table
            let insertquery = 'INSERT INTO users SET ?';
            let userData = {
                first_name: first_name, 
                last_name: last_name, 
                email: email, 
                password: hashedPass
            };
    
            connection.query(insertquery, userData, (err, data) => {
                console.log("inserted data:  " + data);
                if (err) throw err;
                message = 'User Registered';
                return res.render("pages/signup", {title: title, header:headerTitle, message: message})
            });
        });
    }
}

module.exports = AuthManager;