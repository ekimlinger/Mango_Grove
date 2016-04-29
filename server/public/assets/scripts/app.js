var newMessage = {};//New Message object to be sent down to the database
var newComment = {};

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

    // Comment Abilities
    $('#createGuestComment').on('click', createComment);
    // Gets messageID for modal to post to
    $('.social-feed-box').on('click', '#messageComment', getMessageID);

});

function composeMessage(){//function that is called to open up the Compose Modal Message which sets the type of the message
    $('#guestCommentModal').modal('show');
}

function showMessages(messageType){//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
  var type = messageType;
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());

  if(type == "all"){
    $('.text-navy').html(' All Messages');
  }
  else if(type == "af"){
    $('.text-navy').html('<img src="/assets/views/images/noun_75102_cc.png" height="20" width="20" /> Encouragements');
  }
  else if(type == "so"){
    $('.text-navy').html('<img src="/assets/views/images/noun_24896_cc_mod.png" height="20" width="20" /> Shout-Outs');
  }
  else if(type == "mm"){
    $('.text-navy').html('<img src="/assets/views/images/mango.png" height="20" width="20" />Moments');
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

    var message = response[i];//store response into comment for readability

    var iconType;             // Sets icon type to be displayed on dom
    switch (message.type) {
      case "so":
        iconType = "noun_24896_cc_mod"
        break;
      case "mm":
        iconType = "mango"
        break;
      case "af":
        iconType = "noun_75102_cc"
        break;
    }

    $('.social-feed-box').append('<div class="media animated fadeInRight underline"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();

    $el.append('<div class="post-icon"><img src="/assets/views/images/'+ iconType +'.png" height="30" width="30" /></div>');
    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs" id="messageComment" data-toggle="modal" data-target="#guestMessageCommentModal" data-id="'+message._id+'"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type"><i class="fa fa-flag"></i> Report inappropriate post</button></div>');
    $el.append('<div class="social-footer" id="'+message._id+'"></div>');
    getCommentsByMessage(message._id);
  }
}



// COMMENT FUNCTIONS


// get messageid by clicking the comment button
function getMessageID() {
    console.log("HERE: ", $(this).data("id"));
    var messageID = $(this).data("id");
    //set the message id for the post button
    $("#createGuestComment").data("id", messageID);
    console.log("this message id will be", messageID);
}
//posting comment to database
function createComment(event) {
    //set the messageID key for the comment object
    newComment.messageID = $("#createGuestComment").data("id");
    event.preventDefault();
    //grab the information from the compose comment modal NEED THE ID FROM THE FORM
    var commentArray = $('#postCommentForm').serializeArray();
    //grab information off the form and stores it into the newComment variable
    $.each(commentArray, function(index, element) {
        newComment[element.name] = element.value;
        console.log("New Comment: ", newComment);
    });
    // Send to server to be saved,
    $.ajax({
        type: 'POST',
        url: '/message/comment/'+ newComment.messageID,
        data: newComment,
        success: function(data){
          getCommentsByMessage(newComment.messageID);
        }
    });
    //reset input field values
    $('#guestTextarea').val('');
    $('#guestEmail').val('');
    $('#username').val('');

}

function getCommentsByMessage(messageID) {
    var messageID = messageID;
    $.ajax({
        type: 'GET',
        url: '/message/comment/'+ messageID,
        success: showComments
    });

}

//loop through the array and append INFO
//append info to comment-container
function showComments(response) {
  console.log(response);
  // Shows comments if available
  if(response.length){
    var messageID = response[0].messageID;
    $('#'+messageID).empty();
    for (var i = 0; i < response.length; i++) {
        var comment = response[i]; //store response into comment for readability

        $('#' + comment.messageID).append('<div class="social-comment"></div>'); //creates each individual comment
        var $el = $('#' + comment.messageID).children().last();

        $el.append(' <a href="" class="pull-left"> <img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a>');
        $el.append(' <div class="media-body"><a href="#">' + comment.name + '</a> ' + comment.content + '<br/><a href="#" class="small">'+comment.like+'<i class="fa fa-thumbs-up"></i>Like this!</a><small class="text-muted">' + comment.date_created + '</small></div>');
    }
  }
}
