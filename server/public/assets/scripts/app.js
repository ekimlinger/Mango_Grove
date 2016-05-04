var newMessage = {};//New Message object to be sent down to the database
var newComment = {};
var dateOptions = {     // Date formatting options
    year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit"
};



$(document).ready(function(){

    //load all modals to the DOM
    $("#loadComposeModal").load('/assets/views/modals/guest_post_modal.html');
    $("#loadCommentModal").load('/assets/views/modals/guest_comment_modal.html');
    $("#loadWelcomeModal").load('/assets/views/modals/welcome.html');


    var messageType = "all";
    $('.seeMore').data("newType", messageType);
    showMessages(messageType);//show all messages on page load

    $('.compose').on('click',composeMessage);//When Compose Buttons are clicked for guests

    $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
      messageType = $(this).data('type');
      //pass the data type to load more button
      $('.seeMore').data("newType", messageType);
      console.log(messageType);

      showMessages(messageType);
    });



    // Like Abilities
    $('.social-feed-box').on('click', '.messageLike', likeMessage);
    // Flag Abilities
    $('.social-feed-box').on('click', '.messageFlag', flagMessage);


    //load more feed
    $(".social-feed-box").on('click', '.seeMore', showMoreFeed);
});

function composeMessage(){//function that is called to open up the Compose Modal Message which sets the type of the message
    $('#guestCommentModal').modal('show');
}

function showMessages(messageType){//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
  var type = messageType;
  var amount = 20; //Limits how many messages are displayed on the dom at any given time
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
    $('.text-navy').html('<img src="/assets/views/images/mango_small.png" height="20"  />Moments');
  }
  $.ajax({
    type: 'GET',
    url: '/message/global/'+type+'/'+amount+'/'+time,
    success: loadGlobalFeed //loads messages on the success of the ajax call
  });
}

function showMoreFeed(){
  var amount = 20;
  var type = $('.seeMore').data("newType");
  var time = $('.seeMore').data('time');
  console.log(time);
  $(this).remove();

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
      $('.text-navy').html('<img src="/assets/views/images/mango_small.png" height="20"  />Moments');
    }
    $.ajax({
      type: 'GET',
      url: '/message/global/'+type+'/'+amount+'/'+time,
      success: loadMoreGlobalFeed //loads messages on the success of the ajax call
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

    // Displays ammount of likes if there are any
    var likeAmmount;
    if(message.like){
      likeAmmount = message.like + " ";
    }else{
      likeAmmount = "";
    }

    // Formats date/time
    var newDate = new Date(message.date_created);
    message.date_created = newDate.toLocaleTimeString("en-us", dateOptions);

    // Appends to DOM
    $('.social-feed-box').append('<div class="animated fadeInRight underline"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();
    $el.append('<div class="post-icon"><img src="/assets/views/images/'+ iconType +'.png" height="30" width="30" /></div>');
    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs messageLike" data-id="' + message._id + '"><span>'+ likeAmmount +'</span><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs" id="messageComment" data-toggle="modal" data-target="#guestMessageCommentModal" data-id="'+message._id+'"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type messageFlag" data-id="' + message._id + '"><i class="fa fa-flag"></i> Report inappropriate post</button></div>');
    $el.append('<div id="'+message._id+'"></div>');
    getCommentsByMessage(message._id);
    //var messageTime = message.date_created;
    $('.seeMore').data("time", newDate);
  }
    $('.social-feed-box').append('<button class="seeMore filter-messages react-button " autofocus="true" >See More</button>');
}

function loadMoreGlobalFeed(response){//Loads Messages to GlobalFeed
  for(var i = 0; i < response.length; i++){  //append info to comment-container by looping through the array
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

    // Formats date/time
    var newDate = new Date(message.date_created);
    message.date_created = newDate.toLocaleTimeString("en-us", dateOptions);

    // Appends to DOM
    $('.social-feed-box').append('<div class="animated fadeInRight underline"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();
    $el.append('<div class="post-icon"><img src="/assets/views/images/'+ iconType +'.png" height="30" width="30" /></div>');
    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs messageLike" data-id="' + message._id + '"><span>'+ likeAmmount +'</span><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs" id="messageComment" data-toggle="modal" data-target="#guestMessageCommentModal" data-id="'+message._id+'"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type messageFlag" data-id="' + message._id + '"><i class="fa fa-flag"></i> Report inappropriate post</button></div>');
    $el.append('<div id="'+message._id+'"></div>');
    getCommentsByMessage(message._id);
    //var messageTime = message.date_created;
    $('.seeMore').data('time',newDate);
  }
    $('.social-feed-box').append('<button class="seeMore autofocus="true" >See More</button>');
}
// COMMENT FUNCTIONS






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
