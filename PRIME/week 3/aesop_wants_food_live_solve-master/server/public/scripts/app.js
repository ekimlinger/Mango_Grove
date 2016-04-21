var aesopFoods = ["Apples", "Pears", "Bananas", "Pizza", "Kale", "Strawberries", "Tacos", "Spaghetti"];
var currentRequest;
var correct = 0;
var incorrect = 0;

$(document).ready(function(){
  $(".container").on("click", "button", clickFoodButton);

  appendButtons();
});

function appendButtons(){
  for(var i = 0; i < aesopFoods.length; i++){
    $(".container").append("<button>" + aesopFoods[i] + "</button>");
    var $el = $(".container").children().last();
    $el.data("food", aesopFoods[i]);
  }
}

function clickFoodButton(){
  var food = $(this).data("food");

  $.ajax({
      type: "GET",
      url: "/food/" + food,
      success: function(data){
        feedAesopFood(data.name);

      }
  });
}



var timer = setInterval(aesopWantsFood, 5000);

function aesopWantsFood(){
  currentRequest = aesopFoods[randomNumber(0, aesopFoods.length - 1)];
  $(".food-request").text(currentRequest);
}

function feedAesopFood(food){
  if(food == currentRequest){
    correct++;
  } else {
    incorrect++;
  }

  console.log("Current Score | Correct: ", correct, " Incorrect: ", incorrect);
  aesopWantsFood();
  clearInterval(timer);
  timer = setInterval(aesopWantsFood, 5000);
}

var randomNumber = function(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};
