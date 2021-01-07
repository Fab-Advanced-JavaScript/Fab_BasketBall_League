const init_fbl_players =() => {
    getPlayersData();
}

/**
 * this get data from the RestFul api pull from Mongodb
 * and makes call to another API (this is a multiple APIs call at once)
*/

const getPlayersData = () => {
    const playerUrl = "http://localhost:8080/api/allPlayers";
    const headUrl = "http://localhost:8080/api/headShot";

    playerData = fetch(playerUrl);
    headShotData = fetch(headUrl);

    Promise.all([playerData, headShotData])
                                    .then(files => {
                                        files.forEach(file => {
                                            processData(file.json());
                                        })
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });

}
const processData = prom => {
    prom
        .then( data => {
            console.log(data);
            drawPlayerList(data);
        })
    
}

const drawPlayerList = data => {
    let myRow = document.querySelector("#playerinfos");
    if (data.length > 0) {
        let temp ="";
        data.forEach((items, index) => {
            temp += "<tr>";
            temp += "<td class= border-right>"+ items.firstName + " \t" + items.lastName  + "</td>";
            // temp += "<td class= border-right>"+ "<img src=" + items.imageData + "/>" + items.firstName + " \t" + items.lastName  + "</td>";
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

window.addEventListener("load", init_fbl_players);
