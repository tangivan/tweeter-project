/* eslint-disable no-undef */
$(document).ready(function() {
  // Toggle the Compose Tweet
  $("nav div").on("click", function() {
    // get compose tweet element
    const $composeTweet = $(".new-tweet");
    if ($composeTweet.is(":visible")) {
      // slide up if compose tweet is shown
      $composeTweet.slideUp("fast");
    } else {
      // slide down if compose tweet is hidden
      $composeTweet.slideDown("fast");
      // focus the textarea when compose tweet slides down
      $("textarea").focus();
    }
  });
});
