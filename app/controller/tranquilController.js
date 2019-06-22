// We require both the models
var userInfo = require("../models/user_info");
var dataOutput = require("../models/data_output");

var path = require("path");
// We require the express module
var express = require("express");

// We require the Router method from express
var router = express.Router();

// We set the route for our home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/main.html"));
  // res.render("index") if we need handlebars
});

// We set the route for our first page
router.get("/survey/q1", function(req, res) {
  res.send(path.join(__dirname, "../views/survey.html"));
});

module.exports = router;
