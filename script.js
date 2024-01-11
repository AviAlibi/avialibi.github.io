let currentStreak = 0;
let correctAnswer = "";
let isWaitingForNextQuestion = false;

fetchQuestion();

function fetchQuestion() {
    fetch("https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple")
        .then(response => response.json())
        .then(data => displayQuestion(data.results[0]));
}

function displayQuestion(questionData) {
    document.getElementById("question").innerText = decodeHtml(questionData.question);
    correctAnswer = decodeHtml(questionData.correct_answer);
    let answers = [correctAnswer, ...questionData.incorrect_answers].map(decodeHtml).sort(() => Math.random() - 0.5);

    let answersHtml = answers.map(answer => `<li onclick="selectAnswer(this)">${answer}</li>`).join("");
    document.getElementById("answers").innerHTML = answersHtml;
}

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function selectAnswer(li) {
    // Prevent answering if we are waiting for the next question
    if (isWaitingForNextQuestion) return;

    let selectedAnswer = li.innerText;
    let resultDisplay = document.getElementById("result");
    let triviaContent = document.getElementById("triviaContent");

    if (selectedAnswer === correctAnswer) {
        currentStreak++;
        resultDisplay.innerText = "Correct!";
    } else {
        currentStreak = 0;
        resultDisplay.innerText = "Incorrect!";
    }

    document.getElementById("streak").innerText = "Streak: " + currentStreak;
    triviaContent.style.display = "none"; // Hide the question and answers
    isWaitingForNextQuestion = true;

    // Wait for a short period before fetching the next question
    setTimeout(() => {
        fetchQuestion();
        resultDisplay.innerText = "";
        triviaContent.style.display = "block"; // Show them again for the next question
        isWaitingForNextQuestion = false;
    }, 2000); // Adjust the delay as needed
}