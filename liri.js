require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");

var userInput = "";




function concatInput() {

    for (var i = 3; i < process.argv.length; i++) {
        userInput += process.argv[i] + "+";
    }
}

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

function action(x) {

    switch (x) {
        case "my-tweets":
            console.log("tweet");
            client.get('search/tweets', { q: 'Capt_Ronangus' }, function (error, tweets, response) {
                if (error) { console.log(error) }
                // console.log(tweets);
                for(var i = 0; i < tweets.statuses.length; i++){
                console.log(tweets.statuses[i].text);
                }
            });

            break;

        // ======================================================================================================

        case "spotify-this-song":

            concatInput();

            spotify.search({ type: 'track', query: userInput, limit: 1 }, function (err, data) {
                if (err) {
                    return console.log("error code:" + err);
                }
                // console.log(data);
                console.log(data.tracks.items[0].artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.name);
                console.log(data.tracks.items[0].external_urls.spotify);
            });
            // console.log("spot");

            break;

        // =====================================================================================================

        case "movie-this":
            // console.log("movie");


            concatInput();

        

            // http://www.omdbapi.com/?apikey=[yourkey]&
            var omdbQuery = `http://www.omdbapi.com/?t=${userInput}&apikey=46f8b734`;

            request(omdbQuery, function (err, response, body) {
                if (err) {
                    console.log(`error code: ${err}`);
                }
                // console.log(JSON.stringify(response, null, 2));
                // console.log(JSON.parse(body);
                console.log(JSON.parse(body).Title);
                console.log(JSON.parse(body).imdbRating);
                console.log(JSON.parse(body).Country);
                console.log(JSON.parse(body).Language);
                console.log(JSON.parse(body).Plot);
                console.log(JSON.parse(body).Actors);
            })
            break;

        // =====================================================================================================

        case "do-what-it-says":
            console.log("do");

            fs.readFile("spotify-this-song.txt", "utf8", function (err, data) {
                if (err) {
                    return console.log(err);
                }

                // console.log(data);
                var array = data.split(' ');
                
            
                var x = array[0];
                userInput = array[1];

                action(x);
            })
         break;
}
}

    action(process.argv[2]);