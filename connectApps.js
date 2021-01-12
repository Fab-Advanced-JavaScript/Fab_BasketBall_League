const TaskManager = require('./TaskManager');
const PlayersManager = require('./PlayersManager');
const AuthManager = require('./AuthManager');
const auth_session = require('./routes/auth_session');
const teamRest = require('./routes/restTeams')
const navMenu = require('./routes/navMenuRouter')
const express = require("Express");
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const app = express();
const port = 8080;

// setup  allow the app to access file in public, view and config folders
app.use(express.static('config'));
app.use(express.static('public'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('view engine', 'ejs');

//setup  the router for the Nav Menu, burger menu and the List of the team in '/Team'
app.use('/', navMenu);
app.use('/', teamRest);
app.use('/', auth_session);
app.use(cookieParser());

/**
 * this is the player data section
 */

//this  taskObj.getAllData() get data from the rapidAPI then insert it into teamStoreDB in mongodb
// taskObj.getAllData();

// create an instance of taskManager
const taskObj = new TaskManager();

/** restFul api to get informatin of Team from mongodb */
app.get("/api/allTeams", (req, res) => {
    taskObj.findTeamData(data => {
        console.log(data);
        res.json(data);
    })
});

/** restFul api to get information of few properties in TeamUrl from mongodb*/
app.get("/api/teamUrl", (req, res) => {
    taskObj.findTeamUrl(data => {
        console.log(data);
        res.json(data);
    })
});

/** creates restFul api to get data in teamInfo.json */
app.get("/api/teamJson", (req, res) => {
    taskObj.readTeamFile(data => {
        let jsonData = JSON.parse(data);
        res.json(jsonData);
    })
});

/**
 * this is the player data section
 */

//this  playerObj.allPlayers(); get data from the api Sport data IO then insert it into teamStoreDB in mongodb
// playerObj.allPlayers();
// create an instance of playerManager
const playerObj = new PlayersManager();

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