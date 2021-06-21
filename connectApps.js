const TeamManager = require('./TeamManager');
const PlayersManager = require('./PlayersManager');
const AuthManager = require('./AuthManager');
const passport = require('passport');
const flash = require('connect-flash');
const teamRoute = require('./routes/teamRouter');
const navMenuRoute = require('./routes/navMenuRouter');
const express = require("Express");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('./mysql_config');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
let connection  = mysql.getConnection();

const app = express();
const port = 8080;

// view engine setup
app.set('view engine', 'ejs');
//..
//..
// require( './passport_config');// importing all content of the passport_config file
// used to serialize the user for the session

// Required to read cookies
app.use(cookieParser());

// setup session
app.use(session({ 
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  }))
//.. use flash
app.use(flash());
//initializing passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//
passport.serializeUser((user, next) => {
    // Serialize the user in the session
    next(null, user);
});

passport.deserializeUser((user, next) => {
    // Use the previously serialized user
    next(null, user);
});



//setup  the router for the Nav Menu, burger menu and the List of the team in '/Team'
app.use('/', navMenuRoute);
app.use('/', teamRoute);
// app.use('/', auth_session);


// setup  allow the app to access file in public, view and config folders
app.use(express.static('config'));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * this is the Team data section
 */
// create an instance of teamManager
const teamTask = new TeamManager();

//this  taskObj.getAllData() get data from the Sport data Io then insert it into teamStoreDB in mongodb
// teamTask.getAllData();

/** 
 * restFul api to get Team informatin  from mongodb 
 */
app.get("/api/allTeams", (req, res) => {
    teamTask.findTeamData(data => {
        // console.log(data);
        res.json(data);
    })
});

/**
 * this is the player data section
 */

//this  playerObj.allPlayers(); get data from the api Sport data IO then insert it into teamStoreDB in mongodb
// create an instance of playerManager
const playerObj = new PlayersManager();
// playerObj.allPlayers();

/** restFul api to get Players information */
app.get("/api/allPlayers", (req, res) => {
    playerObj.findPlayerData(data => {
        res.json(data);
        // console.log(data);
    })
});

/***
 * this section implements the login page
 * with mysql
 */

// login the user
passport.use('localSignin', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
}, (req, email, password, next) => { // callback with email and password from our form
    console.log("checking...");
    let sql = "SELECT * FROM team_owners  WHERE email = ?";
    connection.query(sql, [email], (err, rows) => {
        console.log(rows);
        if (err) return next(err);
        //..
        if (!rows.length)
            return next(null, false, req.flash('loginMessage', 'This Email does not exist!'));
        // check if the password is valid
        if (!bcrypt.compareSync(password, rows[0].password)) {
            console.log('is pwd is not valid');
            return next(null, false, req.flash('loginMessage', 'Incorrect Password. Try again!'));
        } else {
            //return successful login if the user is found
            return next(null, rows[0]);
        }
    });
}));

// Passport strategies are middlewares
app.post('/login', passport.authenticate('localSignin', {
    successRedirect: '/draft_home',
    failureRedirect: '/login',
    failureFlash: true 
    // res.render('pages/view_profiles', {title: title, header: headerTitle});
    }));
/**
 * sign up the user
 * A named strategy is used since two local strategy are used :
    one for the registration and the other to sign-in
 */


passport.use('localSignup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback .

}, (req, email, password, next) => {

    const {username, first_name, last_name, password_confirm} = req.body;
    let sql = "SELECT email FROM team_owners WHERE email =?";
    connection.query(sql, [email], async(err, data) => {
        console.log('register data : ' + data);
        console.log(data);
        if(err) throw err;
        if(data.length > 0) {
            return next(null, false, req.flash('SignUpMessage', 'This Email already Exist!'))
        } else if (password != password_confirm) {
            return next(null, false, req.flash('SignUpMessage', 'The password does not match'))
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
        console.log(userData);
        //..
        connection.query(insertquery, userData, (err, data) => {
            console.log("inserted data:  " + data);
            if (err) throw err;
            return next(null, data, req.flash('SignUpMessage', 'Account Has been succesfully created'))
        });
    });
}));

// register a user 
// app.post('/signup', (req, res) => {
//     authTaskObj.registerData(req, res);  
// });

// Sign-up route
app.post('/signup', passport.authenticate('localSignup', {
    successRedirect: '/signup',
    failureRedirect: '/signup',
    failureFlash: true 
}));

// displays a message about the port the app is using
app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})