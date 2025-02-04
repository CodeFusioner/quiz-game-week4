// Write your code from here!!
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// DOM elements
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');
const questionNumberElement = document.getElementById('question-number');
const resultContainer = document.getElementById('result-container');
const finalScoreElement = document.getElementById('final-score');
const restartBtn = document.getElementById('restart-btn');

// Fetch questions from server
async function fetchQuestions() {
    try {
        const response = await fetch('/questions');
        questions = await response.json();
        displayQuestion();
    } catch (error) {
        console.error('Error fetching questions:', error);
    }
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.question;
    optionsContainer.innerHTML = '';
    questionNumberElement.textContent = currentQuestionIndex + 1;

    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(optionElement, index));
        optionsContainer.appendChild(optionElement);
    });

    submitBtn.style.display = 'block';
    nextBtn.style.display = 'none';
    selectedOption = null;
}

// Handle option selection
function selectOption(optionElement, index) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    optionElement.classList.add('selected');
    selectedOption = index;
}

// Check answer
function checkAnswer() {
    if (selectedOption === null) {
        alert('Please select an option!');
        return;
    }

    const question = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    const selectedOptionElement = options[selectedOption];
    const correctOptionIndex = question.options.indexOf(question.answer);

    if (question.options[selectedOption] === question.answer) {
        score++;
        selectedOptionElement.classList.add('correct');
        scoreElement.textContent = score;
    } else {
        selectedOptionElement.classList.add('wrong');
        options[correctOptionIndex].classList.add('correct');
    }

    submitBtn.style.display = 'none';
    nextBtn.style.display = 'block';
    options.forEach(option => option.style.pointerEvents = 'none');
}

// Move to next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResult();
    }
}

// Show final result
function showResult() {
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('controls').style.display = 'none';
    document.getElementById('score-container').style.display = 'none';
    resultContainer.style.display = 'block';
    finalScoreElement.textContent = score;
}

// Restart quiz
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = '0';
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('controls').style.display = 'flex';
    document.getElementById('score-container').style.display = 'block';
    resultContainer.style.display = 'none';
    displayQuestion();
}

// Event listeners
submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', restartQuiz);

// Initialize quiz
fetchQuestions();