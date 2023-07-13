
const fs = require('fs');  //filesystem
const path = require('path');

const express = require("express");
const uuid = require('uuid');

const resData = require('./util/restaurant-data');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public')); //if the recuest is found in public folder use it, otherwise forward to other routes
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index');   //parse a template file, confirm it to html and send it back to the browser
});

app.get('/restaurants', function(req, res){
    
    const storedRestaurants = resData.getStoredRestaurants();
    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants,});
});

app.get('/restaurants/:id', function (req, res){
    const restaurantId = req.params.id;
    const storedRestaurants = resData.getStoredRestaurants();

   for(const restaurant of storedRestaurants){
    if(restaurant.id === restaurantId){
        return res.render('restaurants-copy', { restaurant: restaurant });
    }
   }

   res.status(404).render('404');
});

app.get('/recommend', function(req, res) {
    /*const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath); */
    res.render('recommend');
});

app.post('/recommend', function(req, res){
   const restaurant = req.body;
   restaurant.id = uuid.v4();
   const restaurants = resData.getStoredRestaurants();

   restaurants.push(restaurant);

   resData.storeRestaurants(restaurants);

   res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
    res.render('confirm');
});
app.get('/about', function(req, res) {
    res.render('about');
});


app.use((req, res) => {
    res.status(404).render('404');   //gets used if a request is not handled by any other route
});

app.use((error, req, res, next) => {
    res.status(500).render('500');
});

app.listen(3000);