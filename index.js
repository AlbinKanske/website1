const questionText = document.getElementById("question");
const answer = document.getElementById("answer");
const subBtn = document.getElementById("subBtn");
const result = document.getElementById("result");
const submitText = document.getElementById("submitText");
const questionLeft = document.getElementById("questionLeft")
const timerText = document.getElementById("timer")


let whichQuestion = 0;
let subBtnStatement = "submit";

const rightAnswers = ["ja", "popcorn", "Pizza"]
const questions = ["Is a hot dog a sandwich?",
                    "What is your go-to movie theater snack?",
                    "Pizza or Tacos?"] 


if (rightAnswers.length !== questions.length) {
    console.error("something went wrong. not same amount of questions as Answers");
}

let rightQuestions = 0;

function correctQuestions() {
    rightQuestions = whichQuestion + 1;
    return rightQuestions + "/" + questions.length;
}

function checkAnswer(rightAnswer) {
    if (questionText.textContent == questions.slice(-1) && answer.value.trim().toUpperCase() == rightAnswer.toUpperCase()) {
        submitText.textContent = "Reset";
        subBtnStatement = "reset";
        questionText.textContent = "You have done all questions";
        result.textContent = "Correct!";
        console.log("correct")
        questionLeft.textContent = correctQuestions();
    } else {
        if (answer.value.trim().toUpperCase() == rightAnswer.toUpperCase()) {
            result.textContent = "Correct!";
            console.log("correct")
            subBtnStatement = "next";
            submitText.textContent = "Next";
            questionLeft.textContent = correctQuestions();
        } else if (answer.value == "") {
            result.textContent = "Type your answer";
            console.log("no answer")
        } else { 
            result.textContent = "Incorrect!";
            console.log("incorrect")
        }
    }
}

function changeQuestion(questiontext) {
    questionText.textContent = questiontext;
}

questionText.textContent = questions[0];

questionLeft.textContent = "0/" + questions.length;

subBtn.onclick = function() {
    if (subBtnStatement == "submit") {
        checkAnswer(rightAnswers[whichQuestion]);
    } else if (subBtnStatement == "next") {
        whichQuestion++;
        answer.value = "";
        result.textContent = "";
        subBtnStatement = "submit";
        submitText.textContent = "Submit";

        if (whichQuestion < questions.length) {
            changeQuestion(questions[whichQuestion]);
        } else {
            submitText.textContent = "Reset";
            subBtnStatement = "reset";
        }
        } else if (subBtnStatement == "reset") {
            questionText.textContent = questions[0];
            answer.value = "";
            result.textContent = "";
            whichQuestion = 0;
            subBtnStatement = "submit";
            submitText.textContent = "Submit";
            questionLeft.textContent = "0/" + questions.length;
    }
}
