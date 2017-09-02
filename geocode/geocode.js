
const request = require('request')

const GOOGLE_MAP_API_URL = 'https://maps.googleapis.com/maps/api/geocode/json'

function geocodeAddress (address, callback) {
  const endodedAddredd = encodeURIComponent(address)
  request({
    url: `${GOOGLE_MAP_API_URL}?address=${endodedAddredd}`,
    json: true,
  }, (error, response, body) => {
    if (error) {
      callback({errorMessage: 'ERROR: unable to connect to Google server'})
    } else if (body.status === 'ZERO_RESULTS') {
      callback({errorMessage: 'Address does not exist'})
    } else if (body.status === 'OK') {
      callback({
        results: {
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          logitude: body.results[0].geometry.location.lng,
        }
      })
    }
  })
}

module.exports = {
  geocodeAddress,
}
