const cityInput = document.querySelector('.cityInput');
const cityBtn = document.querySelector('.cityBtn');
const weatherInfo = document.querySelector('.weather__info');

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
        createElemCity()
    }
}
async function getWeather(city) {
    const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=QT8B8GJWGSYK229U3LHVHFCYJ&contentType=json`);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
}
function createElemCity() {
    const weatherInfoWrapper = document.createElement('div');
    weatherInfoWrapper.classList.add('weather__info__wrapper');
    weatherInfo.appendChild(weatherInfoWrapper)
    weatherInfoWrapper.innerHTML = `
        <div class="weather__info__city">${cityInput.value}
            <div class="weather__info__city__open">
                <hr class="open open_1">
                <hr class="open open_2">
            </div>
        </div>
    `;
    weatherInfoWrapper.addEventListener('click', () => {
        const weatherElem = document.createElement('div');
        weatherElem.classList.add('weather__info__elem');
        weatherInfoWrapper.appendChild(weatherElem);
    })
}

