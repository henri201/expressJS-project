const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.render('index');   //parse a template file, confirm it to html and send it back to the browser
});

router.get('/about', function(req, res) {
    res.render('about');
});

module.exports = router;