const init = () => {
    console.log("let get the web version up and running");
    // this implement the event
    let myBurger = document.querySelector("#burger");
    myBurger.addEventListener("click", toggleBurger);

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
    console.log('i am about the wire this');

    let div = document.querySelector('.menu-items')

    if(!div) {
        let div = document.createElement('div');
        div.classList.add("menu-items");
        let ul = document.createElement('ul');
        ul.setAttribute("id", "items");
        let createLine1 = document.createElement('hr');
        let createLine2 = document.createElement('hr');
        let li1 = document.createElement('li');
        let li2 = document.createElement('li');
        let li3 = document.createElement('li');
        let linebreak1 = document.createElement('br');
        let linebreak2 = document.createElement('br');

        li1.innerHTML = "Full Schedule";
        li2.innerHTML = "FBL Events";
        li3.innerHTML = "2020 FBL Drafts";
       
        ul.appendChild(li1);
        ul.appendChild(linebreak1);
        ul.appendChild(createLine1);
        ul.appendChild(li2);
        ul.appendChild(linebreak2);
        ul.appendChild(createLine2);
        ul.appendChild(li3);
        div.appendChild(ul);
        document.body.appendChild(div);
    } else {
        // let myUl = document.querySelector("#items");
        // myUl.remove();
        // div.remove();
        div.parentNode.removeChild(div);
    }
  }

/*
* This implement data fetch from the api and display it on the page
* 
*/

//
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

    let myDiv = document.createElement("div");
    myDiv.setAttribute("class", "outputCityInfos");

    let myH1 = document.createElement("h1");
    let myH2 = document.createElement("h2");
    let myH3 = document.createElement("h3");
    let myH3One = document.createElement("h3");
    let myH3Two = document.createElement("h3");

    let myLabel1 = document.createElement("label");
    let myLabel2 = document.createElement("label");
    let myLabel3 = document.createElement("label");
    let myLabel4 = document.createElement("label");

    let spanOne = document.createElement("span");
    let spanTwo = document.createElement("span");
    let spanThree = document.createElement("span");
    let spanfour = document.createElement("span");

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

    myDiv.appendChild(myH1);
    myDiv.appendChild(myH2);
    myDiv.appendChild(myH3);
    myDiv.appendChild(myLabel1);
    myDiv.appendChild(weatherBr1);
    myDiv.appendChild(myLabel2);
    myDiv.appendChild(weatherBr2);
    myDiv.appendChild(myLabel3);
    myDiv.appendChild(weatherBr3);
    myDiv.appendChild(myLabel4);
    myDiv.appendChild(weatherBr4);
    myDiv.appendChild(lineBreak);
    myDiv.appendChild(spanOne);
    myDiv.appendChild(lineBreakOne);
    myDiv.appendChild(spanTwo);
    myDiv.appendChild(lineBreakTwo);
    myDiv.appendChild(spanThree);
    myDiv.appendChild(lineBreakThree);
    myDiv.appendChild(spanfour);
    document.body.appendChild(myDiv);

    displayCategories(element);
}

// this display the categories or activities options
const displayCategories = el => {
    let category = document.querySelector('.category');
    category = document.createElement('div');
    category.classList.add("category");

    let headerThree = document.createElement("h3");
    headerThree.setAttribute("id", "activity")
    headerThree.textContent = "Activities";

    let options = document.querySelector('.options');
    options = document.createElement('div');
    options.setAttribute("id", "options");

    let solo = document.querySelector('#solo');
    solo = document.createElement('div');
    solo.setAttribute("id", "solo");
    solo.className ="option";
    solo.textContent = "Solo";

    let team = document.querySelector('#team');
    team = document.createElement('div');
    team.setAttribute("id", "team");
    team.className ="option";
    team.textContent = "Team";

    let all = document.querySelector('#all');
    all = document.createElement('div');
    all.setAttribute("id", "all");
    all.className ="option";
    all.textContent = "All";

    // append elements
    category.appendChild(headerThree);
    options.appendChild(solo);
    options.appendChild(team);
    options.appendChild(all);
    category.appendChild(options);
    document.body.appendChild(category);

    changeMenuColor(el);
}

// this change color when a menu activities is clicked
const changeMenuColor = event => {

    // update list of sports when user selects a different category (solo/team/all)
    let myOption = document.querySelectorAll(".option");
        console.log(myOption);
        myOption.forEach(element => {
            element.addEventListener("click", data => {
                let selectedDiv = document.querySelector(".selected");
                if (selectedDiv) {
                    selectedDiv.classList.remove("selected"); 
                }
                data.target.classList.add("selected") 
                updateActivityList(data);
            })
        }); 
}

// this function update the activities according to the option clicked
const updateActivityList = response => {
    
    const activities = {
		teamIn: ['basketball','hockey','volleyball'],
		teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
		teamOutCold: ['hockey'],
		soloIn: ['rock climbing','swimming','ice skating'],
		soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
        soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
    };
    
  
    if(response.target.classList.contains("selected") && response.target.id == 'all') {
        
        let activitiesContainer = document.createElement('div');
        activitiesContainer.className = "activities";
        let myList = document.createElement('ul');
        myList.setAttribute("id", "listAll")
        activities.teamIn.map(items => {
            let itemList = document.createElement('li');
            itemList.textContent = items;
            myList.appendChild(itemList);
        })
        activitiesContainer.appendChild(myList)
        document.body.appendChild(activitiesContainer);

    } else if(response.target.classList.contains("selected") && response.target.id == 'team') {
       
        let teamActivity = [...activities.teamOutWarm];
        console.log(teamActivity);

        let activitiesContainer = document.createElement('div');
        activitiesContainer.className = "activities";
        let myList = document.createElement('ul');
        myList.setAttribute("id", "listTeam")
        teamActivity.map(items => {
            let itemList = document.createElement('li');
            itemList.textContent = items;
            myList.appendChild(itemList);
        })
        activitiesContainer.appendChild(myList)
        document.body.appendChild(activitiesContainer);
    } else {

        let ulActivities = document.querySelector('#list ul');
        ulActivities.p.replaceChild(myList, ulActivities)
        
    }
}

window.addEventListener("load", init);
