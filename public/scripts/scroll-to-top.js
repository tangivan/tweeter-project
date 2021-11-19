/* eslint-disable no-undef */
$(document).ready(function() {
  // bind scroll to the window element and call scrollButton when scroll detected
  $(window).scroll(function() {
    scrollButton();
  });

  // go back to top of page with smooth scroll animation
  $(".up-button").on("click", function() {
    $("html, body").animate({
      scrollTop: 0
    }, "slow");

  });

  // check if scroll position is 150 pixels off from the top and sets display accordingly
  const scrollButton = () => {
    // get scroll position;
    const scrollPosition = $(window).scrollTop();
    if (scrollPosition > 150) {
      // show the button
      $(".up-button")[0].style.display = "block";
    } else {
      // hide the button
      $(".up-button")[0].style.display = "none";
    }
  };
});
