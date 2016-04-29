var newMessage = {};

$(document).ready(function(){
    $('#createCommunityPost').on('click',createCommunityPost);
});

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

function addNewMessageToFeed(response){//Append New Message to the Top of the Feed
  var message = response;
  if(message.global == false && message.location != null){
  $('.social-feed-box').prepend('<div class="media animated fadeInRight"></div>');//creates each individual comment
  var $el = $('.social-feed-box').children().first();

  $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
  $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs"><i class="fa fa-comments"></i> Comment</button><button class="btn btn-white btn-xs"><i class="fa fa-share"></i> Share</button></div></div><div class="social-footer></div>');
}
}
