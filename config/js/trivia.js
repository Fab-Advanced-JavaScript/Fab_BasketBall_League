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
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
          },
          correctAnswer: "c"
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
    let multiOption = document.querySelector('.multiOption')
    
    const resultsContainer = document.querySelector('#results');
    // event handler
    const submitBtn = document.querySelector('#submit');
    // Pagination
    const previousButton = document.querySelector("#prev");
    const nextButton = document.querySelector("#next");;

    // set starting question item
    let currentQuestion = 0;
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
                let label = document.createElement('label');
                let input = document.createElement('input');
                input.type = 'radio';
                input.name = 'answers'
                input.value = `${indexItems + 1}`;
                label.textContent = `${items[1]}`;
                multiOption.appendChild(input);
                multiOption.appendChild(label);

            });
    }

    updateQuestion(currentQuestion);

    //...
    nextButton.addEventListener("click", event => {

        let selectedOption = document.querySelector('input[type=radio]:checked');

        if (!checkOptions(event)) {
            return
        } 

        quiz.innerHTML = "";
        multiOption.innerHTML= "";
        currentQuestion++;

        if (currentQuestion > myQuestions.length - 1) {
            currentQuestion = 0;
        }

        let answerSelected = selectedOption.value;
        if(myQuestions[currentQuestion].correctAnswer == answerSelected) {
            score++;
        }
        // selectedOption.checked = false;
        
        // if(currentQuestion == myQuestions.length - 1) {
        //     nextButton.textContent = "Finish";
        // }

        // if(currentQuestion == myQuestions.length) {
        //     quizContainer.style.display = "none";
        //     resultsContainer.style.display = "";
        //     resultsContainer.textContent = "your Score is:" + score;
        //     return
        // }
           
        updateQuestion(currentQuestion)
    });

    // show prev question
    previousButton.addEventListener("click",  event => {

        if (!checkOptions(event)) {
            return
        } 
        
        quiz.innerHTML = "";
        multiOption.innerHTML= "";
        currentQuestion--;

         if (currentQuestion < 0) {
             currentQuestion = myQuestions.length - 1;
         }
         updateQuestion(currentQuestion);
   });

   //...
   checkOptions = event => {

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

}
window.addEventListener('load', init_trivia);