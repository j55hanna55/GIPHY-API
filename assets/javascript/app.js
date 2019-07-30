$(document).ready(function () {

    // my array
    var topic = ["Dog", "Cat", "Bird", "Pig", "Eagle", "Rabbit", "Tiger", "Frog"];

    //function that displays the gif buttons

    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("animalName");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }

    //function to add new button

    function addNewButton() {
        $("#addGif").on("click", function () {
            var animalName = $("#topicInput").val().trim();
            $("#topicInput").val("");
            if (animalName == "") {
                return false;//no blank buttons

            }
            topic.push(animalName);

            displayGifButtons();
            return false;
            event.preventDefault();


        });
    }

    //function to remove all
    function clearAll() {
        $("removeGif").on("click", function () {
            topic.pop(animalName);
            displayGifButtons();
            return false;
        });

    }

    // function that displays the gifs

    function displayGifs() {
        var animalName = $(this).attr("data-name");

        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=aMeDNxP3lSDOxByAssmOnfH0oVCWAxqv&q=" + animalName + "&limit=10&rating"
        $.ajax({

            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                $("#gifsView").empty();
                //show results of gifs
                var results = response.data;
                if (results == "") {
                    alert("There is not a giffy for this!");
                }
                for (var i = 0; i < results.length; i++) {
                    //put gifs in a div
                    var gifDiv = $("<div1>");
                    
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);

                    var title = $("<p>").text("Title: " + results[i].title);
                    gifDiv.append(title);



                    
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                    //paused images
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                    //animated images
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                   
                    gifImage.attr("data-state", "still");
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);
                    
                    $("#gifsView").prepend(gifDiv);
                }
            });
    }


    
    displayGifButtons();
    addNewButton();
    clearAll();


    
    $(document).on("click", ".animalName", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        } else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }

    });

});
