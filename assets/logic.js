var tvShows = [
	"Bob's Burgers",
	"The Office",
	"Parks and Rec",
	"Stranger Things",
	"Game of Thrones"
]
var buttonsHTML = '';
var newShowValue;
var giphyKey = "dc6zaTOxFJmzC";
var searchShows;
var giphyHolder;
var giphyArray = [];

function generateButtons() {
     for (var i = 0; i < tvShows.length; i++) {
          buttonsHTML += "<button class='btn btn-lrg btn-primary show-buttons' data-show=" + tvShows[i] + ">" + tvShows[i] + "</button>";
     }
     $('#tvshow-buttons-container').html(buttonsHTML);
}

$(document).ready(function() {

generateButtons();

$('body').on('click', '#add-show', function(event){
     event.preventDefault();
     newShowValue = $('#show-input').val();
     newButton = "<button class='btn btn-lrg btn-primary show-buttons' data-show=" + newShowValue + ">" + newShowValue + "</button>";
     $('#tvshow-buttons-container').append(newButton);
});

$('body').on('click', '.show-buttons', function(event){
     $('.giphy-div').empty();
     searchShows = $(this).attr('data-show');
     queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchShows + "&api_key=dc6zaTOxFJmzC&limit=10";
     $.ajax({url: queryURL, method: 'GET'})
          .done(function(response) {
               for (var i = 0; i < response.data.length; i++) {
                    $('.giphy-div').append("<div class='outer-container'><p class='title'>Rating: "+ response.data[i].rating.toUpperCase() +"</p><div class='image-container'><img class='images-returned img-responsive center-block'" + "data-still='" + response.data[i].images.downsized_still.url + "'" + "data-animate='" + response.data[i].images.downsized.url + "'" + "data-state='still'" + "src='" + response.data[i].images.downsized_still.url + "'></div></div>");
                    giphyArray.push(response.data[i].images.downsized.url);
               }
          });

}); // Closes show-buttons onclick event

$('body').on('click', '.images-returned', function(event){
     var state = $(this).attr('data-state');
     var thisImgDataStill = $(this).attr('data-still');
     var thisImgDataAnimate = $(this).attr('data-animate');
     if (state === 'still') {
          $(this).attr('src', thisImgDataAnimate);
          $(this).attr('data-state', 'animate');
     }
     if (state !== "still") {
          $(this).attr('src', thisImgDataStill);
          $(this).attr('data-state', 'still');
     }
});  // Closes shows images onclick event

}); // Closes jQuery .ready function