
var omdbUrl = "http://www.omdbapi.com/?apikey=4171fa9a&type=movie&plot=short&t="
var wikiUrl = "https://en.wikipedia.org/w/api.php?format=json&action=opensearch&search="; //Mary_Poppins_(soundtrack)"

var responder = function(response) {
	      	var title = response.Title;
	      	var actors = response.Actors;
	      	var genre = response.Genre;
	      	var plot = response.Plot;
	      	if (title && plot) {
	      		$("#movie-title").html(title);
	      		$("#movie-plot").html(plot);
	      		getSndTrkData(title);
	      	}
	      	else {
	      		$("#movie-title").html("Movie not found. Please search again.");
	      		$("#movie-plot").html("");
	      	}
	      }

var sndTrkResponder = function(response) {
	      	var sndTrDesc = response[2][0];
	      	var sndTrLnk = response[3][0];
	      	if (sndTrDesc) {
		      	$("#sound-track-desc").html(sndTrDesc);
		    }
		    else {
		    	$("#sound-track-desc").html("Sound track description not found");
		    }
		    if (sndTrLnk) {
		    	$("#sound-track-link").attr("href", sndTrLnk);
		    	$("#sound-track-link").html(sndTrLnk);
		    }
		    else {
		    	$("#sound-track-link").attr("href", "");
		    	$("#sound-track-link").html("");
		    }

	      }

function getSndTrkData(movieName) {
	$.ajax({
        url: wikiUrl + movieName + "_(soundtrack)" + "&callback=?",  // movieName,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json"
      }).then(sndTrkResponder);
}

function getMovieData(search) {
	$.ajax({
        url: omdbUrl + search,
        method: "GET"
      }).then(responder);
}

var readyFn = function() {
	var clicker = function() {
		var searchTerm = $(".search-input").val().trim();
		getMovieData(searchTerm);
	};
	$(".search-submit").click(clicker);	
}

$(document).ready(readyFn)
