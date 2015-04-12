(function(){
  var myAssignment, Assignment, moment;
  myAssignment = require('../models/myassignment');
  Assignment = require('../models/assignment');
  moment = require('moment');
  module.exports = function(req, res){
    var assigmentInfor;
    assigmentInfor = req.body;
    console.log("用户：", req.user, "提交作业：", assigmentInfor);
    Assignment.findById(req.params.id, function(err, doc){
      var assititle, valid, condition;
      assititle = doc['title'];
      valid = doc['deadline'] > moment(new Date()).format('YYYY-MM-DD HH:mm');
      console.log("是否有效:", valid);
      if (!valid) {
        req.flash('message', '已超过截止日期');
        res.redirect('/assignment');
      } else {
        condition = {
          'assignmentid': req.params.id,
          'userid': req.user._id.toString()
        };
        myAssignment.count(condition, function(err, number){
          var newAssignment;
          if (number === 0) {
            console.log("首次提交");
            newAssignment = new myAssignment({
              userid: req.user._id,
              username: req.user.username,
              content: assigmentInfor.content,
              assignmentid: req.params.id,
              deadline: doc['deadline'],
              title: assititle,
              status: '已提交'
            });
            newAssignment.save(function(error){
              if (error) {
                console.log("提交作业失败", error);
                req.flash('message', '提交失败');
              } else {
                console.log("提交作业成功", newAssignment);
                req.flash('message', '提交成功');
              }
              return res.redirect('/myassignment');
            });
          } else {
            myAssignment.where(condition).update({
              content: assigmentInfor.content
            }, function(err){
              if (err) {
                console.log(err);
              }
              req.flash('message', '提示：已提交过，覆盖原作业');
              res.redirect('/myassignment');
            });
          }
        });
      }
    });
  };
}).call(this);
