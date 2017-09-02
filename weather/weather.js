const request = require('request')

const DARK_SKY_API_URL = 'https://api.darksky.net/forecast/'
const WEATHER_API_KEY = 'cfd53adb05ae608b2097966820d1c2e3'

function fetchWeather({latitude, logitude}, callback) {
  if (latitude != null && logitude != null) {
    request({
      url: `${DARK_SKY_API_URL}${WEATHER_API_KEY}/${latitude},${logitude}`,
      json: true,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        callback({results: body.currently})
      } else {
        callback({results:{
          errorMessage: 'Something went wrong, cannot fetch weather data',
        }})
      }
    })
  }
}

module.exports = {
  fetchWeather,
}
