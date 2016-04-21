console.log("Project up and running");

//for db testing
function sendData(taskData){
  $.ajax({
    type: 'POST',
    url: '/post',
    data: taskData,
    success : function (data){
      console.log(data);
    }
  });

}

$(document).ready(function(){
  var taskData = ({
      type: "shoutout",
      content: "great success",
      date_created : 04/20/2016,
      comments : [{
        commentName : "Michelle",
        commentEmail : "shell0720@gmail.com",
        commentText : "yeah!!"
      }],
      name : "Brady",
      email: "brady@gmail.com",
      location: "Prime",
      global : true

    });
  sendData(taskData);
  console.log("meow");
});
