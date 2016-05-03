//MONGO
var mongoose = require("mongoose");
var mongoURI =
  // process.env.MONGOLAB_URI ||
  // process.env.MONGOHQ_URL ||
  'mongodb://admin:MangoGrove@ds013212.mlab.com:13212/heroku_btq31zn7';

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err){
    console.log("Mongo Connection Open");
});

module.exports = MongoDB;
