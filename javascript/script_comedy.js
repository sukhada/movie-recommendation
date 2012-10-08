var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var comedyMovies = 
    [
	"Hitch",
	"Theres Something About Mary",
	"Knocked Up",
	"Forgetting Sarah Marshall",
	"40 Year Old Virgin",
	"The Hangover",
	"Airplane!",
	"Annie Hall",
	"Ferris Buellers Day Off",
	"Little Miss Sunshine",
	"Mrs. Doubtfire",
	"Zoolander",
	"Bridesmaids",
	"Four Weddings and a Funeral",
	"Monty Python and the Holy Grail"
    ]

 var dic = {
     'Hitch': '11616',
     'Theres Something About Mary': '17462',
     'Knocked Up': '460328477',
     'Monty Python and the Holy Grail': '11450',
     'Forgetting Sarah Marshall': '770675807',
     '40 Year Old Virgin': '5077',
     'The Hangover': '770801897',
     'Airplane!': '10421',
     'Annie Hall': '10183',
     'Ferris Buellers Day Off': '12224',
     'Little Miss Sunshine': '190816246',
     'Mrs. Doubtfire': '10997',
     'Zoolander': '10109',
     'Bridesmaids': '771039065',
     'Four Weddings and a Funeral': '15959',
     'The Pink Panther': '19049948'
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
	    if ((movie.ratings.critics_rating == "Certified Fresh" || movie.ratings.critics_rating == "Fresh") && (movies[title] == null) && movie.year > 1950
		&& x < 18) {
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
    var len = comedyMovies.length;
    var i = Math.floor((Math.random()*len)+1);
    var check = 0;
    while (check < 9) {
	simMovies(comedyMovies[i]);
	i=Math.floor((Math.random()*len)+1);
	check++;
    }
} 


window.onload = toggle();