const request = require('request');

// https://docs.mapbox.com/api/search/#geocoding
const geocode = (address, callback) => {
    const geocodeAccessToken = 'pk.eyJ1Ijoic29haWIiLCJhIjoiY2tka2EzeWxrMG1wbzJ5bGM3dWw4OXZ4bSJ9.ZHuJ0rpAxilVWEOxH4nhyA';
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token='+geocodeAccessToken+'&limit=1'

    request({url: geocodeURL, json: true}, (err, {body})=> {
        if(err) {
            callback('Unable to connect to weather service!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find Location!', undefined);
        }else{
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
};

module.exports = geocode;