(function(){
  var Assignment;
  Assignment = require('../models/assignment');
  module.exports = function(req, res){
    var assigmentInfor, newAssignment;
    assigmentInfor = req.body;
    newAssignment = new Assignment({
      id: String,
      author: req.user.username,
      deadline: assigmentInfor.deadline,
      title: assigmentInfor.title,
      content: assigmentInfor.content
    });
    newAssignment.save(function(error){
      if (error) {
        console.log("发布作业失败", error);
        req.flash('message', '发布失败');
      } else {
        console.log("成功发布作业", newAssignment);
        req.flash('message', '发布成功');
      }
      return res.redirect('/assignment');
    });
  };
}).call(this);
