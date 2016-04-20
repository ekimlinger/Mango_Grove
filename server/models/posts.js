var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var Post = new Schema({
    type: {type: String, required: true},
    content: {type: String, required: true},
    date_created: {type: Date, }
});

module.exports = mongoose.model("Post", Post)
