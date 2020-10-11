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

// taskObj.connectToInsert(data => {
//     console.log(data);
// });

taskObj.getApiData();

/** get data from the api */

// taskObj.getApiData(data => {
//     console.log(data);
// })

/** restFul api */
// app.get("/api/allPlayers", (req, res) => {
//     taskObj.findDocuments(data => {
//         console.log("Document retrieved");
//         res.json(data)
//         console.log("------------------");
//         console.log(data);
//     })
//   });
    
  app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})