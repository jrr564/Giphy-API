//array
var players = ["Tim Duncan",
			"Kawhi Leonard",
			"Manu Ginobili",
			"Tony Parker",
			"Gregg Popovich",
			"David Robinson",
			"San Antonio Spurs Coyote",
			"Patty Mills",
			"Danny Green",
			"Boris Diaw"];


//displays player data
function renderButtons() {
//delete players before adding new ones
	$("#buttons-view").empty();
//loop through players
	for (var i = 0; i < players.length; i++) {
		//adding tag, class, data attribute, text on button, html
		var a = $("<button>");
		a.addClass("player btn-default");
		a.attr("data-name", players[i]);
		a.text(players[i]);
		$("#buttons-view").append(a);
		
	}

	$(".player").on("click", function() {
	$("#gifs-appear-here").empty();
	var playerGif = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        playerGif + "&api_key=dc6zaTOxFJmzC&limit=10";
   	$.ajax({
          url: queryURL,
          method: "GET"
        })
        // After data comes back from the request
        .done(function(response) {
        	console.log(queryURL)
        	var results = response.data;

        	for (var i=0; i < results.length; i++) {
        		var playerDiv = $("<div>");
        		var p = $("<p>").text("Rating: " + results[i].rating);
        		var playerImage = $("<img>");
        		playerImage.attr("src", results[i].images.fixed_height.url);
        		playerDiv.append(p);
           		playerDiv.append(playerImage);
           		$("#gifs-appear-here").append(playerDiv);
        	}
        })

})

};


//click event on buttons

//click function
$("#add-player").on("click", function(event) {
	//so the button isn't deleted
	event.preventDefault();
	//grabs input from text box
	var player = $("#player-input").val().trim();
	//add player
	players.push(player);
	renderButtons();

});

renderButtons();