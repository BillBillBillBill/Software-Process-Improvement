(function(){
  var login, signup, user;
  login = require('./login');
  signup = require('./signup');
  user = require('../models/user');
  module.exports = function(passport){
    passport.serializeUser(function(user, done){
      return done(null, user._id);
    });
    passport.deserializeUser(function(id, done){
      return user.findById(id, function(error, user){
        done(error, user);
      });
    });
    login(passport);
    return signup(passport);
  };
}).call(this);
