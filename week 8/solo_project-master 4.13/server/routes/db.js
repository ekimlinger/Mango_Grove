var mongoose = require("mongoose");

var mongoURI = "mongodb://localhost/kappa_solo";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on("error", function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once("open", function(err){
    console.log("Mongo Connection Open");
});

module.exports = MongoDB;
