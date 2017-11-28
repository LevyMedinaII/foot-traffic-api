var Sequelize = require('sequelize')
var axios = require('axios')
var fastcsv = require('fast-csv')
var fs = require('fs')
var json2csv = require('json2csv')
var csv = require('node-csv').createParser()


const directionsAPIUrl = 'https://maps.googleapis.com/maps/api/directions/json';

var dangerProne_locations = []
var location_fields = ['latitude', 'longitude']
var dangerAreasFileName = "app/v1/directions/danger_areas.csv"


module.exports = {
	directions: (origin_lat, origin_long, dest_lat, dest_long) => {
		return axios({
			method: 'post',
			url: directionsAPIUrl,
			params: {
                origin: origin_lat +","+ origin_long,
                destination: dest_lat+","+ dest_long,
                key: process.env.directions_api_key,
								mode: "walking"},

		}).then(directions => {
			return directions.data

			// userPosition = {
			// 	latitude: geocode.data.location.lat,
			// 	longtitude: geocode.data.location.lng
      //       }
      //       return userPosition;
		}).catch(err => {
			console.log(err)
		})
	},
	get_all_danger_areas: () =>{
		// Cannot be used for non promiseable async tasks
	},
	save_danger_area:(latitude, longitude)=>{
				var dataArr;
				csv.parseFile('./app/v1/directions/danger_areas.csv', function(err, data){
					dataArr = data
					dataArr.push([latitude, longitude])
					console.log('Data', dataArr)
					jsonData = []
					for(var i = 0; i < dataArr.length; i++){
						jsonData.push({ "lat": dataArr[i][0], "long": dataArr[i][1]})
					}
					jsonData.push({ "lat": "", "long": "" })
					console.log('Json Data', jsonData)
					var csv_seed = json2csv({ data: jsonData, hasCSVColumnTitle: false, preserveNewLinesInValues: true })
					fs.writeFileSync('./app/v1/directions/danger_areas.csv', csv_seed)
					return true;
					// fastcsv.writeToPath(dangerAreasFileName, dataArr, {headers:false})
					// 	.on("finish", function(){
					// 		return true
					// 	})
				})
		}
	}
