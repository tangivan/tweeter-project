/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  // checks if current character length is over the maximum character length
  $("#tweet-text").on('input', function() {
    const $length = $(this).val().length;
    const $counter = $(this).parent().find('output');
    const maxLength = 140;

    $counter.val(maxLength - $length);

    if ($length > maxLength) {
      // change counter color to red if over limit
      return $counter.addClass("js-overLimit");
    }
    // removes the red color if it current length is not over limit
    $counter.removeClass("js-overLimit");
  });
});
