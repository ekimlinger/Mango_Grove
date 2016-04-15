var express = require("express");
var router = express.Router();

router.post("/add", function(req,res){
    var result = parseInt(req.body.inputOne) + parseInt(req.body.inputTwo);
    result = result.toString();
    res.send(result);
});

router.post("/sub", function(req,res){
    var result = parseInt(req.body.inputOne) - parseInt(req.body.inputTwo);
    result = result.toString();
    res.send(result);
});

router.post("/multi", function(req,res){
    var result = parseInt(req.body.inputOne) * parseInt(req.body.inputTwo);
    result = result.toString();
    res.send(result);
});

router.post("/div", function(req,res){
    var result = parseInt(req.body.inputOne) / parseInt(req.body.inputTwo);
    result = result.toString();
    res.send(result);
});

module.exports = router;
