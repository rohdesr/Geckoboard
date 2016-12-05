## Geckoboard Project for "Support Engineer Coding Challenge"

### Author
Steven R. Rohde, <steverohde@mac.com>
  
  
### Application File
[gb_mtl_wx.js](https://github.com/rohdesr/Geckoboard/blob/master/gb_mtl_wx.js) (Geckoboard Montreal Weather)
  
  
### Application Environment
[Node.js](https://nodejs.org/en/), version 6.9.1.  
_I'm running node.js on a MacBook with macOS 10.12.1._
  
### What it Does
The application calls OpenWeatherMap's [API for Current weather data](http://openweathermap.org/current) to fetch the most recent Montreal weather condition parameters and upload them to Geckoboard dataset `weather.montreal` in my trial Geckboard account. The dataset is used for my Geckoboard dashboard [Montreal Weather](https://share.geckoboard.com/dashboards/WIDSLP54QYJCOVEK).
  
  
### Dataset Update Frequency
OpenWeatherMap updates current weather data at least once every two hours; often the time between updates is a short as 20 minutes. My application runs every 10 minutes (the [node-cron](https://www.npmjs.com/package/node-cron) module serves as the scheduler); however, a new row is only added to the `weather.montreal` dataset when the weather observation timestamp in an API response is later than the timestamp in in the last API response.  In other words, dataset rows correspond to unique OpenWeatherMap update events, not each application run.


### Dataset Schema
Weather condition fields in the dataset `weather.montreal` are:

| Field Name 	| Display Name              	| Type   	| Description                                                                                                                       	|
|--------------	|-----------------------------	|----------	|-------------------------------------------------------------------------------------------------------------------------------------	|
| `description`  	| Current conditions          	| string   	| Short description of current weather conditions, e.g. _light snow_.                                                                 	|
| `icon`         	| Current conditions icon URI 	| string   	| URI for the icon hosted at openweathermap.org that corresponds to the current conditions,   e.g. _light snow_ is represented by >> ![light snow](http://openweathermap.org/img/w/13d.png) 	|
| `temperature`  	| Temperature, deg C          	| number   	| Air temperature, ˚C.                                                                                                                	|
| `pressure`     	| Pressure, hPa               	| number   	| Barometric pressure, hPa (hectopascals).                                                                                                           	|
| `humidity`     	| Relative Humidity, %        	| number   	| Relative humidity.                                                                                                                  	|
| `cover`        	| Cloud cover %               	| number   	| Percent cloud cover.                                                                                                                	|
| `wind_vel`     	| Wind speed, km/h            	| number   	| Wind velocity, km/h                                                                                                                 	|
| `wind_dir`     	| Wind direction, degrees     	| number   	| Wind direction, degrees.                                                                                                             	|
| `location`     	| City                        	| string   	| City name of weather observation.  For my project, all observations are from Montréal, Québec (Canada).                             	|
| `timestamp`    	| Observation timestamp       	| datetime 	| Datetime of observation in ISO 8601 format, e.g., `2016-12-05T20:23:00.000Z`.


### Ideas for Improvement
1. **Improved security**  
Current Issue: API keys are included in the application code.
Improvement: Fetch API key from file.

2. **Additional locations**
Current Issue: Only weather data from Montreal is supported.
Improvement: Add support for additional cities.

3. **Display Current Condition Icon in Image Widget**
Current Issue: The URI for the weather conditions icon is stored in field `icon`; however, the icon cannot be displayed in the dashboard because the image widget does not support datasets.
Improvement: Modify the application so that it publishes the icon image file for the most recent weather observation to a static address on a server.   By referencing a static URI, the image widget can display the current conditions icon.
