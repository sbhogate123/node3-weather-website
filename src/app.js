const getGeoCode = require('./Utils/getGeoCode');
const getForecast = require('./Utils/getForecast');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. Root page) route
    //res.send('<h1>Weather</h1>');
    res.render('index', {
        title : 'Weather App',
        author : 'Siddesh'
    });
});

app.get('/about', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. About page) route
    //res.send('About page.');
    res.render('about', {
        title : 'About',
        author : 'Siddesh'
    });
});

app.get('/help', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. Help page) route
    res.render('help', {
        title : 'Help',
        author : 'Siddesh'
    })
});

app.get('/weather', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. Weather page) route
    if(!req.query.address){
        return res.send({
            error : 'Address is mandatory.'
        });
    }

    getGeoCode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if(error){
            return res.send({ error });
        }
        getForecast(longitude, latitude, (error, forecastData) => {
            if(error){
                return res.send({ error });
            }
            res.send({
                Address : req.query.address,
                Location : location,
                Forecast : forecastData
            });
        });
    })
});

app.get('/help/*', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. Help 404 page) route
    res.render('PageNotFound',{
        title : '404',
        message : 'Help article not found.'
    });
});

app.get('*', (req, res) => {
    // Describe what we want to do when someone visits this (i.e. 404 page) route
    res.render('PageNotFound',{
        title : '404',
        message : 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port .' + port);
});