var express = require('express');
var router = express.Router();
var path = require('path');

var Message = require('../models/messages.js');
var Comment = require('../models/messages.js');











router.get("/", function(req,res){
  var file = req.params[0] || "/assets/views/admin.html";
  res.sendFile(path.join(__dirname,"../public/", file));
});

module.exports = router;
