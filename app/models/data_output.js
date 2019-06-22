var orm = require("./orm");

var dataOutput = {
  read: function(cb) {
    orm.read("data_output", function(res) {
      cb(res);
      console.log(res);
    });
  },
  selectColumn: function(cb) {
    orm.selectColumn("data_output", col, function(res) {
      cb(res);
    });
  },
  create: function(cb) {
    orm.create("data_output", col, val, function(res) {
      cb(res);
    });
  },
  update: function(cb) {
    orm.update("data_output", input, val, function(res) {
      res;
    });
  }
};
// create the orm file where we can render the info from the database

module.exports = dataOutput;
