(function(){
  var myAssignment;
  myAssignment = require('../models/myassignment');
  module.exports = function(req, res){
    var score;
    score = {
      status: req.body.score
    };
    myAssignment.update({
      _id: req.params.id
    }, score, {}, function(err){
      if (err) {
        console.log(err);
      }
      return res.redirect('/correctassignment');
    });
  };
}).call(this);
