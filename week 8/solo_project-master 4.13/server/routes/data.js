var express = require('express');
var router = express.Router();
var path = require('path');
var Diary = require('../models/diary');
var Vocabulary = require('../models/vocabulary');
var Exercise = require('../models/exercise');


router.get("/voc/:userID/", function(req, res){
  var userID = req.params.userID;
  Vocabulary.find({user: userID}, function(err, data){
    if (err){
      console.log(err);
    }
    res.send(data);
  });
});

router.post("/voc", function(req,res){
  var addedVoc = new Vocabulary({
    "user": req.body.userID,
    "translation": req.body.translation,
    "query": req.body.query
  });
  addedVoc.save(function(err, data){
    if(err){
      console.log(err);
    }
    res.send(data);
  });
});

router.delete('/voc/:id', function(req,res){
  console.log(req.params);
  Vocabulary.findByIdAndRemove(req.params.id, function(err, data){
    if (err) console.log(err);
    res.send(data);

  });
});

router.get("/diary/:userID/", function(req, res){
  var userID = req.params.userID;
  Diary.find({user: userID}, function(err, data){
    if (err){
      console.log(err);
    }
    res.send(data);
  });
});

router.post("/diary", function(req,res){
  var addedDiary = new Diary({
    "user": req.body.userID,
    "content": req.body.content,
    "date": req.body.date,
    "title": req.body.title,
    "weather": req.body.weather,
  });
  addedDiary.save(function(err, data){
    if(err){
      console.log(err);
    }
    res.send(data);
  });
});

router.delete("/diary/:id", function(req,res){
  console.log(req.params);
  Diary.findByIdAndRemove(req.params.id, function(err, data){
    if (err) console.log(err);
    res.send(data);

  });
});

router.get("/exercise/:userID/", function(req, res){
  var userID = req.params.userID;
  Exercise.find({user: userID}, function(err, data){
    if (err){
      console.log(err);
    }
    res.send(data);
  });
});

router.post("/exercise", function(req,res){
  var addedExercise = new Exercise({
    "user": req.body.userID,
    "type": req.body.type,
    "time": req.body.time,
    "duration": req.body.duration,
    "mood": req.body.mood,
  });
  addedExercise.save(function(err, data){
    if(err){
      console.log(err);
    }
    res.send(data);
  });
});

router.delete("/exercise/:id", function(req,res){
  console.log(req.params);
  Exercise.findByIdAndRemove(req.params.id, function(err, data){
    if (err) console.log(err);
    res.send(data);
  });
});

router.get("/*", function(req,res){
  var file = req.params[0] || "/views/users.html";
  res.sendFile(path.join(__dirname, "../public", file ));
});

module.exports = router;
