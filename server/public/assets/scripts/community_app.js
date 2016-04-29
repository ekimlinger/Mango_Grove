
var communityList = ["Carlson School","McCalister School"];
var community = communityList[0];
var messageType = "all";
var newMessage = {};

$(document).ready(function(){
  showMessages(community, messageType);
  for(var i = 0; i < communityList.length; i++){
    $('.community-list').append('<label><input type="checkbox" name="location" value="'+communityList[i]+'"> '+communityList[i]+'</label> ');
    $('.community-container').append('<button class="community-filter" data-location="'+communityList[i]+'">'+communityList[i]+'</button>')
  }

  $('.community-filter').on('click',function(){
      community = $(this).data('location');
      showMessages(community, messageType);
  });

  $('.filter-messages').on('click',function(){//Event Handler that will Filter global messages
      messageType = $(this).data('type');
      showMessages(community, messageType);
  });

  $('#createCommunityPost').on('click',createCommunityPost);

  //CODE FOR CHARACTER REMAINING IN TEXTAREA
  var maxLength = 150;
  $('#communityTextarea').keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    $('.chars').text(length);
  });
});//END OF DOCUMENT READY

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

function createCommunityPost(){
  var checked = $("input[type=checkbox]:checked").length;
  if(!checked) {
    $('#errorMessage').text("You must check at least one checkbox.");
    return false;
  }

  event.preventDefault();
  var messageArray = $('#communityPostMessageForm').serializeArray();  //grab the information from the compose message moda
  newMessage.location = [];
  newMessage.global = false;//Set global to false unless user checks
  $.each(messageArray, function(index, element){//grab information off the form and stores it into the newMessage variable
    if(element.name == "location"){
      newMessage.location.push(element.value);//push multiple locations to location key
    }
    else{
      newMessage[element.name] = element.value;
    }
  });

  $.ajax({
    type: 'POST',
    url: '/message',
    data: newMessage, //Pass newMessage to the Database
    success:  addNewMessageToFeed
  });
}

function loadCommunityFeed(response){
  console.log("Load Community Feed: ", response);
  $('.social-feed-box').empty();  //empty out the div container on the DOM that stores the messages to refresh the page

  for(var i = 0; i <response.length; i++){  //append info to comment-container by looping through the array

    var message = response[i];//store response into comment for readability
    $('.social-feed-box').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.social-feed-box').children().last();

    $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
    $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button><button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button></div></div><div class="social-footer></div>"');
  }
}

function addNewMessageToFeed(response){//Append New Message to the Top of the Feed
  var message = response;
  if(message.global == false && message.location != null){
  $('.social-feed-box').prepend('<div class="media animated fadeInRight"></div>');//creates each individual comment
  var $el = $('.social-feed-box').children().first();

  $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
  $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button><button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button></div></div><div class="social-footer></div>');
}
}
