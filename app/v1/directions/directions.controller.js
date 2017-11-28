var router = require('express').Router()
var service = require('./directions.services')
var request = require('request')
router.post('/direction', (req, res) => {
    service.directions(req.body.origin_lat, req.body.origin_long, req.body.dest_lat, req.body.dest_long)
        .then(directions => {
          console.log(req.body.origin_lat)
          res.header('Access-Control-Allow-Origin', '*')
          res.json(directions)
        }).catch(err => {
            res.send(err)
        })
})
router.get('/getDangerAreas', (req, res) => {
  res.send(service.get_all_danger_areas())

})

router.post('/add_danger_area', (req, res)=>{
  console.log(req.body.lat)
  console.log(req.body.long)
  res.send(service.save_danger_area(req.body.lat, req.body.long))
})

router.get('/sample', (req,res)=>{
  service.direction()
    .then(directions=>{
      res.json(directions)
    }) .catch(err =>{
      res.send(err)
    })
})





module.exports = router
