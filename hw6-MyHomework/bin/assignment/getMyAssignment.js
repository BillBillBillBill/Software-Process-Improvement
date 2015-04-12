(function(){
  var myAssignment;
  myAssignment = require('../models/myassignment');
  module.exports = function(req, res){
    var id;
    id = req.params.id;
    myAssignment.findById(id, function(err, doc){
      res.render('myAssignmentDetail', {
        user: req.user,
        assignment: doc
      });
    });
  };
}).call(this);
