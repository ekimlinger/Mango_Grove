var communityList = ["Carlson School","McCalister School"];
var community = communityList[0];
var messageType = "all";
var newMessage = {};

$(document).ready(function(){
  $("#loadCommunityModal").load('/assets/views/modals/user_post_modal.html');
  $("#loadCommunityCommentModal").load('/assets/views/modals/user_comment_modal.html');
  showMessages(community, messageType);

  for(var i = 0; i < communityList.length; i++){
    $('.community-container').append('<button class="community-filter" data-location="'+communityList[i]+'">'+communityList[i]+'</button>');
  }

  $('.community-filter').on('click',function(){
      community = $(this).data('location');
      showMessages(community, messageType);
  });

  $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
      console.log("This is what Community equals in the filter-messages: ", community);
      messageType = $(this).data('type');
      showMessages(community, messageType);
  });

  $('.compose').on('click',function(){
    console.log("Message Type when being clicked: ", messageType);
    composeMessage(messageType);
  });
  console.log("Message Type on page load: ", messageType);
  //CODE FOR CHARACTER REMAINING IN TEXTAREA

  $('.social-feed-box').on('click', '.messageLike', likeMessage);


  // Flag Message
  $('.social-feed-box').on('click', '.messageFlag', flagMessage);
});


function composeMessage(type){//function that is called to open up the Compose Modal Message which sets the type of the message
    $('.modal-content').data('messageType',type);
    console.log("Message Type inside the compose Message function: ",type);
    $('#userMessageModal').modal('show');
}

function showMessages(community, messageType){//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
  var location = community;
  var type = messageType;
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());

  if(type == "all"){
    $('.text-navy').html(' All Messages');
  }
  else if(type == "af"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Encouragements');
  }
  else if(type == "so"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Shout-Outs');
  }
  else if(type == "mm"){
    $('.text-navy').html('<i class="fa fa-sun-o"></i> Moments');
  }
  console.log("Location: ", location);
  console.log("Type: ", type);
  $.ajax({
    type: 'GET',
    url: '/message/'+location+'/'+type+'/'+amount+'/'+time,
    success: loadCommunityFeed //loads messages on the success of the ajax call
  });
}

function loadCommunityFeed(response){//Loads Messages to GlobalFeed
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

    // Displays ammount of likes if there are any
    var likeAmmount;
    if(message.like){
      likeAmmount = message.like + " ";
    }else{
      likeAmmount = "";
    }

    // Appends to DOM
    $('.social-feed-box').append('<div class="media animated fadeInRight underline"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();
    $el.append('<div class="post-icon"><img src="/assets/views/images/'+ iconType +'.png" height="30" width="30" /></div>');
    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs messageLike" data-id="' + message._id + '"><span>'+ likeAmmount +'</span><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs" id="communityMessageComment" data-toggle="modal" data-target="#userMessageCommentModal" data-id="'+message._id+'"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type messageFlag" data-id="' + message._id + '"><i class="fa fa-flag"></i> Report inappropriate post</button></div>');
    $el.append('<div class="social-footer" id="'+message._id+'"></div>');
    getCommentsByMessage(message._id);
  }
}


// Get message id and make ajax call to increment flag amount in db and on DOM
function flagMessage() {
    var messageID = $(this).data('id');
    if ($(this).data('alreadyPressed') == undefined) {
        $(this).data('alreadyPressed', true);
        $(this).removeClass('btn-white');
        $(this).addClass('btn-warning');
        // Toggle class here in order to only like once
        console.log("About to flag message: ", messageID);
        $.ajax({
            type: "PUT",
            url: '/message/flag/' + messageID,
            success: function(data) {
                console.log("Successfully flagged message: ", messageID);
            }
        });
    }
}


// Get message id and make ajax call to increment like amount in db and on DOM
function likeMessage() {
    var messageID = $(this).data('id');
    if ($(this).data('alreadyPressed') == undefined) {
        $(this).data('alreadyPressed', true);
        $(this).removeClass('btn-white');
        $(this).addClass('btn-success');

        $.ajax({
            type: "PUT",
            url: '/message/like/' + messageID,
            success: function(data) {
                var oldValue = $('[data-id="' + messageID + '"]').children().first().text() || 0;
                var newValue = parseInt(oldValue) + 1;
                $('[data-id="' + messageID + '"]').children().first().text(newValue + " ");
            }
        });
    }
}

// Get comment id and make ajax call to increment like amount in db and on DOM
