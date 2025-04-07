// Quiz questions and answers array

const questions = [

{
    question: "What is the capital of France?",
    answers: [{text: "Paris", correct: true},
{text: "London", correct: false}, {text: "Berlin", correct: false}, {text: "Madrid", correct: false}]
    

},{
    question: "What is the largest planet in our solar system?",
    answers: [{text: "Earth", correct: false},
{text: "Mars", correct: false}, {text: "Jupiter", correct: true}, {text: "Saturn", correct: false}]
    
},
{
    question: "What is the chemical symbol for gold?",
    answers: [{text: "Au", correct: true},
{text: "Ag", correct: false}, {text: "Pb", correct: false}, {text: "Fe", correct: false}]
    },
    {
    question: "What is the largest mammal in the world?",
    answers: [{text: "Elephant", correct: false},
        {text: "Blue whale", correct: true}, {text: "Giraffe", correct: false}, {text: "Hippopotamus", correct: false}]
    
    }


]

// Selecting DOM elements

const questionElements = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Initializing variables

let currentQuestionIndex = 0;
let score = 0;

// function to display the quiz

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion()
}

// function to select the answer
function resetState(){
    nextButton.style.display ="none";
    while(answerButtons.firstChild){answerButtons.removeChild(answerButtons.firstChild);}
}

// function to display the question and answers
function showQuestion(){

    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
    questionElements.innerHTML = questionNo + ". " + currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }       button.addEventListener("click", selectAnswer);
    });
}



// function to check if the answer is correct or incorrect
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

// function to show the score after the quiz is completed
function showScore(){
    resetState();
    questionElements.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

// function to handle the next button click

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else{
        showScore();
   
    }
}

// Event listener for the next button
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton()
      
}

else{startQuiz()}});

// Start the quiz when the page loads
startQuiz()