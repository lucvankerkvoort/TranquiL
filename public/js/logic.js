//When we click the register submit button, we will check for userId and password requirements//
var userInfo;
//=============Registration Code ==================
/*/This makes an ajax post request to tranquilController. 
The controller will validate the userInfo object meets our account creation requirements.
If successful, we'll redirect to /survey, if not, we'll display an error message/*/

$("#register-submit").on("click", function(event) {
  console.log("clicked");
  event.preventDefault();
  $(".input-field").trigger("reset");
  userInfo = {
    name: $("#input-username").val(),
    userId: $("#input-userID").val(),
    password: $("#input-password").val()
  };

  console.log("before ajax post");
  $.ajax("/api/registration", {
    type: "POST",
    data: userInfo
  }).then(function(err, response) {
    if (err) {
      $("small").text(err);
    } else window.location.href = "/survey";
  });
});

//=============Login Code ==================
/*/ Here we make another ajax POST request
The controller will validate loginInput object has matching userId and password.
If successful, we'll redirect to /survey, if not, we'll display an error message/*/

$("#login-submit").on("click", function(event) {
  console.log("clicked login");
  event.preventDefault();
  var loginInput = {
    userId: $("#userId").val(),
    password: $("#password").val()
  };
  console.log(loginInput);
  $.ajax("/api/login", {
    type: "POST",
    data: loginInput
  }).then(function(err, response) {
    console.log("sending login info for validation");
    //if the controller verifies the login information as correct we will reload to /survey"
    if (err) {
      $("#error-login").text(err);
    } else window.location.href = "/result";
  });
});

//=============Survey Code ==================
/*/ Here we make another ajax POST request where we send over the user's score, and wait for a response
/*/
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
