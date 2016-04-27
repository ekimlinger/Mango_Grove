  var newMessage = {};//New Message object to be sent down to the database

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


  //  BRADY'S CODE
  var messageType = "all";
  showMessages(messageType);//show all messages on page load

  $('.compose').on('click', composeMessage);//When Compose Buttons are clicked for guests

  $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
    messageType = $(this).data('type');
    showMessages(messageType);
  });
  $('.comment-container').on('click','.delete-message', deleteMessage);
  $('#createGuestPost').on('click', createPost);//when submit button is pressed in the guest_comment_modals
  //WILL NEED #createUserPost event handler

});
//
// EVAN'S CODE
//


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


//
//  BRADY'S CODE
//

function composeMessage(){//function that is called to open up the Compose Modal Message which sets the type of the message
  var composeType = $(this).data('type');
  if(composeType == "mm"){
    $('#mm').replaceWith('<input type="radio" checked name="type" value="mm" id="mm">');
    $('#guestCommentModal').modal('show');
  }
  else if(composeType == "af"){
    $('#af').replaceWith('<input type="radio" checked name="type" value="af" id="af">');
    $('#guestCommentModal').modal('show');
  }
  else if(composeType == "so"){
    $('#so').replaceWith('<input type="radio" checked name="type" value="so" id="so">');
    $('#guestCommentModal').modal('show');
  }
}

function showMessages(messageType){//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
  var type = messageType;
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());
  console.log("Made It here to the conditional Statements: ", type);

  if(type == "all"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> All Messages');
  }
  else if(type == "af"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Affirmations');
  }
  else if(type == "so"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Shout-Outs');
  }
  else if(type == "mm"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Mango Moments');
  }
  $.ajax({
    type: 'GET',
    url: '/message/global/'+type+'/'+amount+'/'+time,
    success: loadGlobalFeed //loads messages on the success of the ajax call
  });
}


function createPost(event){//Create Post Function
    event.preventDefault();
    var messageArray = $('#postMessageForm').serializeArray();  //grab the information from the compose message moda

    $.each(messageArray, function(index, element){//grab information off the form and stores it into the newMessage variable
      newMessage[element.name] = element.value;
    });
    newMessage.global = true;
    //reset input field values
    $('#guestTextarea').val('');
    $('#guestEmail').val('');
    $('#username').val('');
    $.ajax({
      type: 'POST',
      url: '/message',
      data: newMessage, //Pass newMessage to the Database
      success: addNewMessageToFeed //call addNewMessageToFeed function to display new post right away
    });
}

function addNewMessageToFeed(response){//Append New Message to the Top of the Feed
  $('.comment-container').prepend('<div class="media animated fadeInRight"></div>');
  var $el = $('.comment-container').children().first();

  $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+response.date_created+'<br/></div></a>');
  $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+response.content+'<br/><br/>- '+response.name+'</div>');
  $el.append('<div class="media-body react-options"><button class="react-button fa fa-thumbs-o-up" title="Like"></button><button class="react-button fa fa-comment-o" title="Comment"></button><button class="react-button delete-message" data-messageid="'+response._id+'">Delete Post</button></div>');
}


function loadGlobalFeed(response){//Loads Messages to GlobalFeed

  $('.comment-container').empty();  //empty out the div container on the DOM that stores the messages to refresh the page

  for(var i = 0; i <response.length; i++){  //append info to comment-container by looping through the array

    var comment = response[i];//store response into comment for readability
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();

    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
      $el.append('<div class="media-body react-options"><button class="react-button fa fa-thumbs-o-up" title="Like"></button><button class="react-button fa fa-comment-o" title="Comment"></button><button class="react-button delete-message" data-messageid="'+comment._id+'">Delete Post</button></div>');
  }
}
