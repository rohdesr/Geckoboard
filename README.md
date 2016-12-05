# Geckoboard Project for "Support Engineer Coding Challenge"

### Author
Steven R. Rohde, <steverohde@mac.com>

### Application File
[gb_mtl_wx.js](https://github.com/rohdesr/Geckoboard/blob/master/gb_mtl_wx.js) (Geckoboard Montreal Weather)

### Application Environment
Node.js

### What it Does
The application calls OpenWeatherMap's [API for Current weather data](http://openweathermap.org/current) every 10 minutes to fetch the most recent Montreal weather condition parameters and upload them Geckoboard dataset `weather.montreal` in my trial Geckboard account. The dataset is used for my Geckboard dashboard [Montreal Weather](https://share.geckoboard.com/dashboards/WIDSLP54QYJCOVEK).

### Dataset Schema
Weather condition fields in the dataset `weather.montreal` are:

| Field Name 	| Display Name              	| Type   	| Description                                                                                                                       	|
|--------------	|-----------------------------	|----------	|-------------------------------------------------------------------------------------------------------------------------------------	|
| `description`  	| Current conditions          	| string   	| Short description of current weather conditions, e.g. _light snow_.                                                                 	|
| `icon`         	| Current conditions icon URI 	| string   	| URI for the icon hosted at openweathermap.org that corresponds to the current conditions.  Example: light snow = ![light snow](http://openweathermap.org/img/w/13d.png) 	|
| `temperature`  	| Temperature, deg C          	| number   	| Air temperature, ˚C.                                                                                                                	|
| `pressure`     	| Pressure, hPa               	| number   	| Barometric pressure, hPa.                                                                                                           	|
| `humidity`     	| Relative Humidity, %        	| number   	| Relative humidity.                                                                                                                  	|
| `cover`        	| Cloud cover %               	| number   	| Percent cloud cover.                                                                                                                	|
| `wind_vel`     	| Wind speed, km/h            	| number   	| Wind velocity, km/h                                                                                                                 	|
| `wind_dir`     	| Wind direction, degrees     	| number   	| Wind direction, degrees                                                                                                             	|
| `location`     	| City                        	| string   	| City name of weather observation.  For my project, all observations are from Montréal, Québec (Canada).                             	|
| `timestamp`    	| Observation timestamp       	| datetime 	| Datetime of observation.  In ISO 8601 format, e.g., `2016-12-05T20:23:00.000Z`.

