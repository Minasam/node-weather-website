const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWluYXNhbWlyOTMiLCJhIjoiY2wyYWx2bThsMDY0dDNjbm9hdmNtdmNmayJ9.1P0bIyc56A0sOZ64JWhH5g&limit=1';
    request({ url, json: true }, (error, reponse, body) => {
        if (error) {
            callback('Unable to connect to the geocoding service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search!', undefined)
        } else {
            const lat = body.features[0].center[1]
            const long = body.features[0].center[0]
            const data = {
                lat,
                long,
                location: body.features[0].place_name
            }

            callback(undefined, data)
        }

    })
}

module.exports = geocode