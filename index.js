const questionText = document.getElementById("question");
const answer = document.getElementById("answer");
const subBtn = document.getElementById("subBtn");
const result = document.getElementById("result");
const submitText = document.getElementById("submitText");
const questionLeft = document.getElementById("questionLeft");

const alternatives = document.getElementsByClassName("quizalt");
const writeProps = document.getElementsByClassName("quizWrite");
//const timerText = document.getElementById("timer")


const questions = [
    {type: "alts", question: "which fruit is the best", alts: ["banana", "apple", "melon", "pear"], answer: ["apple"]},
    {type: "write", question: "Is a hot dog a sandwich?", answer: ["ja"]},
    {type: "write", question: "What is your go-to movie theater snack?", answer: ["popcorn"]},
    {type: "write", question: "Pizza or Tacos?", answer: ["Pizza"]},
    {type: "write", question: "What is the best movie?", answer: ["Lord of the rings", "the Lord of the rings"]},
    {type: "alts", question: "in which continent is paraguay in", alts: ["Africa", "Asia", "South America", "North America"], answer: ["South America"]},
    {type: "write", question: "What is the best game?", answer: ["Rocket league", "Minecraft", "It takes two"]},
]


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
        for(let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "none";
        }
        writeProps[0].style.display = "none";
        writeProps[1].style.display = "inline";
    } else {
        if (checkMultipleAnswers(rightAnswer)) {
            correct();
            questionLeft.textContent = correctQuestions();
            if(questionType() == "write"){
                subBtnStatement = "next";
                submitText.textContent = "Next";
            }
            else if(questionType() == "alts") {
                whichQuestion++;
                answer.value = "";
                result.textContent = "";
                subBtnStatement = "submit";
                submitText.textContent = "Submit";
                if (whichQuestion < questions.length) {
                    changeQuestion(questions[whichQuestion].question);
                    nextQuestion()
                }
            }
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


let whichQuestion = 0;
let subBtnStatement = "submit";
let rightQuestions = 0;
questionText.textContent = questions[0].question;
questionLeft.textContent = "0/" + questions.length;


function questionType(){
    if(questions[whichQuestion].type == "alts") {
        return "alts"
    }
    else if(questions[whichQuestion].type == "write") {
        return "write"
    }
}

Array.from(alternatives).forEach((alt, index) => {
    alt.onclick = function() {
        submitClick(index);
    }
})

subBtn.onclick = function(){
    submitClick();
}

function nextQuestion(){
    if (questionType() == "alts") {
        for(let i = 0; i < writeProps.length; i++) {
          writeProps[i].style.display = "none";
        }
        for(let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "inline";
        }
        for(let i = 0; i < questions[whichQuestion].alts.length; i++) {
            alternatives[i].textContent = questions[whichQuestion].alts[i];
        }
    } else if(questionType() == "write") {
        for(let i = 0; i < writeProps.length; i++) {
            writeProps[i].style.display = "inline";
        }
        for(let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "none";
        }
    }
}


function submitClick(alt) {
    if (questionType() == "write") {
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
                nextQuestion()
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
            nextQuestion()
        }
    } else if((questionType() == "alts")) {
        if(subBtnStatement == "submit") {
            answer.value = alternatives[alt].textContent;
            checkAnswer(questions[whichQuestion].answer)
        }   
        else if(subBtnStatement == "reset") {
            questionText.textContent = questions[0].question;
            answer.value = "";
            result.textContent = "";
            whichQuestion = 0;
            subBtnStatement = "submit";
            submitText.textContent = "Submit";
            questionLeft.textContent = "0/" + questions.length;
            nextQuestion()
        }
    }
}

 
//change between light and dark mode

const modeBtn = document.getElementById("lightMode")

const Stmain = document.getElementsByTagName("main");
const Stbody = document.body;
const Stleftbar = document.getElementById("leftBar");
const SttopBar = document.getElementById("topHeader");
const StquestionBox = document.getElementById("questionBox");
const icon = document.getElementById("threeLinesIcon");

let colorMode = "light";

function lightMode() {
    if (colorMode === "dark") {
        for (let i = 0; i < Stmain.length; i++) {
            Stmain[i].style.backgroundColor = "hsl(169, 100%, 91%)";
        }
        Stleftbar.style.backgroundColor = "hsl(175, 76%, 77%)";
        SttopBar.style.backgroundColor = "hsl(177, 87%, 76%)";
        StquestionBox.style.backgroundColor = "hsl(175, 76%, 77%)";
        Stbody.style.color = "black";
        colorMode = "light";
        modeBtn.textContent = "Dark mode";
        icon.src = "3lines.svg"
    } else if (colorMode === "light") {
        for (let i = 0; i < Stmain.length; i++) {
            Stmain[i].style.backgroundColor = "hsl(0, 0%, 6%)";
        }
        Stleftbar.style.backgroundColor = "hsl(0, 0%, 12%)";
        SttopBar.style.backgroundColor = "hsl(0, 0%, 10%)";
        StquestionBox.style.backgroundColor = "hsl(0, 0%, 15%)";
        Stbody.style.color = "hsl(0, 0%, 100%)";
        colorMode = "dark";
        modeBtn.textContent = "Light mode";
        icon.src = "3linesW.png"
    } else {
        console.log("Something went wrong");
    }
}

modeBtn.onclick = function() {
    lightMode();
}

//leftBar toggle

const leftBarTgg = document.getElementById("toggleLeftBarBtn");

leftBarTgg.addEventListener("click", toggleLeftBar)
let leftBarStatement = "visable";

function toggleLeftBar() {
    if(leftBarStatement === "visable") {
        Stleftbar.style.display = "none";
        leftBarStatement = "hidden";
    }
    else if(leftBarStatement === "hidden"){
        Stleftbar.style.display = "inline";
        leftBarStatement = "visable";
    }
}

//start the Quiz

const quizElement = document.getElementById("quiz")
const startBtn = document.getElementById("startBtn")

quizElement.style.display = "none";

startBtn.onclick = function() {
    startQuiz();
}

function startQuiz() {
    startBtn.style.display = "none";
    quizElement.style.display = "inline";
    questionType()
    nextQuestion()
}

