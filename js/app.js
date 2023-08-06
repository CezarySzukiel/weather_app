const apiKey = '0a573a049e12438cac9101900230608'
const city = 'auto:ip'
const days = 5

class Weather {
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
    async getWeather() {
        try {
            const response = await fetch(
                `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${this.city}&days=${this.days}`
            )
                const data = await response.json()
            console.log(data)
        }
        catch (error) {
            console.log(error);
            throw error;
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

// kod który wykona się po załadowaniu strony i pobierze dane pogodowe dla aktualnej lokalizacji
/**
 * Gets weather data for the current location.
 * @type {Promise}
 */
const weather = new Weather(city, days).getWeather()
console.log(weather)

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
    const weather = new Weather(searchValue, days).getWeather()
    console.log(weather)

})


// funkcja, która z pobranych danych z API wyświetli je na stronie

/**
 * Displays weather data on the page.
 */
function displayWeather(city, temperature, pressure, humidity, wind) {
    const weatherElement = document.querySelector('.module__weather')
    weatherElement.removeAttribute('hidden')
    let cityName = weatherElement.querySelector('.city__name')
    let cityTemperature = weatherElement.querySelector('.temperature')
    let cityPressure = weatherElement.querySelector('.pressure__value')
    let cityHumidity = weatherElement.querySelector('.humidity__value')
    let cityWind = weatherElement.querySelector('.wind-speed__value')
    cityName.textContent = city
    cityTemperature.textContent = temperature
    cityPressure.textContent = pressure
    cityHumidity.textContent = humidity
    cityWind.textContent = wind



    console.log(cityName)
}
let wachock = 'Wachock'

displayWeather(wachock)