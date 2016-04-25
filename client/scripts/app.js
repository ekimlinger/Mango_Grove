// console.log("Project up and running");
//
// //for db testing
// function sendData(taskData){
//   $.ajax({
//     type: 'POST',
//     url: '/post',
//     data: taskData,
//     success : function (data){
//       console.log(data);
//     }
//   });
//
// }
//
// $(document).ready(function(){
//   var taskData = ({
//       type: "shoutout",
//       content: "great success",
//       date_created : 04/20/2016,
//       comments : [{
//         commentName : "Michelle",
//         commentEmail : "shell0720@gmail.com",
//         commentText : "yeah!!"
//       }],
//       name : "Brady",
//       email: "brady@gmail.com",
//       location: "Prime",
//       global : true
//
//     });
//   sendData(taskData);
//   console.log("meow");
// });

var newMessage = {};//New Message object to be sent down to the database
var allMessages;
$(document).ready(function(){
    //when submit button is pressed in the postMessageForm
    $('#postMessageForm').on('submit', createPost);
    //Filters global
    $('#shoutOut').on('click',showAllShoutOuts);
    $('#mangoMoment').on('click',showAllMangoMoments);
    $('#affirmation').on('click',showAllAffirmations);
    $('#all').on('click',getGlobalMessages);

    getGlobalMessages();
});

//Create Post
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
    //ALL ABOVE CODE IN THIS FUNCTION IS WORKING
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

function showAllAffirmations(){//response is the data coming back from the database. NOT SURE EXACTLY HOW IT IS GOING TO COME BACK
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
