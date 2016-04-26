$(document).ready(function(){

  console.log("Jquery is working!");
  getBlockedUsers();
  unblockUser("ekimlinger@gmail.com");
  getFlaggedMessages();
  getFlaggedComments();
  viewFeedback();
});

// APPENDING DOM

function appendBlockedUsers(data){
  for (var i = 0; i < data.length; i++) {
    var user = data[i];
    $('.blockedUsersList').append("<li>"+user+"</li>");
  }
}





//AJAX CALLS
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
function unblockUser(userName){
  var body = {userName: userName};
  $.ajax({
    type: 'PUT',
    url: '/admin/unblockUser',
    data: body,
    success: function(data){
      console.log("Unblocked user: ", data);
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
function viewFeedback(){
  $.ajax({
    type: 'GET',
    url: '/admin/allFeedback',
    success: function(data){
      console.log("Got all feedback: ", data);
    }
  });
}
