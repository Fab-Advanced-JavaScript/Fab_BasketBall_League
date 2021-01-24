const TeamManager = require('./TeamManager');
const PlayersManager = require('./PlayersManager');
const AuthManager = require('./AuthManager');
const auth_session = require('./routes/auth_session');
const teamRoute = require('./routes/teamRouter');
const navMenuRoute = require('./routes/navMenuRouter');
const express = require("Express");
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;

// view engine setup
app.set('view engine', 'ejs');

//setup  the router for the Nav Menu, burger menu and the List of the team in '/Team'
app.use('/', navMenuRoute);
app.use('/', teamRoute);
app.use('/', auth_session);
// app.use(cookieParser());

// setup session
app.use(session({ 
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

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
        console.log(data);
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
        console.log(data);
    })
});

/***
 * this section implements the login page
 * with mysql
 */
const authTaskObj = new AuthManager(); 
//get data enter in the form by the user
app.post('/login', (req, res) => {
    authTaskObj.loginData(req, res)   
});

app.post('/signup', (req, res) => {
    authTaskObj.registerData(req, res);  
});

// displays a message about the port the app is using
app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})