var newMessage = {};//New Message object to be sent down to the database
var newComment = {};

$(document).ready(function(){
    $("#loadComposeModal").load('../views/modals/guest_comment_modal.html');
    $("#loadWelcomeModal").load('../views/modals/welcome.html');
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
    $('.comment-container').on('click', '.messageComment', getMessageID);
      getComment();

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

  $('.comment-container').empty();  //empty out the div container on the DOM that stores the messages to refresh the page

  for(var i = 0; i <response.length; i++){  //append info to comment-container by looping through the array

    var comment = response[i];//store response into comment for readability
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();

    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
    $el.append('<button class="messageComment" data-id="'+comment._id+'" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#guestMessageCommentModal"> Comment </button>');

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

    //grab the information from the compose message modal NEED THE ID FROM THE FORM --CHANGE
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
      success: sendComment
    });

    //reset input field values
    $('#guestTextarea').val('');
    $('#guestEmail').val('');
    $('#username').val('');

}
function sendComment (){
  var messageID = $("#createGuestComment").data("id");
    $.ajax({
      type: 'GET',
      //MAKE SURE TO CHANGE THE URL ROUTE --change
      url: '/message/comment/'+messageID,

      success: getComment
        //MOST LIKELY WILL NEED AN APPEND TO DOM FUNCTION HERE TO DISPLAY NEW FEED
        //WILL HAVE TO EMPTY THE DIV FIRST AND THEN REPOST ALL NEW INFO --change
    });

}
//loop through the array and append INFO
//append info to comment-container
function getComment(response){
  $('.newComment-container').empty();
//$('.comment-container').empty();
for(var i = 0; i <response.length; i++){
  var comment = response[i];//store response into comment for readability
  console.log(comment);
  console.log("Name: ", comment.name);
  console.log("Content: ", comment.content);
  console.log("id: ", comment._id);

  $('.newComment-container').append('<div class="newComment"></div>');//creates each individual comment
  var $el = $('.newComment-container').children().last();

  $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
  $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');

}
}



  //EXAMPLE OF THE CONTENT CONTAINER FOR EACH INDIVIDUAL MESSAGES
  // <div class="media">
  //     <a class="forum-avatar" href="#">
  //         <img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image">
  //         <div class="author-info">
  //             <strong>Posts:</strong> 543<br/>
  //             <strong>Joined:</strong> June 21.2015<br/>
  //         </div>
  //     </a>
  //     <div class="media-body">
  //         <h4 class="media-heading">Hampden-Sydney College in Virginia</h4>
  //          All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures
  //         <br/><br/>
  //         - Monica Jackson
  //         UX developer
  //     </div>
  // </div>
