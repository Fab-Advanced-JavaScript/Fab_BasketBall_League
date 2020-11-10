const init = () => {

    let category = '';
    let type = '';

    let degFInt;
    let weatherInfo;

    const activities = {
        teamIn: ['basketball','hockey','volleyball'],
        teamOutWarm: ['softball/baseball','football/soccer','American football','rowing','tennis','volleyball','ultimate frisbee','rugby'],
        teamOutCold: ['hockey'],
        soloIn: ['rock climbing','swimming','ice skating'],
        soloOutWarm: ['rowing','running','hiking','cycling','rock climbing'],
        soloOutCold: ['snowshoeing','downhill skiing','cross-country skiing','ice skating']
    };

    /*
    * This function is implemented to  fetch data from the api using async/await then display it on the page
    * 
    */

    const getCityDetails = async() => {
        await getCityInformation();
        clearInput();
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
        weatherInfo = element;
        let degC = weatherInfo.main.temp - 273.15;
        let degCInt = Math.floor(degC);
        let degF = degC * 1.8 + 32;
        degFInt = Math.floor(degF);

        let cityInfoDom = document.querySelector('.outputCityInfos');

        if(cityInfoDom) {
            cityInfoDom.remove();
        }
        //..
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

        myH1.textContent =`City Name: ${weatherInfo.name}`;
        myH2.textContent = `Country: ${weatherInfo.sys.country}`;
        myH3.textContent = `City ID: ${weatherInfo.sys.id}`;
        myH3One.textContent = `City ID: ${weatherInfo.sys.sunrise}`;
        myH3Two.textContent = `City ID: ${weatherInfo.sys.sunset}`;

        spanOne.textContent = `\nfeels like: ${weatherInfo.main.feels_like}`;
        spanTwo.textContent = `temperature: ${degCInt}\u00B0 C / ${degFInt}\u00B0 F`;
        spanThree.textContent = `Humididty: ${weatherInfo.main.humidity}`;
        spanfour.textContent = `Pressure: ${weatherInfo.main.pressure}`;

        myLabel1.textContent = `Weather ID: ${weatherInfo.weather[0].id}`;
        myLabel2.textContent = `Weather Main: ${weatherInfo.weather[0].main}`;
        myLabel3.textContent = `Weather Description: ${weatherInfo.weather[0].description}`;
        myLabel4.textContent = `Weather Icon: ${weatherInfo.weather[0].icon}`;
        let iconImage = document.createElement('img');
        iconImage.setAttribute('src', `http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}.png`);
        iconImage.setAttribute('alt', `${weatherInfo.weather[0].main}`);

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

        //..
        let categoryDom = document.querySelector('.category');
        if(categoryDom) {
            categoryDom.remove();
        }

        //..
        let myforcast = document.querySelector(".forecast");
        let category = document.createElement('div');
        category.classList.add("category");

        let divActivity = document.createElement('div');
        divActivity.classList.add("activity");

        let headerThree = document.createElement("label");
        // headerThree.setAttribute("id", "activity")
        headerThree.textContent = "Activities";

        let options = document.createElement('div');
        options.setAttribute("class", "options");

        let solo = document.createElement('div');
        solo.setAttribute("id", "solo");
        solo.textContent = "Solo";

        let team = document.createElement('div');
        team.setAttribute("id", "team");
        team.textContent = "Team";

        let all = document.createElement('div');
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

    /**
     * this change color of menu when the user selects different category 
     * 
    */
    const changeMenuColor = event => {
    
        // update list of sports when user selects a different category (solo/team/all)
        let myOption = document.querySelectorAll(".options");

        myOption.forEach(element => {
            element.addEventListener("click", data => {
                let selectedDiv = document.querySelector(".selected");
                if (selectedDiv) {
                    selectedDiv.classList.remove("selected"); 
                }
                data.target.classList.add("selected") 
                category = data.target.innerHTML;
                updateActivityList();
            });
        }); 
        category = "All"
        updateActivityList();
    }
    //...
    const updateActivityList = () => {

        let state = {
            condition : `${weatherInfo.weather[0].description}`,
            degFint : degFInt
        }
        console.log(state.condition);

        if(state.condition.toLowerCase() == "rain" || state.condition.toLocaleLowerCase() == "thunderstorm") {
           type = 'In';
        } else if (state.condition.toLowerCase() == "snow" || state.degFint < 50 ) {
            type = 'OutCold';
        } else {
            type = "OutWarm";
        }
        updateState(type);
    }

    const updateState = (type) => {
        //..
        let stateActivities = []

        if (category === "Solo") {
            stateActivities.push(...activities['solo' + type]);
        } else if (category === "Team") {
            stateActivities.push(...activities['team' + type]);
        } else {
            stateActivities.push(...activities['solo' + type]);
            stateActivities.push(...activities['team' + type]);
        }

        //...
        let resultOld = document.querySelector('.results'); // look fo the results

        if(resultOld) { // if true remove the className = results
            resultOld.remove();
        } 
        //..
        let categoryDom = document.querySelector('.category');
        let results = document.createElement('div');
        results.className = "results";
        let myList = document.createElement('ul');
        myList.setAttribute("id", "listAll")
        //..
        stateActivities.map(items => {
            let itemList = document.createElement('li');
            itemList.textContent = items;
            myList.appendChild(itemList);
        })
        results.appendChild(myList);
        categoryDom.appendChild(results);
    }
    //.. this will clear the input enter by user
    const clearInput = () => {
         clearValue = document.querySelector('#location');
         clearValue.value = "";
    }

    //..
    let btnTask = document.querySelector(".forecast-button");
    btnTask.addEventListener("click", getCityDetails);
}

window.addEventListener("load", init);
