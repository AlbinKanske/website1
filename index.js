const questionText = document.getElementById("question");
const answer = document.getElementById("answer");
const subBtn = document.getElementById("subBtn");
const result = document.getElementById("result");
const submitText = document.getElementById("submitText");
const questionLeft = document.getElementById("questionLeft")
const timerText = document.getElementById("timer")


let whichQuestion = 0;
let subBtnStatement = "submit";

const Questions = [
    {type: "write", question: "Is a hot dog a sandwich?", answer: "ja"},
    {type: "write", question: "What is your go-to movie theater snack?", answer: "popcorn"},
    {type: "write", question: "Pizza or Tacos?", answer: "Pizza"},
    {type: "write", question: "What is the best movie?", answer: "Lord of the rings"}
]

let rightQuestions = 0;

function correctQuestions() {
    rightQuestions = whichQuestion + 1;
    return rightQuestions + "/" + Questions.length;
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

function checkAnswer(rightAnswer) {
    if (questionText.textContent == Questions[Questions.length - 1].question && answer.value.trim().toUpperCase() == rightAnswer.toUpperCase()) {
        submitText.textContent = "Reset";
        subBtnStatement = "reset";
        questionText.textContent = "You have done all questions";
        correct();
        questionLeft.textContent = correctQuestions();
    } else {
        if (answer.value.trim().toUpperCase() == rightAnswer.toUpperCase()) {
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

questionText.textContent = Questions[0].question;

questionLeft.textContent = "0/" + Questions.length;

subBtn.onclick = function() {
    if (subBtnStatement == "submit") {
        checkAnswer(Questions[whichQuestion].answer);
    } else if (subBtnStatement == "next") {
        whichQuestion++;
        answer.value = "";
        result.textContent = "";
        subBtnStatement = "submit";
        submitText.textContent = "Submit";

        if (whichQuestion < Questions.length) {
            changeQuestion(Questions[whichQuestion].question);
        } else {
            submitText.textContent = "Reset";
            subBtnStatement = "reset";
        }
        } else if (subBtnStatement == "reset") {
            questionText.textContent = Questions[0].question;
            answer.value = "";
            result.textContent = "";
            whichQuestion = 0;
            subBtnStatement = "submit";
            submitText.textContent = "Submit";
            questionLeft.textContent = "0/" + Questions.length;
    }
}
