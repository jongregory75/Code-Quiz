//build array of question objects
var qArray = [
  {
    // totalAnswers
    question: "How many tablespoons are in a cup?",
    choices: ["4", "8", "12", "16"],
    answer: 3,
  },
  {
    question: "How many ounces are in a pound?",
    choices: ["4", "8", "12", "16"],
    answer: 3,
  },
  {
    question: "What temperature does water boil in Denver, CO?",
    choices: ["212", "202", "190", "220"],
    answer: 1,
  },
  {
    question:
      "How much time in the oven does a nicely done steak tartare require?",
    choices: ["0 minutes", "2 minutes", "5 minutes", "3 minutes"],
    answer: 0,
  },
  {
    question: "What is a dried and smoked jalapeno called?",
    choices: ["Fresno", "Serano", "Ancho", "Chipotle"],
    answer: 3,
  },
  {
    question: "On what day does the U.S. consume the most amount of avocados?",
    choices: [
      "Superbowl Sunday",
      "Cinco De Mayo",
      "Independance Day",
      "Labor Day",
    ],
    answer: 0,
  },
  {
    question: "What kind of bean will kill you when eaten raw?",
    choices: ["Kidney Beans", "Lima Beans", "Soybean", "Navy Bean"],
    answer: 1,
  },
  {
    question: "Humans share 60% of their DNA with this postal fruit?",
    choices: ["Apples", "Cranberries", "Bananas", "Pears"],
    answer: 2,
  },
];

var startButton = document.getElementById("startQuiz");
startButton.onclick = startQuiz;
var event = "";
var clock = document.querySelector(".clock");
var mainContent = document.getElementById("mainContent");
var secondsLeft = 30;
var qIndex = 0;
var cIndex = document.getElementById("choices");
var cAnswer = "";
var score = 0;
var showScore = document.querySelector(".showScore");
var cButtons = "";
var qAnswer = "";
var qnow = "";

//function used to draw each question from the array of objects
function drawQuestion() {
  //create the question for each object
  qNow = qArray[qIndex];
  var qTitle = document.getElementById("question");
  //append question
  qTitle.textContent = qNow.question;

  cIndex.innerHTML = "";
  //for each object in the qArray
  qNow.choices.forEach(function (choice, i) {
    //generate answer buttons, assigns class name and ids to each button
    var cButtons = document.createElement("button");
    var cAnswer = cButtons.setAttribute("class", "choice");
    cButtons.textContent = i + 1 + ".   " + choice;
    cButtons.setAttribute("id", i);
    cIndex.appendChild(cButtons);
    //event listener for cButtons, passes event object to checkAnswer
    cButtons.onclick = checkAnswer;
  });

  function checkAnswer(event) {
    // event.target.id and compare to qNow.answer
    // logic for score and time counters, draws next question in array
    if (event.target.id == qNow.answer) {
      console.log("truthy ---> Correct Answer");
      console.log("Score inside Corrent Answer: " + score);
      console.log("Event ID: " + this.id);
      score = score + 1;
      showScore.textContent = score;
      qIndex++;

      if (secondsLeft <= 0 || qIndex == 8) {
        clock.style.display = "none";
        gameOver();
      }
      //TODO: clear screen to GAME OVER content
      drawQuestion();
      //TODO: high score logic/local storage/persist
    } else {
      secondsLeft -= 5;
      qIndex++;

      if (secondsLeft <= 0 || qIndex == 8) {
        clock.style.display = "none";
        gameOver();
      }
      drawQuestion();
    }
  }
}

function setTime() {
  // timer logic and assignment to secondsLeft
  var timerInterval = setInterval(function () {
    secondsLeft--;
    clock.textContent = secondsLeft;

    if (secondsLeft == 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      //gameOver();
    }
  }, 1000);
}

//game over function logic
function gameOver() {
  //grab mainContent section and hide it
  document
    .getElementById("mainContent")
    .setAttribute("style", "display: none;");

  //make highscore section visible and iterate localstorage and render scores
  document.getElementById("gameOver").setAttribute("style", "display: flex;");

  scoreList = localStorage.setItem(highScore, score);

  function buildScores() {
    for (var i = 0; i < scoreList; i++) {
      var liEl = document.createElement("li");
      liEl.textContent =
        document.getElementById("name").value + "   " + scoreList;
    }
  }
}

//Controller function
function startQuiz() {
  drawQuestion();
  setTime();
  startButton.style.display = "none";
}
