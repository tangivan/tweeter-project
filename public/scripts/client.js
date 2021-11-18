/* eslint-disable no-undef */
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  const renderTweets = function(tweets) {
    tweets.forEach(tweet => {
      $('#all-tweets').prepend(createTweetElement(tweet));
    });
  };

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

  $("form").on("submit", function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    const maxLength = 140;
    const tweetBody = data.substr(5);
    if (tweetBody.length > maxLength) {
      $("#error p").text("You wrote too much!");
      return $("#error").slideDown("fast");
    }
    if (!tweetBody) {
      $("#error p").text("You didn't write anything!");
      return $("#error").slideDown("fast");
    }

    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "POST",
      data
    }).then(() => {
      if ($("#error p").is(":visible")) {
        $("#error").slideUp("fast");
      }
      $(this)[0].reset();
      loadTweets();
    });
  });

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

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
});