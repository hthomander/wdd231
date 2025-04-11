document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.querySelector('.hamburger');
  const menu = document.querySelector('nav ul');



menuToggle.addEventListener("click", function () {
  menu.classList.toggle("show");
  
});
});

async function fetchQuestions() {
  const response = await fetch('data/questions.json');
  if (!response.ok) throw new Error('Failed to load questions.');
  return await response.json();
}

function getTodayKey() {
  const today = new Date();
  return  `question-${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
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

document.getElementById('newQuestion').addEventListener('click', () => {
  localStorage.removeItem(getTodayKey());
  displayQuestion(true);
});