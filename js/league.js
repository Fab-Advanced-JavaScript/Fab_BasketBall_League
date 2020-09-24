const init = () => {

    /**
     * this event listener  is for the toggle() to open and close the sidebar menu
     */
    let myBurger = document.querySelector("#burger");
    myBurger.addEventListener("click", toggleBurger) 
    

    /**
     * this event listener  to the closebtn to remove the sidebar menu when the user click on it
     */
    let closebtn = document.querySelector("#closebtn");
    closebtn.addEventListener("click", closeBurger)  

    /**
     * this event listener  fecth data from openweathermap api
     */

    let btnTask = document.querySelector(".forecast-button");
    btnTask.addEventListener("click", () => {
        getCityDetails();
    });
}


/*
* this listen to an event on a hamburger menu to display the slide bar menu on and off when clicking on the hamburger icon
* 
*/

const toggleBurger = () => {

    let burgerItems = document.querySelector(".burger-items")
    burgerItems.classList.toggle("showNav");
    console.log('button is clicked to open the sidebar menu');
  }

/*
* this listen to an event to close the burger menu
* 
*/
const closeBurger = () => {

    let burgerItems = document.querySelector(".burger-items")
    burgerItems.classList.remove("showNav")

    console.log('button is clicked to close the burger');

}


/*
* This function is implemented to  fetch data from the api using async/await then display it on the page
* 
*/

const getCityDetails = async() => {
    let listInfos = await getCityInformation();
}

// this function fetch data from the api
const getCityInformation = async() => {

    let location = document.querySelector("#location").value;
    console.log(location);
    const apiKey = "2642ff9b94561afaf575fd98bb10ac61";
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;

    let myFetch = fetch(url);
    return await myFetch.then(infos => infos.json())
                        .then(data => {
                            console.log(data);
                            displayCityInfo(data);
                          }).catch(err => {
                            console.error("There is problem fetching data");
                        });
}

// display data on the page
const displayCityInfo = element => {
    let degC = element.main.temp - 273.15;
    let degCInt = Math.floor(degC);
    let degF = degC * 1.8 + 32;
    let degFInt = Math.floor(degF);

    let myforcast = document.querySelector(".forecast");

    let myDiv = document.createElement("div");
    myDiv.setAttribute("class", "outputCityInfos");

    let myH1 = document.createElement("label");
    let myH2 = document.createElement("label");
    let myH3 = document.createElement("label");
    let myH3One = document.createElement("label");
    let myH3Two = document.createElement("label");

    let myLabel1 = document.createElement("label");
    let myLabel2 = document.createElement("label");
    let myLabel3 = document.createElement("label");
    let myLabel4 = document.createElement("label");

    let spanOne = document.createElement("label");
    let spanTwo = document.createElement("label");
    let spanThree = document.createElement("label");
    let spanfour = document.createElement("label");

    let lineBreakOne = document.createElement("br");
    let lineBreakTwo = document.createElement("br");
    let lineBreakThree = document.createElement("br");
    let lineBreak = document.createElement("br");
    let weatherBr1 = document.createElement("br");
    let weatherBr2 = document.createElement("br");
    let weatherBr3 = document.createElement("br");
    let weatherBr4 = document.createElement("br");

    myH1.textContent =`City Name: ${element.name}`;
    myH2.textContent = `Country: ${element.sys.country}`;
    myH3.textContent = `City ID: ${element.sys.id}`;
    myH3One.textContent = `City ID: ${element.sys.sunrise}`;
    myH3Two.textContent = `City ID: ${element.sys.sunset}`;

    spanOne.textContent = `\nfeels like: ${element.main.feels_like}`;
    spanTwo.textContent = `temperature: ${degCInt}\u00B0 C / ${degFInt}\u00B0 F`;
    spanThree.textContent = `Humididty: ${element.main.humidity}`;
    spanfour.textContent = `Pressure: ${element.main.pressure}`;

    myLabel1.textContent = `Weather ID: ${element.weather[0].id}`;
    myLabel2.textContent = `Weather Main: ${element.weather[0].main}`;
    myLabel3.textContent = `Weather Description: ${element.weather[0].description}`;
    myLabel4.textContent = `Weather Icon: ${element.weather[0].icon}`;
    let iconImage = document.createElement('img');
    iconImage.setAttribute('src', `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`);
    iconImage.setAttribute('alt', `${element.weather[0].main}`);

    myDiv.appendChild(myH1);
    myDiv.appendChild(lineBreakThree);
    myDiv.appendChild(myH2);
    // myDiv.appendChild(myH3);
    // myDiv.appendChild(myLabel1);
    myDiv.appendChild(weatherBr1);
    myDiv.appendChild(myLabel2);
    myDiv.appendChild(weatherBr2);
    myDiv.appendChild(myLabel3);
    // myDiv.appendChild(weatherBr3);
    // myDiv.appendChild(myLabel4);
    myDiv.appendChild(weatherBr4);
    // myDiv.appendChild(lineBreak);
    myDiv.appendChild(spanOne);
    myDiv.appendChild(lineBreakOne);
    spanTwo.appendChild(iconImage);
    myDiv.appendChild(spanTwo);
    myDiv.appendChild(lineBreakTwo);
    myDiv.appendChild(spanThree);
    // myDiv.appendChild(lineBreakThree);
    // myDiv.appendChild(spanfour);
    myforcast.appendChild(myDiv)
    document.body.appendChild(myforcast);

    displayCategories(element);
    
}

