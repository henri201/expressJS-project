const fs = require('fs');  //filesystem
const express = require("express");
const uuid = require('uuid');
const path = require('path');
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public')); //if the recuest is found in public folder use it, otherwise forward to other routes
app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res){
    res.render('index');   //parse a template file, confirm it to html and send it back to the browser
});

app.get('/restaurants', function(req, res){
    
    const filePath = path.join(__dirname, 'data', 'restaurants.json');

    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);
    res.render('restaurants', {numberOfRestaurants: storedRestaurants.length, restaurants: storedRestaurants,});
});

app.get('/restaurants/:id', function (req, res){
    const restaurantId = req.params.id;
    res.render('restaurants-copy', {rid: restaurantId});
});

app.get('/recommend', function(req, res) {
    /*const htmlFilePath = path.join(__dirname, 'views', 'recommend.html');
    res.sendFile(htmlFilePath); */
    res.render('recommend');
});

app.post('/recommend', function(req, res){
   const restaurant = req.body;
   restaurant.id = uuid.v4();
   const filePath = path.join(__dirname, 'data', 'restaurants.json');

   const fileData = fs.readFileSync(filePath);
   const storedRestaurants = JSON.parse(fileData);

   storedRestaurants.push(restaurant);

   fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));

   res.redirect('/confirm');
});

app.get('/confirm', function(req, res) {
    res.render('confirm');
});
app.get('/about', function(req, res) {
    res.render('about');
});

app.listen(3000);