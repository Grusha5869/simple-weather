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
        alert('Ошибка загрузки')
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
    console.log(weatherData);
    
    const weatherInfoCity = weatherInfoWrapper.querySelector('.weather__info__city')
    console.log(weatherInfoCity);
    weatherInfoCity.addEventListener('click', () => {
        eventWeatherInfoCreateElem(weatherData, weatherInfoWrapper)
    })
}
function eventWeatherInfoCreateElem(weatherData, weatherInfoWrapper) {
    
    const weatherOpen1 = weatherInfoWrapper.querySelector('.open-1');
    weatherOpen1.classList.toggle('open-1_active');
    const weatherOpen2 = weatherInfoWrapper.querySelector('.open-2');
    weatherOpen2.classList.toggle('open-2_active');
    if (weatherOpen1.matches('.open.open-1.open-1_active') && weatherOpen2.matches('.open.open-2.open-2_active')) {
        const weatherInfoDays = document.createElement('div');
        weatherInfoDays.classList.add('weather__info__days');
        weatherInfoWrapper.appendChild(weatherInfoDays)
        weatherInfoDays.innerHTML = `
            <div class="weather__info__days__content ">
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

        
        if (weatherInfoDays) {
            let weatherInfoDaysArr = weatherInfoDays.querySelectorAll('.weather__info__days__content');
            weatherInfoDaysArr.forEach(elem => {
                elem.addEventListener('click', () => {
                    
                    if (!eventWeatherInfoCreateElem.counter) {
                        eventWeatherInfoCreateElem.counter = 0
                    }
                    eventWeatherInfoCreateElem.counter++

                    if(eventWeatherInfoCreateElem.counter <= 1) {
                        elem.style.border = 'none';
                        elem.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)'

                        const daysContent = document.querySelector('.weather__info__days__content')
                        const infoHours = document.createElement('div');
                        infoHours.classList.add('weather__info__hours');

                        let hoursElemTextContent = checkTempAndHour(elem, weatherData);
                        console.log(hoursElemTextContent);
                        
                        let length = weatherData.days[0].hours.length;
                        for (let i = 0; i < length; i += 2) {
                            const infoHoursElem = document.createElement('div');
                            infoHoursElem.classList.add('weather__info__hours__elem')

                            const temp = document.createElement('p');
                            temp.classList.add('temp');
                            temp.textContent = `${Math.floor(hoursElemTextContent[0][i].temp) + '°C'}`
                            
                            const hours = document.createElement('p');
                            hours.classList.add('hours');
                            hours.textContent = `${hoursElemTextContent[0][i].datetime.split(':')[0] + ':' + hoursElemTextContent[0][i].datetime.split(':')[1]}`

                            //сборка
                            infoHoursElem.appendChild(temp)
                            infoHoursElem.appendChild(hours)
                            infoHours.appendChild(infoHoursElem)
                            
                        }
                        weatherInfoWrapper.appendChild(infoHours)
                        
                    }
                })
            })
        }

    } else {
        let exitWeather = weatherInfoWrapper.querySelector('.weather__info__days');
        let infoHours = weatherInfoWrapper.querySelector('.weather__info__hours')
        if (exitWeather) {
            exitWeather.remove()
            infoHours.remove()
            eventWeatherInfoCreateElem.counter = 0
        }
    };
}
function getDayOfWeek(i) {
    const days = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб',];
    let date = new Date();
    let dateReal = date;
    date.setDate(date.getDate() + i);
    let targetDayIndex = date.getDay()
    return `${dateReal.getDate()}` + ` ${days[targetDayIndex]}`
}
function checkTempAndHour(elem, weatherData) {
    const hoursElemTextContent = []; 
    let elemSplit = elem.textContent.split(' ');
    
    for (let dataElem of weatherData.days) {

        
        if (elemSplit[0] == dataElem.datetime.split('-')[2]) {
            hoursElemTextContent.push(dataElem.hours)
            return hoursElemTextContent;
        } else if (dataElem.datetime.split('-')[2][0] == '0') {
            if (elemSplit[0] == dataElem.datetime.split('-')[2][1]) {
                hoursElemTextContent.push(dataElem.hours)
                return hoursElemTextContent;
            }
        }
    }
}
