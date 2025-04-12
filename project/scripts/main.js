document.addEventListener('DOMContentLoaded', function () {
const yearSpan = document.getElementById('year');
const lastModified = document.getElementById('lastModified');




yearSpan.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;




async function fetchQuestions() {
    const response = await fetch('data/questions.json');
    if (!response.ok) throw new Error('Failed to load questions.');
    return await response.json();   
}

function getTodayKey() {
    const today = new Date();
    return `question-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

async function displayQuestion(forceNew = false) {
    try {
        const questions = await fetchQuestions();
        const todayKey = getTodayKey();

        let questionIndex;
        if (!forceNew && localStorage.getItem(todayKey)) {
            questionIndex = parseInt(localStorage.getItem(todayKey));
        } else {
            questionIndex = Math.floor(Math.random() * questions.length);
            localStorage.setItem(todayKey, questionIndex);
        }
        document.getElementById('dailyQuestion').textContent = questions[questionIndex];
    } catch (error) {
        console.error('Error loading daily question:', error);
        document.getElementById('dailyQuestion').textContent = "Oops! Couldn't load today's question.";
    }
}
    displayQuestion();

document.getElementById('newQuestion').addEventListener('click', () => {
    localStorage.removeItem(getTodayKey());
    displayQuestion(true);
});

    const progressList = document.getElementById('progressList');
    const entries = JSON.parse(localStorage.getItem('practiceEntries')) || [];

function displayProgressEntries() {
    progressList.innerHTML = '';

    entries.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date}: ${entry.entry}`;
        progressList.appendChild(li);
    });
}

displayProgressEntries();
});