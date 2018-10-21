var gifs = ["Dog", "Cat", "Skunk", "Rabbit", "Turtle",]

$(document).ready(function () {



  function displayGifs() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/stickers/search?&api_key=0R65OiKGrZVWciSJrPa5GEYYzYJVmmKU&q=" + gif + "&limit=10&offset=0&rating=G&lang=en";


    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response)


      var gifDiv = $("<div class='giff'>");

      for (var j = 0; j < response.data.length; j++) {
        
        var gifURL = response.data[j].images.fixed_width.url;
        var rating = response.data[j].rating;

        console.log("rating: " + rating);

       
        console.log("gif : " + gifURL)
        var p = $("<p>").append("Rating: " + rating)

        var image = $("<img>").attr("src", gifURL)
       
        gifDiv.append(p)
        gifDiv.append(image);

        $("#gifs-view").html(gifDiv);
      }
    });
  };

  function renderButtons() {


    $("#buttons-view").empty();


    for (var i = 0; i < gifs.length; i++) {


      var a = $("<button>");

      a.addClass("gif-btn");

      a.attr("data-name", gifs[i]);

      a.text(gifs[i]);

      $("#buttons-view").append(a);
    }
  }


  $("#add-gif").on("click", function (event) {
    event.preventDefault();

    var giphy = $("#gif-input").val().trim();

    
    $("#gif-input").val("");
    if (giphy === ""){
      $(".invalid").html("Invalid Text");
    }

   else{gifs.push(giphy);
    $(".invalid").css("display", "none")
    renderButtons();}

  });

  $(document).on("click", ".gif-btn", displayGifs);


  renderButtons();
})