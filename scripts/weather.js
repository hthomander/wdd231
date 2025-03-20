const currentTemp = document.getElementById('current-temp');
const weatherIcon = document.getElementById('weather-icon');
const captionDesc = document.getElementById('weather-description');

const url = 'https://api.openweathermap.org/data/2.5/weather?lat=49.75&lon=6.64&units=imperial&appid=dfed14127d8969bc70788ebf47f002da'

async function apiFetch() {
    try {
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            
            console.log(data);

            displayResults(data);
        } else {
            throw new Error(await response.text());
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

function displayResults(data) {
    currentTemp.innerHTML = `${data.main.temp}°F`;

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/w/${icon}.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', data.weather[0].description);

    const description = data.weather[0].description;
    captionDesc.textContent =  `${description.charAt(0).toUpperCase() + description.slice(1)}`;

}

apiFetch();