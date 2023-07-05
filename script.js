const questions = [
    {
        question: " _________ keyword is used to declare variables in javascript?",
        answers:[
            { text: "var", correct: true},
            { text: "dim", correct: false},
            { text: "string", correct: false},
            { text: "none", correct: false},
        ]
    },
    {
        question: "Which is not a property of attribute Behaviour of Marquee tag?",
        answers:[
            { text: "blur", correct:true},
            { text: "alternate", correct:false},
            { text: "scroll", correct:false},
            { text: "slide", correct:false},

        ]
    },
    {
        question: "Whats so great about XML?",
        answers:[
            { text: "Easy data exchange", correct:false},
            { text: "High speed on network", correct:false},
            { text: "Only B.is correct", correct:false},
            { text: "Both A & B", correct:true},

        ]
    },
    {
        question: "When a JavaScript object is sent to Java, the runtime engine creates a Java wrapper of type",
        answers:[
            { text: "ScriptObject", correct:false},
            { text: "JSObject", correct:true},
            { text: "JavaObject", correct:false},
            { text: "Jobject", correct:false},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();
