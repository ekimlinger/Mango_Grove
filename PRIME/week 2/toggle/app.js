$(document).ready( function () {
  $('.container').on("mouseover", change);
  $('.container').on("mouseout", change);
});

function change() {
  $(this).toggleClass("highlight");
  //console.log("works");
}
