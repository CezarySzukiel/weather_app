const apiKey = '0a573a049e12438cac9101900230608'
const city = 'auto:ip'
const days = 5


class Weather {
    url = 'http://api.weatherapi.com/v1/forecast.json'
     /**
     * Creates an instance of the Weather class.
     * @constructor
     * @param {string} city - City name for which weather data is retrieved.
     * @param {number} days - Number of days of weather forecast.
     */
    constructor(city, days) {
        this.city = city
        this.days = days
    }

     /**
     * Gets weather data from an external API.
     * @async
     * @returns {Promise} - An object containing weather data.
     */
    async getWeatherFromApi() {
        try {
            const response = await fetch(
                `${this.url}?key=${apiKey}&q=${this.city}&days=${this.days}`
            )
            return await response.json()
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }

    /**
     * Gets needed weather data from the API and displays it on the page.
     * @returns {Promise<void>}
     */
    async getCurrentWeatherData () {
        const weatherData = await this.getWeatherFromApi()
        const cityName = weatherData.location.name
        const temperature = weatherData.current.temp_c
        const humidity = weatherData.current.humidity
        const pressure = weatherData.current.pressure_mb
        const wind = weatherData.current.wind_kph
        // this.displayWeather(cityName, temperature, pressure, humidity, wind)
        // return weatherData
        return {cityName, temperature, pressure, humidity, wind}
    }

    /**
     * Gets weather forecast data from the API.
     * @returns {Promise<void>}
     */
    async getWeatherForecast () {
        const weatherData = await this.getWeatherFromApi()
        // powtórzona funkcja getWeatherFromApi(). czy to będzie ten sam obiekt który został użyty w getWeatherData()?
        // czy może lepiej przenieść funkcję getWeatherFromApi() do konstruktora klasy?
        // no i czy można w konstruktorze klasy użyć metody tejże klasy?
        // console.log('dane z prognozy', weatherData.forecast.forecastday)
        const forecastData = weatherData.forecast.forecastday
        // console.log('dane z prognozy', weatherData)
        return forecastData
    }


      /**
     * Displays weather data on the page.
     */
    async displayCurrentWeather() {
        try {
            const currentWeatherData = await this.getCurrentWeatherData()
            const weatherElement = document.querySelector('.module__weather')
            weatherElement.removeAttribute('hidden')
            weatherElement.querySelector('.city__name').textContent = currentWeatherData.cityName
            weatherElement.querySelector('.temperature').textContent = currentWeatherData.temperature
            weatherElement.querySelector('.pressure__value').textContent = currentWeatherData.pressure
            weatherElement.querySelector('.humidity__value').textContent = currentWeatherData.humidity
            weatherElement.querySelector('.wind-speed__value').textContent = currentWeatherData.wind
            console.log('currentWeatherData', currentWeatherData)
        }
        catch (error) {
            console.log('something is no yes', error)
        }
    }

    /**
     * Displays weather forecast data on the page.
     * @returns {Promise<HTMLCollection>}
     */
    async displayWeatherForecast () {
        try {
            const forecastData = await this.getWeatherForecast()
            let forecastElement = document.querySelector('.weather__forecast')
            for (let i = 0; i < forecastElement.children.length; i++) {
                let elem = forecastElement.children[i]
                elem.querySelector('.day').innerHTML = getDayOfWeek(forecastData[i].date_epoch)
                elem.querySelector('.temperature__value').innerHTML = forecastData[i].day.avgtemp_c
                elem.querySelector('img').setAttribute('src', forecastData[i].day.condition.icon)
            }
        return forecastElement.children
        }
        catch (error) {
            console.log('something is no yes', error)
        }
    }
}


class FormDataHandler {
    /**
     * Creates an instance of the FormDataHandler class.
     * @param form
     */
    constructor(form) {
        this.form = form
    }

    /**
     * Gets data from the form.
     * @param search
     * @returns {FormDataEntryValue}
     */
    getFormData(search) {
        const formData = new FormData(this.form)
        return formData.get(search)
        // todo walidacja danych, aby nie zawierały polskich znaków
    }
}


/**
 * Gets the day of the week from the timestamp.
 * @param timestamp
 * @returns {string}
 */
function getDayOfWeek(timestamp) {
    const date = new Date(timestamp * 1000);
    const daysOfWeek = ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];
    const dayOfWeekNumber = date.getDay();
    return daysOfWeek[dayOfWeekNumber];
}


/**
 * Toggles the visibility of the element.
 * @param triggerElement
 * @param targetElement
 */
function setupToggleVisibilityElem(triggerElement, targetElement) {
    triggerElement.addEventListener('click', function () {
        targetElement.toggleAttribute('hidden')
    })
}


/**
 * Toggles the visibility of the city searching form.
 */

const formDiv = document.querySelector('.module__form')
const addCityButton = document.getElementById('add-city')
const closeButton = document.querySelector('.btn--close')
setupToggleVisibilityElem(addCityButton, formDiv)
setupToggleVisibilityElem(closeButton, formDiv)


/**
 * Toggles the visibility of the weather module.
 */
const weatherModule = document.querySelector('.module__weather')
const weatherModuleCloseButton = document.querySelector('.module__weather .btn--close')
setupToggleVisibilityElem(weatherModuleCloseButton, weatherModule)

/**
 * Gets weather data for the current location after page load.
 * @type {Promise}
 */
const weather = new Weather(city, days).displayCurrentWeather()
const forecastData = new Weather(city, days).displayWeatherForecast()


/**
 * Handles the form submission event.
 */
document.querySelector('.find-city').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormDataHandler(this);
    const body = document.querySelector('body')
    body.classList.add('loading')
    setTimeout(function () {
        body.classList.remove('loading')
        const searchValue = formData.getFormData('search');
        new Weather(searchValue, days).displayCurrentWeather()
        new Weather(searchValue, days).displayWeatherForecast()
        formDiv.toggleAttribute('hidden')
    }, 1000)
})

//todo jak sprawić by miasto się dodawało do listy miast zamiast podmieniać jeden element?