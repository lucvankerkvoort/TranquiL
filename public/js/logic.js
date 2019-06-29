//When we click the register submit button, we will check for userId and password requirements//
var userInfo;
//=============Registration Code ==================

$("#register-submit").on("click", function(event) {
  console.log("clicked");
  event.preventDefault();
  $(".input-field").trigger("reset");
  userInfo = {
    name: $("#input-username").val(),
    userId: $("#input-userID").val(),
    password: $("#input-password").val()
  };
  console.log(userInfo);
  $.ajax("/api/registration", {
    type: "POST",
    data: userInfo
  }).then(function(data) {
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
