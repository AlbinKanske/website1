const question = document.getElementById("eQQuestionText");
const correctAlts = document.querySelectorAll(".checkBtn");
const alts = document.getElementsByClassName("eQAltText");
const correctWrite = document.getElementById("eQAnswer");
const questionTypesText = document.getElementById("button");
const questionTypes = document.querySelectorAll(".dropDownChoices");
const alternativesBox = document.getElementById("eQAltsBox");
const writeBox = document.getElementById("eQWrite");

const saveBtn = document.getElementById("saveBtn");
const delBtn = document.getElementById("delBtn");

const quizPassword = document.getElementById("quizPassword");
const quizName = document.getElementById("quizName");

const shuffleAlt = document.getElementById("shuffAltsBtn");
const shuffleOrder = document.getElementById("shuffOrderBtn");

const saveQuizBtn = document.getElementById("saveQuizBtn");

const quizId = document.getElementById("quizId");

let currentQuiz = [];
let currentQuizInfo = {};

const plusBtn = document.getElementById("plusBtn");
const btnTemplate = document.getElementById("btnTemplate");
const qBtns = document.getElementById("qBtns");

let ready = false;
let currentIndex = 0;

const addQuiz = document.getElementById("createQuizBtn");

const enterQuiz = document.getElementById("idBtn");
const idText = document.getElementById("idText");

const main0 = document.getElementsByTagName("main")[0];
const main1 = document.getElementsByTagName("main")[1];


const idPassword = document.getElementById("idPassword");
const idPassVis = document.getElementById("idPassVis");

let id = 0;

addQuiz.addEventListener("click", () => {

  const newQuiz = [
    {type: "write", question:"", answer:[""], alts: [""]}
  ];
  const newQuizInfo = {
      name: "New quiz",
      password: "",
      config: {
          shuffAlts: true,
          shuffOrder: false
      }
  };

  const quizData = { quiz: newQuiz, info: newQuizInfo };

  fetch('quiz-server-node-js.vercel.app/save-quiz', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('New quiz added:', data);
      const quizIndex = data.quizIndex;

      console.log(quizIndex)
      id = quizIndex;
      getQuiz(quizIndex, "id");

  })
  .catch(error => {
      console.error('Error:', error);
  });
});

function checkId() {
  if(idText.value.trim().charAt(0) === "#"){
    id = Number(idText.value.slice(1)) - 1;
    if (isNaN(id) || id <= -1) {
      console.error("not valid ID");
      alert("Enter a valid ID");
      return;
    }
    getQuiz(id, "id");
  }
  else {
    if(idText.value.trim() === "") {
      alert("Enter in an ID or Quiz name");
      return;
    }
    getQuiz(id, "name");
  }
  
}

enterQuiz.addEventListener("click", () => {
  checkId();
})

idText.addEventListener("keydown", event => {
  if (event.key === "Enter") {
    checkId();
  }
});

function getQuiz(which, type) {
  currentQuiz = fetch("quiz-server-node-js.vercel.app/quizzes", 
    { method: "GET", cache: "no-cache" })
      .then(response => response.json())
      .then(value => {

          if (type === "id") {
            currentQuiz = value[which].quiz;
            currentQuizInfo = value[which].info;
          }
          else if (type === "name") {
            for(let i = 0; i < value.length; i++) {
              if (value[i].info.name.trim().toLowerCase() === idText.value.trim().toLowerCase()) {
                id = i;
                currentQuiz = value[i].quiz;
                currentQuizInfo = value[i].info;
                break;
              }
            }
          }
          if(currentQuizInfo.password.trim() !== "") {
            const passBox = document.getElementById("passBox");
            passBox.style.display = "inline";
            
            const result = document.getElementById("idPassResult");
            const idpass = document.getElementById("idpass");
            console.log(idPassword.value);
            idpass.addEventListener("click", () => {
              const password = document.getElementById("idPassword");
              if(password.value !== currentQuizInfo.password) {
                result.textContent = "Incorrect password";
                return;
              } else {
                spawnQuiz(id)
              }
            });
          } else{
            spawnQuiz(id)
          }
      })
      .catch(error => console.error(error));
}

function spawnQuiz(which) {
  quizName.value = currentQuizInfo.name;
  quizPassword.value = currentQuizInfo.password;
  quizId.textContent = `Quiz Id: #${which + 1}`;
  shuffleAlt.textContent = currentQuizInfo.config.shuffAlts ? "X" : "‎";
  shuffleOrder.textContent = currentQuizInfo.config.shuffOrder ? "X" : "‎";

  for (let i = 0; i < currentQuiz.length; i++) {
  plusBtn.click();
  }
  ready = true;

  main1.style.display = "grid";
  main0.style.display = "none";
}

plusBtn.addEventListener("click", () => {
  const newBtn = btnTemplate.content.cloneNode(true);
  const btn = newBtn.querySelector(".Btns");
  const newCount = qBtns.children.length + 1;
  btn.textContent = newCount;
  newBtn.querySelector("button").classList.remove("hidden");
  qBtns.appendChild(newBtn);

  if (qBtns.children.length == 1) {
    btn.classList.add("active");
    changequestion(0);
  }

  btn.addEventListener("click", event => {
    for (let child of qBtns.children) {
      child.classList.remove("active");
    }

    event.target.classList.add("active");
    const btnIndex = Array.from(qBtns.children).indexOf(event.target);

    if (btnIndex >= 0 && btnIndex < currentQuiz.length) {
      currentIndex = btnIndex;
      changequestion(btnIndex);
    }
  });
  if (ready) {
    let lastType = (currentQuiz.length - 1);
    currentQuiz.push({
      type: currentQuiz[lastType].type,
      question: "",
      answer: [""],
      alts: [""]
    });
  }
});

