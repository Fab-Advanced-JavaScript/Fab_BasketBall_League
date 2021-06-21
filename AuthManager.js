const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let connection  = mysql.getConnection();
let title = ""
let headerTitle = "";
let message = "";
/**
 * Authentication class
 * to handle login with passport-local
 */
class AuthManager {

    // used to serialize the user for the session
    serialUser() {
        passport.serializeUser( (user, next) => {
            next(null, user);
        });
    }

    deserialUser() {
        // used to deserialize the user
        passport.deserializeUser((id, done) => {
            connection.query("select * from team_owners  where team_ownersId = "+team_ownersId, (err,rows) => {	
                done(err, rows[0]);
            })
        });
        connection.end();
    }
    
    //...
    loginData() {

        this.serialUser();
        // this.deserialUser();
        //.. declaring variable
        // title = "Draft Login Page";
        // headerTitle = "Draft Login

        passport.use('localSignin', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            emailField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        }, (email, password, next) => { // callback with email and password from our form
            // connection.connect();
            let sql = "SELECT * FROM team_owners  WHERE email = ?";
            connection.query(sql, [email], (err, rows) => {
                if (err) return next(err);
                //..
                if (!rows.length)
                    return next(null, false, {message:'this Email does not exist.'});
                    
                // check if the password is valid
                if (!bcrypt.compareSync(password, rows[0].password)) {
                    return next(null, false, { message: 'Incorrect password.'});
                } else {
                    //return successful login if the user is found
                    return next(null, rows[0]);
                }
               
            });
        }));
    }

    /**
     * this function get data from mysql 
     * then display them to a page using EJS templating
     */
    registerData(req, res) {

        const {first_name, last_name, email, password, password_confirm} = req.body;
        //..
        let selectquery = "SELECT email FROM team_owners WHERE email =?";
        connection.query(selectquery, [email], async(err, data) => {
            console.log('register data : ' + data);
            if(err) throw err;
        
            if(data.length > 0) {
                login = "";
                message = 'That email already exist';
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

    // route middleware to make sure
    isLoggedIn(req, res, next) {
	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();
	// if they aren't redirect them to the home page
	res.redirect('/');
 }
}

module.exports = AuthManager;
