var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var animatedMovies = 
    [
	"Toy Story",
	"Lion King",
	"Finding Nemo",
	"Up",
	"Kung Fu Panda",
	"Shrek",
	"Tangled",
	"Mulan",
	"The Incredibles",
	"Beauty and the Beast",
	"How to Train Your Dragon",
	"Aladdin",
	"Spirited Away"
    ]

 var dic = {
     'Toy Story': '9559',
     'Lion King':'9385',
     'Finding Nemo': '9377',
     'Up': '770671912',
     'Kung Fu Panda': '770672401',
     'Shrek': '10166',
     'Tangled':'770678818',
     'Mulan': '9714',
     'The Incredibles': '10011',
     'Beauty and the Beast': '9980',
     'How to Train Your Dragon': '770782733',
     'Aladdin': '9383',
     'Spirited Away': '10065'
};


var size;
var allVotes;



function simMovies(movie) {
    var Url1 = "http://api.rottentomatoes.com/api/public/v1.0/movies/";
    var Url2 = "/similar.json?apikey=" + apikey + "&limit=5";
    var query = dic[movie];
    $(document).ready(function () {
	$.ajax({
	    url: Url1 + query + Url2,
	    dataType: "jsonp",
	    success: searchCallback
	});
    });
}

function addMoviesToHtml() {
    $.each(simMoviesArray, function(index, movie) {
	if (movie != undefined) {
	    var title = movie.title;
	    if ((movie.ratings.critics_rating == "Certified Fresh" || movie.ratings.critics_rating == "Fresh") && (movies[title] == null) && movie.year > 1950 && 
		x < 18) {
		movies[title] = 1;
		console.log(movies);
		var link = movie.links.alternate;
		var movieLink = '<a href="' + link + '">';
		var endTag = ' </a>';
		movieName = ('<a href="' + link + '"> ' + '<img src="' + movie.posters.original + '" />' + ' </a>');
		document.getElementById('movie'+x).innerHTML += movieName;
		x++;
	    }
	}
    });    
}

function searchCallback(data) {
    var i = 0;
    for(i = 0; i < 5; i++) {
	if (data.movies != undefined) {
	    simMoviesArray[i] = data.movies[i];
	}
    }
    addMoviesToHtml();
}

function toggle() {
    var len = animatedMovies.length;
    var i = Math.floor((Math.random()*len)+1);
    var check = 0;
    while (check < 9) {
	console.log(x);
	simMovies(animatedMovies[i]);
	i=Math.floor((Math.random()*len)+1);
	check++;
    }
} 


window.onload = toggle();