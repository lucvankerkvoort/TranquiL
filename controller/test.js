router.post("/api/registration", function(req, res) {
  var userProfile = req.body;
  var userInformation = userInfo.all(function(res) {
    console.log(res);
    console.log("in the post route");
    console.log(req.body);
    console.log("userProfile" + userProfile);
    userInfo.all(function(response) {
      var existingUsernamesArray = [];
      var object = {
        data: response
      };
      var registerInfo = object.data;
      console.log(JSON.stringify(object));
      for (var i = 0; i < registerInfo.length; i++) {
        existingUsernamesArray.push(registerInfo[i].username);
      }
      console.log(existingUsernamesArray);
      console.log(typeof userProfile.name);
      console.log("this is the name of the user " + userProfile.name);
      console.log("length of password " + userProfile.password.length);
      if (
        existingUsernamesArray.includes(userProfile.name) === false &&
        userProfile.password.length >= 8 &&
        userProfile.password.length <= 20
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
        // User Registration Authentication
        // ----------------------------------------------------------------------
      }
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
      res.send([
        "THIS USERNAME IS ALREADY TAKEN. PLEASE ENTER ANOTHER USERNAME"
      ]);
      // $(".password-length-wrong").remove();
      // $(".existing-username-text").remove();
      // let wrongUsernameContainer = $("<small>");
      // wrongUsernameContainer.addClass(
      //   "form-text text-muted existing-username-text"
      // );
      // wrongUsernameContainer.text(
      //   "This username is already taken. Please enter another username."
      // );
      // $(".userId-div").append(wrongUsernameContainer);
    } else if (
      existingUsernameArray.includes(userInfo.userId) === false &&
      (userInfo.password.length < 8 || userInfo.password.length > 20)
    ) {
      res.send(["Your password is an invalid length!"]);
      // $(".existing-username-text").remove();
      // $(".password-length-wrong").remove();
      // let invalidPasswordContainer = $("<small>");
      // invalidPasswordContainer.addClass(
      //   "form-text text-muted password-length-wrong"
      // );
      // invalidPasswordContainer.text("Your password is an invalid length!");
      // $("password-signup-div").append(invalidPasswordContainer);
    } else if (
      existingUsernamesArray.includes(userInfo.userId) === true &&
      (userInfo.password.length < 8 || userInfo.password.length > 20)
    ) {
      res.send([
        "This username is already taken. Please go bo back to the login screen or use a different username.",
        "Your password is an invalid length!"
      ]);
      // if there is already an existing username
      // $(".existing-username-text").remove();
      // $(".password-length-wrong").remove();
      // let wrongUsernameContainer = $("<small>");
      // wrongUsernameContainer.addClass(
      //   "form-text text-muted existing-username-text"
      // );
      // wrongUsernameContainer.text(
      //   "This username is already taken. Please go bo back to the login screen or use a different username."
      // );
      // $(".userId-div").append(wrongUsernameContainer);
      // var invalidPasswordContainer = $("<small>");
      // invalidPasswordContainer.addClass(
      //   "form-text text-muted password-length-wrong"
      // );
      // invalidPasswordContainer.text("Your password is an invalid length!");
      // $(".password-signup-div").append(invalidPasswordContainer);
    }
  });

  //   );
  //   // ROUTE TO SURVEY PAGE
  //   // The route goes to the survey since username and password pass the criteria
  // } else if (
  //   existingUsernamesArray.includes(userInfo.userId) === true &&
  //   (userInfo.password.length >= 8 && userInfo.password.length <= 20)
  // ) {
  //   res.send(["THIS USERNAME IS ALREADY TAKEN. PLEASE ENTER ANOTHER USERNAME"]);
  //   // $(".password-length-wrong").remove();
  //   // $(".existing-username-text").remove();
  //   // let wrongUsernameContainer = $("<small>");
  //   // wrongUsernameContainer.addClass(
  //   //   "form-text text-muted existing-username-text"
  //   // );
  //   // wrongUsernameContainer.text(
  //   //   "This username is already taken. Please enter another username."
  //   // );
  //   // $(".userId-div").append(wrongUsernameContainer);
  // } else if (
  //   existingUsernameArray.includes(userInfo.userId) === false &&
  //   (userInfo.password.length < 8 || userInfo.password.length > 20)
  // ) {
  //   res.send(["Your password is an invalid length!"]);
  //   // $(".existing-username-text").remove();
  //   // $(".password-length-wrong").remove();
  //   // let invalidPasswordContainer = $("<small>");
  //   // invalidPasswordContainer.addClass(
  //   //   "form-text text-muted password-length-wrong"
  //   // );
  //   // invalidPasswordContainer.text("Your password is an invalid length!");
  //   // $("password-signup-div").append(invalidPasswordContainer);
  // } else if (
  //   existingUsernamesArray.includes(userInfo.userId) === true &&
  //   (userInfo.password.length < 8 || userInfo.password.length > 20)
  // ) {
  //   res.send([
  //     "This username is already taken. Please go bo back to the login screen or use a different username.",
  //     "Your password is an invalid length!"
  //   ]);
  //   // if there is already an existing username
  //   // $(".existing-username-text").remove();
  //   // $(".password-length-wrong").remove();
  //   // let wrongUsernameContainer = $("<small>");
  //   // wrongUsernameContainer.addClass(
  //   //   "form-text text-muted existing-username-text"
  //   // );
  //   // wrongUsernameContainer.text(
  //   //   "This username is already taken. Please go bo back to the login screen or use a different username."
  //   // );
  //   // $(".userId-div").append(wrongUsernameContainer);
  //   // var invalidPasswordContainer = $("<small>");
  //   // invalidPasswordContainer.addClass(
  //   //   "form-text text-muted password-length-wrong"
  //   // );
  //   // invalidPasswordContainer.text("Your password is an invalid length!");
  //   // $(".password-signup-div").append(invalidPasswordContainer);
});
