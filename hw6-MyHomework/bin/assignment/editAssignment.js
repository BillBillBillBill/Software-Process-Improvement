(function(){
  var myAssignment, Assignment;
  myAssignment = require('../models/myassignment');
  Assignment = require('../models/assignment');
  module.exports = function(req, res){
    var assigmentInfor, newAssignment;
    assigmentInfor = req.body;
    newAssignment = {
      deadline: assigmentInfor.deadline,
      title: assigmentInfor.title,
      content: assigmentInfor.content
    };
    Assignment.update({
      _id: req.query.aid
    }, newAssignment, {}, function(err){
      myAssignment.where({
        'assignmentid': req.query.aid
      }).setOptions({
        multi: true
      }).update({
        deadline: assigmentInfor.deadline,
        title: assigmentInfor.title
      }, function(err){
        if (err) {
          console.log(err);
        }
      });
      if (err) {
        console.log("编辑失败");
        req.flash('message', '编辑失败');
      } else {
        req.flash('message', '编辑成功');
      }
      return res.redirect('/assignment');
    });
  };
}).call(this);
