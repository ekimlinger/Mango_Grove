$(document).ready(function(){

});


function addComment(){
  //start of add comment to message call
  $.ajax({
    type: 'POST',
    //MAKE SURE TO CHANGE THE URL ROUTE --change
    url: '/comments/message',
    data: comment, //put the comment variable into the database
    success: showGlobalFeed //once comment is added re load feed
  });
}
