var startScreen = document.querySelector(".startScreen");
var startButton = document.querySelector("#startButton");
var quizScreen = document.querySelector(".quizScreen");
var questionText = document.querySelector("#questionText");
var container = document.querySelector(".container");
var hpTitle = document.querySelector("#hpTitle");
var buttons = document.querySelector(".buttons");
var timerEl = document.querySelector("#count");
var message = document.querySelector("#message");
var scoreBoard = document.querySelector("#table");
var endScreen = document.querySelector(".endScreen");
var submit = document.querySelector("#button-addon1");

var answerArrofObj = [
  {
    question: "What are Durin's folk more commonly known as?",
    answerArr: ["Hobitts from outside of the Shire", "Dwarves", "Forest ELves", "Great Eagles"],
    answer: "Dwarves"
  },
  {
    question: " The girls all think I'm lovely, My locks are bright and blonde, And up until quite recently, Of Dwarves I was not fond. Who am I?",
    answerArr: ["Legolas", "Gollum", "Gandalf", "Aragorn"],
    answer: "Legolas"
  },
  {
    question: " A flock of black birds, spies of Saruman, fly over the Fellowship. What sort of birds are they?",
    answerArr: ["Dunhawks", "Crebain", "Rooks", "Ravens"],
    answer: "Crebain"
  },
  {
    question: "What sort of insect does Gandalf send for help when he is being held prisoner by Saruman?",
    answerArr: ["A bowfly", "A dragonfly", " A moth", "A butterfly"],
    answer: " A moth"
  },
  {
    question: "What sort of animals sometimes tickle Treebeard?",
    answerArr: ["Field mice", "Rabbits", "Worms", "Blue birds"],
    answer: "Field mice"
  },
  {
    question: "What are the wolf-like animals that attack Theoden and his people called?",
    answerArr: ["Wendans", "Wargs", "Wadkons", "Wilgons"],
    answer: "Wargs"
  },
  {
    question: "What are the enormous animals that Frodo, Sam, and Gollum see in The Two Towers called?",
    answerArr: ["Elephantuses", "Argaphants", "Oliphaunts", "Gigantagons"],
    answer: "Oliphaunts"
  },
  {
    question: "In Mordor, what kind of food does Frodo say he can't remember the taste of?",
    answerArr: ["Cheese", "Mushrooms", "Strawberries", "Bacon"],
    answer: "Strawberries"
  },
  {
    question: "Who became King of Rohan after Theoden met his demise in battle?",
    answerArr: ["Eomer", "Eowyn", "Eorl", "Grima"],
    answer: "Eomer"
  },
  {
    question: "Of the following foods, which are hobbits most passionate about?",
    answerArr: ["Mushrooms", "Strawberries", "Wine", "Pastries"],
    answer: "Mushrooms"
  },
  {
    question: "How many wizards are there in Middle Earth?",
    answerArr: ["Three", "Four", "Five", "Six"],
    answer: "Five"
  },
  {
    question: "What is the name of the volcano that the Ring is thrown into?",
    answerArr: ["Osgiliath", "Cirith Ungal", "Minas Tirnith", "Barad Dur"],
    answer: "Barad Dur"
  },
]


//start button

document.getElementById("startButton").onclick = function (quiz) {
  setCounter();
  renderQuiz();
}


//timer
var timeLeft = 0;
var ended = false;
function setCounter() {
  timeLeft = (answerArrofObj.length * 10);
  if (event.target.matches("button")) {
    startScreen.setAttribute("style", "display: none !important");
    quizScreen.setAttribute("style", "display: block !important");
  }

  var timeInterval = setInterval(function () {
    timerEl.textContent = "time left: " + timeLeft;
    timeLeft--;

    if (ended == true) {
      clearInterval(timeInterval);
    }

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      timerEl.textContent = "Time's up!";
      showResults();
    }

    // if there is 10 seconds left on the clock the timer will turn red and the font size increases.
    if (timeLeft <= 10) {
      timerEl.setAttribute("style", "color:red; font-size:30px;")
    }

  }, 1000);
}

// These variables help code cycle through each question
var questionCounter = 0;
var lastQ = answerArrofObj.length - 1;

function renderQuiz() {
  if (questionCounter <= lastQ) {

    // Displays the current question and displays answers on the buttons
    var currentQ = answerArrofObj[questionCounter].question;
    questionText.textContent = currentQ;

    var btn1 = document.getElementById("btn0");
    var btn2 = document.getElementById("btn1");
    var btn3 = document.getElementById("btn2");
    var btn4 = document.getElementById("btn3");

    btn1.textContent = answerArrofObj[questionCounter].answerArr[0];
    btn2.textContent = answerArrofObj[questionCounter].answerArr[1];
    btn3.textContent = answerArrofObj[questionCounter].answerArr[2];
    btn4.textContent = answerArrofObj[questionCounter].answerArr[3];
  }

  //This is a function to keep the user on the page for a second, allowing them to see if they answered wrong or right.
  else {
    ended = true;
    setTimeout(() => {
      showResults();
    }, 1000);
      
  }
}

// When user clicks button, function checks if the answer is right or wrong. And then preceeds to next question
buttons.addEventListener("click", function (event) {
  if (event.target.textContent === answerArrofObj[questionCounter].answer) {
    message.setAttribute("style", "color: green; font-size:20px;")
    message.textContent = "Correct!";
  }
  else {
    // If the user answers wrong, this code checks to see if there is at least 10 seconds left.
    // If there is over 10 seconds left, 10 seconds are deducted from timer. If there is less, the quiz ends
    if (timeLeft > 11) {
      timeLeft = timeLeft - 10;
      message.setAttribute("style", "color: red; font-size:28px;")
      message.textContent = "Wrong!";
    }
    else {
      ended = true;
      message.textContent = "You got the answer wrong with less than 10 seconds remaining, sorry, time's up!"
      timeLeft=0
      showResults();
    }
  }

  questionCounter++;
  renderQuiz();
})

// function hides quiz questions and choices making the initials text field appear
function showResults() {
  quizScreen.setAttribute("style", "display: none !important");
  endScreen.setAttribute("style", "display: block !important");
  var viewScore = document.getElementById("viewScore")
  endTitle.textContent = "Fin!";
  viewScore.textContent = "Your score is: " + timeLeft +  ". Enter your initials below to save your score!";
}

submit.addEventListener("click", function (event) {

  var initials = document.getElementById("initials");
  var i = initials.value.trim();
  var highScores = JSON.parse(localStorage.getItem("highScores")) || []
  var newScore = {initials: i, score: timeLeft}
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores))
  window.location.href = "high-scores.html";
})