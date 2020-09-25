const init_nba =() => {
    getData();
}

const getData = () => {

    let url = "https://free-nba.p.rapidapi.com/players?page=0";
    const settings = {
        method: "GET",
        headers: {
            "x-rapidapi-host": "free-nba.p.rapidapi.com",
            "x-rapidapi-key": "6fd3e95d14msh2e27349e73dc631p16c0e3jsn4206f1b7687b"
        }
    };

    fetch(url, settings)
    .then(response => response.json())
    .then(data  => {
        console.log(data);
    }).catch(err => {
        console.log(err);
    });
}

window.addEventListener("load", init_nba)