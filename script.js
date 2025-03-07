
//change between light and dark mode

const Stmain = document.getElementsByTagName("main");
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
        icon.src = "3lines.svg"
    } else if (colorMode === "light") {
        for (let i = 0; i < Stmain.length; i++) {
            Stmain[i].style.backgroundColor = "hsl(0, 0%, 6%)";
        }
        Stleftbar.style.backgroundColor = "hsl(0, 0%, 12%)";
        SttopBar.style.backgroundColor = "hsl(0, 0%, 10%)";
        Stbody.style.color = "hsl(0, 0%, 100%)";
        colorMode = "dark";
        modeBtn.textContent = "Dark mode";
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




