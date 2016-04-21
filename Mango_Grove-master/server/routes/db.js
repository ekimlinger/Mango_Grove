//MONGO
var mongoose = require("mongoose");

//heroku deploy
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

module.exports = MongoDB;
