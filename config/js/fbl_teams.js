const init_fbl_teams =() => {
    getData();
}

// this get data from the RestFul api pull from Mongodb
const getData = () => {
    const teamUrl = "http://localhost:8080/api/teamUrl";
    /**
     *   ----- Method One ------
     * use a fetch to make multiple api call
     */
    fetch(teamUrl)
                .then(response => response.json())
                .then(el => {
                    console.log(el);
                    drawTeamList(el);
                    searchForTeamName(el);
                }).catch(err => {
                    console.error(err);
                });
}

const drawTeamList = items => {
    // create Element
    let divContainer = document.createElement('div');
    let sectionOne = document.createElement('section');
    let listScroll = document.createElement('div');
   
    // set up classe Names
    divContainer.className = "container";
    sectionOne.className = "teamList";
    listScroll.className = "team_list_scroll";
    
    // loop through the items in the json file
    items.map(components => {
        let teamPara = document.createElement('p');
        teamPara.classList.add('logo')
        let imgList = document.createElement('img');
        imgList.src = `${components.imageUrl}`
        let teamhyperlink = document.createElement('a')
        teamhyperlink.setAttribute('href', "#");
        teamhyperlink.setAttribute('onclick', "loadPages(event)");
        teamhyperlink.innerHTML =`${components.team_name}`;
        teamPara.appendChild(imgList);
        teamPara.appendChild(teamhyperlink);
        listScroll.appendChild(teamPara);
    });
   
    sectionOne.appendChild(listScroll);
    divContainer.appendChild(sectionOne);
    document.body.appendChild(divContainer);

    // call display atlanta content if any content does not exist when the page load
    loadPages(items);
}

const loadPages = event => {
    // this clear the content if it exist
    clearHtml();
    //...
    let teamName = "";
    if(event.target) {
        let fullteamName = event.target.innerHTML;
        teamName = fullteamName.split(' ')[0].toLowerCase();
    } else {
        teamName = "atlanta";
    }
    
    let teamurl = `http://localhost:8080/fbl/teams/${teamName}`

    fetch(teamurl)
    .then(res => res.text())
    .then(html => {
        console.log(html);
            let divContainer = document.querySelector('.container')
            let sectionTwo = document.createElement('section');
            let div = document.createElement('div');
            // set up classe Names
            sectionTwo.className = "team_details";
            div.classList.add('output');
            div.innerHTML = html;
            sectionTwo.appendChild(div);
            divContainer.appendChild(sectionTwo);
    })
    .catch((error) => {
        console.warn(error);
    });

}
const clearHtml = () => {
    removeSection = document.querySelector(".team_details")
    if(removeSection) {
        removeSection.remove();
    }
}

const searchForTeamName = teamPara => {

    // let userInput = document.querySelector('#userinput');
    // userInput.addEventListener("input", () => { 
    //     let filterTeams = userInput.value.toLowerCase();
    //     const newInput = users.filter(user => user.team_name.toLowerCase().includes(filterTeams));
    //     drawTeamList(newInput);
    // });   

    let userInput = document.querySelector('#userinput');
     userInput.addEventListener("keyup", () => { 
        let filterValue = userInput.value.toUpperCase();
        let teamlist = document.querySelector(".team_list_scroll");
        teamPara = teamlist.querySelectorAll('.logo'); // get all p from div team_list_scroll

        for (i = 0; i < teamPara.length; i++) {
            let a = teamPara[i].getElementsByTagName("a")[0];
            let txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filterValue) > -1) { // check for matches
                teamPara[i].style.display = "";
            } else {
                teamPara[i].style.display = "none";
            }
        }
    })
}

window.addEventListener("load", init_fbl_teams);
