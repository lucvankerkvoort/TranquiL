// We require both the models
var userInfo = require("../models/user_info");
var dataOutput = require("../models/data_output");

var path = require("path");
// We require the express module
var express = require("express");

// We require the Router method from express
var router = express.Router();

var id;
// HTML ROUTES
// ----------------------------------------------------------------------
// We set the route for our home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../test-pages/test-main.html"));
  // res.render("index") if we need handlebars
});

//the router gives back the survey page when we go to the route for it
router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/test_survey.html"));
});

// API ROUTES
// ----------------------------------------------------------------------

router.post("/api/registration", function(req, res) {
  var userProfile = req.body;
  console.log(userProfile);

  userInfo.create(
    ["username", "password", "name"],
    [userProfile.userId, userProfile.password, userProfile.name],
    function(result) {
      console.log(result.insertId);
      id = result.insertId;
    }
  );
});

// We run logic to calculate the user score and push it into the database
router.post("/api/survey", function(req, res) {
  // we capture the user input from the html file
  var userInput = req.body;
  console.log(userInput);

  // This function calculates the score of the user
  function scoreCalculator(userInput) {
    var score = 0;
    for (let i = 0; i < userInput.data.length; i++) {
      score += parseInt(userInput.data[i]);
    }
    // it pushes it to the database
    postToDatabase(score);
  }

  function postToDatabase(score) {
    console.log({ score });
    userInfo.create(["score"], [score], function(result) {
      console.log({ result });
      if (result.affectedRows > 0) {
        res.json(result);
      } else {
        res.status(500).end();
      }
    });
  }
  scoreCalculator(userInput);
});
// We set the route for our first page
router.get("/survey/q1", function(req, res) {
  res.send(path.join(__dirname, "../views/survey.html"));
});

module.exports = router;
