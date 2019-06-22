var profiles = require("./user-profiles");

var userInput = {
  name: "",
  password: "",
  category: "",
  data: []
};

var mockName = "Luc";
var mockPassword = "Tang";
var mockCategory = "yoga";
var mockInput = [5, 7, 9, 5, 4];

userInput.data = mockInput;
userInput.category = mockCategory;
userInput.name = mockName;
userInput.password = mockPassword;

/* PSEUDOCODED USER AUTHENTICATION (GREG) ////////////////
// (For sign-up flow)
// 1. Capture user's inputs from the survey for proposed username and password
//        - Parameters:
//                - Username is certain set of characters
//                - Password meets length and also character requirements
//                - If current username already exists then user must choose another username
// 2. If username and password are BOTH valid, then the new user's data will get stored in our database
// 3. Once user fills out the form, user is automatically logged in and their results are generated

// (For existing users that are logging in)
// 1. Capture's user's inputs from login flow and compares it to existing user IDs usernames and passwords in the database
//      - If username and password do not match, error message displayed below input bars stating to retype info
// 2. If username and password match, user is logged in and results from previous form input is displayed
*/

/* PSEUDOCODED SEARCH BAR FUNCTIONALITY (GREG) (NICE-TO-HAVE)//////////////
// 1. Search Bar would exist at top of the page
// 2. Users can filter through categories in the search bar
//         - Categories: Yoga, Meditation, Exercise
// 3. Conditions for the filter
//         - Filter would take inputs as strings
//         - Filter would check for matching sequences between the user's inputs and the values in that category in the database
//         - Filtered search would render below the search bar in a box that contains the options
//         - Options would be dynamic and would maybe be able to be clicked so that they would get appended in the right section
//         - Filter would contain a reset button as well
*/

function scoreCalculator(userInput) {
  var score = 0;
  for (let i = 0; i < userInput.data.length; i++) {
    score += userInput.data[i];
  }
  console.log({ score });
  assessment(userInput, score);
}

scoreCalculator(userInput);

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
