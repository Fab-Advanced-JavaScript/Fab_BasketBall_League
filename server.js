const express = require('express');
const request = require('request');
let bodyParser = require('body-parser');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));
const port = 8080;


let options = {
    method: 'GET',
    url: 'https://free-nba.p.rapidapi.com/players',
    qs: {page: '0', per_page: '25'},
    headers: {
      'x-rapidapi-host': 'free-nba.p.rapidapi.com',
      'x-rapidapi-key': '6fd3e95d14msh2e27349e73dc631p16c0e3jsn4206f1b7687b',
      useQueryString: true
    }
  };

    request(options, (error, response, body) => {
        if (error) throw err
        let jsonData = JSON.parse(body);
        console.log(jsonData);
    
    });


/** restFul api */
// app.get("/api/allPlayers", (req, res) => {

// });

app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})