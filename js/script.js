//Global Variables

//Buttons
var startbtn = document.querySelector('#start-btn');
var submitBtn = document.querySelector('#submit-btn');
var scoreboardBtn = document.querySelector("#scoreboard-btn");

//Time
var timer = document.querySelector('#timer');

//User input
var question = document.querySelector('#question');
var answer = document.querySelector('#userAnswers');

var userName = document.querySelector('#userName');

//User messages
var displayMessage = document.querySelector('#display-message');
var goodbyeEl = document.querySelector('#goodbye');
var questionTitle = document.querySelector('#question-title');

//Leaderboard
var leaderboardPage = document.querySelector('#leaderboard');
var leaderboardContent = document.querySelector('#userName-header');
var leaderboardScores = document.querySelector('#this-player-score');
var userScore = document.querySelector('#userScore');


var questionIndex = 0;
var time = 60;
var winner = false;

//Array to store all scores
var scoresArray = JSON.parse(localStorage.getItem('scoresArray')) || [];

//Event listeners
submitBtn.addEventListener('click', scoreStorage);
document.addEventListener('click', checkAnswers);
startbtn.addEventListener('click', startGame);
scoreboardBtn.addEventListener('click', renderLastRegisteredScore)


function startGame() {
    timerCountdown();
    question.removeAttribute('class');
    retrieveQuestion();
    startbtn.disabled = true;
}

function retrieveQuestion() {
    var currentQuestion = questions[questionIndex];
    if (questionIndex === questions.length) {
        winner = true;
    } else {
        questionTitle.textContent = currentQuestion.title;
        answer.textContent = '';
        for (var i = 0; i < currentQuestion.choice.length; i++) {
            var createBtn = document.createElement('button');
            createBtn.setAttribute('class', 'choice');
            createBtn.setAttribute('value', currentQuestion.choice[i]);
            createBtn.textContent = (i + 1) + '. ' + currentQuestion.choice[i];
            answer.appendChild(createBtn);
        }
    }
}

//Check user input
function checkAnswers(event) {
    if (event.target && event.target.classList.contains('choice')) {
        var selectedAnswersValue = event.target.value;
        var correctAnswers = questions[questionIndex].answer;
        var displayMessage = document.createElement('h3');

        if (selectedAnswersValue === correctAnswers) {
            alert = 'correct';
            questionIndex++;
            retrieveQuestion();
        } else {
            alert = 'wrong';

            questionIndex++;
            time -= 10;
            retrieveQuestion();
        }
    }
}

//Countdown
function timerCountdown() {
    var timerCountdown = setInterval(() => {
        time--;
        timer.textContent = time;
        if (time === 0) {
            clearInterval(timerCountdown);
            alert('Time is out');
        }
        if (time >= 0) {
            if (winner && time > 0) {
                clearInterval(timerCountdown);
                displayGoodbyeEl();
            }
        }
    }, 1000);
}

//Sends scores to storage
function scoreStorage(event) {
    var userInfo = {
        userName: userName.value,
        userScore: time.value,
    }
    event.preventDefault();
    localStorage.setItem("user", JSON.stringify(userInfo));
};

//Print scores on page
function renderLastRegisteredScore() {
    leaderboardContent.removeAttribute('class');
    var userName = localStorage.getItem('userName');
    var userScore = localStorage.getItem('userScore');
    var printLeaderboard = JSON.stringify(scoresArray);
    leaderboard.textContent = userName;
    leaderboard.textContent = userScore;
    leaderboard.textContent = printLeaderboard;
}

//End game screen
function displayGoodbyeEl() {
    question.setAttribute('class', 'hidden');
    goodbyeEl.removeAttribute('class');
    userScore.textContent = time;
}

submitBtn.addEventListener('click', (event) => {
    goodbyeEl.setAttribute('class', 'hidden');
    event.preventDefault();
    var newScore = {
        userName: userName.value.trim(),
        userScore: time,
    }
    scoresArray.push(newScore);
    localStorage.setItem("scoresArray", JSON.stringify(scoresArray))
});