var transitionTime = 5000;

var timer;
var peopleData = [];
var globalIndex = 0;
var elementArray = [];

$(document).ready(function(){
    init();
    enable();
});

function init(){
  $.ajax({
    type: "GET",
    url: "/data",
    success: function(data){
      console.log(data);
      peopleData = data.kappa;
      createIndexNodes(peopleData);
      updateDom();
      updateHighlight();
    }
  });
}

function enable(){
  $(".next").on("click", clickNext);
  $(".prev").on("click", clickPrev);
  timer = setInterval(interval, transitionTime);
}

function disable(){
  $(".next").off("click", clickNext);
  $(".prev").off("click", clickPrev);
  clearInterval(timer);
}

function interval(){
  //run every 10 seconds
  //move to the next person
  clickNext();
}

function clickNext(){
  clearInterval(timer);
  timer = setInterval(interval, transitionTime);

  globalIndex++;
  if(globalIndex >= peopleData.length){
    globalIndex = 0;
  }
  updateDom();
  updateHighlight();
}

function clickPrev(){
  clearInterval(timer);
  timer = setInterval(interval, transitionTime);
  
  globalIndex--;
  if(globalIndex < 0){
    globalIndex = peopleData.length - 1;
  }
  updateDom();
  updateHighlight();
}

function updateDom(){
  $(".people-container").fadeOut(1000, function(){
    $(".people-container").empty();

    var person = peopleData[globalIndex];

    $(".people-container").append("<div></div>");
    var $el = $(".people-container").children().last();
    $el.append("<p>" + person.name + "</>");
    $el.append("<p>" + person.location + "</>");
    $el.append("<p>" + person.spirit_animal + "</>");
    $el.append("<p>" + person.shoutout + "</>");
    $(".people-container").fadeIn(1000);
  });
}

function createIndexNodes(array){
  for(var i = 0; i < array.length; i++){
    $(".index-container").append("<div class='index-point'></div>");
    var $el = $(".index-container").children().last();
    $el.data("index", i);
    console.log($el.data());
    elementArray.push($el);
  }
}

function updateHighlight(){
  for(var i = 0; i < elementArray.length; i++){
    var $el = elementArray[i];
    if(i == globalIndex){
      $el.addClass("index-hightlight");
    } else {
      $el.removeClass("index-hightlight");
    }
  }
}

/*
You first task is to make an AJAX call from the client side app.js, using the
.ajax method, which will be set to GET, and access the '/data' url. When
successful, it should bring the data back down. You will then need to combine
that with what you learned today about making a carousel.

What I would like to see on the DOM, is one person represented. A series of 22
(or the number of people in the cohort) index points with the first person's
index highlighted or called out in style differently than the others. Also on
the DOM should be a 'next' and 'prev' button. Clicking on the next button should
navigate to the next person, clicking on the prev button should navigate to the
previous person. The highlighted index point should update also as you click
next and prev.

When a person is displayed, show their name, their city, and their piece of
shoutout feedback. Only one person should be show cased at any given time.

You will need to combine everything you learned this week to accomplish this
task, and each of the challenges you have completed this week play a part in
this task.

I posted an example from Zeta that I did here, so you can see the functionality
(Its ugly however), just know I minified the code (no cheating!):

HARD MODE

Include a fade out and fade in animation in-between transitioning people.

PRO MODE

Include a timer that moves to the next person if the user is not clicking on
next or prev. If the user clicks on next or prev, the timer should be reset.
The timer should transition between people every 10 seconds.
*/
