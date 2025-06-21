const request  = require('request')

const forecast = (long, lat, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=8ab2a1c1d4172e3b30b913177dab89aa&query=' + lat + ',' + long

    request({url, json:true}, (error,{body})=>{

        if(error){
            callback('Unable to connect to the internet', undefined)
        } else if(body.error){
            callback('Unable to find location',undefined)
        } else {
            const {temperature,precip,weather_descriptions} = body.current
            // callback(undefined, {
            //     temp: temperature,
            //     precip : precip,
            //     weather_desc : weather_descriptions
            // })

            callback(undefined,weather_descriptions + ' It is currently ' + temperature + ' degress out. There is a ' + precip + '% chance of rain.')
        }
    })

}

module.exports = forecast