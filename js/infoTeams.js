const init_infoTeam = () => {
    console.log('Team data will be loading ......');
    getData();
}

/* this make a call to an end point where the data are obtained from mongodb */
const getData = () => {
    const allTeamUrl = "http://localhost:8080/api/allTeams";

    /**use a fetch to make api call to get data from nba api */
    fetch(allTeamUrl)
                    .then(res => res.json())
                    .then(el => {
                        console.log(el);
                    }).catch(err => {
                        console.error(err);
                    });
}
window.addEventListener("load", init_infoTeam);