const init_fbl_players =() => {
    getPlayersData();
}

// this get data from the RestFul api pull from Mongodb
const getPlayersData = () => {
    const playerUrl = "http://localhost:8080/api/allPlayers";
    fetch(playerUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    drawPlayerList(data);
                }).catch(err => {
                    console.error(err);
                });
}

const drawPlayerList = data => {
    let myRow = document.querySelector("#playerinfos");
    if (data.length > 0) {
        let temp ="";
        data.forEach(items => {
            temp += "<tr>";
            temp += "<td class= border-right>" + items.firstName + " \t" + items.lastName  + "</td>";
            temp += "<td>" + items.team + "</td>";
            temp += "<td>" + items.jersey + "</td>";
            temp += "<td>" + items.position + "</td>";
            temp += "<td>" + items.height + "</td>";
            temp += "<td>" + items.weight + "</td>";
            temp += "<td class=college>" + items.college + "</td>";
            temp += "<td>" + items.country + "</td>";
            temp += "</tr>";
        })
        myRow.innerHTML = temp;
    }
}

const loadPages = event => {
  
}

window.addEventListener("load", init_fbl_players);

// temp += "<td class= border-right>" + "<img src =" + items.headShot + "/>" + " \t" + items.firstName + " \t" + items.lastName  + "</td>";