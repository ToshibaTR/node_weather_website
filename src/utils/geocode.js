const request = require('request')

const geocode = (address, callback)=>
{  debugger
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoidG9zaGliYXRyIiwiYSI6ImNrcGd4bGhxMzB3MXgyd3AzejE1c3BsdTkifQ.CLausomD8ZAphS66RLQfeg'
    request({url ,json:true}, (error,{body}) =>
    {   console.log(url)
        if(error!==null)
        {
            callback('Error internet connection',undefined)
        }
        else if(body.features.length == 0)
        {
            callback('Geocode:unable to load data .Try another search',undefined)
        }
        else
        {  
            console.log(body.features[0])
            callback(undefined,{latitude:body.features[0].center[1], longitude:body.features[0].center[0], location:body.features[0].place_name})
            debugger
        }

    })
}


module.exports=geocode