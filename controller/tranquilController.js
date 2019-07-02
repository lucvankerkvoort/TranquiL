// We require both the models
var userInfo = require("../models/user_info");
var dataOutput = require("../models/data_output");

var path = require("path");
// We require the express module
var express = require("express");

// We require the Router method from express
var router = express.Router();

var id = [];
// HTML ROUTES
// ----------------------------------------------------------------------
// Yipiekayeey MF
// WORKING ROUTES
// We set the route for our home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/main.html"));
});

// We set the route for our survey page
router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/survey.html"));
});

// We set the route to our results page
router.get("/result", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/results.html"));
});

// TEST ROUTES
// router.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "../test-pages/test-main.html"));
// });

// // We set the route for our survey page
// router.get("/survey", function(req, res) {
//   res.sendFile(path.join(__dirname, "../views/test_survey.html"));
// });

// // We set the route to our results page
// router.get("/result", function(req, res) {
//   res.sendFile(path.join(__dirname, "../views/results.html"));
// });
// API ROUTES
// ----------------------------------------------------------------------
// This is the post request for the registration
userInfo.all(function(res) {
  console.log(res);
});
router.post("/api/registration", function(req, res) {
  var userProfile = req.body;
  var userInformation = userInfo.all(function(res) {
    console.log(res);
  });
  var existingUsernamesArray = [];

  // User Registration Authentication
  // ----------------------------------------------------------------------

  for (var i = 0; i < userInformation.length; i++) {
    existingUsernamesArray.push(userInformation[i].username);
  }

  if (
    existingUsernamesArray.includes(userInfo.userId) === false &&
    (userInfo.password.length >= 8 && userInfo.password.length <= 20)
  ) {
    // ----------------------------------------------------------------------
    // Here we connect to the database using the ORM and sending all the data to the table
    userInfo.create(
      ["username", "password", "name"],
      [userProfile.userId, userProfile.password, userProfile.name],
      function(result) {
        // We get back the ID of the user so we can match the score from the survey with the username password
        id = result.insertId;
        console.log({ id });
        res.json(id);
      }
    );
    // ROUTE TO SURVEY PAGE
    // The route goes to the survey since username and password pass the criteria
  } else if (
    existingUsernamesArray.includes(userInfo.userId) === true &&
    (userInfo.password.length >= 8 && userInfo.password.length <= 20)
  ) {
    $(".password-length-wrong").remove();
    $(".existing-username-text").remove();
    let wrongUsernameContainer = $("<small>");
    wrongUsernameContainer.addClass(
      "form-text text-muted existing-username-text"
    );
    wrongUsernameContainer.text(
      "This username is already taken. Please enter another username."
    );
    $(".userId-div").append(wrongUsernameContainer);
  } else if (
    existingUsernameArray.includes(userInfo.userId) === false &&
    (userInfo.password.length < 8 || userInfo.password.length > 20)
  ) {
    // if there is already an existing username
    $(".existing-username-text").remove();
    $(".password-length-wrong").remove();
    let invalidPasswordContainer = $("<small>");
    invalidPasswordContainer.addClass(
      "form-text text-muted password-length-wrong"
    );
    invalidPasswordContainer.text("Your password is an invalid length!");
    $("password-signup-div").append(invalidPasswordContainer);
  } else if (
    existingUsernamesArray.includes(userInfo.userId) === true &&
    (userInfo.password.length < 8 || userInfo.password.length > 20)
  ) {
    // if there is already an existing username
    $(".existing-username-text").remove();
    $(".password-length-wrong").remove();
    let wrongUsernameContainer = $("<small>");
    wrongUsernameContainer.addClass(
      "form-text text-muted existing-username-text"
    );
    wrongUsernameContainer.text(
      "This username is already taken. Please go bo back to the login screen or use a different username."
    );
    $(".userId-div").append(wrongUsernameContainer);
    var invalidPasswordContainer = $("<small>");
    invalidPasswordContainer.addClass(
      "form-text text-muted password-length-wrong"
    );
    invalidPasswordContainer.text("Your password is an invalid length!");
    $(".password-signup-div").append(invalidPasswordContainer);
  }
});

router.post("/api/login", function(req, res) {});

// User Login Authentication
// ----------------------------------------------------------------------
var userProfile = req.body;
var userInformation = userInfo.all(function(res) {
  console.log(res);
});
var existingUsernamesArray = [];
var existingPasswordsArray = [];
let count = 0;
$("#userId").val("");
$("#password").val("");

