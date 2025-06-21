const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q={' + encodeURIComponent(address) + '}&access_token=pk.eyJ1IjoiYWxlZWtzYXAiLCJhIjoiY21iYjg2cWl1MTZuczJuczZkaDRzZHh5eSJ9.ox4AYsZWlnzKFDh1bU8MkA&limit=1'

    request({url, json:true},(error,{body})=>{
        if(error){
            callback('Unable to connect to the internet', undefined)
        } else if(body.features.length === 0){
            callback('City does not exist',undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longitude: body.features[0].geometry.coordinates[0],
                place: body.features[0].properties.name
            })
        }
    })

}


module.exports = geocode