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
  var csv = require('node-csv').createParser()
  csv.parseFile('./app/v1/directions/danger_areas.csv', function(err, data){
    console.log(data)
    jsonDataArray = []
    for(var i = 0; i < data.length; i++){
      jsonDataArray.push({ lat: data[i][0], long: data[i][1] })
    }
    res.send(jsonDataArray)
  })
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
