var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://localhost/basic_walking_skeleton');
var Cat = mongoose.model('Cat', {name:String});
router.post('/add',function(request,response){
  var kitty = new Cat({name:request.body.name});
  kitty.save(function(err){
    if(err)console.log('meow %s', err);
    response.send(kitty.toJSON());
  });
});

router.get('/cats',function(request, response){
  return Cat.find({}).exec(function(err,cats){
    if(err)throw new Error(err);
    response.send(JSON.stringify(cats));
  });
});

router.get('/*',function(req,res){
  console.log("Here is a console.log");
  var file = req.params[0]||'views/index.html';
  res.sendFile(path.join(__dirname,'../public',file));

});

module.exports = router;
