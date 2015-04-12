(function(){
  var myAssignment, Assignment;
  myAssignment = require('../models/myassignment');
  Assignment = require('../models/assignment');
  module.exports = function(req, res){
    console.log("删除作业:", req.query.aid);
    Assignment.remove({
      '_id': req.query.aid
    }, function(err){
      myAssignment.remove({
        'assignmentid': req.query.aid
      }, function(err){
        if (err) {
          console.log(err);
        }
      });
      if (err) {
        console.log("删除失败");
        req.flash('message', '删除失败');
      } else {
        req.flash('message', '删除作业成功');
      }
      res.redirect('/assignment');
    });
  };
}).call(this);
