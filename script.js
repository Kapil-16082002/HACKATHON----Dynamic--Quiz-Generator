// Define the question bank
const questionBank = {
    "topic1": {
        "Beginner": [
            {"question": "What is the capital of France?", "answer": "Paris"},
            {"question": "Who wrote 'Romeo and Juliet'?", "answer": "William Shakespeare"},
            {"question": " your name is KAPIL'?", "answer": "William Shakespeare"},
            {"question": "What is your father name?", "answer": "Mars"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}

        ],
        "Intermediate": [
            {"question": "What is the powerhouse of the cell?", "answer": "Mitochondria"},
            {"question": "what is your name?", "answer": "Mars"},
            {"question": "What is your father name?", "answer": "Mars"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
        "Advanced": [
            {"question": "What is the chemical symbol for gold?", "answer": "Au"},
            {"question": "Who proposed the theory of relativity?", "answer": "Albert Einstein"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
            
        ],
    },
    "topic2": {
        "Beginner": [
            {"question": "What is the capital of INDIA ?", "answer": "NEW DELHI"},
            {"question": "Who wrote 'Romeo and Juliet'?", "answer": "William Shakespeare"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
        "Intermediate": [
            {"question": "What is the powerhouse of the cell?", "answer": "Mitochondria"},
            {"question": "Which planet is known as the Red Planet?", "answer": "Mars"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
        "Advanced": [
            {"question": "What is the chemical symbol for gold?", "answer": "Au"},
            {"question": "Who proposed the theory of relativity?", "answer": "Albert Einstein"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
    },
    "topic3": {
        "Beginner": [
            {"question": "What is the capital of INDIA ?", "answer": "NEW DELHI"},
            {"question": "Who wrote 'Romeo and Juliet'?", "answer": "William Shakespeare"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}

        ],
        "Intermediate": [
            {"question": "What is the powerhouse of the cell?", "answer": "Mitochondria"},
            {"question": "Which planet is known as the Red Planet?", "answer": "Mars"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
        "Advanced": [
            {"question": "What is the chemical symbol for gold?", "answer": "Au"},
            {"question": "Who proposed the theory of relativity?", "answer": "Albert Einstein"},
            {"question": "What is mother name?", "answer": "Mars"},
            {"question": "What is your name'?", "answer": "William Shakespeare"},
            {"question": "who is your counseller'?", "answer": "William Shakespeare"}
        ],
    }
};

let quizQuestions = [];
let currentQuestion = 0;
let score = 0;

function generateQuiz() {
    const topicsSelect = document.getElementById('topics');
    const difficultySelect = document.getElementById('difficulty');
    const numQuestionsInput = document.getElementById('numQuestions');

    const selectedTopics = Array.from(topicsSelect.selectedOptions).map(option => option.value);
    const selectedDifficulty = difficultySelect.value;
    const numQuestions = parseInt(numQuestionsInput.value);

    // Clear previous quiz questions
    quizQuestions = [];
    currentQuestion = 0;
    score = 0;

    // Generate quiz questions
    for (let i = 0; i < numQuestions; i++) {
        for (const topic of selectedTopics) {
            if (topic in questionBank && selectedDifficulty in questionBank[topic]) {
                const randomQuestion = getRandomQuestion(questionBank[topic][selectedDifficulty]);
                quizQuestions.push(randomQuestion);
            }
        }
    }

    displayQuestion();
    document.getElementById('quizContainer').style.display = 'block';
}

function displayQuestion() {
    const questionContainer = document.getElementById('questionContainer');
    questionContainer.innerHTML = '';

    if (currentQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuestion];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.innerHTML = `
            <p>${question.question}</p>
            <input type="text" id="answerInput">
            <button onclick="checkAnswer()">Submit Answer</button>
        `;
        questionContainer.appendChild(questionDiv);
    } 
    else {
        showResults();
    }
}

function checkAnswer() {
    const userAnswer = document.getElementById('answerInput').value.trim().toLowerCase();
    const correctAnswer = quizQuestions[currentQuestion].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        score++;
    }

    currentQuestion++;
    displayQuestion();
}

function showResults() {
    const quizContainer = document.getElementById('quizContainer');
    const resultContainer = document.getElementById('resultContainer');
    const scoreElement = document.getElementById('score');
    const feedbackElement = document.getElementById('feedback');

    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    scoreElement.textContent = `Your Score: ${score} out of ${quizQuestions.length}`;

    let feedback = '';
    if (score === quizQuestions.length) {
        feedback = 'Congratulations! You got all the questions correct!';
    } else if (score > quizQuestions.length / 2) {
        feedback = 'Good job! You did well.';
    } else {
        feedback = 'You can do better. Keep practicing!';
    }

    feedbackElement.textContent = feedback;
}

function getRandomQuestion(questions) {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
}
