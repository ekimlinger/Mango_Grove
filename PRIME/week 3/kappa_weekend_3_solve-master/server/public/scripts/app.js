var mathOp;
var values = {};

$(document).ready(function(){
    $(".math").on("click", assignOp);
    $(".clear").on("click", clearThings);

    $("#mathForm").on('submit',function(event){
  		event.preventDefault();

      console.log("Before object clear: ", values);
  		//values = {};

  		$.each($("#mathForm").serializeArray(), function(i, field){
  			values[field.name] = field.value;
  		});

      doMath(values);
  		// $("#employeeinfo").find("input[type=text]").val("");
  	});
});

function assignOp(){
    mathOp = $(this).data("id");
    values.math = mathOp;
    console.log(values);
}

function doMath(object){
    $.ajax({
        type: "POST",
        url: "/math/" + object.math,
        data: object,
        success: function(response){
          appendDom(response);
        }
    });
}

function clearThings(){
  values = {};
  $(".result").empty();
  $("#mathForm").find("input[type=text]").val("");
}

function appendDom(data){
  $(".result").empty();
  $(".result").text(data);
}
