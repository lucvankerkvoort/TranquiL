$(document).ready(function() {
  $(".modal").modal();
  console.log("this works.");

  $("button[name=action]").on("click", function() {
    event.preventDefault();

    var userInfo = {
      name: $("input[id=input-username]")
        .val()
        .trim(),
      userId: $("input[id=input-userID]")
        .val()
        .trim(),
      password: $("input[id=input-password]")
        .val()
        .trim()
    };

    console.log({ userInfo });

    $.post("/api/registration", userInfo).then(function(data) {
      console.log(data);
    });
  });
});
