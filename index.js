const questionText = document.getElementById("question");
const answer = document.getElementById("answer");
const subBtn = document.getElementById("subBtn");
const result = document.getElementById("result");
const submitText = document.getElementById("submitText");
const questionLeft = document.getElementById("questionLeft")
const timerText = document.getElementById("timer")


let whichQuestion = 0;
let subBtnStatement = "submit";

const questions = [
    {type: "write", question: "Is a hot dog a sandwich?", answer: ["ja"]},
    {type: "write", question: "What is your go-to movie theater snack?", answer: ["popcorn"]},
    {type: "write", question: "Pizza or Tacos?", answer: ["Pizza"]},
    {type: "write", question: "What is the best movie?", answer: ["Lord of the rings", "the Lord of the rings"]},
    {type: "write", question: "What is the best game?", answer: ["Rocket league", "Minecraft", "It takes two"]}
]

let rightQuestions = 0;

function correctQuestions() {
    rightQuestions = whichQuestion + 1;
    return rightQuestions + "/" + questions.length;
}
function correct() {
    result.textContent = "Correct!";
    console.log("correct question: " + (whichQuestion + 1));
}
function incorrect() {
    if(result.textContent === "Incorrect!") {
        result.textContent += "!";
    } else {
        result.textContent = "Incorrect!"
    }
    console.log("incorrect");
}
function checkMultipleAnswers(rightAnswer) {
    for (let i = 0; i < rightAnswer.length; i++) {
        if (answer.value.trim().toUpperCase() === rightAnswer[i].toUpperCase()) {
            return true;
        }
    }
    return false;
}

function checkAnswer(rightAnswer) {
    if (questionText.textContent == questions[questions.length - 1].question && checkMultipleAnswers(rightAnswer)){
        submitText.textContent = "Reset";
        subBtnStatement = "reset";
        questionText.textContent = "You have done all questions";
        correct();
        questionLeft.textContent = correctQuestions();
    } else {
        if (checkMultipleAnswers(rightAnswer)) {
            correct();
            subBtnStatement = "next";
            submitText.textContent = "Next";
            questionLeft.textContent = correctQuestions();
        } else if (answer.value == "") {
            result.textContent = "Type your answer";
        } else { 
            incorrect();
        }
    }
}

function changeQuestion(questiontext) {
    questionText.textContent = questiontext;
}

questionText.textContent = questions[0].question;

questionLeft.textContent = "0/" + questions.length;

subBtn.onclick = function() {
    if (subBtnStatement == "submit") {
        checkAnswer(questions[whichQuestion].answer);
    } else if (subBtnStatement == "next") {
        whichQuestion++;
        answer.value = "";
        result.textContent = "";
        subBtnStatement = "submit";
        submitText.textContent = "Submit";

        if (whichQuestion < questions.length) {
            changeQuestion(questions[whichQuestion].question);
        } else {
            submitText.textContent = "Reset";
            subBtnStatement = "reset";
        }
        } else if (subBtnStatement == "reset") {
            questionText.textContent = questions[0].question;
            answer.value = "";
            result.textContent = "";
            whichQuestion = 0;
            subBtnStatement = "submit";
            submitText.textContent = "Submit";
            questionLeft.textContent = "0/" + questions.length;
    }
}
