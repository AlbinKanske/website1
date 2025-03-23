
//change between light and dark mode

/*const Stmain = document.getElementsByTagName("main");
const Stbody = document.body;
const Stleftbar = document.getElementById("leftBar");
const SttopBar = document.getElementById("topHeader");
const modeBtn = document.getElementById("lightMode");
const icon = document.getElementById("threeLinesIcon");

let colorMode = "light";

function lightMode() {
    if (colorMode === "dark") {
        for (let i = 0; i < Stmain.length; i++) {
            Stmain[i].style.backgroundColor = "hsl(169, 100%, 91%)";
        }
        Stleftbar.style.backgroundColor = "hsl(175, 76%, 77%)";
        SttopBar.style.backgroundColor = "hsl(177, 87%, 76%)";
        Stbody.style.color = "black";
        colorMode = "light";
        modeBtn.textContent = "Light mode";
        icon.src = "pictures/3lines.svg"
    } else if (colorMode === "light") {
        for (let i = 0; i < Stmain.length; i++) {
            Stmain[i].style.backgroundColor = "hsl(0, 0%, 6%)";
        }
        Stleftbar.style.backgroundColor = "hsl(0, 0%, 12%)";
        SttopBar.style.backgroundColor = "hsl(0, 0%, 10%)";
        Stbody.style.color = "hsl(0, 0%, 100%)";
        colorMode = "dark";
        modeBtn.textContent = "Dark mode";
        icon.src = "pictures/3linesW.png"
    } else {
        console.log("Something went wrong");
    }
}*/
const body = document.body;
const header = document.getElementById("topHeader");
const leftBar = document.getElementById("leftBar");
const modeBtn = document.getElementById("lightMode");

let quizBox, idBox, qLeftBar, editQBox, qSettings, smallRightBar, gear, gear2;
let enterBtns = [];

let color = "light";

if (!localStorage.getItem('hasVisited')) {
    localStorage.setItem('hasVisited', 'true');
    localStorage.setItem('color', 'dark');
    document.body.classList.add('dark');
} else {
    let localcolor = localStorage.getItem('color');
    if (localcolor === 'dark') {
        color = "dark";
        getElements()
    } else {
        color = "light"
        getElements();
    }
}

if (!modeBtn){
    
} else {
    modeBtn.addEventListener("click", () => {
        getElements()
    });
}

function getElements(){
    try {
        quizBox = document.getElementById("questionBox");
        if (!quizBox) throw new Error("quizBox element is missing");
    } catch (error) {}
    try {

        const idBtn = document.getElementById("idBtn");
        const idPass = document.getElementById("idpass");

        if (idBtn) enterBtns.push(idBtn);
        if (idPass) enterBtns.push(idPass);

        idBox = document.getElementById("idBox");
        qLeftBar = document.getElementById("questionLeftBar");
        editQBox = document.getElementById("eQBox");
        qSettings = document.getElementById("quizSettings");
        smallRightBar = document.getElementById("smallRightBar")
        try{
            gear = document.getElementById("gear");
            gear2 = document.getElementById("gear2")
        }catch(error){}
    } catch (error){}
    darkMode();
}

function darkMode(){
    if(color === "light") {
        localStorage.setItem('color', 'light');
        classeChange("L")
        for (let i = 0; i < enterBtns.length; i++) {
            enterBtns[i].style.color = "black";
        }
        try{
            gear.style.color = "#7c8188";
            gear2.style.color = "#7c8188";
        }catch(error){}

        color = "dark"
    } else {
        localStorage.setItem('color', 'dark');
        classeChange("D")
        for (let i = 0; i < enterBtns.length; i++) {
            enterBtns[i].style.color = "white";
        }
        try{
            gear.style.color = "hsl(0, 0%, 12%)";
            gear2.style.color = "hsl(0, 0%, 12%)";
        }catch(error){}


        color = "light"
    }
}

function classeChange(color){
    let C = color;
    c(header, C, "topHeader")
    c(body, C, "back")
    c(leftBar, C, "boxes")
    try{
        c(quizBox, C, "boxes")
    }
    catch(error){}
    try{
        c(idBox, C, "boxes")
        c(qLeftBar, C, "boxes")
        c(editQBox, C, "boxes")
        c(qSettings, C, "boxes")
        c(smallRightBar, C, "boxes")
    }
    catch(error){}
}

function c(element, color, Class) {
    if(color === "L") {
        element.classList.add(`${Class}L`);
        element.classList.remove(`${Class}D`);
    } else {
        element.classList.add(`${Class}D`);
        element.classList.remove(`${Class}L`);
    }
}


//leftBar toggle

const Stleftbar = document.getElementById("leftBar");
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




