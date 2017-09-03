const yargs = require('yargs')
const axios = require('axios')

// geolocation constants
const NOT_FOUND = 'ENOTFOUND'
const ZERO_RESULTS = 'ZERO_RESULTS' // custom message by google for no results
const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

// Weather constants
const DARK_SKY_API_URL = 'https://api.darksky.net/forecast/'
const WEATHER_API_KEY = 'cfd53adb05ae608b2097966820d1c2e3'

const argv = yargs.options({
  a: {
    demand: true,
    alias: 'address',
    describe: 'Address to fetch weather for',
    string: true,
  }
})
.help()
.alias('help', 'h')
.argv

const endodedAddredd = encodeURIComponent(argv.address)
const geocodeUrl = `${GOOGLE_MAP_API_URL}?address=${endodedAddredd}`

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === ZERO_RESULTS) {
    throw new Error('Unable to find the address')
  }
  const { lat, lng } = response.data.results[0].geometry.location
  const weatherUrl = `${DARK_SKY_API_URL}${WEATHER_API_KEY}/${lat},${lng}`

  console.log(response.data.results[0].formatted_address)

  return axios.get(weatherUrl)

}).then((response) => {
  const { temperature, apparentTemperature } = response.data.currently
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`)
}).catch((e) => {
  if (e.code === NOT_FOUND) {
    console.log('Unable to reach the server')
  } else {
    console.log(e.message)
  }

})
