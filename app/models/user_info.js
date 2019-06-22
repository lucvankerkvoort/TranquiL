var orm = require("./orm");

var userInfo = {
  read: function(cb) {
    orm.read("user_info", function(res) {
      cb(res);
      console.log(res);
    });
  },
  selectColumn: function(cb) {
    orm.selectColumn("user_info", col, function(res) {
      cb(res);
    });
  },
  create: function(cb) {
    orm.create("user_info", col, val, function(res) {
      cb(res);
    });
  },
  update: function(cb) {
    orm.update("user_info", input, val, function(res) {
      res;
    });
  }
};
// create the orm file where we can render the info from the database

module.exports = userInfo;
