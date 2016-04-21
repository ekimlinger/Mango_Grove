var aesopFoods = ["Apples", "Pears", "Bananas", "Pizza"];
var currentRequest;
var correct = 0;
var incorrect = 0;

$(document).ready(function(){
  listeningToAesop();
  aesopWantsFood();
});


function listeningToAesop(){
  $(".apple").on("click", feedLittleBugger);
  $(".pear").on("click", feedLittleBugger);
  $(".pizza").on("click", feedLittleBugger);
  $(".banana").on("click", feedLittleBugger);
}

function feedLittleBugger(){
  var id="";
  if($(this).hasClass("apple")){
    id="Apples";
  }else if($(this).hasClass("pear")){
    id="Pears";
  }else if($(this).hasClass("banana")){
    id="Bananas";
  }else{
    id="Pizza";
  }
  $.ajax({
    type:"GET",
    url:"/food/"+id,
    success: function(response){
      console.log(response);
      feedAesopFood(response);
    }
  });
}

var timer = setInterval(aesopWantsFood, 5000);

function aesopWantsFood(){
  currentRequest = aesopFoods[randomNumber(0, aesopFoods.length - 1)];
  $(".aesopsDesires").html("<h1> Feed Me: "+currentRequest + "</h1>");
}

function feedAesopFood(food){
  if(food == currentRequest){
    correct++;
    $(".correctCount").html("<p> You have fed Aesop correcly " +correct+" times. Saving "+randomNumber(1,1000)*correct+" lives.</p>");
  } else {
    incorrect++;
    $(".incorrectCount").html("<p> You did not feed correctly "+incorrect+ " times. "+randomNumber(1,1000)*incorrect+" people have died due to your ignorance. Do you feel good about yourself?</p>");
  }

   aesopWantsFood();
  clearInterval(timer);
  timer = setInterval(aesopWantsFood, 5000);
}

var randomNumber = function(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};
