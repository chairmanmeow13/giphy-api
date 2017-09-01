var tvShows = [
	"Bob's Burgers",
	"The Office",
	"Parks and Rec",
	"Stranger Things",
	"Game of Thrones"
]

$("button").on("click", function() {
	var tvShows = $(this).attr("data-show");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        tvShows + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
        	url: queryURL,
        	method: "GET"
        })
        .done(function(response) {
        	var results= response.data;

        	for (var i = 0; i < results.length; i++) {
        		var gifDiv = $("<div class='item'>");

        		var rating = results[i].rating;
        		var p = $("<p>").text("Rating: " + rating);
        		var showImage = $("<img>");
        			showImage.attr("src", results[i].images.fixed_height.url);
        			gifDiv.prepend(p);
        			gifDiv.prepend(showImage);

        			$("#gifs-appear-here").prepend(gifDiv);
        	}
        });
});