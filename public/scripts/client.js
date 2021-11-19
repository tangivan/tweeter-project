/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // character limit for our textarea
  const maxCharLength = 140;

  // set counter to the maximum character limit
  $('.counter').val(maxCharLength);
  // hide error message until it's needed
  $('#error').hide();

  /**
   * renderTweets takes in a tweets database and
   * prepends each tweet to the all-tweets container
   */
  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      console.log(tweet);
      $('.all-tweets').prepend(createTweetElement(tweet));
    });
  };

  // createTweetElement takes in a data object with tweet information and returns a formatted HTML tweet
  const createTweetElement = (data) => {
    const $tweet = $(`
    <article class="tweet">
    <header>
      <span class="tweet-avatar">
        <img src="${data.user.avatars}" alt="user avatar">
        <p>${data.user.name}</p>
      </span>
      <p class="username"><strong>${data.user.handle}</strong></p>
    </header>
    <p>
      <strong>${escape(data.content.text)}</strong>
    </p>
    <footer>
      <p>${timeago.format(data.created_at)}</p>
      <span class="social-buttons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </span>
    </footer>
    </article>
    `);
    return $tweet;
  };

  // handle form submission for new tweets
  $("form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const tweetBody = data.substr(5).trim();

    // return error if the text in body is > maxCharLength
    if (tweetBody.length > maxCharLength) {
      $("#error p").text("You wrote too much!");
      return $("#error").slideDown("fast");
    }

    // return error if text in body is empty
    if (!tweetBody.trim() || !tweetBody.length) {
      $("#error p").text("You didn't write anything!");
      return $("#error").slideDown("fast");
    }

    // ajax post request to post a tweet
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "POST",
      data
    }).then(() => {
      // slide error message back up if post request resolves
      if ($("#error p").is(":visible")) {
        $("#error").slideUp("fast");
      }

      /**
       * reset the form after successful form submission
       * reset the counter for character limit
       * empty current tweets for rendering new list of tweets
       * render all tweets in database
       */
      $(this)[0].reset();
      $('.counter').val(maxCharLength);
      $('.all-tweets').empty();
      loadTweets();
    });
  });

  // loadTweets fetches tweets from the db and passes it into renderTweets.
  const loadTweets = () => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      method: "GET",
    })
      .then((tweets) => {
        renderTweets(tweets);
      });
  };

  loadTweets();

  // escape function to prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});
