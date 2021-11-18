/* eslint-disable no-undef */
$(document).ready(function() {
  $("nav div").on("click", function(event) {
    event.preventDefault();
    if ($(".new-tweet").is(":visible")) {
      $(".new-tweet").slideUp("fast");
    } else {
      $(".new-tweet").slideDown("fast");
      $("textarea").focus();
    }
  });
});