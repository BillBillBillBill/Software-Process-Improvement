(function(){
  var User, bcryptNodejs, passportLocal, LocalStrategy, isValidPassword;
  User = require('../models/user');
  bcryptNodejs = require('bcrypt-nodejs');
  passportLocal = require('passport-local');
  LocalStrategy = passportLocal.Strategy;
  isValidPassword = function(user, password){
    return bcryptNodejs.compareSync(password, user.password);
  };
  module.exports = function(passport){
    passport.use('login', new LocalStrategy({
      passReqToCallback: true
    }, function(req, username, password, done){
      User.findOne({
        username: username
      }, function(error, user){
        var msg;
        if (error) {
          return console.log("Error in login: ", error), done(error);
        }
        if (!user) {
          console.log(msg = "找不到用户: " + username);
          return done(null, false, req.flash('message', msg));
        } else if (!isValidPassword(user, password)) {
          console.log(msg = "无效的密码");
          return done(null, false, req.flash('message', msg));
        } else {
          return done(null, user, req.flash('message', "登陆成功"));
        }
      });
    }));
  };
}).call(this);
