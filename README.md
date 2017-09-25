# foot-traffic-api
### API server for CS171: Introduction to AI Project.

## Details:
This project's purpose is to offer safe routes to pedestrians depending his/her location to maximize user
safety and minimize road accidents on the pedestrian side

## How to use (Code):
The code is separated into different parts to isolate components of the project and to speed up development.
### Parts:
1. server.js - compiles all api routes into one file via js imports
2. app - contains each API feature of the app. each feature is separated into versions (e.g. v1, v2, etc.). The feature folder is divided into 3 parts; the index.js file which is used for exporting, the controller file which is used for routing, and the service file which is used for 3rd party API calls and database queries using sequelize.
3. sample - contains code for a sample feature api template


## Packages List:
1. nodemon
	* Used for speeding up development
2. localtunnel
	* Used for allowing webhooks to other services such as FB
3. express
	* Base of the application; used for running the server and routing
4. axios
	* Used for creating third party api calls
5. dotenv
	* Used for configuring the environment file of the project