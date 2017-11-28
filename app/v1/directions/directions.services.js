var Sequelize = require('sequelize')
var axios = require('axios')
var fastcsv = require('fast-csv')
var fs = require('fs')
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
		var stream = fs.createReadStream(dangerAreasFileName);

		fastcsv
		 .fromStream(stream, {ignoreEmpty: true})
		 .on("data", function(data){
		     console.log(data);
				 return data;
		 })
		 .on("end", function(){
		     console.log("done");
				 return "done";
		 });

	},
	save_danger_area:(latitude, longitude)=>{
				var dangerAreasArr=[latitude, longitude]
				var dataArr;
				console.log(dangerAreasArr)
				csv.parseFile('./app/v1/directions/danger_areas.csv', function(err, data){
					console.log('Data', data)
					data.push(dangerAreasArr)
					dataArr = data
					console.log('Data2', data)
					fastcsv.writeToPath(dangerAreasFileName, dataArr, {headers:false})
						.on("finish", function(){
							return true
						})
				})
		}
	}
