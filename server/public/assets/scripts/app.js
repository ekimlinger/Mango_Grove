
$(document).ready(function(){
    //load all modals to the DOM
    $("#loadComposeModal").load('/assets/views/modals/guest_comment_modal.html');
    $("#loadWelcomeModal").load('/assets/views/modals/welcome.html');
    $("#loadCommunityModal").load('/assets/views/modals/community_post_modal.html');

    var messageType = "all";
    showMessages(messageType);//show all messages on page load

    $('.compose').on('click',composeMessage);//When Compose Buttons are clicked for guests

    $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
      messageType = $(this).data('type');
      showMessages(messageType);
    });
    //WILL NEED #createUserPost event handler
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
    $('.social-feed-box').append('<div class="media animated fadeInRight underline"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();

    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type"><i class="fa fa-flag"></i> Report inappropriate post</button></div><div class="social-footer></div>"');
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

    var message = response[i];//store response into comment for readability
    $('.social-feed-box').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();

    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p>');
    $el.append('<div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button><button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button></div></div>');

  }
}
