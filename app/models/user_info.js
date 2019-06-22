// We require the orm
var orm = require("../config/orm");

// We create an object to loop through the first table in the database
var userInfo = {
  // We use the read method to get the info from the database
  read: function(cb) {
    orm.read("user_info", function(res) {
      cb(res);
      console.log(res);
    });
  },
  // we use selectColumn to target specific columns in the table
  selectColumn: function(cb) {
    orm.selectColumn("user_info", col, function(res) {
      cb(res);
    });
  },
  // We use create to add data to the database
  create: function(cb) {
    orm.create("user_info", col, val, function(res) {
      cb(res);
    });
  },
  // We use update to set new values to certain columns in the database
  update: function(cb) {
    orm.update("user_info", input, val, function(res) {
      res;
    });
  }
};
// We make the UserInfo object available for our controller
module.exports = userInfo;
