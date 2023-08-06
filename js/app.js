const apiKey = '0a573a049e12438cac9101900230608'
const city = 'auto:ip'
const days = 5

class Weather {
    constructor(city, days) {
        this.city = city
        this.days = days
    }
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
    constructor(form) {
        this.form = form
    }
    getFormData(search) {
        const formData = new FormData(this.form)
        return formData.get(search)
    }
}

// show/hide city searching form
const addCityButton = document.getElementById('add-city')
addCityButton.addEventListener('click', function () {
    const formDiv = document.querySelector('.module__form')
    formDiv.toggleAttribute('hidden')
})



document.querySelector('.find-city').addEventListener('submit', function (event) {
    event.preventDefault();
    const formData = new FormDataHandler(this);
    const searchValue = formData.getFormData('search');
    console.log(searchValue)
    const weather = new Weather(searchValue, days).getWeather()
    console.log(weather)
    // todo walidacja danych, aby nie zawierały polskich znaków
})

