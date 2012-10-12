var apikey = "d3v64ay9d2y4cf9hkfs3yvrs";
var x = 0;
var bestMovie;
var simMoviesArray = new Array(4);
var movies = {};
var actionMovies = [
    "Braveheart",
    "Kill Bill",
    "Saving Private Ryan",
    "Rocky",
    "The Town",
    "Ocean's Eleven",
    "Troy",
    "Alien",
    "Inglorious Basterds",
    "The Lord of the Rings The Return of the King",
    "Pulp Fiction",
    "Kick-Ass",
    "Gladiator",
    "Fight Club",
    "The Bourne Identity",
    "Seven Samurai",
    "Point Break",
    "Speed",
    "Looper",
    "Taken",
    "300",
    "V for Vendetta",
    "Sherlock Holmes",
    "X-Men",
    "Indiana Jones",
    "The Expendables",
    "Lethal Weapon",
    "Enter the Dragon"
    ]

var dic = {
    'Braveheart': '12866',
    'The Green Mile': '12939',
    'Star Wars Episode IV - A New Hope': '11292',
    'Inglorious Basterds': '770671947',
    'The Silence of the Lambs': '16286',
    'Jurassic Park': '10983',
    'The Lord of the Rings The Return of the King': '10156',
    'Crash': '12',
    'The Terminator': '770676948',
    'The Dark Knight': '769959054',
    'I, Robot': '10040',
    'The Shining': '14884',
    'The Town': '770814363',
    'The Shawshank Redemption': '12989',
    'Kill Bill': '12865',
    'Forrest Gump': '10036',
    'Saving Private Ryan': '13217',
    'Rocky': '11405',
    'Pulp Fiction': '13863',
    'Fight Club': '13153',
    'Back to the Future': '23532',
    'Million Dollar Baby': '10026',
    'The Longest Yard': '669',
    'American History X': '12900',
    'Dawn of the Dead': '17051',
    'Paranormal Activity': '770728015',
    'Jerry Maguire': '13109',
    'Eternal Sunshine Of The Spotless Mind': '12860',
    'The Departed': '314387087',
    'Alien': '13492',
    'Ocean\'s Eleven': '10182',
    'Troy': '12890',
    'Old School': '16825',
    'Gladiator': '13065',
    'The Bourne Identity': '11357',
    'Die Hard': '16351',
    'Seven Samurai': '16992',
    'Point Break': '13320',
    'Casino Royale': '358179513',
    'Speed': '14748',
    'Looper': '771186945',
    'Taken': '770680780',
    'Kick-Ass': '770786150',
    '300': '344023668',
    'V for Vendetta': '112770454',
    'Sherlock Holmes': '770796118',
    'X-Men': '771041145',
    'Indiana Jones': '23530',
    'The Expendables': '770802244',
    'Lethal Weapon': '17397',
    'Enter the Dragon': '13174'
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
            if ((movie.ratings.critics_rating == "Certified Fresh") && (movies[title] == null) && x < 18) {
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
    var i = Math.floor((Math.random() * 22) + 1);
    var check = 0;
    while (check < 9) {
        simMovies(actionMovies[i]);
        i++;
        check++;
    }
}


window.onload = toggle();​