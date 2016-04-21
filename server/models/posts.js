var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//set up the comment info details for data embed purpose
var commentDetails = new Schema ({
  commentName : {type: String, require: true},
  commentEmail : {type : String, require: true},
  commentText : {type: String, require: true},
  commentFlag : {type: Boolean, require: false},
  commentLike : {type: Number, require: false},

});

//set up the post schema
var Post = new Schema({
    type: {type: String, required: true},
    content: {type: String, required: true},
    date_created: {type: Date, default : Date.now},
    comments : [commentDetails],
    name : {type: String, require: true},
    email : {type: String, require: true},
    location: {type: String, require: true},
    global : {type: Boolean, require: false}

});

module.exports = mongoose.model("Post", Post)
