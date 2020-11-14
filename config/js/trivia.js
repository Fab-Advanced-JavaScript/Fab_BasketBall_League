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
    let quiz = document.querySelector('#quiz');
    let multiOption = document.querySelector('.multiOption');
    
    const hideSubmitBtn = document.querySelector('.hidden');
    const previousButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");;

    // set starting question item
    let currentQuestion = 0;
    let currentAnswer= 0;
    let score = 0;
    
    //.. update question on the
    const updateQuestion = (questionIndex) => {

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

    //..
    const reviewQuestions = () => {
        // use toggle function to display list of question with their correct answers
        const reviewDom = document.createElement("div");
        reviewDom.className = "reviews"
        reviewDom.setAttribute("onclick", displayQuiz)


    }

    //..
    const displayScore = () => {
        

        const resultsContainer = document.createElement("div");
        resultsContainer.setAttribute('id', "results");

        let scoreTitle = document.createElement('h2');
        scoreTitle.setAttribute('id', 'scoretitle')
        let scoreLabel = document.createElement('label');

        scoreTitle.textContent = "Your Score";
        scoreLabel.textContent =  `${score}`;
        resultsContainer.appendChild(scoreTitle);
        resultsContainer.appendChild(scoreLabel);
        document.body.appendChild(resultsContainer);


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

   //...
   const checkOptions = event => {

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

    //....kick off function here or launcher below......
    updateQuestion(currentQuestion);

    //...
    nextButton.addEventListener("click", event => {

         //.. this check if the option has been selected
         if (!checkOptions(event)) {
            return
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
    });

    // show prev question
    previousButton.addEventListener("click",  event => {
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
         
    });

    // declaring the submit button
    const submitBtn = document.querySelector('#submit');
    submitBtn.addEventListener("click", () => {
        console.log("dry test.......");
        if(submitBtn) {
            submitBtn.remove();
            displayScore();
        }



       
   })

}
window.addEventListener('load', init_trivia);



// let selectedOption = document.querySelector('input[type=radio]:checked');
        // let answerSelected = selectedOption.value;
        // console.log("selected answer: " + answerSelected);
        // console.log('Correct answer: ' + myQuestions[currentAnswer].correctAnswer);
        // console.log("dry test.......");

        // if(myQuestions[currentQuestion].correctAnswer === answerSelected) {
        //     score++;
        // }