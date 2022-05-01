const path = require('path')
const express = require('express')
const hbs = require('hbs')


const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, 'public')
const viewsPath = path.join(__dirname, 'templates/views')
const partialPath = path.join(__dirname, 'templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mina Samir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Mina Samir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is a help message',
        name: 'Mina Samir'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address, (error, geoData) => {
        if (error) {
            return res.send({ error })
        }

        forecast(geoData.lat, geoData.long, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(geoData.location)
            console.log(forecastData)
            res.send({
                forecast: 'Temperature is ' + forecastData.degree + ', It feels like ' + forecastData.feelsLikeDegree,
                location: geoData.location,
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: ' You myust provide a search term'
        })
        return
    }
    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'help article does not found',
        name: 'Mina Samir'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        error: 'Page not found',
        name: 'Mina Samir'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})