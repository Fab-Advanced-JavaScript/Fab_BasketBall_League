const TeamManager = require('./TeamManager');
const PlayersManager = require('./PlayersManager');
const passport = require('passport');
const flash = require('connect-flash');
const teamRoute = require('./routes/teamRouter');
const navMenuRoute = require('./routes/navMenuRouter');
const express = require("Express");
const expressSession  = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mysql = require('./mysql_config');
const LocalStrategy = require('passport-local').Strategy;
const app = express();
const port = 8080;
let connection  = mysql.getConnection();

// view engine setup
app.set('view engine', 'ejs');
//.. use flash
app.use(flash());
// Required to read cookies
app.use(cookieParser());
// setup  allows the app to access files in config folder
app.use(express.static('config'));
// setup  middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// setup session
app.use(expressSession ({ 
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }))

//initializing passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
require('./config/auth/pass_auth')(passport, connection, LocalStrategy, bcrypt);
//setup  the routes
app.use('/', navMenuRoute);
app.use('/', teamRoute);


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
// displays a message about the port the app is using
app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})