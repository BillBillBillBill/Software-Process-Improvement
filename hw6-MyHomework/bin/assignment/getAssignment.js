(function(){
  var Assignment, moment;
  Assignment = require('../models/assignment');
  moment = require('moment');
  module.exports = function(req, res, arg$, arg1$){
    var id, teacher;
    if (arg$ != null) {
      id = arg$;
    }
    if (arg1$ != null) {
      teacher = arg1$;
    }
    if (teacher) {
      Assignment.findById(id, function(err, doc){
        var valid;
        valid = doc.deadline > moment(new Date()).format('YYYY-MM-DD HH:mm');
        if (!valid) {
          console.log('该作业已超过截止时间');
          req.flash('message', '该作业已超过截止时间');
          res.redirect('/assignment');
        } else {
          res.render('setAssignment', {
            user: req.user,
            title: doc.title,
            deadline: doc.deadline,
            content: doc.content,
            msg: req.flash('message')
          });
        }
      });
    } else if (id) {
      Assignment.findById(id, function(err, doc){
        var valid;
        valid = doc.deadline > moment(new Date()).format('YYYY-MM-DD HH:mm');
        res.render('assignmentDetail', {
          user: req.user,
          assignment: doc,
          aid: id,
          isvalid: valid,
          msg: req.flash('message')
        });
      });
    } else {
      Assignment.find(function(err, assi){
        assi.sort(function(a, b){
          return a.deadline > b.deadline;
        });
        res.render('assignment', {
          user: req.user,
          assignments: assi,
          msg: req.flash('message')
        });
      });
    }
  };
}).call(this);
