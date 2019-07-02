
// Survey Modal Script
$('.carousel.carousel-slider').carousel({
    fullWidth: true,
    indicators: true,
    noWrap: false

    })

    $('.next').click(function() {
            $('.carousel.carousel-slider').carousel('next');
    });


// Survey logic
$(document).ready(function() {

    $("#submit-survey").click(function() {

        console.log("submit survey works"); 
        event.preventDefault();

        // var userInput = [];
        var userInput = {

            data: []

        };

        var answerCount = document.getElementsByClassName("Survey-form").length;
        console.log("Total number of questions " + answerCount);

        //Loop over all questoins
        $(".Survey-form").each(function() {

        // for (let i = 1; i < answerCount; i++) {
            
            var userScore = $("input[name='group1']:checked", $(this)).val();
            
            if (userScore !== undefined) {
                userInput.data.push(userScore);
                // userInput.push({
                //     userScore: userScore
                // });
                
            }
        
            console.log(JSON.stringify(userInput))

            $.post("/api/survey", userInput, function(data){
                console.log(data);

                window.location.replace("/result");
 
            });
        });

        // Post Request 

    });
});

