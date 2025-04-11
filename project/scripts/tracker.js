document.addEventListener('DOMContentLoaded', function () {
const yearSpan = document.getElementById('year');
const lastModified = document.getElementById('lastModified');
const menuToggle = document.querySelector('.hamburger');
const menu = document.querySelector('nav ul');
const form = document.getElementById('tracker-form');
const entriesList = document.getElementById('entries-list');
const modal = document.getElementById('modal');
const closemodal = document.getElementById('close-modal');

yearSpan.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;



menuToggle.addEventListener("click", function () {
    menu.classList.toggle("show");
    
});


form.addEventListener('submit', (e) => {
    e.preventDefault();
    const entry = document.getElementById('entry').value.trim();
    if (entry) {
        saveEntry(entry);
        document.getElementById('entry').value = '';
        showModal();
    }
});

function saveEntry(entry) {
    const entries = JSON.parse(localStorage.getItem('practiceEntries')) || [];
    entries.push({ entry, date: new Date().toLocaleDateString() });
    localStorage.setItem('practiceEntries', JSON.stringify(entries));
    displayEntries();
}

function displayEntries() {
    const entries = JSON.parse(localStorage.getItem('practiceEntries')) || [];
    const entriesList = document.getElementById('entries-list');
    entriesList.innerHTML = '<h2>⚖️ What Have I Been Studying? 📈</h2>';
    entries.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `${e.date}: ${e.entry}`;
        entriesList.appendChild(li);
    });
}

function showModal() {
    modal.classList.remove('hidden');
}
 closemodal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

displayEntries();
});