const request = require('request')


const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6df4f0fa00554110f37d0f5748684ce9&query=' + lat + ',' + long + '&units=m'

    request({ url: url, json: true }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to connect to weather service!', undefined)
        } else {
            const currentObject = response.body.current
            const {temperature: currentDegree, feelslike:feelsLikeDegree} = currentObject

            const data = {
                degree: currentDegree,
                feelsLikeDegree
            }
            callback(undefined, data)
        }

    })
}

module.exports = forecast