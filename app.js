const path = require('path');
const express = require("express");

const defaultRoutes = require('./routes/default');
const restaurantRoutes = require('./routes/restaurants');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public')); //if the recuest is found in public folder use it, otherwise forward to other routes
app.use(express.urlencoded({extended: false}));

app.use('/', defaultRoutes);  //every request that starts with / 
app.use('/', restaurantRoutes);

app.use((req, res) => {
    res.status(404).render('404');   //gets used if a request is not handled by any other route
});

app.use((error, req, res, next) => {
    res.status(500).render('500');
});

app.listen(3000);