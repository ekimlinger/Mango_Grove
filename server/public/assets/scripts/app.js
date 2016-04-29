var newMessage = {};//New Message object to be sent down to the database
var newComment = {};
var likePosts = 0;

$(document).ready(function(){
    $("#loadComposeModal").load('/assets/views/modals/guest_comment_modal.html');
    $("#loadWelcomeModal").load('/assets/views/modals/welcome.html');
    //$("#loadModal").load('../views/modals/guest_comment_modal.html script');
    var messageType = "all";
    showMessages(messageType);//show all messages on page load

    $('.compose').on('click',composeMessage);//When Compose Buttons are clicked for guests

    $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
      messageType = $(this).data('type');
      showMessages(messageType);
    });
    $('#createGuestComment').on('click', createComment);
    //try to grab message id
    $('.social-feed-box').on('click', '#messageComment', getMessageID);

    $('.social-feed-box').on('click', '#likePosts', likePostsCounting);


    //load previous comments when dom loads
    receiveComment();
    //WILL NEED #createUserPost event handler
});

function composeMessage(){//function that is called to open up the Compose Modal Message which sets the type of the message
  var composeType = $(this).data('type');
  console.log("composeType: ", composeType);
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
    $('#guestCommentModal').modal('show');;
  }
}

function showMessages(messageType){//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
  var type = messageType;
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());

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

function loadGlobalFeed(response){//Loads Messages to GlobalFeed

  $('.social-feed-box').empty();  //empty out the div container on the DOM that stores the messages to refresh the page

  for(var i = 0; i <response.length; i++){  //append info to comment-container by looping through the array

    var comment = response[i];//store response into comment for readability
    $('.social-feed-box').append('<div></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();
    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+ comment.name +'</a><small class="text-muted">'+ comment.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+ comment.content+'</p><div class="btn-group"><button id="likePosts"+"'+comment._id+'" class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button id="messageComment" data-id="'+comment._id+'" class= "btn btn-white btn-xs" data-toggle="modal" data-target="#guestMessageCommentModal"><i class="fa fa-comments"></i> Comment</button><button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button></div></div>');
    $el.append('<div class="social-footer" id="'+comment._id+'"></div>');

  }



}

// get messageid by clicking the comment button
function getMessageID (){
  console.log("HERE: " , $(this).data("id"));
  var messageID = $(this).data("id");
  //set the message id for the post button
  $("#createGuestComment").data("id", messageID);
  console.log("this message id will be", messageID);
  console.log("meow");
}
//posting comment to database
function createComment(event){
  //set the messageID key for the comment object
  newComment.messageID = $("#createGuestComment").data("id");
    event.preventDefault();

    //grab the information from the compose comment modal NEED THE ID FROM THE FORM --CHANGE
    var commentArray = $('#postCommentForm').serializeArray();
    //grab information off the form and stores it into the newComment variable
    $.each(commentArray, function(index, element){
      newComment[element.name] = element.value;
      console.log( "New Comment: ", newComment);


    });

    //start of post new comment ajax call
    $.ajax({
      type: 'POST',
      url: '/message/comment',
      data: newComment, //Pass newComment to the Database
      success: receiveComment
    });

    //reset input field values
    $('#guestTextarea').val('');
    $('#guestEmail').val('');
    $('#username').val('');

}
function receiveComment () {
  var messageID = $("#createGuestComment").data("id");
    $.ajax({
      type: 'GET',
      //MAKE SURE TO CHANGE THE URL ROUTE --change
      url: '/message/comment',

      success: showComment
        //MOST LIKELY WILL NEED AN APPEND TO DOM FUNCTION HERE TO DISPLAY NEW FEED
        //WILL HAVE TO EMPTY THE DIV FIRST AND THEN REPOST ALL NEW INFO --change
    });

}
//loop through the array and append INFO
//append info to comment-container
function showComment(response){
  $('.social-footer').empty();
    var messageID = $("#createGuestComment").data("id");
  console.log("Made it here on page load");


for(var i = 0; i <response.length; i++){
  var comment = response[i];//store response into comment for readability
  console.log(comment);
  console.log("Name: ", comment.name);
  console.log("Content: ", comment.content);
  console.log("id: ", comment._id);

    $('#'+ comment.messageID).append('<div class="social-comment"></div>');//creates each individual comment
    var $el = $('#'+comment.messageID).children().last();

    $el.append(' <a href="" class="pull-left"> <img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a>');
    $el.append(' <div class="media-body"><a href="#">'+ comment.name + '</a>' + comment.content+ '<br/><a href="#" class="small"><i class="fa fa-thumbs-up"></i> 26 Like this!</a><small class="text-muted">' + comment.date_created + '</small></div>');



}
}

function likePostsCounting (){
  likePosts++;
  console.log(likePosts);
  

}
