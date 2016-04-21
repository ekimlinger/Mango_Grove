var express = require('express');
var router = express.Router();
var path = require('path');

var Post = require('../models/posts.js');



router.get('/', function(req,res){
  console.log(req.body);

  Post.find({}, function(err, data){
    if(err){
      console.log(err);
      res.send();
    } else{
      res.send("Get route sends back");
    }
  });
});

router.post('/', function(req,res){
  console.log(req.body);
  var newPost = new Post({
    type: "shoutout",
    content: "great success",
    date_created : 04/20/2016,
    comments : [{
      commentName : "Michelle",
      commentEmail : "shell0720@gmail.com",
      commentText : "yeah!!",
      commentLike : 1
    }],
    name : "Brady",
    email: "brady@gmail.com",
    location: "Prime",
    global : true

  });
  newPost.save(function(err, entry){
    if(err){
      console.log(err);
      res.send("Save request failed");
    } else{
      res.send("Saved new post: ", entry);
    }
  });
});

router.put('/', function(req,res){
  console.log(req.body);
  var reqId = req.body._id;
  Post.update({_id: reqId},
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

router.delete('/', function(req,res){
  console.log(req.body);
  var reqId = req.body._id;
  Post.findOneAndRemove({_id: reqId}, function(err, data){
    if (err){
      console.log(err);
      res.send("Couldn't delete your post, sorry");
    } else{
      res.send("Removed your post! :", data);
    }
  });

  res.send("Delete route sends back");
});



module.exports = router;
