//when you go to localhost:3000 the first thing that happens is it comes inside this file and hits app.use('/', index);
//then loads index.js

var express = require('express');
var app = express();

var index = require('./routes/index.js');

app.use(express.static('server/public')); //says we're in the server folder, went to make public folder the main folder (our resource folder) to distribute files from

app.use('/', index); //use is a catch all for get, post, delete etc. which redirects the request to index.js where we have abstracted our routes for the purpose of making our code into more readable chuncks


var server = app.listen (3000, function(){//this sets up our server and we leave it alone:)
    var port = server.address().port;
    console.log('now listening on port: ', port);
});