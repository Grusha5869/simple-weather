const cityInput = document.querySelector('.cityInput');
const cityBtn = document.querySelector('.cityBtn');

cityInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        checkValueInput()
    }
})
cityBtn.addEventListener('click', () => {
    checkValueInput()
})


function checkValueInput() {
    if (cityInput.value.trim() === "") {
        cityInput.style.border = '2px solid red';
    } else {
        cityInput.style.border = '';
        getWeather(cityInput.value.trim());
    }
}
async function getWeather(city) {
    const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=QT8B8GJWGSYK229U3LHVHFCYJ&contentType=json`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
}