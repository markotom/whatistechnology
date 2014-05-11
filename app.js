'use strict';

var requirejs = require('requirejs');

requirejs.config({
  nodeRequire: require,
  baseUrl: __dirname + '/app'
});

requirejs([
  'conf',
  'express',
  'twitter',
  'socket.io'
], function (
  conf,
  express,
  Twitter,
  socketio
) {

  var app     = module.exports = express(),
      server  = app.listen(process.env.PORT || conf.port),
      io      = socketio.listen(server);

  // Twitter Credentials
  var twit = new Twitter(conf.twitter);

  // Static files
  app.use(express.static(__dirname + '/public'));

  // View files
  app.set('views', __dirname + '/public');

  // Template engine
  app.set('view engine', 'jade');

  // Locals
  app.use(function (req, res, next) {
    res.locals.url = req.protocol + "://" + req.get('host');
    next();
  });

  // Main Route: /
  app.route('/').get(function (req, res, next) {
    res.render('index');
  });

  // Stream and filter tweets by "tecnología"
  twit.stream('statuses/filter',
    { track: ['tecnología'] },
    function (stream) {
    stream.on('data', function (data) {
      // Exclude retweets
      if (!data.retweeted_status) {
        io.sockets.emit('newTweet', data);
      }
    });
  });

});
