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
    let quizContainer = document.querySelector('#quizContainer');
    let main = document.querySelector('main');
    let quiz = document.querySelector('#quiz');
    let multiOption = document.querySelector('.multiOption');
    
    const hideSubmitBtn = document.querySelector('.hidden');
    const previousButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");;

    // set starting question item
    let currentQuestion = 0;
    let currentAnswer = 0;
    let score = 0;

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
    const questionsPosition = element => {
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
    //..
    const checkedValue = () => {
        const selectedAnswer = document.querySelectorAll('input[name="answers"]');
        // let selectedvalue;
        for(const element of selectedAnswer) {
            element.checked = true
            // if(element.checked) {
                // console.log(element);
                // selectedvalue = element.value
                // break;
                // selectedvalue = true;
                // return
            // }
            
        }

        // let selectedOption = document.querySelector('input[type="radio"]:checked');
        // selectedOption = true;

    }

   //.. this prevent the user to go to the next question if no options were selected
   const preventUsers = event => {
        let selectedOption = document.querySelector('input[type=radio]:checked');
        nextButton.style.border = 'none';
        previousButton.style.border = 'none';
        if(!selectedOption) {
            event.preventDefault()
            event.target.style.border = "3px solid red";
            return false
        } else {
            event.target.style.border = 'none';
            return true;
        }
    }
    const displayNext = () => {
        //..
        nextButton.addEventListener("click", event => {
            //.. this check if the option has been selected
            if (!preventUsers(event)) {
                return
            }
            //..
            let selectedOption = document.querySelector('input[type="radio"]:checked');
            let answerValue = selectedOption.value;
            console.log(answerValue);
            console.log(myQuestions[currentAnswer].correctAnswer);
            if(answerValue === myQuestions[currentAnswer].correctAnswer) {
               score++;
           }
           //.. set the quiz and multiOption innnerHTML to empty in order to remove all content when the button is clicked
           currentQuestion++;
           questionsPosition(event);
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
           updateQuestion(currentQuestion)
        //    checkedValue();
           
       });
    }

    //.. this function is used to display the previous question
    const displayPrevious = () => {
        // show prev question
        previousButton.addEventListener("click",  () => {
            
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
            checkedValue();
          
        });
    }

    //.. display the score
    const displayScore = () => {

        let sectionScore = document.createElement("section");
        sectionScore.setAttribute('class', "results");
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
        //..
        let colorDiv = document.createElement("div");
        colorDiv.className = "colorInfo"
        let correct = document.createElement('label');
        let incorrect = document.createElement('label');
        
        let colorCorrect = document.createElement('span');
        let colorIncorrect = document.createElement('span');
        let linebr1 = document.createElement('br')
        let linebr2 = document.createElement('br')
        //..
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
        main.appendChild(linebr1);
        colorDiv.appendChild(correct)
        colorDiv.appendChild(colorCorrect)
        colorDiv.appendChild(linebr2)
        colorDiv.appendChild(incorrect)
        colorDiv.appendChild(colorIncorrect)
        main.appendChild(colorDiv);
    }

    //..
    const reviewAnswers = () => {
        // use toggle function to display list of question with their correct answers
        let reviewDom = document.createElement("div");
        reviewDom.addEventListener("click", outputAnswers);
        reviewDom.className = "reviews"

        let ReviewH4 = document.createElement('h4')
        ReviewH4.textContent = "Review Answers";
        reviewDom.style.backgroundColor = "#0ac99a"; // type of green
        reviewDom.style.color = "#0d2959";  
        reviewDom.style.width = "145px";
        reviewDom.style.marginLeft = "45%";
        reviewDom.style.textAlign = "center";
        reviewDom.style.borderRadius = " 15px";
        reviewDom.style.height = "25px";
        reviewDom.style.cursor = "pointer";
        reviewDom.style.marginTop = "-8em";
        reviewDom.appendChild(ReviewH4);
        main.appendChild(reviewDom);
    }
    //..
    const outputAnswers = () => {
        console.log('review button was clicked ........................');
        let oldReview = document.querySelector(".reviews");
        let btncontainer = document.querySelector("#btncontainer")
        if(oldReview) {
            oldReview.remove();
            btncontainer.remove();
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
                console.log("key ->" + `${key}`);
                console.log("value -> " + `${value}` );
                answerDiv.appendChild(input);
                answerDiv.appendChild(label);
                quizDiv.appendChild(answerDiv);
            }
            quizContainer.appendChild(quizDiv)
        });
    }

    //.. this fun is used to show submit button
    const displaySubmitBtn = () => {
        // this fun display  the submit button
        const submitBtn = document.querySelector('#submit');
        submitBtn.addEventListener("click", () => {
            console.log("dry test.......");
            if(submitBtn) {
                submitBtn.remove();
                displayScore();
                reviewAnswers();
            } 
        })
    }

    //....kick off functions here or launcher below......
    //.. display the first question and answer
    updateQuestion(currentQuestion);

    //... display next question
    displayNext();
    //.. display the prev question
    displayPrevious();

    //.. show submit button
    displaySubmitBtn();

}
window.addEventListener('load', init_trivia);