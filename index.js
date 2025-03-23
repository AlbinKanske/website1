
//start the Quiz

const quizElement = document.getElementById("quiz")
const startBtn = document.getElementById("startBtn")

const quizId = document.getElementById("quizID");
const quizIDBox = document.getElementById("quizIDBox");
const IDResult = document.getElementById("IDResult");

const quizNameText = document.getElementById("quizNameText");

quizElement.style.display = "none";

let id = 0;

let questions = ["nothing here"];

startBtn.onclick = function() {
    if(quizId.value.trim() === "") {
        IDResult.textContent = "Type in ID or the Quiz name";
        return;
    }
    if(quizId.value.trim().charAt(0) === "#") {
        id = quizId.value.trim();
        id = id.slice(1);
        id = Number(id) - 1;
        if(id <= -1) {
            IDResult.textContent = "Invalid ID";
            return;
        }
        startQuiz("id");
    } else {
        if(quizId.value.trim() === "") {
            IDResult.textContent = "Type in ID";
            return;
        }
        id = quizId.value.trim();
        startQuiz("name");
    }
}

let whichQuestion = 0;
let subBtnStatement = "submit";
let rightQuestions = 0;

function startQuiz(type) {
    quizIDBox.style.display = "none";
    startBtn.style.display = "none";
    quizElement.style.display = "inline";
    questionType()
    nextQuestion()
    questionText.textContent = questions[0].question;
    whichQuestion = 0;
    subBtnStatement = "submit";
    rightQuestions = 0;
    questionLeft.textContent = "0/" + questions.length;
    fetch("http://localhost:8085/quizzes", {
        method: "GET",
        cache: "no-cache"
    })
    .then(response => response.json())
    .then(value => {
        if(type === "id") {
            questions = value[id].quiz;
            configs(id, value);

            quizNameText.textContent = value[id].info.name;
        
            questionText.textContent = questions[0].question;
            questionLeft.textContent = "0/" + questions.length;
            nextQuestion();
            quizElement.style.display = "inline";
        } else if(type === "name") {
            for(let i = 0; i < value.length; i++) {
                if(value[i].info.name.toLowerCase() === id.toLowerCase()) {
                    questions = value[i].quiz;
                    configs(i, value);
                    
                    quizNameText.textContent = value[i].info.name;
                    questionText.textContent = questions[0].question;
                    questionLeft.textContent = "0/" + questions.length;
                    nextQuestion();
                    quizElement.style.display = "inline";
                } 
            }
        }
        
    })
    .catch(error => console.error(error));
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
function configs(index, value) {
    if(value[index].info.config.shuffAlts) { 
        for(let i = 0; i < questions.length; i++) {
            if(questions[i].type === "alts" || questions[i].alts !== undefined || "") {
                shuffleArray(questions[i].alts);
            }
        }
    }
    if(value[index].info.config.shuffOrder) {
        shuffleArray(questions);
    }
}

//the Quiz

const questionText = document.getElementById("question");
const answer = document.getElementById("answer");
const subBtn = document.getElementById("subBtn");
const result = document.getElementById("result");
const submitText = document.getElementById("submitText");
const questionLeft = document.getElementById("questionLeft");

const alternatives = document.getElementsByClassName("quizalt");
const writeProps = document.getElementsByClassName("quizWrite");

    
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
    if (whichQuestion == questions.length - 1 && checkMultipleAnswers(rightAnswer)) {
        submitText.textContent = "Reset";
        subBtnStatement = "reset";
        questionText.textContent = "You have completed all questions!";
        correct();
        questionLeft.textContent = correctQuestions();

        for (let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "none";
        }

        writeProps[0].style.display = "none";
        writeProps[1].style.display = "inline";
    } else {
        if (checkMultipleAnswers(rightAnswer)) {
            correct();
            questionLeft.textContent = correctQuestions();
            
            if (questionType() == "write") {
                subBtnStatement = "next";
                submitText.textContent = "Next";
            } else if (questionType() == "alts") {
                whichQuestion++;
                answer.value = "";
                result.textContent = "";
                subBtnStatement = "submit";
                submitText.textContent = "Submit";
                if (whichQuestion < questions.length) {
                    changeQuestion(questions[whichQuestion].question);
                    nextQuestion();
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
answer.addEventListener("keydown", (event) => {
    if(event.key === "Enter") {
        submitClick();
    }
})

function nextQuestion() {
    if (questionType() == "alts") {
        for (let i = 0; i < writeProps.length; i++) {
            writeProps[i].style.display = "none";
        }
        for (let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "inline";
        }
        for (let i = 0; i < questions[whichQuestion].alts.length; i++) {
            alternatives[i].textContent = questions[whichQuestion].alts[i];
        }
        } else if (questionType() == "write") {
        for (let i = 0; i < writeProps.length; i++) {
            writeProps[i].style.display = "inline";
        }
        for (let i = 0; i < alternatives.length; i++) {
            alternatives[i].style.display = "none";
        }
    }
}

function submitClick(alt) {
    console.log(subBtnStatement);
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
        else if (subBtnStatement == "reset") {
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
    if(subBtnStatement == "reset") {
        writeProps[1].style.display = "none";
        writeProps[2].style.display = "inline";
    }
    console.log(subBtnStatement);
}
 
//change between light and dark mode

/*const modeBtn = document.getElementById("lightMode")

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
        icon.src = "pictures/3lines.svg"
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
        icon.src = "pictures/3linesW.png"
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
}*/

