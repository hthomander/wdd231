document.addEventListener("DOMContentLoaded", () => {
    fetch("scripts/attractions.json")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("attractions");
            data.forEach(attraction => {
                const card = document.createElement("div");
                card.classList.add("attraction-card");

                card.innerHTML = `
                <h2>${attraction.name}</h2>
                <figure>
                <img src="${attraction.image}" alt="${attraction.name}">
                </figure>
                <address>${attraction.address} </address>
                <p>${attraction.description}</p>
                <button class="learn-more">Learn More</button>
                `;
                
                container.appendChild(card);
            });
        })
        .catch(error => console.error("Error loading attractions:", error));

    const visitMessage = document.getElementById("visitor-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
        visitMessage.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const daysSinceLastVisit = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));

        if (daysSinceLastVisit < 1) {
            visitMessage.textContent = "Back so soon! Awesome!";
        } else {
            visitMessage.textContent = `You last visited ${daysSinceLastVisit} day ${daysSinceLastVisit > 1 ? 's' : ''} ago.`;
        }
    }

    localStorage.setItem("lastVisit", now);

    

});

function updateYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

function updateLastModified() {
    document.getElementById("lastModified").textContent = document.lastModified;
}
updateYear();
updateLastModified();