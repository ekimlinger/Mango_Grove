var express = require('express');
var router = express.Router();
var path = require('path');

var Post = require('../models/posts.js');



// GET REQUESTS

router.get('/global/:type/:ammount/:time', function(req,res){

  console.log(req.params);
  // var ammount = req.params.ammount;
  // var time = req.params.time;
  // var type = req.params.type;

  Post.find({global: true, time: {$lt: time}}, function(err, data){
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
  // var community = req.params.community;
  // var ammount = req.params.ammount;
  // var time = req.params.time;
  // var type = req.params.type;

  // Post.find({global: true, time: {$lt: time}}, function(err, data){
  //   if(err){
  //     console.log(err);
  //     res.send();
  //   } else{
  //     res.send("Get route sends back");
  //   }
  // });
  res.send("Dummy res");
});

//  POST REQUESTS

router.post('/comment/:postID', function(req,res){

  var postID = req.params.postID;
  console.log("req.body: ", req.body, "PostID: ", postID);
  // var newComment = {
  //   // Comment keys go here
  // };
  // Post.update({_id: req.params.postID},
  //             {/* push newComment into array*/},
  //   function(err, entry){
  //   if(err){
  //     console.log(err);
  //     res.send("Save request failed");
  //   } else{
  //     res.send("Saved new post: ", entry);
  //   }
  // });
  res.send("Dummy Response from post comment request");
});


router.post('/', function(req,res){
  console.log(req.body);
  var newPost = new Post({
    // Post keys go here
  });
  newPost.save(function(err, entry){
    if(err){
      console.log(err);
      res.send("Save request failed");
    } else{
      res.send("Saved new post: ", entry);
    }
  });
  res.send("Dummy response from post request");
});

router.put('/:postID', function(req,res){
  console.log(req.body);
  var reqId = req.body._id;
  // Post.update({_id: reqId},
  //             {/* Whatever you would like to change*/},
  //            function(err, data){
  //              if(err){
  //                console.log(err);
  //                res.send("Failed to update your post");
  //              } else{
  //                res.send("Updated Post :", data);
  //              }
  // });

  res.send("Put/update route sends back");
});

router.delete('/:postID', function(req,res){
  var postID = req.params.postID;
  console.log("req.body: ", req.body, "PostID: ", postID);
  //
  // Post.findOneAndRemove({_id: reqId}, function(err, data){
  //   if (err){
  //     console.log(err);
  //     res.send("Couldn't delete your post, sorry");
  //   } else{
  //     res.send("Removed your post! :", data);
  //   }
  // });

  res.send("Delete route sends back");
});



module.exports = router;
