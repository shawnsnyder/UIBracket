  var express = require('express');
  var app = express();
  var passport = require('passport');
  var util = require('util');
  var GoogleStrategy = require('passport-google').Strategy;
  var Redis = require('redis');
  var io = require('socket.io');
  
  var bbRedis = require('backbone-redis');
  var routes = require('./routes');


  server = app.listen(3007);

  io = io.listen(server);


// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is serialized
//   and deserialized.
passport.serializeUser(function(user, done) {
  console.log(user);
  console.log('****user***');
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `validate` function, which accept
//   credentials (in this case, an OpenID identifier and profile), and invoke a
//   callback with a user object.
passport.use(new GoogleStrategy({
    returnURL: 'http://10.0.0.12:3007/auth/google/return',
    realm: 'http://10.0.0.12:3007/'
  },
  function(identifier, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      console.log(profile)

      profile.identifier = identifier;
      console.log(identifier);
      return done(null, profile);
    });
  }
));





//var app = express.createServer();

// configure Express
app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  // Initialize Passport!  Also use passport.session() middleware, to support
  // persistent login sessions (recommended).
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(__dirname + '/../../public'));
});

///static files service
app.use("/client", express.static(__dirname + '/client'));
app.use("/brackettests", express.static(__dirname + '/brackettests'));
app.use("/canvasttests", express.static(__dirname + '/canvasttests'));

//app.get('/',  function(req, res){
app.get('/', ensureAuthenticated, function(req, res){
    console.log('at root!!!');
    res.sendfile('index.html');
});

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/login', function(req, res){
  res.render('login', { user: req.user });
});

// GET /auth/google
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Google authentication will involve redirecting
//   the user to google.com.  After authenticating, Google will redirect the
//   user back to this application at /auth/google/return
app.get('/auth/google', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

// GET /auth/google/return
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/google/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

///crud redis calls
app.post('/creategame', function(req,res){
  console.log(req);
  routes.createGame(req.body.gameid, req.body.name,function(resp){
    var location = req.headers.host + req.url + "/" + req.body.id;
    if (resp) res.send('Game Created', { 'Content-Location': location }, 201);
    else res.send('Game already exists', 403);
  });
});

////
////redis, socketio business
////

// Configuration settings
var redisConfig  = {
    port : 6379,
    host : '127.0.0.1',
    options : {
        parser : 'javascript',
        return_buffer : false
    },
};

// Create the publish and subscribe clients for redis to
// send to the pubsub middleware
var db  = Redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options),
    pub = Redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options),
    sub = Redis.createClient(redisConfig.port, redisConfig.host, redisConfig.options)

// Main application
app.get('/', function(req, res) {
    res.render(__dirname + '/index.html');
});

db.flushall();

bbRedis.config({
    io        : io,
    database  : db,
    publish   : pub,
    subscribe : sub,
    listener  : 'backbone',
    safeMode  : true,
    showDebug : true,
    showError : true
});


model = bbRedis.schema()

    // All CRUD events can be intercepted before being
    // processed, allowing us to do validation, or anything
    // else to ensure data integrity, ect...
    .pre('create', function(next, model, options, cb) {
        console.log('todo-pre-create');
        next(model, options, cb);
    })
    .pre('read', function(next, model, options, cb) {
        console.log('todo-pre-read');
        next(model, options, cb);
    })
    .pre('update', function(next, model, options, cb) {
        console.log('todo-pre-update');
        next(model, options, cb);
    })
    .pre('delete', function(next, model, options, cb) {
        console.log('todo-pre-delete');
        next(model, options, cb);
    })

    // Subscribe events will pass in the current client's 
    // socket connection instead of the model
    .pre('subscribe', function(next, socket, options, cb) {
        console.log('todo-pre-subscribe');
        next(socket, options, cb);
    })
    .pre('unsubscribe', function(next, socket, options, cb) {
        console.log('todo-pre-unsubscribe');
        next(socket, options, cb);
    });


bbRedis.model('games', model);

