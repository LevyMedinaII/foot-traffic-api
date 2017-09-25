var router = require('express').Router()
var service = require('./sample.service')

router.get('/test', (req, res) => {
	var service_test = service.test()
	res.send(service_test)
})

module.exports = router