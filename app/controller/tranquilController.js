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

router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/survey.html"));
});
router.post("/api/survey", function(req, res) {
  var userInput = req.body;
  console.log(userInput);
  function scoreCalculator(userInput) {
    var score = 0;
    for (let i = 0; i < userInput.data.length; i++) {
      score += parseInt(userInput.data[i]);
    }
    // console.log({ score });
    assessment(userInput, score);
    postToDatabase(score);
  }

  function postToDatabase(score) {
    console.log({ score });
    userInfo.create("score", [score], function(result) {
      console.log({ result });
      if (result.affectedRows > 0) {
        res.json(result);
      } else {
        res.status(500).end();
      }
    });
  }
  scoreCalculator(userInput);

  function assessment(userInput, score) {
    // console.log({ userInput });
    // console.log(userInput.category);
    // create cases where we check the scores with the corresponding database tables
    // each case will start a function that will return a random input video in the category set in the switch case
    switch (userInput.category) {
      case "meditation":
        // set a function to work out a random meditation video in the stress level coming from the score
        meditation(score);
        break;
      case "yoga":
        // set a function to work out a random yoga video in the stress level coming from the score
        yoga(score);
        break;
      case "exercise":
        //   set a fucntion to work out a random exercise video in the stress level coming from the score
        exercise(score);
        break;
    }
  }

  // this function takes the score and then
  function meditation(data) {
    console.log(data);
  }

  function yoga(data) {
    console.log(data);
  }

  function exercise(data) {
    console.log(data);
  }
});
// We set the route for our first page
router.get("/survey/q1", function(req, res) {
  res.send(path.join(__dirname, "../views/survey.html"));
});

module.exports = router;
