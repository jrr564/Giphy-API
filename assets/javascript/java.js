
//array
var players = ["Tim Duncan",
			"Kawhi Leonard",
			"Manu Ginobili",
			"Tony Parker",
			"Gregg Popovich",
			"David Robinson",
			"Spurs Coyote",
			"Patty Mills",
			"Danny Green",
			"Boris Diaw"];

//displays player buttons
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
};

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

//function to display gifs
function displayGifs() {
	//sets variable that 
	var players = $(this).attr("data-name");
	//defines our apikey
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        players + "&api_key=dc6zaTOxFJmzC&limit=10";
    //ajax call
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
    	// empties div
        $("#gifs-appear-here").empty(); 
        var results = response.data; //shows results of gifs
        //for when there's no gif from the added button
        if (results == ""){
          alert("ain't no gifs here");
        }
        for (var i=0; i<results.length; i++){
            //creates div for where to put gif
            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // pulling rating of gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
            gifImage.attr("data-state", "still"); // set the image state
            gifImage.addClass("image");
            gifDiv.append(gifImage);
            // pulling still image of gif
            // adding div of gifs to gifsView div
            $("#gifs-appear-here").prepend(gifDiv);
        }
    });
};

//click function for display gifs
$(document).on("click", ".player", displayGifs);
//click function to change gifs from still to working
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
