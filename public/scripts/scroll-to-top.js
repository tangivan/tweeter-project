/* eslint-disable no-undef */
$(document).ready(function() {
  $(window).scroll(function() {
    scrollButton();
  });

  $(".up-button").on("click", function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");
  });
  const scrollButton = () => {
    if (document.body.scrollTop > 150 || document.documentElement.scrollTop > 150) {
      $(".up-button")[0].style.display = "block";
    } else {
      $(".up-button")[0].style.display = "none";
    }
  };
});