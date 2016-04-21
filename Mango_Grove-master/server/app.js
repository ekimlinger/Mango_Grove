var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var router = require('./modules/index.js');

//models
var Post = require('./models/posts');

//routes
var db = require('./routes/db');



//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use('/', router);



app.set("port",(process.env.PORT || 3000));
app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
