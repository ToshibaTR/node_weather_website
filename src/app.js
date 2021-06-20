const express = require('express')
const hbs = require('hbs')
const { dirname } = require('path')
const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../Templates/views')
const partialsPath = path.join(__dirname,'../Templates/partials')
const port = process.env.PORT || 4000



const app = express()
app.set('view engine','hbs')
app.use(express.static(publicDirPath))
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Toshiba'
    })
})

app.get('/weather', (req,res)=>
{
    if(!req.query.address)
    {
        return console.log('error:please provide address')
    }
    geocode(req.query.address, (error, { latitude, longitude, location }={}) => {
        if (error) {
            return res.send({error:error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            debugger
            if (error) {
                return res.send({error})
            }
            console.log('In server side app.js')
            console.log(location)
            console.log(forecastData)
            res.send({
                location:location,
                forecast:forecastData,
                address:req.query.address
               })
        })
    })
    
})

app.get('/help',(req,res)=>
{
    res.render('help',{helpText:'This is some helpful text',name:'Toshiba'})
})

app.get('/about', (req,res)=>
{
    res.render('about',{title:'about me',name:'Toshiba'})
})

app.get('/products', (req,res)=>
{
    if(!req.query.search)
    {
       return console.log('error:please provide search')
    }
    res.send({
        products:[]
    })
})

console.log('__dirname',__dirname)
app.listen(port,()=>{console.log('listener is up and running at port 4000')})
