(function(){
  var myAssignment, moment;
  myAssignment = require('../models/myassignment');
  moment = require('moment');
  module.exports = function(req, res){
    var now;
    now = moment(new Date()).format('YYYY-MM-DD HH:mm');
    if (req.user.identity === 'student') {
      myAssignment.find({
        'userid': req.user._id
      }, function(err, doc){
        doc.sort(function(a, b){
          if (a['status'] === b['status']) {
            return a['deadline'] <= b['deadline'];
          } else {
            return a['status'] < b['status'];
          }
        });
        res.render('getAssignmentList', {
          user: req.user,
          assignments: doc,
          time: now,
          msg: req.flash('message')
        });
      });
    } else {
      myAssignment.find(function(err, allAssi){
        allAssi.sort(function(a, b){
          if (a['status'] === b['status']) {
            return a['deadline'] <= b['deadline'];
          } else {
            return a['status'] < b['status'];
          }
        });
        res.render('getAssignmentList', {
          user: req.user,
          assignments: allAssi,
          time: now,
          msg: req.flash('message')
        });
      });
    }
  };
}).call(this);