// this display the categories or activities options
const displayCategories = el => {

    let myforcast = document.querySelector(".forecast");
    let category = document.querySelector('.category');
    category = document.createElement('div');
    category.classList.add("category");

    let divActivity = document.querySelector('.activity');
    divActivity = document.createElement('div');
    divActivity.classList.add("activity");

    let headerThree = document.createElement("label");
    // headerThree.setAttribute("id", "activity")
    headerThree.textContent = "Activities";

    let options = document.querySelector('.options');
    options = document.createElement('div');
    options.setAttribute("class", "options");

    let solo = document.querySelector('#solo');
    solo = document.createElement('div');
    solo.setAttribute("id", "solo");
    solo.textContent = "Solo";

    let team = document.querySelector('#team');
    team = document.createElement('div');
    team.setAttribute("id", "team");
    team.textContent = "Team";

    let all = document.querySelector('#all');
    all = document.createElement('div');
    all.setAttribute("id", "all");
    all.className ="selected";
    all.textContent = "All";

    // append elements
    category.appendChild(divActivity);
    divActivity.appendChild(headerThree)
    options.appendChild(solo);
    options.appendChild(team);
    options.appendChild(all);
    category.appendChild(options); 
    myforcast.appendChild(category)
    document.body.appendChild(myforcast);

    changeMenuColor(el);
}

// this change color of menu when the user selects different category 
const changeMenuColor = event => {
    // update list of sports when user selects a different category (solo/team/all)
    let myOption = document.querySelectorAll(".options");
        console.log(myOption);
        myOption.forEach(element => {
            element.addEventListener("click", data => {
                let selectedDiv = document.querySelector(".selected");
                if (selectedDiv) {
                    selectedDiv.classList.remove("selected"); 
                }
                data.target.classList.add("selected") 
                updateActivityList(data);
            });
        });   
}

/*
* this function update the activities according to the option selected
* 
*/
const updateActivityList = response => {
    let state = {};
    let allCategory = 'all';
    // state = {
    //     condition: response.weather[0].main
    // };

    const activities = {
		teamIn: ['basketball','hockey','volleyball'],
		teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
		teamOutCold: ['hockey'],
		soloIn: ['rock climbing','swimming','ice skating'],
		soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
        soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
    };

    
  let teamActivity = [];
  teamActivity.push(...activities['soloIn'], ...activities['teamIn'])
    console.log(teamActivity);
    let category = document.querySelector('.category');
    let results = document.querySelector(".results");

    if(!results) {
        console.log(response.target.id);
        results = document.createElement('div');
        results.className = "results";
        let myList = document.createElement('ul');
        myList.setAttribute("id", "listAll")
        teamActivity.map(items => {
            let itemList = document.createElement('li');
            itemList.textContent = items;
            myList.appendChild(itemList);
        })
        results.appendChild(myList);
        category.appendChild(results);
    }
}

window.addEventListener("load", init);


    // state.activities = [];
   
	// if (state.condition === "Rain" && response.target.id === 'Solo') {
    //     state.activities.push(...activities['solo' + 'In']);
		
    // } else if (state.condition === "Rain" && allCategory == "Team") {
    //     state.activities.push(...activities['team' + 'In']);

    // } else if (state.condition === "Snow" || state.degFInt < 50 && allCategory == "solo") {
    //     state.activities.push(...activities['solo' + 'OutCold']);
		
    // } else if (state.condition === "Snow" || state.degFInt < 50 && allCategory == "Team") {
    //     state.activities.push(...activities['team' + 'OutCold']);
		
	// }
    // else {
	// 	state.activities.push(...activities['solo' + 'OutWarm'], ...activities['team' + 'OutWarm']);
    // }