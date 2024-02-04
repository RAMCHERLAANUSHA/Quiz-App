const questions=[
    {
        question:"What does HTML stand for?",
        answers:[
            {text: "HyperText Markup Language",correct: true},
            {text: "HotMail",correct: false},
            {text: "How to Make Lasagna",correct: false},
            {text: "HyperlinkTool Markup Language",correct: false},
        ]
    },
    {
        question:"Choose the correct HTML element for the largest heading:",
        answers:[
            {text: "&ltheading&gt",correct: false},
            {text: "&lthead&gt",correct: false},
            {text: "&lth6&gt",correct: false},
            {text: "&lth1&gt",correct: true},
        ]
    },
    {
        question:"What is the correct HTML element for inserting a line break?",
        answers:[
            {text: "&ltbreak&gt",correct: false},
            {text: "&ltbr&gt",correct: true},
            {text: "&ltbl&gt",correct: false},
            {text: "&ltlb&gt",correct: false},
        ]
    },
    {
        question:"Which HTML element defines the title of a document?",
        answers:[
            {text: "&lthead&gt", correct: false},
            {text: "&ltmeta&gt",correct: false},
            {text: "&lttitle&gt",correct: true},
            {text: "&ltstyle&gt",correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerbutton = document.getElementById("answerbtns");
const nextbutton = document.getElementById("next-btn");

let currentQuestionindex = 0;
let score = 0;

function startQuiz(){
    currentQuestionindex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    reset();
    let currentQuestion = questions[currentQuestionindex];
    // console.log(currentQuestion)
    let questionNumber = currentQuestionindex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        // console.log(answer.text)
        button.classList.add('btn');
        answerbutton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function reset(){
    nextbutton.style.display = "none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}

function selectAnswer(e){
    const selectbtn = e.target;
    const isCorrect = selectbtn.dataset.correct === "true";
    if(isCorrect){
        selectbtn.classList.add("correct");
        score++;
    }else{
        selectbtn.classList.add("wrong");
    }
    // console.log(answerbutton.children)
    Array.from(answerbutton.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }else{
            button.classList.add("wrong");
        }
        button.disabled = true;
    });
    selectbtn.style.backgroundColor = "black";
    selectbtn.style.color = "white";
    nextbutton.style.display = "block";
}

nextbutton.addEventListener("click", ()=>{
    if(currentQuestionindex < questions.length){
        handleNextbutton();
    }
    else{
        startQuiz();
    }
})

function handleNextbutton(){
    // console.log(currentQuestionindex)
    currentQuestionindex++;
    if (currentQuestionindex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    reset();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextbutton.innerHTML = "Play Again";
    nextbutton.style.display = "block";
}
startQuiz();