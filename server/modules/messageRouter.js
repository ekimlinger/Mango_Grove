var express = require('express');
var router = express.Router();
var path = require('path');

var Message = require('../models/messages.js');
var Comment = require('../models/comment.js');

//
// GET REQUESTS
//

// Get comments for a specified message
router.get('/comment/:messageID', function(req,res){
  var messageID = req.params.messageID;
      Comment.find({messageID: messageID}, function(err, data){
        if(err){
          console.log(err);
        }
          res.send(data);
      });
});

// Gets all global messages that match vv these parameters
router.get('/global/:type/:amount/:time', function(req,res){

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

// Gets all messages by location that match these parameters
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


//
//  POST REQUESTS
//

// Posts new comment pushes new _id into message array
router.post('/comment/:messageID', function(req,res){

  var messageID = req.params.messageID;
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

//
// PUT REQUESTS
//

// Increments message likes by one when called
router.put('/comment/like/:commentID', function(req,res){
  var commentID = req.params.commentID;
  Comment.update({_id: commentID},
              {$inc: {like: 1}},
             function(err, data){
               if(err){
                 console.log(err);
                 res.send("Failed to update your post");
               } else{
                 res.send(data);
               }
  });
});

// Edits comment by id **CURRENTLY NOT IN USE**
router.put('/comment/:commentID', function(req,res){
  var messageID = req.params.messageID;
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
});


// Increments message likes by one when called
router.put('/like/:messageID', function(req,res){
  var messageID = req.params.messageID;
  Message.update({_id: messageID},
              {$inc: {like: 1}},
             function(err, data){
               if(err){
                 console.log(err);
                 res.send("Failed to update your post");
               } else{
                 res.send(data);
               }
  });
});

// Edits Message by id **CURRENTLY NOT IN USE**
router.put('/:messageID', function(req,res){
  var messageID = req.params.messageID;
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
});


//
// DELETE REQUESTS
//

// Deletes message by ID
router.delete('/:messageID', function(req,res){
  var messageID = req.params.messageID;
  Message.findOneAndRemove({_id: messageID}, function(err, data){
    if (err){
      console.log(err);
      res.send("Couldn't delete your post, sorry");
    } else{
      res.send("Removed your message! :", data);
    }
  });

});

// Deletes comment by ID
router.delete('/comment/:commentID', function(req,res){
  var commentID = req.params.commentID;
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
