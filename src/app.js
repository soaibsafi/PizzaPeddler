const path = require('path');
const { Pool, Client } = require('pg')

const express = require('express');
const hbs = require('hbs');

const client = new Client({
    user: 'pbmdb_rw',
    host: 'pgsql.hrz.tu-chemnitz.de',
    database: 'pbmdb',
    password: 'ingah4eiW',
    port: 5432,
})
client.connect()

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views')
const partiaslPath = path.join(__dirname, '../templates/partials')



// Setup handlebars engine and view location
app.set('view engine', 'hbs')   //set the view engine as hadlebars
app.set('views', viewPath)
hbs.registerPartials(partiaslPath);


//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res)=> {
    res.render('index', {
        title: 'Weather App',
        name: 'Soaib'
    })
});

app.get('/about', (req, res)=> {
    res.render('index', {
        title: 'About me',
        name: 'Soaib'
    })
});
app.get('/help', (req, res)=> {
    res.render('index', {
        title: 'Help',
        name: 'Soaib'
    })
});
app.get('/weather', (req, res) => {

    if(!req.query.address){
        return res.send({
            error: 'You have to provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: 'Please provide a valid address.'
            });
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error: 'Please provide a valid address'
                });
            }
            res.send({
                forecast: forecastdata,
                location: location,
                address: req.query.address
        })
    })
    })
});

//// Calling user by its id

app.get('/user',(request,response)=>{
    if(!request.query.id){
        return response.send({
            error: 'You have to provide an user id'
        })
    }

    var query = {
        text: 'select * from get_customer($1)',
        values:[parseInt(request.query.id)]
    }

    client.query(query, (err, res) => {
        //client.end()
        response.render('customer',{
            username: res.rows[0]['name']
        })
    })

})

app.get('/getPizzaSize',(request,response)=>{

    var query = {
        text: 'select * from get_all_pizza_size()'
    }

    client.query(query, (err, res) => {
        console.log(res.rows);
        //client.end()
        
        response.send({
            pizzaData:res.rows
        })
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term',
        })
    }

    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Soaib',
        errorMessage: 'Help articles not found!'
    })
});

// Need to be at last.
app.get('*', (req, res)=>{
    res.render('404', {
        title: '404',
        name: 'Soaib',
        errorMessage: 'Page not found!'
    })
});



/*
app.get('', (req, res)=> {
    res.send('Hello Express');
});

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About page')
}) */
