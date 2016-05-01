var newMessage = {};

$(document).ready(function(){
  $('#createGuestPost').on('click', createPost);//when submit button is pressed in the guest_comment_modals
console.log("Made it into the guest_modal_app.js");

});


function createPost(event){//Create Post Function
  console.log("I made it here inside Create post");

    event.preventDefault();
    var messageArray = $('#postMessageForm').serializeArray();  //grab the information from the compose message moda
    $.each(messageArray, function(index, element){//grab information off the form and stores it into the newMessage variable
      newMessage[element.name] = element.value;
    });

    newMessage.global = true;

    console.log("newMessage is: ", newMessage);
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
  var message = response;
  $('.social-feed-box').prepend('<div class="media animated fadeInRight underline"></div>');//creates each individual comment
  var $el = $('.social-feed-box').children().first();

  $el.append('<div class="post-icon"><img src="/assets/views/images/noun_24896_cc_mod.png" height="30" width="30" /></div>');
  $el.append('<div class="social-avatar"><a href="" class="pull-left"><img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a><div class="media-body"><a href="#">'+message.name+'</a><small class="text-muted">'+message.date_created+'</small></div></div>');
  $el.append('<div class="social-body"><p>'+message.content+'</p><div class="btn-group"><button id ="likePost" data-id="'+message._id+'" class="btn btn-white btn-xs"><i class="fa fa-thumbs-up"></i> Like this!</button><button class="btn btn-white btn-xs" id="messageComment" data-toggle="modal" data-target="#guestMessageCommentModal" data-id="'+message._id+'"><i class="fa fa-comments"></i> Comment</button></div><button class="btn btn-white btn-xs flag-button small-type"><i class="fa fa-flag"></i> Report inappropriate post</button></div>');
  $el.append('<div class="social-footer" id="'+message._id+'"></div>');


}
