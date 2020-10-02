const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1Ijoic2FnYXJ2ZXJtYSIsImEiOiJja2ZxcHp3MGIwMG1oMzJwZGVqc3JyZGkzIn0.Kq1RFYKL8OJtTTSTLjL0iA&limit=1'
    // request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback(undefined, 'Unable to find location!')
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode