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
    answer: 3,
  },
];

var clock = document.querySelector(".clock");
var mainContent = document.getElementById("mainContent");
var secondsLeft = 60;
var qIndex = 0;
var cIndex = document.getElementById("choices");
var startButton = document.getElementById("startQuiz");
startButton.onclick = startQuiz;
//TODO hide startQuiz button after initial click
var cAnswer = "";
var score = 0;
var buttonId = "";
var buttonValue = "";
var cButtons = "";
var qAnswer = "";
var qnow = "";
//create event listener for line 83 compare button click to answer for that array index

// Function to create and append topScores
function gameOver() {
  clock.textContent = "";
  var mainContent = document.createElement("<h1> + Game Over </h1>");
  //TODO: game over logic
}

//function used to draw each question from the array of objects
function drawQuestion() {
  //create the question for each object
  qNow = qArray[qIndex];
  var qTitle = document.getElementById("question");
  //append question
  qTitle.textContent = qNow.question;

  cIndex.innerHTML = "";
  //for each object in the array qArray
  qNow.choices.forEach(function (choice, i) {
    //generate answser buttons
    var cButtons = document.createElement("button");
    var cAnswer = cButtons.setAttribute("class", "choice");
    // cButtons.setAttribute("value", i);
    // cButtons.setAttribute("id", i);
    cButtons.textContent = i + 1 + ".   " + choice;
    cIndex.appendChild(cButtons);
    // });
    // document.addEventListener("click", function (event) {
    //   if (event.target.matches(".choice")) {
    //     checkAnswer(event);
    //   }
    cButtons.onclick = checkAnswer;
    cIndex.appendChild(cButtons);
  });

  qIndex++;

  function checkAnswer(event) {
    //TODO set var = event.target.id and compare to qNow.answer
    if (event.target.id == qNow.answer) {
      score = score + 1;
      qIndex++;
    } else {
      secondsLeft -= 5;
      qIndex++;
    }
  }
  //TODO: draw next question

  //TODO: add point for correct answer

  //TODO: call logic to subtract time for wrong answer

  //TODO: remove/hide start quiz button
}

//Create countdown function and add it to the header h1
function setTime() {
  //TODO: insert logic to subtract time from countdown
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    clock.textContent = secondsLeft;

    if (secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      //gameOver();
    }
  }, 1000);
}

function startQuiz() {
  drawQuestion();
  setTime();
  console.log(qIndex);
  qIndex++;
}
