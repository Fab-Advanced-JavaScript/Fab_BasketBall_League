
const init_fbl =() => {
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
                    }).catch(err => {
                        console.error(err);
                    });
   
}

const drawTeamInfo = () => {
     // create Element
     let divContainer = document.querySelector('.container')
     let sectionTwo = document.createElement('section');
     let teamInfo = document.createElement('div')

    // set up classe Names
    sectionTwo.className = "team_details";
    teamInfo.className = "infoPerTeam";
    
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
        let hr = document.createElement('hr');
        let teamPara = document.createElement('p');
        teamPara.classList.add('logo')
        let imgList = document.createElement('img');
        imgList.src = `${components.imageUrl}`
        let teamhyperlink = document.createElement('a')
        teamhyperlink.setAttribute('href', `${components.teamUrl}`);
        teamhyperlink.innerHTML =`${components.team_name}`;
        
        teamPara.appendChild(imgList);
        teamPara.appendChild(teamhyperlink);
        listScroll.appendChild(teamPara);
        listScroll.appendChild(hr);
    });
   
    sectionOne.appendChild(listScroll);
    divContainer.appendChild(sectionOne);
    document.body.appendChild(divContainer);

    // teamListEvent(imgElement);
}

const teamListEvent = teamPara => {

    let divContainer = document.querySelector('.container')
    // select all className = logo
    teamPara = document.querySelectorAll(".logo");
    console.log(teamPara);

    // add an event listener
    teamPara.forEach(el => {
        el.addEventListener('click', data => {
        console.log(data.target);

        });
    })
}
window.addEventListener("load", init_fbl);

