const init_nba =() => {
    getData();
}

// this get data from the RestFul api pull from Mongodb
const getData = () => {
    const url = "http://localhost:8080/api/allTeams";

    fetch(url)
    .then(response => response.json())
    .then(data  => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

const drawTeamInfo = () => {
    
}

window.addEventListener("load", init_nba)