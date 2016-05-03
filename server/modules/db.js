//MONGO
var mongoose = require("mongoose");
var mongoURI =
  // process.env.MONGOLAB_URI ||
  // process.env.MONGOHQ_URL ||
  'mongodb://heroku_rzgkr91k:hpjccd3oc0afdpo94lgjt3ettv@ds013232.mlab.com:13232/heroku_rzgkr91k';

var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err){
    console.log("Mongo Connection Open");
});

module.exports = MongoDB;
