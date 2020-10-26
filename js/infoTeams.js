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
                        displayHawks(el);
                    }).catch(err => {
                        console.error(err);
                    });
}

//....
const displayHawks = element => {
    // create Element
    // let divContainer = document.createElement('div');
    // divContainer.className = "container"
   
    //... Create Elements
    // let sectionTwo = document.createElement('section');
    // sectionTwo.className = "team_details";

    let output= document.createElement('div');
    output.className = "output";

    // create line break
    let lineBreak = document.createElement("br");
    let lineBreak1 = document.createElement("br");
    let lineBreak2 = document.createElement("br");
    let lineBreak3 = document.createElement("br");
    let lineBreak4 = document.createElement("br");

    // create some thematic break hr
    let hr1 = document.createElement('hr');
    let hr2 = document.createElement('hr');
    let hr3 = document.createElement('hr');
    let hr4 = document.createElement('hr');
    let hr5 = document.createElement('hr');

    let label1 = document.createElement('label');
    let label2 = document.createElement('label');
    let label3 = document.createElement('label');
    let label4 = document.createElement('label');
  
    let headerimg = document.createElement('img');
    headerimg.src = '/images/atlanta.jpg';
    //... \u00A0 this add space in the string interpolation
    label1.textContent = `Abbreviation: \u00A0 \u00A0 \u00A0 \u00A0 ${element[0].abbreviation}`;
    label2.textContent = `City Name: \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 ${element[0].city}`;
    label3.textContent = `Conference: \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 \u00A0 ${element[0].conference}`;
    label4.textContent = `Team Full Name: \u00A0 \u00A0 ${element[0].full_name}`;

    output.appendChild(headerimg);
    output.appendChild(lineBreak);
    output.appendChild(hr1);
    output.appendChild(label1);
    output.appendChild(lineBreak1)
    output.appendChild(hr2);
    output.appendChild(label2);
    output.appendChild(lineBreak2)
    output.appendChild(hr3);
    output.appendChild(label3);
    output.appendChild(lineBreak3)
    output.appendChild(hr4);
    output.appendChild(label4);
    output.appendChild(hr5);
    // sectionTwo.appendChild(output);
    // divContainer.appendChild(sectionTwo);
    document.body.appendChild(output);
};

window.addEventListener("load", init_infoTeam);