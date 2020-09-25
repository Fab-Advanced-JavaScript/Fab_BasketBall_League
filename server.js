const express = require('express');
const request = require('request');
let bodyParser = require('body-parser');
const { callbackify } = require('util');
const app = express();
app.use(express.json());
app.use(bodyParser.json());
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

// let fetchFromAPI = callback => {
//     request(options, (error, response, body) => {
//         if (error) throw err
//         console.log('getting data......');
//         console.log(body);
//         return callback(err, JSON.parse(body));
//     });
// }

/** restFul api */
app.get("/api/allPlayers", (req, res) => {

    request(options, (error, response, body) => {
        if (error) throw err
        console.log('getting data......');
        console.log(JSON.parse(body));
        res.send(data);
    });
})

app.listen(port, () => {
    console.log(`I am listening to a port ${port}`);
})