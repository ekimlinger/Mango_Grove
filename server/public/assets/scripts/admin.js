$(document).ready(function(){

  console.log("Jquery is working!");
  getBlockedUsers();
  unblockUser("ekimlinger@gmail.com");
  getFlaggedMessages();
  getFlaggedComments();
  viewFeedback();
  $('.flagged-messages-container').on('click','.delete-message', deleteMessage);
  $('.flagged-comments-container').on('click','.delete-comment', deleteComment);
  $('.flagged-messages-container').on('click','.unflag-message', unflagMessage);
  $('.flagged-comments-container').on('click','.unflag-comment', unflagComment);
});

// APPENDING DOM

function appendBlockedUsers(data){
  for (var i = 0; i < data.length; i++) {
    var user = data[i];
    $('.blockedUsersList').append("<li>"+user+"</li>");
  }
}

function showFlaggedMessages(data){
  $('.flagged-messages-container').empty();  //empty out the div container on the DOM that stores the messages to refresh the page
  if(data.length > 0){
    for(var i = 0; i <data.length; i++){  //append info to comment-container by looping through the array

      var comment = data[i];//store response into comment for readability
      $('.flagged-messages-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
      var $el = $('.flagged-messages-container').children().last();

      $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
      $el.append('<div class="media-body"><h4 class="media-heading">'+comment.name+'</h4>'+comment.content+'<br/><br/></div>');
        $el.append('<div class="media-body react-options"><button class="react-button unflag-message" data-messageid="'+comment._id+'">Remove Flags</button><button class="react-button delete-message" data-messageid="'+comment._id+'">Delete Post</button></div>');
    }
  }else{
    //Appends Message saying "No flagged content"
    $('.flagged-messages-container').append('<div class="media animated fadeInRight"><div class="media-body"><h4 class="media-heading">No Messages are flagged currently.</h4></div></div>');
  }
}
function showFlaggedComments(data){
  $('.flagged-comments-container').empty();  //empty out the div container on the DOM that stores the messages to refresh the page
  if(data.length >0){
    for(var i = 0; i <data.length; i++){  //append info to comment-container by looping through the array

      var comment = data[i];//store response into comment for readability
      $('.flagged-comments-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment

      var $el = $('.flagged-comments-container').children().last();

      $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
      $el.append('<div class="media-body"><h4 class="media-heading">'+comment.name+'</h4>'+comment.content+'<br/><br/></div>');
        $el.append('<div class="media-body react-options"><button class="react-button unflag-message" data-messageid="'+comment._id+'">Remove Flags</button><button class="react-button delete-message" data-messageid="'+comment._id+'">Delete Post</button></div>');
    }
  }else{
    //Appends Message saying "No flagged content"
    $('.flagged-comments-container').append('<div class="media animated fadeInRight"><div class="media-body"><h4 class="media-heading">No Comments are flagged currently.</h4></div></div>');
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
    success: showFlaggedMessages
  });
}
function getFlaggedComments(){
  $.ajax({
    type: 'GET',
    url: '/admin/flaggedComments',
    success: showFlaggedComments
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

function unflagMessage(){
  console.log($(this));
  var messageID = $(this).data('messageid');
  $.ajax({
    type: 'PUT',
    url: '/admin/unflag/'+ messageID,
    success: getFlaggedMessages
  });
}
function unflagComment(){
  var commentID = $(this).data('commentid');
  $.ajax({
    type: 'PUT',
    url: '/admin/comment/unflag/'+ commentID,
    success: getFlaggedComments
  });
}

function deleteMessage(){
  console.log($(this));
  var messageID = $(this).data('messageid');
  $.ajax({
    type: 'DELETE',
    url: '/message/'+ messageID,
    success: getFlaggedMessages
  });
}
function deleteComment(){
  var commentID = $(this).data('commentid');
  $.ajax({
    type: 'DELETE',
    url: '/message/comment/'+ commentID,
    success: getFlaggedComments
  });
}
