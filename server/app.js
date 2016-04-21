var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//ROUTES
var router = require('./modules/index.js');
var postRouter = require('./modules/postRouter.js');

//MONGO
var mongoose = require("mongoose");
var mongoURI =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/mango_grove';

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err){
    console.log("Mongo Connection Open");
});


//BODYPARSER
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



app.use('/post', postRouter);
app.use('/', router);


app.set("port",(process.env.PORT || 3000));
app.listen(app.get("port"),function(){
  console.log("Listening on port: ", app.get("port"));
});

module.exports = app;
