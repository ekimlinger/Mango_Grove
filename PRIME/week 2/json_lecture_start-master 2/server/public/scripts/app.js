//var newData = data.people;

$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
     for (var i = 0; i<data.people.length; i++) {
          appendDom(data.people[i]);
        }
    //appendDom(data);
      }
    });
});

function appendDom(data) {
$('.people').append("<div></div>")
var $el = $('.people').children().last();
$el.append("<p> name: " + data.name + "</p>");
$el.append("<p> favorite food is: " + data.favFood + "</p>");
$el.append("<p> favorite color is: " + data.favColor + "</p>");
$el.append("<p>" + data.name + " has " + data.kids + " kid(s) </p>");
}
