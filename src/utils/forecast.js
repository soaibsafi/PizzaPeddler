const request = require('request');

// https://openweathermap.org/current
// Applied Destructuring
const forecast = (latitude, longitude, callback) => {
    const AccessToken = '62364c2e18e8c3821178322d3704e5b0';
    const url = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+AccessToken;
    request({url, json: true}, function(err, {body}){
        if (err){
            callback('Unable to connect to weather service!', undefined)
        }else if(body.error){
            callback('Unable to find Location!', undefined);
        }else{
            callback(undefined, 
                'It is currently '+ body.weather[0].main + '. The current tempetrature is ' + body.main.temp + ' and the wind speed is '+ body.wind.speed
                //temperature: body.main.temp, wind: body.wind.speed, weather: body.weather[0].main,
            )
        }
    })
};

// https://openweathermap.org/current
/* const forecast = (latitude, longitude, callback) => {
    const AccessToken = '62364c2e18e8c3821178322d3704e5b0';
    const forecastUrl = 'http://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid='+AccessToken;
    request({url: forecastUrl, json: true}, function(err, response){
        if (err){
            callback('Unable to connect to weather service!', undefined)
        }else if(response.body.error){
            callback('Unable to find Location!', undefined);
        }else{
            callback(undefined, {
                temperature: response.body.main.temp,
                wind: response.body.wind.speed,
                weather: response.body.weather[0].main,
            })
        }
    })
}; */

module.exports = forecast;