for (var i = 0; i < userInformation.length; i++) {
  existingUsernamesArray.push(userInformation[i].username);
  existingPasswordsArray.push(userInformation[i].password);
}

for (var i = 0; i < existingUsernamesArray.length; i++) {
  if (
    userInfo.userId === existingUsernamesArray[i] &&
    userInfo.password === existingPasswordsArray[i]
  ) {
    console.log("PLEASE PUT CODE HERE");
    // LOGIC TO LOG THE USER IN AND ROUTE TO the RESULT PAGE
  } else {
    count++;
  }
}

if (count === existingUsernamesArray.length) {
  $(".wrong-loginInfo-text").remove();
  var loginErrorContainer = $("<small>");
  loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
  loginErrorContainer.text(
    "Your username and/or password information are incorrect. Please try again."
  );
  $(".password-div").append(loginErrorContainer);
}
// ----------------------------------------------------------------------
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

  // I have to figure out a way to retrieve the ID of the username and password posted in the registration
  // so we can link the score to the same row
  function postToDatabase(score) {
    userInfo.all(function(data) {
      id = data.pop().id;
      userInfo.update({ score: score }, ["id =" + id], function(result) {
        console.log({ result });
        if (result.affectedRows > 0) {
          res.json(result);
        } else {
          res.status(500).end();
        }
      });
    });
    console.log({ score });
    // I have to change this to an userInfo.update and then use the ID of the user that I get as a result from /api/registration
  }
  scoreCalculator(userInput);
});

module.exports = router;
// We require both the models
var userInfo = require("../models/user_info");
var dataOutput = require("../models/data_output");

var path = require("path");
// We require the express module
var express = require("express");

// We require the Router method from express
var router = express.Router();

var id = [];
// HTML ROUTES
// ----------------------------------------------------------------------
// Yipiekayeey MF
// WORKING ROUTES
// We set the route for our home page
router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/main.html"));
});

// We set the route for our survey page
router.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/survey.html"));
});

// We set the route to our results page
router.get("/result/:id", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/results.html"));
});

router.get("/data-output", function(req, res) {
  res.sendFile(path.join(__dirname, "../views/addvideo.html"));
});
// TEST ROUTES
// router.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname, "../test-pages/test-main.html"));
// });

// // We set the route for our survey page
// router.get("/survey", function(req, res) {
//   res.sendFile(path.join(__dirname, "../views/test_survey.html"));
// });

// // We set the route to our results page
// router.get("/result", function(req, res) {
//   res.sendFile(path.join(__dirname, "../views/results.html"));
// });
// API ROUTES
// ----------------------------------------------------------------------

// This is the post request for the registration
router.post("/api/registration", function(req, res) {
  var userProfile = req.body;
  console.log(userProfile);

  // User Registration Authentication
  // ----------------------------------------------------------------------

  // ----------------------------------------------------------------------
  // Here we connect to the database using the ORM and sending all the data to the table
  userInfo.create(
    ["username", "password", "name"],
    [userProfile.userId, userProfile.password, userProfile.name],
    function(result) {
      // We get back the ID of the user so we can match the score from the survey with the username password
      id = result.insertId;
      console.log({ id });
      res.json(id);
    }
  );
});

router.post("/api/login", function(req, res) {});

// var userInput = req.body;

// User Login Authentication
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
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

  // I have to figure out a way to retrieve the ID of the username and password posted in the registration
  // so we can link the score to the same row
  function postToDatabase(score) {
    userInfo.all(function(data) {
      id = data.pop().id;
      userInfo.update({ score: score }, ["id =" + id], function(result) {
        console.log({ result });
        if (result.affectedRows > 0) {
          res.json({ result: result, userId: id });
        } else {
          res.status(500).end();
        }
      });
    });
    console.log({ score });
    // I have to change this to an userInfo.update and then use the ID of the user that I get as a result from /api/registration
  }
  scoreCalculator(userInput);
});

// This is a post route for adding videos to the database
router.post("/api/data-output", function(req, res) {
  var userInput = req.body;
  console.log(userInput);

  dataOutput.create(
    ["video_url", "category", "score1", "score2"],
    [userInput.videoId, userInput.category, userInput.score1, userInput.score2],
    function(result) {
      console.log(result);
    }
  );
  res.send("It worked");
});
module.exports = router;
