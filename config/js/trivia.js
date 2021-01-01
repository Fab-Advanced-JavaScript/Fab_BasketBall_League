const init_trivia = () => {

    const myQuestions = [
        {
          question: "Who invented JavaScript?",
          answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich",
            d: "Fabrice Allen",
            e: "I am not sure"
          },
          correctAnswer: "c"
        },
        {
          question: "Which one of these is a JavaScript package manager?",
          answers: {
            a: "npm",
            b: "TypeScript",
            c: "none",
            d: "Node.JS"
          },
          correctAnswer: "a"
        },
        {
          question: "Which tool can you use to ensure code quality?",
          answers: {
            a: "Angular",
            b: "jQuery",
            c: "RequireJS",
            d: "ESLint",
          },
          correctAnswer: "d"
        }
    ];

    // select document
    let quizContainer = document.querySelector('.column-container');
    let main = document.querySelector('.flex-container');
    let quiz = document.querySelector('#quiz');
    let multiOption = document.querySelector('.multiOption');

    const hideSubmitBtn = document.querySelector('.hidden');
    const previousButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");;

    // set starting question item
    let currentQuestion = 0;
    let currentAnswer = 0;
    let score = 0;
    let tempStorage = [];
    //....
    let choices = document.getElementsByName("answers");

    //.. update question on the
    const updateQuestion = questionIndex => {
        const triviaQuiz = myQuestions[questionIndex];
        let header4 = document.createElement('h4');
        header4.textContent = `${questionIndex + 1} . ${triviaQuiz.question}`;
        quiz.appendChild(header4);

        //... this loop through properties of the answers objects using Obeject.entiries = [key, values]
        Object.entries(triviaQuiz.answers).sort((a, b) => b[0].localeCompare(a[0])).map((items, indexItems) => {
            console.log(indexItems);
            console.log(items);
            let hr = document.createElement('hr')
            let label = document.createElement('label');
            let input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answers'
            input.value = `${items[0]}`;
            label.textContent = `${items[1]}`;
            multiOption.appendChild(input);
            multiOption.appendChild(label);
            multiOption.appendChild(hr);
        });
    }
    /**
     * this function will turn the next button to finish button then displays the submit button once click on
     */
    const positionSubmitBtn = element => {
        console.log(myQuestions.length);
        if(currentQuestion == myQuestions.length) {
            quiz.style.display = 'none';
            multiOption.style.display = 'none';
            nextButton.style.display = 'none';
            previousButton.style.display = 'none';
            hideSubmitBtn.classList.remove('hidden');
            
        } else if (currentQuestion == myQuestions.length - 1) {
            element.target.innerHTML = "Finish";
        }
    }

    //.. save the value of the selected answer
    const getRadioInfo = () => {
        let decision = null;
        for (const option of choices) {
            console.log(option);
            if(option.checked) {
                decision = option.value;
            }
        }
        return decision;
    }
    
    //.. reporting answer by keeping the input radio button selected
    const keepAnswers = () => {
        for(const input of choices) {
            if (tempStorage[currentQuestion] != null && tempStorage[currentQuestion] == input.value) {
                input.checked = true;
            } 
        }      
    }

   //.. this prevent the user to go to the next question if no options were selected
   const preventUsers = event => {
        let selectedOption = document.querySelector('input[type=radio]:checked');
        nextButton.style.border = 'none';
        previousButton.style.border = 'none';
        if(!selectedOption) {
            event.preventDefault()
            event.target.style.border = "5px solid red";
            return false
        } else {
            event.target.style.border = 'none';
            return true;
        }
    }
    const displayNext = () => {
        //..
        nextButton.addEventListener("click", event => {
             //.. keep the selected radio button by returning the value of the input checked and saving it in an empty array
             let decision = getRadioInfo();
             tempStorage[currentQuestion] = decision;

            //.. this check if the option has been selected
            if (!preventUsers(event)) {
                return
            }

           //.. set the quiz and multiOption innnerHTML to empty in order to remove all content when the button is clicked
           currentQuestion++;
           positionSubmitBtn(event);
           quiz.innerHTML = "";
           multiOption.innerHTML= "";
   
             //.. set the current question to index 0 once it hit the index 3 or the last question in the array
           if (currentQuestion > myQuestions.length - 1) {
               currentQuestion = 0;
           } 
           //.. set the current answer to index0 once it hit the index 3 or the last answer in the array
           currentAnswer++;
           if (currentAnswer > myQuestions.length - 1) {
               currentAnswer = 0;
           }
           updateQuestion(currentQuestion);
           keepAnswers();
       });
    }

    //.. this function is used to display the previous question
    const displayPrevious = () => {
        // show prev question
        previousButton.addEventListener("click",  () => {
            //.. keep the selected radio button by returning the value of the input checked and saving it in an empty array
            let decision = getRadioInfo();
            tempStorage[currentQuestion] = decision;

            //.. set the quiz and multiOption innnerHTML to empty in order to remove all content when the button is clicked
            quiz.innerHTML = "";
            multiOption.innerHTML= "";
            currentQuestion--;
            if (currentQuestion < 0) {
                currentQuestion = myQuestions.length - 1;
                nextButton.innerHTML = "Finish";
            } else if (currentQuestion < myQuestions.length - 1 ) {
                nextButton.innerHTML = "Next";
            }
            updateQuestion(currentQuestion);
            keepAnswers();
        });
    }

    //.. display the score
    const displayScore = () => {
        tempStorage.forEach((element, index) => {
            if(element  === myQuestions[index].correctAnswer) {
               score++;
            }
        });
        //...
        let sectionScore = document.createElement("section");
        sectionScore.id = "col1";
        sectionScore.setAttribute('class', 'column-container');
        let resultsTile = document.createElement("div");
        resultsTile.setAttribute('id', 'scoreTitle');
        let resultsScore = document.createElement("div");
        resultsScore.setAttribute('id', 'scoreOutput')
        let resultsSummary = document.createElement("div");
        resultsSummary.setAttribute('id', 'scoreSummary')
        //...
        let scoreTitle = document.createElement('h4');
        let scoreLabel = document.createElement('label');
        let scoreSummary = document.createElement('label');
        //...
        //... adding the color of the correct and incorrect answer
        let colorDiv = document.createElement("div");
        colorDiv.id = "col4";
        colorDiv.className = "column-container";
        let correct = document.createElement('label');
        let incorrect = document.createElement('label');
        
        let colorCorrect = document.createElement('span');
        let colorIncorrect = document.createElement('span');
        let linebr2 = document.createElement('br');

        correct.textContent = "Correct Answer: ";
        incorrect.textContent = "Incorrect Answer: ";
        colorCorrect.textContent = " c";
        colorCorrect.style.backgroundColor = "#0ac99a";  //green color  #00b344
        colorCorrect.style.width = "10px";
        colorIncorrect.style.backgroundColor = "#bf0f0f";  // red color
        colorIncorrect.style.width = "10px";
        colorIncorrect.textContent = "c ";
        //..
        scoreTitle.textContent = "Your Score";
        scoreLabel.textContent =  `${score}/${myQuestions.length}`;
    
        if(score <= myQuestions.length - 2) {
            scoreSummary.textContent =  `You failed`;
            scoreSummary.style.color =  "#bf0f0f";
        } else {
            scoreSummary.textContent =  `you passed`;
            scoreSummary.style.color =  "#00b344";
        }
        //.. appending child
        resultsTile.appendChild(scoreTitle);
        resultsScore.appendChild(scoreLabel);
        resultsSummary.appendChild(scoreSummary);
        sectionScore.appendChild(resultsTile);
        sectionScore.appendChild(resultsScore);
        sectionScore.appendChild(resultsSummary);
        main.appendChild(sectionScore);
        // main.appendChild(linebr1);
        colorDiv.appendChild(correct)
        colorDiv.appendChild(colorCorrect)
        colorDiv.appendChild(linebr2)
        colorDiv.appendChild(incorrect)
        colorDiv.appendChild(colorIncorrect)
        document.body.appendChild(colorDiv);
       
    }
    //... display the retake quiz button
    const refreshPage = () => {
        //.. display retake quiz button 
        let refreshPage = document.createElement("section");
        refreshPage.id = "col3";
        refreshPage.className = 'column-container';
        refreshPage.innerHTML = "Retake Quiz";
        refreshPage.style.cursor = "pointer";
        refreshPage.addEventListener("click", ()=> {
            window.location.reload();
        });
        main.appendChild(refreshPage);
    }
    //..
    const reviewAnswers = () => {
        // user clicked on the review button to display list of question with their correct answers
        let columnContainer2 = document.querySelector('#col2');
        let reviewDom = document.createElement("div");
        reviewDom.addEventListener("click", outputAnswers);
        reviewDom.className = "reviews"

        let ReviewH4 = document.createElement('h4')
        ReviewH4.textContent = "Review Answers";
        reviewDom.appendChild(ReviewH4);
        columnContainer2.appendChild(reviewDom);
    }
    //..
    const outputAnswers = () => {
        let oldReview = document.querySelector(".reviews");
        let btncontainer = document.querySelector(".btncontainer");
        let title = document.querySelector("#title");
        //..
        if(oldReview) {
            oldReview.remove();
            btncontainer.remove();
            title.remove();
        }
        //...
        myQuestions.map((items, itemIndex) => {
            let quizDiv = document.createElement('div');
            quizDiv.className = "outputQuestions"
            let header4 = document.createElement('h4');
            header4.textContent = `${itemIndex + 1} . ${items.question}`;
            console.log("questions: " + items.question);
            quizDiv.appendChild(header4);
            for(const[key, value] of Object.entries(items.answers)) {
                console.log("answers: " + items.answers);
                let answerDiv = document.createElement('div');
                answerDiv.className = "outputAnswers"
                let label = document.createElement('label');
                let input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answers'
                input.value = `${key}`;
                label.textContent = `${value}`;
                // answerDiv.appendChild(input);
                answerDiv.appendChild(label);
                quizDiv.appendChild(answerDiv);
                //...
                answersColor(label, key, itemIndex);
            }
            quizContainer.appendChild(quizDiv)
            quizContainer.style= "overflow-y: scroll;"
            quizContainer.style.backgroundColor= "rgb(223, 223, 223)";
        });   
    }

    //.. this fun is used to show submit button
    const displayElement = () => {
        // this fun display  the submit button
        const submitBtn = document.querySelector('#submit');
        submitBtn.addEventListener("click", () => {
            if(submitBtn) {
                submitBtn.remove();
                displayScore();
                reviewAnswers();
                refreshPage(); 
            } 
        })
    }
    //......
    const answersColor = (label, key, index) => {

        console.log("tempstorage:  " + tempStorage[index]);
        console.log('that key--->: ' + key);
        if(tempStorage[index] == key && tempStorage[index] == myQuestions[index].correctAnswer) {
            label.style.color = "#0ac99a"; //green
        } else if(tempStorage[index] == key && tempStorage[index] != myQuestions[index].correctAnswer) {
            label.style.color = "#bf0f0f"; // red
        }
    }
    //....kick off functions here or launcher below......
    //.. display the first question and answer
    updateQuestion(currentQuestion);

    //... display next question
    displayNext();
    //.. display the prev question
    displayPrevious();

    //.. show review button, display score and the retake quiz button
    displayElement();

}
window.addEventListener('load', init_trivia);