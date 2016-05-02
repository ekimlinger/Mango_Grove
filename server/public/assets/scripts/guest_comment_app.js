var newComment = {};
$(document).ready(function(){

  // Comment Abilities
  $('#createGuestComment').on('click', createComment);
  // Gets messageID for modal to post to
  $('.social-feed-box').on('click', '#messageComment', getMessageID);
  var maxLength = 150;
  $('#guestCommentTextarea').keyup(function() {
    var length = $(this).val().length;
    var length = maxLength-length;
    $('.chars').text(length);
  });

  $('.social-feed-box').on('click', '.commentLike', likeComment);

});


function getMessageID() {
    console.log("HERE: ", $(this).data("id"));
    var messageID = $(this).data("id");
    //set the message id for the post button
    $("#createGuestComment").data("id", messageID);
    console.log("this message id will be", messageID);
}

//posting comment to database
function createComment(event) {
    //set the messageID key for the comment object
    newComment.messageID = $("#createGuestComment").data("id");
    event.preventDefault();
    //grab the information from the compose comment modal NEED THE ID FROM THE FORM
    var commentArray = $('#postCommentForm').serializeArray();
    //grab information off the form and stores it into the newComment variable
    $.each(commentArray, function(index, element) {
        newComment[element.name] = element.value;
        console.log("New Comment: ", newComment);
    });
    //reset input field values
    $('#guestCommentTextarea').val('');
    $('#guestCommentEmail').val('');
    $('#usernameComment').val('');
    $('.chars').text("150");
    // Send to server to be saved,
    $.ajax({
        type: 'POST',
        url: '/message/comment/'+ newComment.messageID,
        data: newComment,
        success: function(data){
          getCommentsByMessage(newComment.messageID);
        }
    });


}

function getCommentsByMessage(messageID) {
    var messageID = messageID;
    $.ajax({
        type: 'GET',
        url: '/message/comment/'+ messageID,
        success: showComments
    });

}

//loop through the array and append INFO
//append info to comment-container
function showComments(response) {
  console.log(response);
  // Shows comments if available
  if(response.length){
    var messageID = response[0].messageID;
    $('#'+messageID).empty();
    for (var i = 0; i < response.length; i++) {
        var comment = response[i]; //store response into comment for readability

        // Displays ammount of likes if there are any
        var likeAmmount;
        if(comment.like){
          likeAmmount = comment.like + " ";
        }else{
          likeAmmount = "";
        }

        $('#' + comment.messageID).append('<div class="social-comment"></div>'); //creates each individual comment
        var $el = $('#' + comment.messageID).children().last();
        $el.append(' <a href="" class="pull-left"> <img alt="image" src="/vendors/Static_Seed_Project/img/a1.jpg"></a>');
        $el.append(' <div class="media-body"><a href="#">' + comment.name + '</a> ' + comment.content + '<br/><a class="small commentLike" data-id="'+comment._id+'"><span>'+likeAmmount+'</span><i class="fa fa-thumbs-up"></i> Like this!</a><small class="text-muted"> ' + comment.date_created + '</small></div>');
    }
  }
}

function likeComment() {
    var commentID = $(this).data('id');
    if ($(this).data('alreadyPressed') == undefined) {
        $(this).data('alreadyPressed', true);

        $.ajax({
            type: "PUT",
            url: '/message/comment/like/' + commentID,
            success: function(data) {
                var oldValue = $('[data-id="' + commentID + '"]').children().first().text() || 0;
                var newValue = parseInt(oldValue) + 1;
                $('[data-id="' + commentID + '"]').children().first().text(newValue + " ");
            }
        });
    }
}
