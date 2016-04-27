var newMessage = {};

$(document).ready(function(){
  $('#createGuestPost').on('click',createPost);//when submit button is pressed in the guest_comment_modals
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
}
