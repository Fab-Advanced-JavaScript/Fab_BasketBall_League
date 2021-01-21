const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

let connection  = mysql.getConnection()
let title = ""
let headerTitle = "";
let message = "";
let login = "";
/**
 * Authentication class
 * to handle login and sign up
 */
class AuthManager {
    //...
    loginData(req, res) {
        title = "Draft Login Page";
        let headerTitle = "Draft Login";
        //..
        const {username, password} = req.body;

        if(!username && !password) {
            message = 'Please Enter a Username and a password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        } else if (!username && password) {
            message = 'Provide a Username';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }  else if (username && !password) {
            message = 'Provide a Username or a Password';
            return res.status(400).render('pages/login', { title: title, header:headerTitle, message:message})
        }
        let sql = "SELECT * FROM team_owners WHERE username = ?";
        connection.query(sql, [username], async(err, data) => {
            if(err) throw err;
            console.log('login sql data : ' + data);
            //..
            if(!data  || !(await bcrypt.compare(password, data[0].password)))  {
                message = "username or Password is Incorrect"
                res.status(401).render('pages/login', { title: title, header:headerTitle, message:message})
            } else {
                console.log(req.session);
                req.session.userId = data[0].team_ownersId;
                req.session.username = username;
                console.log('data id only : ' + data[0].team_ownersId);
                console.log('data username : ' + data[0].username);
                res.redirect('/draft_home');
            }
        });
    }
    /**
     * this function get data from mysql 
     * then display them to a page using EJS templating
     */
    registerData(req, res) {

        const {username, first_name, last_name, email, password, password_confirm} = req.body;
        //..
        let selectquery = "SELECT username FROM team_owners WHERE username =?";
        connection.query(selectquery, [username], async(err, data) => {
            console.log('register data : ' + data);
            if(err) throw err;
        
            if(data.length > 0) {
                login = "";
                message = 'That Username already exist';
                return res.render('pages/signup', { title: title, header:headerTitle, message: message, login:login})
            } else if (password != password_confirm) {
                login = "";
                message = 'The Password entered does not match';
                return res.render('pages/signup', { title: title, header:headerTitle, message: message, login:login});
            }
            //.. display the has password on the console
            let hashedPass = await bcrypt.hash(password, 8);
            console.log('encrypted password: ' + hashedPass);
            //.. insert data to users table
            let insertquery = 'INSERT INTO team_owners SET ?';
            let userData = {
                username: username, 
                first_name: first_name, 
                last_name: last_name, 
                email: email,
                password: hashedPass
            };
            //..
            connection.query(insertquery, userData, (err, data) => {
                console.log("inserted data:  " + data);
                if (err) throw err;
                message = 'User Registered';
                login = 'login';
                return res.render("pages/signup", {title: title, header:headerTitle, message: message, login:login})
            });
        });
    }
}

module.exports = AuthManager;
