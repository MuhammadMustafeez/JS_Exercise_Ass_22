var questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: false },
            { text: "HyperText Markup Language", correct: true },
            { text: "Hello Transfer Management Peshawar", correct: false },
            { text: "HyperText", correct: false }
        ]
    },
    {
        question: "What is the second name of NWFP?",
        answers: [
            { text: "Punjab", correct: false },
            { text: "Peshawar", correct: false },
            { text: "KPK", correct: true },
            { text: "Charsada", correct: false }
        ]
    },
    {
        question: "What comes after A?",
        answers: [
            { text: "Z", correct: false },
            { text: "W", correct: false },
            { text: "U", correct: false },
            { text: "B", correct: true }
        ]
    }
];

var questionElement = document.getElementById("question");
var answerButtons = document.getElementById("answer_button");
var nextButton = document.getElementById("next-btn");
var scoreCounter = document.getElementById("score");
var playAgainButton = document.getElementById("playagain_btn");

var currentQuestionIndex = 0;
var score = 0;

function quizStart() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none"; 
    playAgainButton.style.display = "none";
    scoreCounter.innerText = "Score: " + score; 
    loadQuestion();
}

function loadQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        button.onmouseover = function () { styleChange(button); };
        button.onmouseout = function () { styleDefault(button); };

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; 
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild); 
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;  
        scoreCounter.innerText = "Score: " + score;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;  
    });

    nextButton.style.display = "block"; 
}

function styleChange(e) {
    e.style.background = "black";
    e.style.color = "white";
    e.style.fontWeight = "bold";
}

function styleDefault(e) {
    e.style.background = "white";
    e.style.color = "black";
}

// Handling Next Button Click
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.innerText = "Quiz Completed! Your final score is: " + score;
        nextButton.style.display = "none"; 
        playAgainButton.style.display = "block"; 
    }
});
playAgainButton.addEventListener("click", quizStart);
quizStart();
