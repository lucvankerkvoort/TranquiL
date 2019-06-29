//When we click the register submit button, we will check for userId and password requirements//
var userInfo;
//=============Registration Code ==================

$("#register-submit").on("click", function(event) {
  console.log("clicked");
  event.preventDefault();
  $(".input-field").trigger("reset");
  userInfo = {

    name: $("#input-name").val(),
    userId: $("#input-userId").val(),
    password: $("#input-password").val()
  };
  console.log(userInfo);
  blankUsername();
});

function blankUsername() {
  if (userInfo.userId === "") {
    $("small").text("Please type a valid userId.");
  } else checkPasswordLength();
}

function checkPasswordLength() {
  if (userInfo.password.length < 8) {
    $("small").text("Your password needs to have between 8-20 characters");
  } else checkUserId();
}
function checkUserId() {

  $.ajax("/api/registration", {
    type: "POST",
    data: userInfo
  }).then(function(data) {

    console.log("checking against existing usernames");
    //here we need the router.post in the controller to check if the userId exists in the db.
    //it should check req.params or req.body?//
    //it should res.json(true) if userId is valid and doesn't exist in the db.
    //it should return res.json(false) if userId already exists.
    if (data) {
      $("small").text("UserId " + userInfo.userId + " successfully created.");
    } else $("small").text("The userId" + userInfo.userId + " already exists. Try a different one.");
  });
}

// var profiles = require("./user-profiles");

// var userInput = {
//   name: "",
//   password: "",
//   category: "",
//   data: []
// };

// var mockName = "Luc";
// var mockPassword = "Tang";
// var mockCategory = "yoga";
// var mockInput = [5, 7, 9, 5, 4];

// userInput.data = mockInput;
// userInput.category = mockCategory;
// userInput.name = mockName;
// userInput.password = mockPassword;

// PSEUDOCODED USER AUTHENTICATION (GREG) ////////////////
// (For sign-up flow)
// 1. Capture user's inputs from the survey for proposed username and password

//        - Parameters:
//                - Username is certain set of characters
//                - Password meets length and also character requirements
//                - If current username already exists then user must choose another username
// 2. If username and password are BOTH valid, then the new user's data will get stored in our database
// 3. Once user fills out the form, user is automatically logged in and their results are generated
// $("#sign-up-button").on("click", function(event) {
//   event.preventDefault();
//   var username = $("#inputID").val();
//   var password = $("#input-password").val();
//   var existingUsernameArray = [];

//   if (username === "") {
//     // if user's username input is blank
//     $("#existing-username-text").remove();
//     $("#password-length-wrong").remove();
//     $("#blank-username-text").remove();
//     blankUsername(); // Appends an error message below input field
//   } else if (
//     existingUsernameArray.includes(username) === true &&
//     (password.length >= 8 && password.length <= 20)
//   ) {
//     // if there is already an existing username
//     $("#existing-username-text").remove();
//     $("#password-length-wrong").remove();
//     $("#blank-username-text").remove();
//     takenUsername(); // Appends existing username error message below input field
//   } else if (
//     existingUsernameArray.includes(username) === false &&
//     (password.length < 8 || password.length > 20)
//   ) {
//     // if the password is an invalid length
//     $("#existing-username-text").remove();
//     $("#password-length-wrong").remove();
//     $("#blank-username-text").remove();
//     invalidPasswordLength(); // Appends invalid password length message below input field
//   } else if (
//     existingUsernameArray.includes(username) === true &&
//     (password.length < 8 || password.length > 20)
//   ) {
//     // if there is already an existing username and password is an invalid length
//     $("#existing-username-text").remove();
//     $("#password-length-wrong").remove();
//     $("#blank-username-text").remove();
//     takenUsername();
//     invalidPasswordLength();
//   } else if (
//     existingUsernameArray.includes(username) === false && // *SUCCESS CASE = LUC*
//     (password.length >= 8 && password.length <= 20)
//   ) {
//     // if user's username does not exist, and password is WITHIN length
//     // MORE LOGIC HERE
//   }
// });

// // (For existing users that are logging in)
// $("#login-button").on("click", function(event) {
//   event.preventDefault();
//   var username = $("#login-username").val();
//   var password = $("#login-password").val();

    console.log("ajax post initiated");
    if (data) {
      $("small").text("UserId " + userInfo.userId + " successfully created.");
    } else $("small").text("we need to add an error message here when the controller says things didn't work");
  });
});


// function blankUserName() {
//   if (userInfo.name === "") {
//     $("small").text("Please enter your name");
//   } else blankUserId();
// }

// function blankUserId() {
//   if (userInfo.userId === "") {
//     $("small").text("Please type a valid userId.");
//   } else checkPasswordLength();
// }
// function checkPasswordLength() {
//   if (userInfo.password.length < 8) {
//     $("small").text("Your password needs to have between 8-20 characters");
//   } else checkUserId();
// }

//=============Login Code ==================

$("#login-submit").on("click", function(event) {
  console.log("clicked login");
  event.preventDefault();
  $(".input-field").trigger("reset");
  var loginInput = {
    userId: $("#userId").val(),
    password: $("#password").val()
  };
  $.ajax("/api/login", {
    type: "GET",
    data: loginInput
  }).then(function(data) {
    console.log("sending login info for validation");
    //if the controller verifies the login information as correct we will reload to /survey"
    if (data) {
      window.location.href = "/survey";
    } else $("small").text("userId does not match password. Please try again");
  });
});

function scoreCalculator(userInput) {
  var score = 0;
  for (let i = 0; i < userInput.data.length; i++) {
    score += userInput.data[i];
  }
  console.log({ score });
  // assessment(userInput, score);
}

// scoreCalculator(userInput);

function assessment(userInput, score) {
  console.log({ userInput });
  console.log(userInput.category);
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


// function takenUsername() {
//   // var wrongUsernameContainer = $("<small>");
//   wrongUsernameContainer.addClass(
//     "form-text text-muted existing-username-text"
//   );
//   wrongUsernameContainer.text(
//     "This username is already taken. Please go bo back to the login screen or use a different username."
//   );
//   $(".username-input-form").append(wrongUsernameContainer);
// }

function checkPasswordLength() {
  // var invalidPasswordContainer = $("<small>");
  invalidPasswordContainer.addClass(
    "form-text text-muted password-length-wrong"
  );
  invalidPasswordContainer.text("Your password is an invalid length!");
  $("#passwordHelpBlock").append(invalidPasswordContainer);
}

function wrongUsernamePassword() {
  $(".wrong-loginInfo-text").remove();
  // var loginErrorContainer = $("<small>");
  loginErrorContainer.addClass("form-text text-muted wrong-loginInfo-text");
  loginErrorContainer.text(
    "Your username and/or password information are incorrect. Please try again."
  );
  $(".user-login-password-container").append(loginErrorContainer);
}

