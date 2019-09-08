const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');
const clsWeatherInformation = document.querySelector('.weatherInformation');
const clsErrorDetails = document.querySelector('.errorDetails');
const clsNotificationContainer = document.querySelector('.notificationContainer');
const errorText = document.querySelector('#errorText');
const loactionDetails = document.querySelector('#loactionDetails');
const weatherSummary = document.querySelector('#weatherSummary');
const temperatureHigh = document.querySelector('#temperatureHigh');
const temperatureLow = document.querySelector('#temperatureLow');
const humidity = document.querySelector('#humidity');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = searchTerm.value;
    clsWeatherInformation.style.display = 'none';
    clsErrorDetails.style.display = 'none';
    clsNotificationContainer.style.display = 'block';

    fetch('/weather?address='+ location).then((response) => {
        response.json().then((data) => {
            if(data.error){
                clsNotificationContainer.style.display = 'none';
                clsErrorDetails.style.display = 'block';
                clsWeatherInformation.style.display = 'none';

                errorText.textContent = data.error;
            }
            else {
                clsNotificationContainer.style.display = 'none';
                clsErrorDetails.style.display = 'none';
                clsWeatherInformation.style.display = 'block';

                console.log(data);

                loactionDetails.textContent = data.Location;
                weatherSummary.textContent = data.Forecast.summary + ' It is currently ' + data.Forecast.temperature + ' degress out. There is a ' + data.Forecast.precipProbability + '% chance of rain.';
                temperatureHigh.textContent = data.Forecast.temperatureHigh + ' ' + 'degrees';
                temperatureLow.textContent = data.Forecast.temperatureLow + ' ' + 'degrees';
                humidity.textContent = (data.Forecast.humidity)*100 + '%';
            }
        })
    })
});

window.addEventListener('load', function() {
})