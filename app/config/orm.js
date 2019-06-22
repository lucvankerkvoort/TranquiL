var connection = require("./connection.js");

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  read: function(table, cb) {
    var queryString = "SELECT * FROM " + table;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  selectColumn: function(tableName, col, cb) {
    var queryString = "SELECT " + col.toString();
    queryString += " FROM " + tableName;
    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  create: function(table, col, val, cb) {
    var queryString = "INSERT INTO " + table;
    queryString += " (";
    queryString += col.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(val.length);
    queryString += ");";

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  },
  update: function(table, input, val, cb) {
    var queryString = "UPDATE " + table;
    queryString += " SET ";
    queryString += objToSql(input);
    queryString += " WHERE ";
    queryString += val;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }

  // setup the different methods for get, post, update and delete
};
