const TaskManager = require('./TaskManager');
const teamRest = require('./restTeams')
const navMenu = require('./navMenuRouter');
const express = require("Express");
const bodyParser = require('body-parser');
const app = express();

const port = 8080;

  //setup  the router for the Nav Menu and the List of the team in '/Team'
  app.use('/', navMenu);
  app.use('/', teamRest);

// configuration
// app.use(express.static(__dirname));

// setup to allow the app to access file in public folder
app.use(express.static('public'));
app.use('/js', express.static(__dirname +'/js'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create an instance of taskManager
const taskObj = new TaskManager();

/** insert data into the MongoDb */
// taskObj.getAllData();


/** restFul api to get informatin of Team */
app.get("/api/allTeams", (req, res) => {
    taskObj.findTeamData(data => {
        console.log(data);
        res.json(data);
    })
});

/** restFul api to get information few properties in TeamUrl */
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
        console.log('json data: ' + data);
        res.json(jsonData);
    })
});

// displays a message about the port the app is using
app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})