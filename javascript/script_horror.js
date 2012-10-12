var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var horrorMovies = [
    "Psycho",
    "Night of the Living Dead",
    "The Exorcist",
    "The Shining",
    "Scream",
    "The Blair Witch Project",
    "Nightmare on Elm Street",
    "Poltergeist",
    "The Ring",
    "Texas Chainsaw Massacre",
    "Rosemarys Baby",
    "Silence of the Lambs",
    "The Omen"
    ]

var dic = {
    'Psycho': '12879',
    'Night of the Living Dead': '50375489',
    'The Exorcist': '15615',
    'The Shining': '14884',
    'Scream': '17135',
    'The Blair Witch Project': '13062',
    'Nightmare on Elm Street': '13117',
    'Poltergeist': '10145',
    'The Ring': '10437',
    'Texas Chainsaw Massacre': '14466',
    'Rosemarys Baby': '13060',
    'Silence of the Lambs': '16286',
    'The Omen': '13666'
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
    var len = horrorMovies.length;
    var i = Math.floor((Math.random() * len) + 1);
    var check = 0;
    while (check < 9) {
        simMovies(horrorMovies[i]);
        i = Math.floor((Math.random() * len) + 1);
        check++;
    }
}


window.onload = toggle();​