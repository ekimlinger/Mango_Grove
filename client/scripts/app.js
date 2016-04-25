var newMessage = {};//New Message object to be sent down to the database
var allMessages;
$(document).ready(function(){
    //when submit button is pressed in the guest_comment_modals
    $('#createGuestPost').on('click', createPost);
    //WILL NEED #createUserPost event handler
    //Event Handlers that will Filter global messages
    $('#shoutOut').on('click',showAllShoutOuts);
    $('#mangoMoment').on('click',showAllMangoMoments);
    $('#affirmation').on('click',showAllAffirmations);
    $('#all').on('click',getGlobalMessages);
    //Load
    getGlobalMessages();
});

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

    console.log("Data coming off form: ", newMessage);
    //start of post new message ajax call
    $.ajax({
      type: 'POST',
      url: '/message',
      data: newMessage, //Pass newMessage to the Database
      success: getGlobalMessages
    });

    //reset input field values
    $('#guestTextarea').val('');
    $('#guestEmail').val('');
    $('#username').val('');

}
//Function Grabs all Global Messages
function getGlobalMessages(){
  var type = $(this).data('type') || 'all';
  //When function is called pass in type of "all", "so", "mm","af"
  //start of get all messages ajax call
  var amount = 20;//Limits how many messages are displayed on the dom at any given time
  var time = new Date(Date.now());
  $.ajax({
    type: 'GET',
    //MAKE SURE TO CHANGE THE URL ROUTE --change
    url: '/message/global/'+type+'/'+amount+'/'+time,

    success: showAllGlobalFeed
      //MOST LIKELY WILL NEED AN APPEND TO DOM FUNCTION HERE TO DISPLAY NEW FEED
      //WILL HAVE TO EMPTY THE DIV FIRST AND THEN REPOST ALL NEW INFO --change
  });
}

function showAllGlobalFeed(response){//response is the data coming back from the database. NOT SURE EXACTLY HOW IT IS GOING TO COME BACK
  allMessages = response;
  //empty out the div container on the DOM that stores the messages to refresh
  console.log("Successful Get Request: ", response);
  $('.comment-container').empty();
  console.log("Response from get route is: ", response);

    success: showAllGlobalFeed //show all messages on the success of the ajax call
  });
}
//Shows all messages
function showAllGlobalFeed(response){
  allMessages = response;//stores the response from the database into a global variable allMessages to be used in other functions
  //empty out the div container on the DOM that stores the messages to refresh
  $('.comment-container').empty();

  //loop through the array and append INFO
  //append info to comment-container
  for(var i = 0; i <response.length; i++){
    var comment = response[i];//store response into comment for readability

    console.log("Name: ", comment.name);
    console.log("Content: ", comment.content);

    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();

    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
  }
}
//function that justs shows Mango Moments when called
function showAllMangoMoments(){
    //empty out the div container on the DOM that stores the messages to refresh
    $('.comment-container').empty();
    //loop through the array and append INFO
    //append info to comment-container
    for(var i = 0; i <allMessages.length; i++){
      var comment = allMessages[i];//store response into comment for readability
      if(comment.type == 'mm'){
      $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
      var $el = $('.comment-container').children().last();

function showAllMangoMoments(){//response is the data coming back from the database. NOT SURE EXACTLY HOW IT IS GOING TO COME BACK
    //empty out the div container on the DOM that stores the messages to refresh
    $('.comment-container').empty();
    //loop through the array and append INFO
    //append info to comment-container
    for(var i = 0; i <allMessages.length; i++){
      var comment = allMessages[i];//store response into comment for readability
      if(comment.type == 'mm'){
      $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
      var $el = $('.comment-container').children().last();

      $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
      $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
    }
  }
}

function showAllShoutOuts(){//response is the data coming back from the database. NOT SURE EXACTLY HOW IT IS GOING TO COME BACK
  //empty out the div container on the DOM that stores the messages to refresh
  $('.comment-container').empty();
  //loop through the array and append INFO
  //append info to comment-container
  for(var i = 0; i <allMessages.length; i++){
    var comment = allMessages[i];//store response into comment for readability
    if(comment.type == 'so'){
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();

      $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
      $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
    }
  }
}
//Function that shows just Shout Outs when Called
function showAllShoutOuts(){
  //empty out the div container on the DOM that stores the messages to refresh
  $('.comment-container').empty();
  //loop through the array and append info
  //append info to comment-container
  for(var i = 0; i <allMessages.length; i++){
    var comment = allMessages[i];//store response into comment for readability
    if(comment.type == 'so'){
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment
    var $el = $('.comment-container').children().last();


    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
  }
}
}

//Function that justs shows Affirmation Posts when called
function showAllAffirmations(){

  //empty out the div container on the DOM that stores the messages to refresh
  $('.comment-container').empty();
  //loop through the array and append INFO
  //append info to comment-container
  for(var i = 0; i <allMessages.length; i++){
    var comment = allMessages[i];//store response into comment for readability
    if(comment.type == 'af'){
    $('.comment-container').append('<div class="media animated fadeInRight"></div>');//creates each individual comment


    var $el = $('.comment-container').children().last();

    $el.append('<a class="forum-avatar" href="#"><img src="/vendors/Static_Seed_Project/img/a3.jpg" class="img-circle" alt="image"><div class="author-info"><strong>Posts:</strong> 543<br/><strong>Date of Post:</strong>'+comment.date_created+'<br/></div></a>');
    $el.append('<div class="media-body"><h4 class="media-heading">Hampden-Sydney College in Virginia</h4>'+comment.content+'<br/><br/>- '+comment.name+'</div>');
  }
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
