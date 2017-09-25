var Sequelize = require('sequelize')
var axios = require('axios')

const geolocationAPIUrl = 'https://www.googleapis.com/geolocation/v1/geolocate';

module.exports = {
	getLocation: () => {
		return axios({
			method: 'post',
			url: geolocationAPIUrl,
			params: { process.env.api_key },
			data: { considerIP: false }
		}).then(geocode => {
			console.log(geocode.data)
			userPosition = {
				latitude: geocode.data.location.lat,
				longtitude: geocode.data.location.lng
            }
            return userPosition;
		}).catch(err => {
			console.log(err)
		})
	}
}