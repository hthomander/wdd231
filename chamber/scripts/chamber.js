document.addEventListener("DOMContentLoaded", () => {
    updateYear();
    updateLastModified();
    fetchWeather();
    fetchSpotlights();
});

function updateYear() {
    document.getElementById("year").textContent = new Date().getFullYear();
}

function updateLastModified() {
    document.getElementById("lastModified").textContent = document.lastModified;
}

async function fetchWeather() {
    const apikey = "dfed14127d8969bc70788ebf47f002da";
    const city = "Heyburn";
    const country = "US";
    const units = "imperial";

    const weatherUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=${units}&appid=${apikey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=${units}&appid=${apikey}`;
    
    try {
        const [weatherResponse, forecastResponse] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        const weatherData = await weatherResponse.json();
        const forecastData = await forecastResponse.json();

        document.getElementById("weather-description").textContent = weatherData.weather[0].description;
        document.getElementById("temperature").textContent = Math.round(weatherData.main.temp);

        updateForecast(forecastData);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateForecast(data) {
    const forecastList = document.getElementById("forecast");
    forecastList.innerHTML = " ";

    const dailyForecasts = data.list.filter((item, index) => index % 8 ==0).slice(0, 3);

    dailyForecasts.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString("en-US", { weekday: "long"});
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const description = day.weather[0].description;

        const listItem = document.createElement("li");
        listItem.innerHTML = `🌡️ ${date}: ${temp}°F - ${description} <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">`;
        forecastList.appendChild(listItem);
    });
}

async function fetchSpotlights() {
    const response = await fetch("scripts/members.json");
    const data = await response.json();

    const eligibleMembers = data.members.filter(member =>
        member.membership === "3" || member.membership === "2"
    );

    const shuffled = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    displaySpotlights(shuffled);
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById("spotlight");
    spotlightContainer.innerHTML = " ";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("spotlight-card");

        card.innerHTML = `
        <img src= "images/${member.image}" alt="${member.name}">
        <h3>${member.name}</h3>
        <p> 📞 ${member.phone}</p>
        <p>📍 ${member.address}</p>
        <p>🌟 ${member.membership} Member</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        `;

        spotlightContainer.appendChild(card);
    });
}