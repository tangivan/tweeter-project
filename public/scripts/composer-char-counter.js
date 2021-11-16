/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    let maxLength = 140;
    let $length = $(this).val().length;
    const $counter = $(this).parent().find('output');
    $counter.val(maxLength - $length);
    if ($length > maxLength) {
      $counter.css('color', 'red');
    }
  });
});