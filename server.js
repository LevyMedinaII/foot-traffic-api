//PACKAGES
var express = require('express')
var app = express()
var localtunnel = require('localtunnel')
require('dotenv').config()

//VARIABLES AND PARAMETERS
const port = 5000
var sample = require('./app/sample/index.js')
var geolocation = require('./app/v1/geolocation/index.js')
var tunnel = localtunnel(port, {subdomain: 'levylocal'}, (err, tunnel) => {
	if(err) {
		console.log(err)
	}
	console.log('localhost accessible via localtunnel link:', tunnel.url)
	tunnel.url
})

//ROUTES AND ROUTES IMPORT
app.use('/sample', sample)
app.use('/v1/geolocate', geolocation)

//MISC
app.listen(port);
console.log('App running in port:', port)