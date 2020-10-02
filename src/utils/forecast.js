const request = require('request')

const forecast = (lat, lon, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=22830465ba7c8c2bb913fc8ce47f0761&query=' + encodeURI(lat) + ',' + encodeURI(lon) + '&units=m'
    // request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to internet!')
        }
        else if (body.error) {
            callback( undefined,"Unable to find location!")
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out.")
        }
    })
}

module.exports = forecast