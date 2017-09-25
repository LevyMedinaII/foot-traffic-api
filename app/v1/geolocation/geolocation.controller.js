var router = require('express').Router()
var service = require('./geolocation.service')

router.post('/me', (req, res) => {
    service.getLocation()
        .then(location => {
            res.send(location)
        }).catch(err => {
            res.send(err)
        })
})

module.exports = router