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
    async getWeatherData () {
        const weatherData = await this.getWeatherFromApi()
        const cityName = weatherData.location.name
        const temperature = weatherData.current.temp_c
        const humidity = weatherData.current.humidity
        const pressure = weatherData.current.pressure_mb
        const wind = weatherData.current.wind_kph
        this.displayWeather(cityName, temperature, pressure, humidity, wind)
    }

    /**
     * Displays weather data on the page.
     * @param city
     * @param temperature
     * @param pressure
     * @param humidity
     * @param wind
     */
    displayWeather(city, temperature, pressure, humidity, wind) {
        const weatherElement = document.querySelector('.module__weather')
        weatherElement.removeAttribute('hidden')
        weatherElement.querySelector('.city__name').textContent = city
        weatherElement.querySelector('.temperature').textContent = temperature
        weatherElement.querySelector('.pressure__value').textContent = pressure
        weatherElement.querySelector('.humidity__value').textContent = humidity
        weatherElement.querySelector('.wind-speed__value').textContent = wind
        console.log('city, temp, press, hum, wind: ', city, temperature, pressure, humidity, wind)
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
 * Gets weather data for the current location after page load.
 * @type {Promise}
 */
const weather = new Weather(city, days).getWeatherData()

// sprawdzam jak wyglądają dane z api:
const weatherData = new Weather(city, days).getWeatherFromApi()
console.log('dane z api:', weatherData)

/**
 * Toggles the visibility of the city searching form.
 */
function setupToggleVisibilityElem(triggerElement, targetElement) {
    triggerElement.addEventListener('click', function () {
        targetElement.toggleAttribute('hidden')
    })
}
const formDiv = document.querySelector('.module__form')
const addCityButton = document.getElementById('add-city')
const closeButton = document.querySelector('.btn--close')
setupToggleVisibilityElem(addCityButton, formDiv)
setupToggleVisibilityElem(closeButton, formDiv)


/**
 * Handles the form submission event.
 */
document.querySelector('.find-city').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormDataHandler(this);
    const searchValue = formData.getFormData('search');
    console.log(searchValue)
    const weather = new Weather(searchValue, days).getWeatherData()
    console.log(weather)
})


