(function(){
  var express, assignment, router, isAuthenticated;
  express = require('express');
  assignment = require('../assignment/assignment');
  router = express.Router();
  isAuthenticated = function(req, res, next){
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.redirect('/');
    }
  };
  module.exports = function(passport){
    router.get('/', function(req, res){
      res.render('index', {
        msg: req.flash('message')
      });
    });
    router.post('/login', passport.authenticate('login', {
      successRedirect: '/home',
      failureRedirect: '/',
      failureFlash: true
    }));
    router.get('/signup', function(req, res){
      res.render('register', {
        msg: req.flash('message')
      });
    });
    router.post('/signup', passport.authenticate('signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    }));
    router.get('/home', isAuthenticated, function(req, res){
      res.render('home', {
        user: req.user,
        msg: req.flash('message')
      });
    });
    router.get('/signout', function(req, res){
      req.logout();
      req.flash('message', '已退出');
      res.redirect('/');
    });
    router.get('/assignment', isAuthenticated, function(req, res){
      assignment.get(req, res);
    });
    router.get('/assignment/:id', isAuthenticated, function(req, res){
      assignment.get(req, res, req.params.id);
    });
    router.get('/assignment/submit/:id', isAuthenticated, function(req, res){
      res.render('submitAssignment', {
        user: req.user,
        id: req.params.id,
        msg: req.flash('message')
      });
    });
    router.post('/assignment/submit/:id', isAuthenticated, function(req, res){
      assignment.submit(req, res);
    });
    router.get('/myassignment/:id', isAuthenticated, function(req, res){
      assignment.myAssignment(req, res);
    });
    router.post('/myassignment/:id', isAuthenticated, function(req, res){
      if (req.user.identity === 'student') {
        res.redirect('/myassignment');
      } else {
        assignment.rateAssignment(req, res);
      }
    });
    router.get('/myassignment', isAuthenticated, function(req, res){
      assignment.getAssignmentList(req, res);
    });
    router.get('/setassignment', isAuthenticated, function(req, res){
      var m;
      if (req.user.identity === 'student') {
        res.redirect('/home');
      }
      if (req.query.aid) {
        if (req.query.op === 'delete') {
          assignment['delete'](req, res);
        } else {
          assignment.get(req, res, req.query.aid, true);
        }
      } else {
        m = 'set';
        res.render('setAssignment', {
          user: req.user,
          mode: m
        });
      }
    });
    router.post('/setassignment', function(req, res){
      if (req.query.aid) {
        console.log("收到修改作业请求");
        assignment.edit(req, res);
      } else {
        console.log("收到发布作业请求：", req.body);
        assignment.set(req, res);
      }
    });
    return router.get('/correctassignment', isAuthenticated, function(req, res){
      if (req.user.identity === 'student') {
        res.redirect('/home');
      }
      assignment.getAssignmentList(req, res);
    });
  };
}).call(this);
