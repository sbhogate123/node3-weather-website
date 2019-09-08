const request = require('request');

const Forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/a1fbfa96a375e13f5cafe331583acfe7/' + latitude + ',' + longitude + '?units=si';
    request({url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined);
        }
        else if(body.error) {
            callback('Unable to find location.', undefined);
        }
        else {
            callback(undefined, {
                summary : body.daily.data[0].summary,
                temperature : body.currently.temperature,
                precipProbability : body.currently.precipProbability,
                temperatureHigh : body.daily.data[0].temperatureHigh,
                temperatureLow : body.daily.data[0].temperatureLow,
                humidity : body.currently.humidity
            });
        }
    });
}
module.exports = Forecast;