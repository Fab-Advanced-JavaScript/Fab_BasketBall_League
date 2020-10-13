
const init_fbl =() => {
    getData();
}

// this get data from the RestFul api pull from Mongodb
const getData = () => {
    const teamsUrl = "http://localhost:8080/api/allTeams";
    const imgUrl = "teamPics.json";
            
    /**
     *   ----- Method One ------
     * use a fetch to make multiple api call
     */
    fetch(teamsUrl)
               .then(response => response.json())
               .then(data  => {
               console.log(data);
               return fetch(imgUrl)
                                   .then(response => response.json())
                                   .then(imgItems => {
                                       console.log(imgItems);
                                       drawTeamList(imgItems)
                                   }).catch(err => {
                                       console.error(err);
                                   });

    });

    /**
     *   ----- Method Two ------
     * use a fetch to make multiple api call
     * Promise.all([teamInfo, teamImg])
                                    .then(files => {
                                        files.map(el => {
                                            processData(el.json());
                                        })
                                    }).catch(err => {
                                        console.error(err);
                                    })

     * 
     * then create a separate function to resolve the promise
     * const processData = promise => {
        promise 
            .then (data => {
                console.log(data);
                
                drawTeamList(data);
                return data
                // return data;
            })
}
     * 
     */
}

const drawTeamInfo = () => {
    
}

const drawTeamList = imgElement => {

    // create Element
    let divContainer = document.createElement('div');
    let sectionOne = document.createElement('section');
    let listScroll = document.createElement('div');
    

    // set up classe Names
    divContainer.className = "container";
    sectionOne.className = "teamList";
    listScroll.className = "team_list_scroll";

    // select
    let teamPara = document.querySelectorAll('.logo');
    
    imgElement.map(items => {
        teamPara = document.createElement('p');
        teamPara.classList.add('logo')
        let imgList = document.createElement('img');
        imgList.src = `${items.image}`
        let teamhyperlink = document.createElement('a')
        teamhyperlink.setAttribute('href', '#');
        teamhyperlink.innerHTML =`${items.team_name}`;
        
        teamPara.appendChild(imgList);
        teamPara.appendChild(teamhyperlink);
        listScroll.appendChild(teamPara);
    });
   
    sectionOne.appendChild(listScroll);
    divContainer.appendChild(sectionOne);
    document.body.appendChild(divContainer);

}

window.addEventListener("load", init_fbl);





/* <div id="container">
    <section id="teamlist"> 
        <div class='team_list_scroll'>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/ATL.svg"  alt="Atlanta Logo"><a href="">Atlanta Hawks</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/BOS.svg"  alt="Atlanta Logo"><a href="">Boston Celtics</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/BKN.svg"  alt="Atlanta Logo"><a href="">Booklyn</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/CHA.svg"  alt="Atlanta Logo"><a href="">Charlotte</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/CHI.svg"  alt="Atlanta Logo"><a href="">Chicago</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/CLE.svg"  alt="Atlanta Logo"><a href="">Cleveland</a></p>
            <p class="logo"><img  src="https://nba.com/assets/logos/teams/primary/web/DAL.svg"  alt="Atlanta Logo"><a href="">Dallas</a></p>

            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/DEN.svg"  alt="Atlanta Logo"><a href="">Denver Nuggets</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/DET.svg"  alt="Atlanta Logo"><a href="">Detroit Pistons</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/GSW.svg"  alt="Atlanta Logo"><a href="">Golden State Warriors</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/HOU.svg"  alt="Atlanta Logo"><a href="">Houston Rockets</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/IND.svg"  alt="Atlanta Logo"><a href="">Indiana Pacers</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/LAC.svg"  alt="Atlanta Logo"><a href="">LA Clippers</a></p>
            <p class="logo"><img  src="https://nba.com/assets/logos/teams/primary/web/LAL.svg"  alt="Atlanta Logo"><a href="">Los Angeles Lakers</a></p>

            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/MEM.svg"  alt="Atlanta Logo"><a href="">Memphis Grizzlies</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/MIA.svg"  alt="Atlanta Logo"><a href="">Miami Heat</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/MIL.svg"  alt="Atlanta Logo"><a href="">Milwaukee Bucks</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/MIN.svg"  alt="Atlanta Logo"><a href="">Minnesota Timberwolves</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/NOP.svg"  alt="Atlanta Logo"><a href="">New Orleans Pelicans</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/NYK.svg"  alt="Atlanta Logo"><a href="">New York Knicks</a></p>
            <p class="logo"><img  src="https://nba.com/assets/logos/teams/primary/web/OKC.svg"  alt="Atlanta Logo"><a href="">Oklahoma City Thunder</a></p>

            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/ORL.svg"  alt="Atlanta Logo"><a href="">Orlando Magic</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/PHI.svg"  alt="Atlanta Logo"><a href="">Philadelphia 76ers</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/PHX.svg"  alt="Atlanta Logo"><a href="">Phoenix Suns</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/POR.svg"  alt="Atlanta Logo"><a href="">Portland Trail Blazers</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/SAC.svg"  alt="Atlanta Logo"><a href="">Sacramento Kings</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/SAS.svg"  alt="Atlanta Logo"><a href="">San Antonio Spurs</a></p>
            <p class="logo"><img  src="https://nba.com/assets/logos/teams/primary/web/TOR.svg"  alt="Atlanta Logo"><a href="">Toronto Raptors</a></p>
            <p class="logo"><img src="https://nba.com/assets/logos/teams/primary/web/UTA.svg"  alt="Atlanta Logo"><a href="">Utah Jazz</a></p>
            <p class="logo"><img  src="https://nba.com/assets/logos/teams/primary/web/WAS.svg"  alt="Atlanta Logo"><a href="">Washington Wizards</a></p>
        </div>
    </section>

    <section class="team_details">
        <div>
            <h1>name of the Team</h1>
            <h2>some other info about it</h2>
        </div>
    </section>
</div>
 */