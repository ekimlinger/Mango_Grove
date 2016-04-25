var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BlockedUsers = new Schema ({
  list : {type: Array, required: true, default: []}
});


module.exports = mongoose.model("BlockedUsers", BlockedUsers);
