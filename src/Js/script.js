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
        
    }
}
async function getWeather(city) {
    try {
        const weatherResponse = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=QT8B8GJWGSYK229U3LHVHFCYJ&contentType=json`);
        const weatherData = await weatherResponse.json();
        createElemCity(weatherData)
    } catch (error) {
        alert('Ошибка')
    }
}
function createElemCity(weatherData) {
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
        eventWeatherInfoCreateElem(weatherData, weatherInfoWrapper)
    })
}
function eventWeatherInfoCreateElem(weatherData, weatherInfoWrapper) {
    const weatherOpen1 = weatherInfoWrapper.querySelector('.open-1');
    weatherOpen1.classList.toggle('open-1_active');
    const weatherOpen2 = weatherInfoWrapper.querySelector('.open-2');
    weatherOpen2.classList.toggle('open-2_active');
    if (weatherOpen1.matches('.open.open-1.open-1_active') && weatherOpen2.matches('.open.open-2.open-2_active')) {
        //Даты
        
        
        
        const weatherInfoDays = document.createElement('div');
        weatherInfoDays.classList.add('weather__info__days');
        weatherInfoWrapper.appendChild(weatherInfoDays)
        weatherInfoDays.innerHTML = `
            <div class="weather__info__days__content">
                    ${getDayOfWeek(0)} <br>
                    ${Math.floor(weatherData.days[0].tempmax)}°C-${Math.floor(weatherData.days[0].tempmin)}°C
                    </div>
                    <div class="weather__info__days__content">${getDayOfWeek(1)} <br>
                    ${Math.floor(weatherData.days[1].tempmax)}°C-${Math.floor(weatherData.days[1].tempmin)}°C</div>
                    <div class="weather__info__days__content">${getDayOfWeek(2)} <br>
                    ${Math.floor(weatherData.days[2].tempmax)}°C-${Math.floor(weatherData.days[2].tempmin)}°C</div>
                    <div class="weather__info__days__content">${getDayOfWeek(3)} <br>
                    ${Math.floor(weatherData.days[3].tempmax)}°C-${Math.floor(weatherData.days[3].tempmin)}°C</div>
                    <div class="weather__info__days__content">${getDayOfWeek(4)} <br>
                    ${Math.floor(weatherData.days[4].tempmax)}°C-${Math.floor(weatherData.days[4].tempmin)}°C</div>
                    <div class="weather__info__days__content">${getDayOfWeek(5)} <br>
                    ${Math.floor(weatherData.days[5].tempmax)}°C-${Math.floor(weatherData.days[5].tempmin)}°C</div>
                    <div class="weather__info__days__content border-none">${getDayOfWeek(6)} <br>
                    ${Math.floor(weatherData.days[6].tempmax)}°C-${Math.floor(weatherData.days[6].tempmin)}°C</div>
        `;
    } else {
        let exitWeather = weatherInfoWrapper.querySelector('.weather__info__days');
        if (exitWeather) exitWeather.remove()
    };
}
function getDayOfWeek(i) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб',];
    let date = new Date();
    date.setDate(date.getDate() + i);
    let targetDayIndex = date.getDay()
    return days[targetDayIndex]
}