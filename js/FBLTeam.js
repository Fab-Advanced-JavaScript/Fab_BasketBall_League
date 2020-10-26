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
        teamhyperlink.setAttribute('href', "#");
        teamhyperlink.setAttribute('onclick', "loadPages(event)");
        // teamhyperlink.setAttribute('id', `${components._id}`)
        teamhyperlink.innerHTML =`${components.team_name}`;
        
        teamPara.appendChild(imgList);
        teamPara.appendChild(teamhyperlink);
        listScroll.appendChild(teamPara);
        listScroll.appendChild(hr);
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

window.addEventListener("load", init_fbl);

