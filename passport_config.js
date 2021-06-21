const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

let connection  = mysql.getConnection();
console.log("do u get here");
// used to serialize the user for the session
serialUser = () => {
    passport.serializeUser( (user, done) => {
        console.log('user' + user);
        done(null, user.id);
    });
}

deserialUser = () => {
    // used to deserialize the user
    passport.deserializeUser((id, done) => {
        connection.query("select * from team_owners  where team_ownersId = "+ team_ownersId, (err,rows) => {	
            console.log('show rows' + rows);
            done(err, rows[0]);
        })
    });
    connection.end();
}

passport.use(new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    emailField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
    }, (email, password, done) => { // callback with email and password from our form
        // connection.connect();
        console.log('email' + email);
        let sql = "SELECT * FROM team_owners  WHERE email = ?";
        connection.query(sql, [email], (err, rows) => {
            if (err) return done(err);
            //..
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage','Email does not exist.'));
            }
            // if the user is found but the password is wrong
            if (!bcrypt.compareSync(password, rows[0].password)) {
                return done(null, false, req.flash('loginMessage',' Incorrect password.'));
            } 
            //return successful login if the user is found
            return done(null, rows[0]);
        });
}));

