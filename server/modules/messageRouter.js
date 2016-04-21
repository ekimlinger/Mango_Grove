var express = require('express');
var router = express.Router();
var path = require('path');

var Message = require('../models/messages.js');



// GET REQUESTS

router.get('/global/:type/:ammount/:time', function(req,res){

  console.log(req.params);
  var ammount = req.params.ammount;
  var time = req.params.time;
  var type = req.params.type;

  Message.find({global: true, time: {$lt: time}}, function(err, data){
    if(err){
      console.log(err);
      res.send();
    } else{
      res.send("Get route sends back");
    }
  });

});

router.get('/:community/:type/:ammount/:time', function(req,res){

  console.log(req.params);
  var community = req.params.community;
  var ammount = req.params.ammount;
  var time = req.params.time;
  var type = req.params.type;

  Message.find({global: true, time: {$lt: time}}, function(err, data){
    if(err){
      console.log(err);
      res.send();
    } else{
      res.send("Get route sends back");
    }
  });
  res.send("Dummy res");
});



//  POST REQUESTS

router.post('/comment/:messageID', function(req,res){

  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID);
  var newComment = {
    // Comment keys go here
  };
  Message.update({_id: req.params.messageID},
              {/* push newComment into array*/},
    function(err, entry){
    if(err){
      console.log(err);
      res.send("Save request failed");
    } else{
      res.send("Saved new message: ", entry);
    }
  });
  res.send("Dummy Response from message comment request");
});

//Posts new message
router.post('/', function(req,res){
  console.log(req.body);
  var newMessage = new Message({
    // Message keys go here
  });
  newMessage.save(function(err, entry){
    if(err){
      console.log(err);
      res.send("Save request failed");
    } else{
      res.send("Saved new message: ", entry);
    }
  });
  res.send("Dummy response from post request");
});

// Edits Message by id
router.put('/:messageID', function(req,res){
  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID);
  Message.update({_id: reqId},
              {/* Whatever you would like to change*/},
             function(err, data){
               if(err){
                 console.log(err);
                 res.send("Failed to update your post");
               } else{
                 res.send("Updated Post :", data);
               }
  });

  res.send("Put/update route sends back");
});

// Edits comment by id
router.put('/comment/:messageID/:commentID', function(req,res){
  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID, "commentID: ", commentID);
  Message.update({_id: reqId},
              {/* Whatever you would like to change*/},
             function(err, data){
               if(err){
                 console.log(err);
                 res.send("Failed to update your post");
               } else{
                 res.send("Updated Post :", data);
               }
  });

  res.send("Put/update route sends back");
});

router.delete('/:messageID', function(req,res){
  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID);

  Post.findOneAndRemove({_id: reqId}, function(err, data){
    if (err){
      console.log(err);
      res.send("Couldn't delete your post, sorry");
    } else{
      res.send("Removed your message! :", data);
    }
  });

  res.send("Delete route sends back");
});



module.exports = router;
