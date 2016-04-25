var express = require('express');
var router = express.Router();
var path = require('path');

var Message = require('../models/messages.js');
var Comment = require('../models/messages.js');


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
      res.send(data);
    }
  }).sort({_id: -1}).limit(ammount);

});

router.get('/:location/:type/:ammount/:time', function(req,res){

  console.log(req.params);
  var location = req.params.location;
  var ammount = req.params.ammount;
  var time = req.params.time;
  var type = req.params.type;

  Message.find({location: location, time: {$lt: time}}, function(err, data){
    if(err){
      console.log(err);
      res.send();
    } else{
      res.send(data);
    }
  }).sort({_id: -1}).limit(ammount);
  res.send("Dummy res");
});



//  POST REQUESTS

router.post('/comment/:messageID', function(req,res){

  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID);
  var newComment = new Comment({
    name: req.body.name,
    email: req.body.email,
    content: req.body.content,
    flag: 0,
    like: 0
  });
  newComment.save(function(err,comment){
    if(err){
      console.log(err);
      res.send("Error creating comment");
    } else{
      Message.update({_id: messageID},
                  {$push: {comments: comment._id}},
        function(err, comment){
        if(err){
          console.log(err);
          res.send("Save request failed");
        } else{
          res.send("Saved new message: ", comment);
        }
      });
    }
  });

  res.send("Dummy Response from message comment request");
});

//Posts new message
router.post('/', function(req,res){
  console.log(req.body);
  var newMessage = new Message({
    type: req.body.type,
    content: req.body.content,
    name : req.body.name,
    email : req.body.email,
    location: req.body.location,
    like: 0,
    flag: 0,
    global : req.body.global
  });

  newMessage.save(function(err, entry){
    if(err){
      console.log(err);
      res.send("Save request failed");
    } else{
      res.send("Saved new message: ", entry);
    }
  });
});

// Edits comment by id
router.put('/comment/:commentID', function(req,res){
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



router.delete('/:messageID', function(req,res){
  var messageID = req.params.messageID;
  console.log("messageID: ", messageID);

  Post.findOneAndRemove({_id: messageID}, function(err, data){
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
