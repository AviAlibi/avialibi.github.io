document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.querySelector('button');
    const difficultySelect = document.getElementById('difficulty');
    const categorySelect = document.getElementById('category');
    const triviaContainer = document.getElementById('trivia'); // Ensure this is correctly pointing to your game container
    let currentQuestionIndex = 0;
    let correctStreak = 0;
    let questions = [];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function fetchQuestions() {
    const difficulty = difficultySelect.value;
    const category = categorySelect.value;
    const apiUrl = `https://opentdb.com/api.php?amount=5&type=multiple${category}${difficulty}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.results.length > 0) {
                questions = questions.concat(data.results);
                console.log('Questions fetched and added:', questions.length);
                if (currentQuestionIndex >= questions.length) {
                    showQuestion(); // Start showing questions only if needed
                }
            } else {
                alert('No questions found. Please try different settings.');
            }
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
            alert('Failed to fetch questions. Please check your internet connection.');
        });
}

    function showQuestion() {
        if (currentQuestionIndex < questions.length) {
            const question = questions[currentQuestionIndex];
            const answers = [...question.incorrect_answers, question.correct_answer];
            shuffleArray(answers);

            const questionHtml = `
                <div>
                    <p>${question.question}</p>
                    ${answers.map(answer => `<button class="answer-button">${answer}</button>`).join('')}
                </div>
            `;

            document.getElementById('trivia').innerHTML = questionHtml;

            document.querySelectorAll('.answer-button').forEach(button => {
                button.addEventListener('click', function () {
                    if (this.textContent === question.correct_answer) {
                        correctStreak++;
                        alert('Correct! Your streak is now: ' + correctStreak);
                        currentQuestionIndex++;
                        if (currentQuestionIndex >= questions.length - 1) {
                            fetchQuestions(); // Fetch more questions if we've gone through all available
                        } else {
                            showQuestion();
                        }
                    } else {
                        alert('Wrong! Your final streak was: ' + correctStreak + '. Starting a new game.');
                        // Refresh the page to restart the game
                        window.location.reload();
                    }
                });
            });
        }
    }

    startButton.addEventListener('click', function () {
        fetchQuestions(); // Initial fetch of questions
    });
});