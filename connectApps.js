const TaskManager = require('./TaskManager');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const port = 8080;

// configuration
app.use(express.static(__dirname));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// create an instance of taskManager
const taskObj = new TaskManager();

/** insert data into the MongoDb */
// taskObj.getApiData();

/** restFul api */
app.get("/api/allTeams", (req, res) => {
    taskObj.findTeamData(data => {
        res.json(data);
    })
});
    
  app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})