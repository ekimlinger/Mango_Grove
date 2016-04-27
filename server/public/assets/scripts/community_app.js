var appendCommunityList;
var communityList = ["Carlson School","McCalister School", "Global"];

var newMessage = {};

$(document).ready(function(){

  //$('.community-list').append(appendCommunityList);
  for(var i = 0; i < communityList.length; i++){
    console.log(communityList[i]);
    $('.community-list').append('<label><input type="checkbox" name="location" value="'+communityList[i]+'"> '+communityList[i]+'</label> ');
  }
  $('#createCommunityPost').on('click',createCommunityPost)

});

function createCommunityPost(){

  event.preventDefault();
  var messageArray = $('#communityPostMessageForm').serializeArray();  //grab the information from the compose message moda
  console.log("Message Array is: ", messageArray);
  $.each(messageArray, function(index, element){//grab information off the form and stores it into the newMessage variable
    newMessage[element.name] = element.value;
  });
  newMessage.global = true;
  console.log("newMessage is: ", newMessage);
  $.ajax({
    type: 'POST',
    url: '/message',
    data: newMessage, //Pass newMessage to the Database
    success: function(){
      console.log("Post global message");
    }//addNewMessageToFeed //call addNewMessageToFeed function to display new post right away
  });
}



function getComunityList(){
  //router.get('/:location/:type/:ammount/:time', function(req,res){
  var type;
  var location;
  var amount;
  var time;
    $.ajax({
      type: 'GET',
      url: '/message/'+location+'/'+type+'/'+amount+'/'+time,
      success: loadCommunityFeed //loads messages on the success of the ajax call
    });
}

function loadCommunityFeed(){

};
