//PACKAGES
var express = require('express')
var app = express()
var localtunnel = require('localtunnel')

//VARIABLES AND PARAMETERS
const port = 5000
var sample = require('./app/sample/index.js')
var tunnel = localtunnel(port, {subdomain: 'levylocal'}, (err, tunnel) => {
	if(err) {
		console.log(err)
	}
	console.log('localhost accessible via localtunnel link:', tunnel.url);
	tunnel.url
})

//ROUTES AND ROUTES IMPORT
app.get ('/', (req, res) => {
	res.send('Hello World');
})
app.use('/sample', sample);

//MISC
app.listen(port);
console.log('App running in port:', port);