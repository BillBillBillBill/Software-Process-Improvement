(function(){
  var setAssignment, getAssignment, submitAssignment, deleteAssignment, editAssignment, getMyAssignment, getAssignmentList, rateAssignment;
  setAssignment = require('./setAssignment');
  getAssignment = require('./getAssignment');
  submitAssignment = require('./submitAssignment');
  deleteAssignment = require('./deleteAssignment');
  editAssignment = require('./editAssignment');
  getMyAssignment = require('./getMyAssignment');
  getAssignmentList = require('./getAssignmentList');
  rateAssignment = require('./rateAssignment');
  module.exports.get = getAssignment;
  module.exports.set = setAssignment;
  module.exports.submit = submitAssignment;
  module.exports['delete'] = deleteAssignment;
  module.exports.edit = editAssignment;
  module.exports.myAssignment = getMyAssignment;
  module.exports.getAssignmentList = getAssignmentList;
  module.exports.rateAssignment = rateAssignment;
}).call(this);
