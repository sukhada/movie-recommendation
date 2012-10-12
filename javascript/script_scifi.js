var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var scifiMovies = [
    "Star Wars",
    "Hitchhikers Guide to the Galaxy",
    "Jurassic Park",
    "The Matrix",
    "The Terminator",
    "Blade Runner",
    "Close Encounters of the Third Kind",
    "Inception",
    "Avatar",
    "I Am Legend",
    "District 9",
    "War of the Worlds",
    "28 Weeks Later",
    "Back to the Future"
    ]

var dic = {
    'Star Wars': '9',
    'Hitchhikers Guide to the Galaxy': '17',
    'Jurassic Park': '10983',
    'The Matrix': '12897',
    'The Terminator': '16340',
    'Blade Runner': '12886',
    'Close Encounters of the Third Kind': '10443',
    'Inception': '770805418',
    'Avatar': '665118753',
    'I Am Legend': '770669778',
    'District 9': '770805203',
    'Back to the Future': '23532',
    'War of the Worlds': '1789',
    '28 Weeks Later': '660304807'
};


var size;
var allVotes;



function simMovies(movie) {
    var Url1 = "http://api.rottentomatoes.com/api/public/v1.0/movies/";
    var Url2 = "/similar.json?apikey=" + apikey + "&limit=5";
    var query = dic[movie];
    $(document).ready(function() {
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
            if ((movie.ratings.critics_rating == "Certified Fresh" || movie.ratings.critics_rating == "Fresh") && (movies[title] == null) && movie.year > 1950 && x < 18) {
                movies[title] = 1;
                console.log(movies);
                var link = movie.links.alternate;
                var movieLink = '<a href="' + link + '">';
                var endTag = ' </a>';
                movieName = ('<a href="' + link + '"> ' + '<img src="' + movie.posters.original + '" />' + ' </a>');
                document.getElementById('movie' + x).innerHTML += movieName;
                x++;
            }
        }
    });
}

function searchCallback(data) {
    var i = 0;
    for (i = 0; i < 5; i++) {
        if (data.movies != undefined) {
            simMoviesArray[i] = data.movies[i];
        }
    }
    addMoviesToHtml();
}

function toggle() {
    var len = scifiMovies.length;
    var i = Math.floor((Math.random() * len) + 1);
    var check = 0;
    while (check < 9) {
        console.log(scifiMovies[i]);
        simMovies(scifiMovies[i]);
        i = Math.floor((Math.random() * len) + 1);
        check++;
    }
}


window.onload = toggle();​