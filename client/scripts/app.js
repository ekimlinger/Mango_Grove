var newMessage = {};//New Message object to be sent down to the database

$(document).ready(function(){
    var messageType = "all";
    dismissCheckbox();//checks if do not show again button is checked
    showMessages(messageType);//show all messages on page load
    //When Compose Buttons are clicked for guests
    $('.compose').on('click', composeMessage);
    //Event Handler that will Filter global messages
    $('.filter-messages').on('click',function(){
      messageType = $(this).data('type');
      showMessages(messageType);
    });
    //when submit button is pressed in the guest_comment_modals
    $('#createGuestPost').on('click', createPost);
    //WILL NEED #createUserPost event handler
});

function composeMessage(){
  var composeType = $(this).data('type');
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
    $('#guestCommentModal').modal('show');
  }

}
//Shows specific Messages -- Mango Momment, Affirmations, Shout Outs or All of them
function showMessages(messageType){
  var type = messageType;
  //start of get all messages ajax call
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());
  $.ajax({
    type: 'GET',
    //MAKE SURE TO CHANGE THE URL ROUTE --change
    url: '/message/global/'+type+'/'+amount+'/'+time,
    success: loadGlobalFeed //loads messages on the success of the ajax call
  });
}

//Create Post Function
function createPost(event){
    event.preventDefault();
    //grab the information from the compose message modal NEED THE ID FROM THE FORM --CHANGE
    var messageArray = $('#postMessageForm').serializeArray();
    //grab information off the form and stores it into the newMessage variable
    $.each(messageArray, function(index, element){
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
//Append New Message to the Top of the Feed
function addNewMessageToFeed(response){
  $('.comment-container').prepend('<div class="media animated fadeInRight"></div>');
  var $el = $('.comment-container').children().first();

  $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+response.date_created+'<br/></div></a>');
  $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+response.content+'<br/><br/>- '+response.name+'</div>');

}

//Loads Messages to GlobalFeed
function loadGlobalFeed(response){
  //empty out the div container on the DOM that stores the messages to refresh the page
  $('.comment-container').empty();
  //append info to comment-container by looping through the array
  for(var i = 0; i <response.length; i++){
    var comment = response[i];//store response into comment for readability
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();

    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
  }
}
//dismiss Checkbox fucntion for Welcome modal
function dismissCheckbox(){
  var my_cookie = $.cookie($('.dismiss').attr('name'));
  if (my_cookie && my_cookie == "true") {
      $(this).prop('checked', my_cookie);
      console.log('checked checkbox');
  }
  else{
      $('#welcomeModal').modal('show');
      console.log('uncheck checkbox');
  }

  $(".dismiss").change(function() {
      $.cookie($(this).attr("name"), $(this).prop('checked'), {
          path: '/',
          expires: 1
      });
  });
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
