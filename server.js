const express = require('express');
const request = require('request');
const app = express();

app.use(express.static(__dirname));
const port = 8080;


let options = {
    method: 'GET',
    url: 'https://api-nba-v1.p.rapidapi.com/players/league/%7Bleague%7D',
    headers: {
      'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
      'x-rapidapi-key': '6fd3e95d14msh2e27349e73dc631p16c0e3jsn4206f1b7687b',
      useQueryString: true
    }
  };

request(options, (error, response, body) => {
	if (error) throw err

	console.log(body);
});


app.listen(port, () => {
    console.log('I am listening to port 8080');
})