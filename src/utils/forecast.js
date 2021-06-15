const request = require('request')
const forecast = (lat,long,callback) =>
{
    
    const url = 'http://api.weatherstack.com/current?access_key=d3f1b2712109d9ebfefc2133cd374028&query='+lat+','+long+'&units=f'
 
    request({url , json:true}, (error,{body}) =>
    {
        debugger
        console.log(url)
        if(error !== null)
        {
            callback('error in Internet connection',undefined)
        }
        else if(body.error)
        {
            callback('forecast:unable to load data',undefined)
        }
        else
        {
            callback(undefined, body.current.weather_descriptions[0]+'.It feels like'+ body.current.feelslike+'Temperature is'+ body.current.temperature)
        }
    })
}   

    module.exports = forecast


