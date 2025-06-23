const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = proccess.env.PORT || 3000


// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')    
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Vremenska prognoza',
        name: 'Aleksa Pavlovic'
    })
})

app.get('/weather', (req,res)=>{
       
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if(error){
            return res.send({error})
        }

        forecast(longitude, latitude, (error, forecastData) => {
            
            if(error){
                return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                locationn: location,
                address: req.query.address,
            })
        })
    })

    
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Page',
        name: 'Aleksa Pavlovic'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title: 'Help page',
        name: 'Aleksa Pavlovic'
    })
})

app.get('/products', (req,res)=>{

    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        products: []
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: '404',
        name: 'Aleksa Pavlovic',
        errorMessage: 'HELP ARTICLE NOT FOUND'
    })
})

app.get('*', (req,res)=>{
     res.render('404',{
        title: '404',
        name: 'Aleksa Pavlovic',
        errorMessage: 'PAGE NOT FOUND'
    })
})

app.listen(port, ()=>{
    console.log('Server is running on port' + port)
})