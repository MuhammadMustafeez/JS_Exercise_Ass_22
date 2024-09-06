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

var currentQuestionIndex = 0;
var score = 0;

function quizStart() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none"; // Hide the Next button initially
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

        // Add event listeners for hover effects
        button.onmouseover = function () { styleChange(button); };
        button.onmouseout = function () { styleDefault(button); };

        // Set the correct answer data attribute
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        // Add click event listener
        button.addEventListener("click", selectAnswer);

        // Append button to the answer container
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none"; // Hide the Next button
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    console.log(`Button clicked: ${selectedBtn.innerHTML}. Correct: ${isCorrect}`); // Debugging

    if (isCorrect) {
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
           button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display="block";
}

// Functions to handle hover effects
function styleChange(e) {
    e.style.background = "black";
    e.style.color = "white";
    e.style.fontWeight = "bold";
}

function styleDefault(e) {
    e.style.background = "white";
    e.style.color = "black";
}

function nextStyle(e) {
    e.style.background = "#1230AE";
    e.style.color = "white";
    e.style.fontWeight = "600";
}

function nextStyleDefault(e) {
    e.style.background = "#273adc";
    e.style.color = "white";
}

// Initialize the quiz
quizStart();
