$(document).ready(function(){

  console.log("Jquery is working!");
  getBlockedUsers();
  blockUser("ekimlinger@gmail.com");
  getFlaggedMessages();
  getFlaggedComments();
  viewFeedback();
});


function getBlockedUsers(){
  $.ajax({
    type: 'GET',
    url: '/admin/blockedUsers',
    success: appendBlockedUsers
  });
}
function blockUser(userName){
  var body = {userName: userName};
  $.ajax({
    type: 'POST',
    url: '/admin/blockUser',
    data: body,
    success: function(data){
      console.log("Blocked user: ", data);
    }
  });
}
function getFlaggedMessages(){
  $.ajax({
    type: 'GET',
    url: '/admin/flaggedMessages',
    success: function(data){
      console.log("Got all Flagged messages: ", data);
    }
  });
}
function getFlaggedComments(){
  $.ajax({
    type: 'GET',
    url: '/admin/flaggedComments',
    success: function(data){
      console.log("Got all Flagged comments: ", data);
    }
  });
}
function deleteMessage(messageID){
  $.ajax({
    type: 'DELETE',
    url: '/message/'+ messageID,
    success: function(data){
      console.log("Got all Flagged messages: ", data);
    }
  });
}
function deleteComment(commentID){
  $.ajax({
    type: 'DELETE',
    url: '/message/comment/'+ commentID,
    success: function(data){
      console.log("Deleted comment: ", data);
    }
  });
}
function viewFeedback(){
  $.ajax({
    type: 'GET',
    url: '/admin/allFeedback',
    success: function(data){
      console.log("Got all feedback: ", data);
    }
  });
}