function changequestion(index) {
    
    if (index >= 0 && index < currentQuiz.length) {
    currentIndex = index;
    question.value = currentQuiz[index].question;
    correctWrite.value = currentQuiz[index].answer[0];
    questionTypesText.textContent = currentQuiz[index].type === "alts" ? "Alternatives" : "Write";
    
    if (currentQuiz[index].type === "alts") {
      alternativesBox.style.display = "flex";
      writeBox.style.display = "none";

      for (let i = 0; i < alts.length; i++) {
        alts[i].value = currentQuiz[index].alts[i] || "";
        correctAlts[i].textContent = currentQuiz[index].answer.includes(alts[i].value) ? "X": "‎";
      }
    } else if (currentQuiz[index].type === "write") {
      alternativesBox.style.display = "none";
      writeBox.style.display = "flex";
    }
  }
}

function save(save) {
  if (currentIndex >= 0 && currentIndex < currentQuiz.length) {
    currentQuiz[currentIndex].question = question.value;
    currentQuiz[currentIndex].answer[0] = correctWrite.value;

    if (currentQuiz[currentIndex].type === "alts") {
        currentQuiz[currentIndex].alts = Array.from(alts).map(alt => alt.value);
        currentQuiz[currentIndex].answer = []; 
  
        for (let i = 0; i < 4; i++) {
            if (correctAlts[i].textContent === "X") {
                currentQuiz[currentIndex].answer.push(alts[i].value);
            }
        }
    }
  
    console.log(save, currentQuiz[currentIndex]);
    }
}

saveBtn.addEventListener("click", () => {
  save("button saved:");
});

function delQuistion() {
  if (currentQuiz.length <= 1) {
    console.error("cant delete last question")
    return;
  }
  
  if (currentIndex >= 0 && currentIndex < currentQuiz.length) {
    currentQuiz.splice(currentIndex, 1);
    console.log("Updated quiz:", currentQuiz);
    
    const buttonToRemove = qBtns.children[currentIndex];
    qBtns.removeChild(buttonToRemove);
    
    Array.from(qBtns.children).forEach((button, index) => {
      button.textContent = index + 1;
    });

    if (currentQuiz.length > 0) {
      if (currentIndex >= currentQuiz.length) {
        currentIndex = currentQuiz.length - 1;
      }
      const newActiveButton = qBtns.children[currentIndex];
      newActiveButton.classList.add("active");
      
      changequestion(currentIndex);
    } else {
      question.value = "";
      correctWrite.value = "";
      questionTypesText.textContent = "";
      alternativesBox.style.display = "none";
      writeBox.style.display = "none";
    }
  }
}

delBtn.addEventListener("click", () => {
  let e = window.confirm("Are you sure you want to delete this question?");
  if(e) {
    delQuistion();
  }
})
correctAlts.forEach(correctAlt => {
  correctAlt.addEventListener("click", event => {
    if (event.target.textContent !== "X") {
        event.target.textContent = "X";
    }else{
        event.target.textContent = "‎";
    }
  });
});

questionTypes.forEach(questionType => {
  questionType.addEventListener("click", event => {
    questionTypesText.textContent = event.target.textContent;

    if (questionTypesText.textContent === "Alternatives") {
      alternativesBox.style.display = "flex";
      writeBox.style.display = "none";
      currentQuiz[currentIndex].type = "alts";
    } else {
      alternativesBox.style.display = "none";
      writeBox.style.display = "flex";
      currentQuiz[currentIndex].type = "write";
    }
    changequestion(currentIndex);
  });
});

//settings

function saveQuiz() {
  save("Saved current Question:");
  currentQuizInfo.name = quizName.value;
  currentQuizInfo.password = quizPassword.value;

  if (shuffleAlt.textContent === "X") {
      currentQuizInfo.config.shuffAlts = true;
  } else {
      currentQuizInfo.config.shuffAlts = false;
  }

  if (shuffleOrder.textContent === "X") {
      currentQuizInfo.config.shuffOrder = true;
  } else {
      currentQuizInfo.config.shuffOrder = false;
  }

  console.log("settings saved:", currentQuizInfo);

  const quizData = { quiz: currentQuiz, info: currentQuizInfo, id: id };

  fetch('quiz-server-node-js.vercel.app/save-quiz', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(quizData)
  })
  .then(response => response.json())
  .then(data => {
      console.log('Success:', data);
  })
  .catch(error => {
      console.error('Error:', error);
  });
}


saveQuizBtn.addEventListener("click", () => {
  saveQuiz();
})

shuffleAlt.addEventListener("click", () => {checkX(shuffleAlt)})
shuffleOrder.addEventListener("click", () => {checkX(shuffleOrder)})

function checkX(checkbox){
  if(checkbox.textContent !== "X"){
    checkbox.textContent = "X";
  } else {
    checkbox.textContent = "‎";
  }
}

//right bar toggle

const rightBarBtn = document.getElementsByClassName("toggleRightBtn")[0];
const smallRightBarBtn = document.getElementsByClassName("toggleRightBtn")[1];

const rightBar = document.getElementById("quizSettings");

rightBarBtn.addEventListener("click", () => {
    rightBar.style.display = "none";
})
smallRightBarBtn.addEventListener("click", () => {
    rightBar.style.display = "block";
})

//password visibility 

const visBtn = document.getElementById("quizPasswordVisibility");

visBtn.addEventListener("click", () => {
    if (quizPassword.type === "password") {
        quizPassword.type = "text";
      } else {
        quizPassword.type = "password";
      }
})

idPassVis.addEventListener("click", () => {
  if (idPassword.type === "password") {
      idPassword.type = "text";
    } else {
      idPassword.type = "password";
    }
})
