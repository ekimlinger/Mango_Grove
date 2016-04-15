//this page says oh, we got a get request, lets send a response
var express = require ("express");
var path = require ("path");
var router = express.Router();
var mother = require('../modules/mother.js');



router.get("/addEmployee", function(request, response){
    var employee = mother();

    console.log(employee);
    response.send(employee);
});

router.get("/", function(request, response){
    console.log('youve hit the index route');
    response.sendFile(path.join(__dirname, "../public/views/index.html"));
});


module.exports = router;
