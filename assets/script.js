const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainterEl = document.getElementById('question-container');
const questionEl = document.getElementById('question');
const answerButtonsEl = document.getElementById('answer-buttons');
const finishButton = document.getElementById('finish-btn');
const timerEl = document.getElementById("timer");
const introEl = document.getElementById("start");
const saveButton = document.getElementById('save');

var totalScore;
var userInitials;
var score = 0;
var timer = 119;

let shuffledQeustions;
let currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    nextQuestion();
})

function startGame() {
    startButton.classList.add('hide');
    introEl.classList.add('hide');
    shuffledQeustions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainterEl.classList.remove('hide');
    nextQuestion();
    var countDown = setInterval(function() {
        document.getElementById("timer").innerText = timer;
        timer--;
        if (timer <=0) {
            clearInterval(countDown);
            gameOver();
        }
    }, 1000);
}

function nextQuestion() {
    resetState();
    showQuestion(shuffledQeustions[currentQuestionIndex])
}

function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsEl.appendChild(button);
    })
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
    clearStatusClass(document.body);
    Array.from(answerButtonsEl.children).forEach(button => {
        button.disabled = false;
    })
    document.getElementById('right-wrong').innerText = "";
}

function selectAnswer(e) {    
    Array.from(answerButtonsEl.children).forEach(button => {
        if (button.classList.contains('correct')) {
            button.classList.remove('correct');
        }
        if (button.classList.contains('wrong')) {
            button.classList.remove('wrong');
        }
    })
    
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    setStatusClass(selectedButton, correct);
    
    if (shuffledQeustions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide');
        Array.from(answerButtonsEl.children).forEach(button => {
            button.disabled = true;
        })
    } else {
        finishButton.classList.remove('hide');
        Array.from(answerButtonsEl.children).forEach(button => {
            button.disabled = true;
        })
        finishButton.addEventListener('click', gameOver);
    }

    if (correct) {
        var displayText = "You are Correct! 🤩"
        score++;
    } else {
        var displayText = "You are Wrong! 😭"
        timer -= 10;
    }
    
    document.getElementById("right-wrong").innerText = displayText
    
}

function setStatusClass (element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function gameOver() {
    document.getElementById('question-container').classList.add('hide');
    document.getElementById('right-wrong').classList.add('hide');
    finishButton.classList.add('hide');
    clearStatusClass(document.body);
    document.getElementById('finish-container').classList.remove('hide');
    document.getElementById('score').innerText = score;
    saveButton.addEventListener('click', highScores());
}

function highScores() {
    var initials = document.querySelector('initials').value;
    window.localStorage.setItem('initials', intials);
    window.localStorage.setItem('score', score);
    document.getElementById('finish-container').classList.add('hide');
    document.getElementById('highscores').classList.remove('hide');
    
}

const questions = [
    {
        question: 'What company developed JavaScript?',
        answers: [
           { text: 'Microsoft', correct: false },
           { text: 'Google', correct: false },
           { text: 'Sun Microsystems', correct: false },
           { text: 'Netscape', correct: true }
        ]        
    },
    {
        question: 'Which symbol is used to contain an array?',
        answers: [
           { text: '()', correct: false },
           { text: '{}', correct: false },
           { text: '[]', correct: true },
           { text: '\"\"', correct: false }
        ]        
    },
    {
        question: 'What would be the result of 3+2+\"7\"?',
        answers: [
           { text: '57', correct: true },
           { text: '12', correct: false},
           { text: '327', correct: false},
           { text: '10', correct: false}
        ]        
    },
    {
        question: 'Which of the following is not a type of popup box?',
        answers: [
           { text: 'alert', correct: false },
           { text: 'confirm', correct: false },
           { text: 'pop', correct: true },
           { text: 'prompt', correct: false }
        ]        
    },
    {
        question: 'Which of the following is not a way of declaring a variable?',
        answers: [
           { text: 'var', correct: false },
           { text: 'int', correct: true },
           { text: 'let', correct: false },
           { text: 'const', correct: false }
        ]        
    },
    {
        question: 'How do you write to the console?',
        answers: [
           { text: 'console.text', correct: false },
           { text: 'console.write', correct: false },
           { text: 'console.log', correct: true },
           { text: 'console.display', correct: false }
        ]        
    }
]