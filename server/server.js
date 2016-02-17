var loopback = require('loopback');
var boot = require('loopback-boot');
var app = module.exports = loopback();

// Passport configurators..
var loopbackPassport = require('loopback-component-passport');
var PassportConfigurator = loopbackPassport.PassportConfigurator;
var passportConfigurator = new PassportConfigurator(app);

/*
 * body-parser is a piece of express middleware that
 *   reads a form's input and stores it as a javascript
 *   object accessible through `req.body`
 *
 */
var bodyParser = require('body-parser');

/**
 * Flash messages for passport
 *
 * Setting the failureFlash option to true instructs Passport to flash an
 * error message using the message given by the strategy's verify callback,
 * if any. This is often the best approach, because the verify callback
 * can make the most accurate determination of why authentication failed.
 */
var flash = require('express-flash');

// attempt to build the providers/passport config
var config = {};
try {
  config = require('../providers.json');
} catch (err) {
  console.trace(err);
  process.exit(1); // fatal
}

// -- Add your pre-processing middleware here --

// Setup the view engine (jade)
var path = require('path');
// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// boot scripts mount components like REST API
boot(app, __dirname);

// to support JSON-encoded bodies
app.middleware('parse', bodyParser.json());
// to support URL-encoded bodies
app.middleware('parse', bodyParser.urlencoded({
  extended: true
}));

// The access token is only available after boot
app.middleware('auth', loopback.token({
  model: app.models.accessToken
}));

app.middleware('session:before', loopback.cookieParser(app.get('cookieSecret')));
app.middleware('session', loopback.session({
  secret: 'kitty',
  saveUninitialized: true,
  resave: true
}));
passportConfigurator.init();

// We need flash messages to see passport errors
app.use(flash());

passportConfigurator.setupModels({
  userModel: app.models.user,
  userIdentityModel: app.models.userIdentity,
  userCredentialModel: app.models.userCredential
});
for (var s in config) {
  var c = config[s];
  c.session = c.session !== false;
  passportConfigurator.configureProvider(s, c);
}
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

app.get('/auth/account', ensureLoggedIn('/'), function(req, res, next) {
  console.log('Logged in', req.user);
  console.log(req.user);
  res.redirect('/');
});

app.get('/auth/current', function(req, res, next) {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(200).json({});
  }
  var ret = JSON.parse(JSON.stringify(req.user));
  delete ret.password;
  res.status(200).json(ret);
});

//verified
app.get('/verified', function(req, res) {
  res.render('verified');
});


//reset the user's pasword
app.post('/reset-password', function(req, res, next) {
  var User = app.models.user;
  if (!req.accessToken) return res.sendStatus(401);
  //verify passwords match
  if (!req.body.password || !req.body.confirmation ||
    req.body.password !== req.body.confirmation) {
    return res.sendStatus(400, new Error('Passwords do not match'));
  }

  User.findById(req.accessToken.userId, function(err, user) {
    if (err) return res.sendStatus(404);
    user.hasPassword(req.body.oldPassword, function(err, isMatch) {
      if (!isMatch) {
        return res.sendStatus(401);
      } else {
        user.updateAttribute('password', User.hashPassword(req.body.password), function(err, user) {
          if (err) return res.sendStatus(404);
          console.log('> password reset processed successfully');
          res.status(200).json({msg: 'Password reset processed successfully'});
        });
      }
    });
  });
});


//Delete account
app.post('/delete-account', function(req, res, next) {
  var User = app.models.user;
  if (!req.accessToken) return res.sendStatus(401);

  //verify passwords match
  if (!req.body.password) {
    return res.sendStatus(400, new Error('Passwords do not match'));
  }

  User.findById(req.accessToken.userId, function(err, user) {
    if (err) return res.sendStatus(404);
    user.hasPassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.sendStatus(401);
      } else {
        User.deleteById(req.accessToken.userId, function(err) {
          if (err) return res.sendStatus(500, err);
          console.log('> Account deleted successfully');
          res.status(200).json({msg: 'Account deleted successfully'});
        });
      }
    });
  });
});

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// start the server if `$ node server.js`
if (require.main === module) {
  app.start();
}