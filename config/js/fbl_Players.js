const init_fbl_players =() => {
    getPlayersData();
}

/**
 * this get data from the RestFul api pull from Mongodb
 * and makes call to another API (this is a multiple APIs call at once)
*/

const getPlayersData = () => {
    const playerUrl = "http://localhost:8080/api/allPlayers";

    playerData = fetch(playerUrl);

    fetch(playerUrl)
                    .then(res => processData(res.json()))
                    .catch(err => {
                        console.error(err);
                    });
}
//....
const processData = prom => {
    prom
        .then( data => {
            console.log(data);
            drawPlayerList(data);
            searchForPlayers(data);
            filterByValue(data);
        });
}
//...
const drawPlayerList = data => {
    let myRow = document.querySelector("#playerinfos");
    if (data.length > 0) {
        let temp ="";
        data.forEach(items => {
            temp += "<tr>";
            temp += "<td class= border-right>"+ "<img src=\"" + items.headShot + "\"/>" + " " + items.firstName + " " + items.lastName  + "</td>";
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
//.. search for players

const searchForPlayers= tr => {
    let userInput = document.querySelector('#searchPlayer');
     userInput.addEventListener("keyup", () => { 
    let filterValue = userInput.value.toUpperCase();
    let playerTable = document.querySelector(".table");
    tr = playerTable.querySelectorAll('tr'); // get all tr from div table

        for (i = 0; i < tr.length; i++) {
            let td = tr[i].getElementsByTagName("td")[0];
            if(td){
                let txtValue = td.textContent || td.innerText;

                if (txtValue.toUpperCase().indexOf(filterValue) > -1) { // check for matches
                    tr[i].style.display = ""; // display is empty 
                } else {
                    tr[i].style.display = "none";
                }
            }
        }
    })
}

const filterByValue = data => {
    let valueSelected = document.querySelector('#players');
    let playerTable = document.querySelector(".table");
    data = playerTable.querySelectorAll('tr');
    let filterValue = valueSelected.value.toUpperCase();
    //..
    valueSelected.addEventListener("change", () => { 
        filterValue = valueSelected.value.toUpperCase();
        console.log(filterValue);
    // get all tr from div table
        for (i = 0; i < data.length; i++) {
            
            let td = data[i].getElementsByTagName("td")[0];
            if(td){
                let txtValue = td.textContent || td.innerText;
                if  (filterValue == "ALL PLAYERS") {
                    data[i].style.display = "";
                } else if(txtValue.split(' ').pop().toUpperCase()[0] == filterValue) {
                    data[i].style.display = "";
                } else {
                    data[i].style.display = "none";
                }
            }
        }
    })
}

window.addEventListener("load", init_fbl_players);
