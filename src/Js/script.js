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
                <hr class="open open-1">
                <hr class="open open-2">
            </div>
        </div>
    `;
    weatherInfoWrapper.addEventListener('click', () => {
        eventWeatherInfoCreateElem(weatherInfoWrapper)
    })
}
function eventWeatherInfoCreateElem(weatherInfoWrapper) {
    const weatherOpen1 = weatherInfoWrapper.querySelector('.open-1');
    weatherOpen1.classList.toggle('open-1_active');
    const weatherOpen2 = weatherInfoWrapper.querySelector('.open-2');
    weatherOpen2.classList.toggle('open-2_active');

    if (weatherOpen1.matches('.open.open-1.open-1_active') && weatherOpen2.matches('.open.open-2.open-2_active')) {
        const weatherInfoDays = document.createElement('div');
        weatherInfoDays.classList.add('weather__info__days');
        weatherInfoWrapper.appendChild(weatherInfoDays)
        weatherInfoDays.innerHTML = `
            <div class="weather__info__days__content">
                    Пн <br>
                    23°C-10°C
                    </div>
                    <div class="weather__info__days__content">Пн <br>
                    23°C-10°C</div>
                    <div class="weather__info__days__content">Пн <br>
                    23°C-10°C</div>
                    <div class="weather__info__days__content">Пн <br>
                    23°C-10°C</div>
                    <div class="weather__info__days__content">Пн <br>
                    23°C-10°C</div>
                    <div class="weather__info__days__content">Пн <br>
                    23°C-10°C</div>
                    <div class="weather__info__days__content border-none">Пн <br>
                    23°C-10°C</div>
        `;
    } else {
        weatherInfoWrapper.querySelector('.weather__info__days').remove()
    };
}
