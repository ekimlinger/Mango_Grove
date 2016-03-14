$(document).ready(function(){
  for(var i = 0; i < cityArray.length; i++){
    $('.city').append("<div>information</div>");

    var $el = $('.city').children().last();
    var city = cityArray[i];

    $el.append('<h1>' + city.name + '</h1>');
    $el.append('<h3>' + city.population + '</h3>');
    $el.append('<h3>' + city.state + '</h3>');
    $el.append('<h5>' + city.landArea + '</h5>');
  }
});

function City (name, population, state, landArea){
  this.name = name;
  this.population = population;
  this.state = state;
  this.landArea = landArea;
  cityArray.push(this);
}

var cityArray = [];

var minneapolis = new City("Minneapolis", 400070, "Minnesota", 58.4);
var fortCollins = new City("Fort Collins", 152061, "Colorado", 47.1 );
var sanFransico = new City("San Fransico", 837442, "California", 46.87);

console.log(cityArray);
