var express = require('express');
var router = express.Router();
var path = require('path');

var Message = require('../models/messages.js');
var Comment = require('../models/comment.js');


// GET REQUESTS
router.get('/comment/:messageID', function(req,res){
  var messageID = req.params.messageID;
  console.log(req.params);
      Comment.find({messageID: messageID}, function(err, data){
        if(err){
          console.log(err);
        }
          res.send(data);
      });
});


router.get('/global/:type/:amount/:time', function(req,res){

  console.log(req.params);
  var amount = parseInt(req.params.amount);
  var time = req.params.time;
  var type = req.params.type;

  if (type == 'all') {
      Message.find({global: true, date_created:{'$lt' : new Date(time)}}, function(err, data){
        if(err){
          console.log(err);
          res.send();
        } else{
          res.send(data);
        }
      }).sort({_id: -1}).limit(amount);
    }
    else{
      Message.find({global: true, type: type, date_created:{'$lt' : new Date(time)}}, function(err, data){
        if(err){
          console.log(err);
          res.send();
        } else{
          res.send(data);
        }
      }).sort({_id: -1}).limit(amount);
    }
});

router.get('/:location/:type/:amount/:time', function(req,res){

  console.log(req.params);
  var location = req.params.location;
  var amount = parseInt(req.params.amount);
  var time = req.params.time;
  var type = req.params.type;

  if (type == 'all') {
        Message.find({location: { $in: [location]} }, function(err, data){
          if(err){
            console.log(err);
            res.send();
          } else{
            console.log("Data that is being sent back: ", data);
            res.send(data);

          }
        }).sort({_id: -1}).limit(amount);
      }else{
        Message.find({location: { $in: [location]}, type: type, date_created:{'$lt' : new Date(time)}}, function(err, data){
          if(err){
            console.log(err);
            res.send();
          } else{
            res.send(data);
          }
        }).sort({_id: -1}).limit(amount);
      }
});



//  POST REQUESTS

router.post('/comment/:messageID', function(req,res){

  var messageID = req.params.messageID;
  console.log("req.body: ", req.body, "messageID: ", messageID);
  var newComment = new Comment({
    messageID: messageID,
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
});

//Posts new message
router.post('/', function(req,res){
  console.log("Message Being Posted Server Side: ", req.body);
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

  Message.findOneAndRemove({_id: messageID}, function(err, data){
    if (err){
      console.log(err);
      res.send("Couldn't delete your post, sorry");
    } else{
      res.send("Removed your message! :", data);
    }
  });

});

router.delete('/comment/:commentID', function(req,res){
  var commentID = req.params.commentID;
  console.log("commentID: ", commentID);

  Comment.findOneAndRemove({_id: commentID}, function(err, data){
    if (err){
      console.log(err);
      res.send("Couldn't delete your comment, sorry");
    } else{
      res.send("Removed your comment! :", data);
    }
  });

});



module.exports = router;
