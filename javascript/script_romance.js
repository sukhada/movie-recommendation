var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var romanceMovies = [
    "Life is Beautiful",
    "Gone with the Wind",
    "Jerry Maguire",
    "Eternal Sunshine Of The Spotless Mind",
    "The Notebook",
    "Pride and Prejudice",
    "Hitch",
    "Love Actually",
    "Titanic",
    "When Harry Met Sally",
    "Youve Got Mail",
    "Pretty Woman",
    "Sleepless in Seattle",
    "Dirty Dancing",
    "The Illusionist",
    "Moulin Rouge",
    "Enchanted",
    "My Fair Lady",
    "The English Patient",
    "The Artist",
    "The Princess Bride",
    "Groundhog Day",
    "Notting Hill",
    "Theres Something About Mary",
    "Knocked Up",
    "While You Were Sleeping",
    "Stardust",
    "Forgetting Sarah Marshall",
    "Garden State",
    "500 Days of Summer",
    "10 Things I Hate About You",
    "Amelie",
    "Crazy, Stupid, Love",
    "Pitch Perfect",
    "Emma"
    ]

var dic = {
    'Life is Beautiful': '10097',
    'Gone with the Wind': '9818',
    'Jerry Maguire': '13109',
    'Eternal Sunshine Of The Spotless Mind': '12860',
    'The Notebook': '10015',
    'Pride and Prejudice': '9185',
    'Hitch': '11616',
    'Love Actually': '12852',
    'Titanic': '22494',
    'When Harry Met Sally': '16317',
    'Youve Got Mail': '10050',
    'Pretty Woman': '13006',
    'Sleepless in Seattle': '12631',
    'Dirty Dancing': '12228',
    'The Illusionist': '268342306',
    'Moulin Rouge': '12846',
    'Enchanted': '770670631',
    'My Fair Lady': '9386',
    'The English Patient': '14840',
    'The Artist': '771241143',
    'The Princess Bride': '12686',
    'Groundhog Day': '11770',
    'Notting Hill': '10110',
    'Theres Something About Mary': '17462',
    'Knocked Up': '460328477',
    'While You Were Sleeping': '10076',
    'Stardust': '392799904',
    'Forgetting Sarah Marshall': '770675807',
    'Garden State': '12850',
    '500 Days of Summer': '770801801',
    '10 Things I Hate About You': '10180',
    'Amelie': '12875',
    'Crazy, Stupid, Love': '771203531',
    'Pitch Perfect': '771308226',
    'Emma': '10090'

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
    var len = romanceMovies.length;
    var i = Math.floor((Math.random() * len) + 1);
    var check = 0;
    while (check < 9) {
        simMovies(romanceMovies[i]);
        i = Math.floor((Math.random() * len) + 1);
        check++;
    }
}


window.onload = toggle();​