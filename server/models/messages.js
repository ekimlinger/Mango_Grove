var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//set up the comment info details for data embed purpose
var Comment = new Schema ({
  name : {type: String, required: true},
  email : {type : String, required: true},
  content : {type: String, required: true},
  flag : {type: Number, required: false},
  like : {type: Number, required: false},
  date_created: {type: Date, default : Date.now}
});

//set up the post schema
var Message = new Schema({
    type: {type: String, required: true},
    content: {type: String, required: true},
    date_created: {type: Date, default : Date.now},
    comments : {type: Array, default: []},
    name : {type: String, required: true},
    email : {type: String, required: true},
    location: {type: String, required: false},
    like: {type: Number, required: false},
    flag: {type: Number, required: false},
    global : {type: Boolean, required: true}

});

module.exports = mongoose.model("Message", Message);
module.exports = mongoose.model("Comment", Comment);
