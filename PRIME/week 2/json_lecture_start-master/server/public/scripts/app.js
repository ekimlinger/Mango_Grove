$(document).ready(function(){
    $.ajax({
      type: "GET",
      url: "/data",
      success: function(data){
        appendDom(data);
      }
    });
    $('.people').on("click","button",function(){

      $(this).parent().remove();
    })
});

function appendDom(data){
  console.log(data);
  $('.people').append("<div class='user-profile'></div>");
  var $el = $('.people').children().last();
  $el.append("<h3>" + data.name + "</h3>");
  $el.append("<h3>" + data.phonenumber + "</h3>");
  $el.append("<h3>" + data.kids + "</h3>");
  $el.append("<button class='btn-btn-info'> Delete </button>");
}
