// application gb_mtl_wx.js
// pushes weather data for Montreal to Geckoboard dataset 
// by Steve Rohde (steverohde@mac.com)

var GB_API_KEY = '446a0261034b415864481e8f320b1045';   // TODO: fetch API key from file instead of command line parameter
var OWX_API_KEY = '7a3ce871b62fa4870c54488f07587052';  // TODO: fetch API key from file instead of command line parameter
const request = require('request-promise');
const cron = require('node-cron');
var gb = require('geckoboard')(GB_API_KEY);

// data source for current weather in Montréal, Québec
const serverWX = 'http://api.openweathermap.org/data/2.5/weather?q=Montreal&APPID='+ OWX_API_KEY + '&units=metric';
var datasetName = 'weather.montreal'

// run app every 10 minutes
cron.schedule('*/10 * * * *', function(){  
 	console.log(new Date().toISOString() + ': requesting new weather data...');

// create/find the dataset
	gb.datasets.findOrCreate(
	  {
	    id: datasetName,
	    fields: {
	      description: {
	        type: 'string',
	        name: 'Current conditions'
	      },
	      icon: {
	        type: 'string',
	        name: 'Current conditions icon URI'
	      },
	      temperature: {
	        type: 'number',
	        name: 'Temperature, deg C'
	      },
	      pressure: {
	        type: 'number',
	        name: 'Pressure, hPa'
	      },
	      humidity: {
	        type: 'number',
	        name: 'Relative Humidity, %'
	      },
	      cover: {
	        type: 'number',
	        name: 'Cloud cover %'
	      },
	      wind_vel: {
	        type: 'number',
	        name: 'Wind speed, km/h'
	      },
	      wind_dir: {
	        type: 'number',
	        name: 'Wind direction, degrees'
	      },
	      location: {
	        type: 'string',
	        name: 'City',
	      },
	      timestamp: {
	        type: 'datetime',
	        name: 'Observation timestamp'
	      }
	    },
		unique_by: ['timestamp']
	  },
	  function (err, dataset) {
	    if (err) {
	      console.error(err);
	      return;
	    }
	
	// request current weather data  
	    request(serverWX).then(data => {
	    var response = JSON.parse(data);	//put full JSON response into object
		var geckoWx = { 					//put desired weather parameters into a new object
				'description'	: response.weather[0].description, 
				'icon'			: 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png', 
				'temperature'	: response.main.temp,
				'pressure'		: response.main.pressure,
				'humidity'		: response.main.humidity,
				'cover'			: response.clouds.all,
				'wind_vel'		: response.wind.speed,
				'wind_dir'		: response.wind.deg,
				'location'		: response.name,
				'timestamp'		: new Date(response.dt * 1000).toISOString() //converet UNIX datetime to ISO 8601
			};
	
	// add data to dataset	
		dataset.post(		
				[geckoWx],
				{delete_by: 'timestamp'},
		        function (err) {
	        		if (err) {
	          			console.error(err);
	          			return;
	        		}
					console.log('SUCCESS: '+ datasetName +' updated with weather data observed at '+  geckoWx.timestamp);
		       	}	 	 
		);
	  	});
	});
});