$(document).ready(function() {
  $("#catForm").on("submit", function (event){
    event.preventDefault();

    var value ={};

    $.each($("#catForm").serializedArray(), function (i, field){
      values[field.name]= field.value;


    });


    $("#catForm").find("input[type=text]").val('');

      catArray.push(values);
      totalCatAge();
    });

  totalCatAge();
})

var catArray = [];

function totalCatAge() {
  var catAge = 0;
  for(var i=0; i<catArray.length; i++){
    var cat = catArray[i];
    catAge += parseInt(cat.catage);
  }

  $(".total-cat-age").text("Here is your total cat age: " + catAge);

}
