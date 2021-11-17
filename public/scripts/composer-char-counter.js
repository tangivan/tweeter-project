/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const maxLength = 140;
    const $length = $(this).val().length;
    const $counter = $(this).parent().find('output');

    $counter.val(maxLength - $length);

    if ($length > maxLength) {
      return $counter.addClass("overLimit");
    }
    $counter.removeClass("overLimit");
  });
});