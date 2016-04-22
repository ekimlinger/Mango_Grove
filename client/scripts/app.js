var newMessage = {};//New Message object to be sent down to the database

//for db testing
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

$(document).ready(function(){
    //when submit button is pressed in the postMessageForm
    $('#postMessageForm').on('submit', createPost);

});


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
      success: function(){
        console.log("Successful Post!");
      } //Calls the showGLobalFeed function to display the new post
    });
    //ALL ABOVE CODE IN THIS FUNCTION IS WORKING
}
//Function Grabs all Global Messages
function getGlobalMessages(){
  //start of get all messages ajax call
  $.ajax({
    type: 'GET',
    //MAKE SURE TO CHANGE THE URL ROUTE --change
    url: '/globbal/',
    success: loadGlobalFeed
      //MOST LIKELY WILL NEED AN APPEND TO DOM FUNCTION HERE TO DISPLAY NEW FEED
      //WILL HAVE TO EMPTY THE DIV FIRST AND THEN REPOST ALL NEW INFO --change
    }
  });
}

function loadGlobalFeed(response){//response is the data coming back from the database. NOT SURE EXACTLY HOW IT IS GOING TO COME BACK
  //empty out the div container on the DOM that stores the messages to refresh
  //append comments to the DOM

  //loop through the array and append INFO
  for(var i = 0; i < response.length: i++){

  }
};
