$(function () {

  var TwitterViewModel = function () {

    // Tweets observable
    this.tweets = ko.observableArray();

    // Moment from now
    var now = ko.observable(new Date());
    setInterval(function () { now(new Date()); }, 1000);

    this.moment = function (date) {
      return moment(date).from(now());
    };

  };

  var Twitter = new TwitterViewModel();

  ko.applyBindings(Twitter);

  // Get data on new tweet
  socket.on('newTweet', function (data) {

    // Add new tweet
    Twitter.tweets.push(data);

    // Delete tweet if exceeds 10 tweets
    if (Twitter.tweets().length > 10) {
      Twitter.tweets.shift();
    }

  });

});
