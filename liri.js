
require("dotenv").config();
var axios = require("axios");
var Spotify = require("node-spotify-api");
var fs = require("fs");

const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);


var selection1;

var moment = require("moment");

if (process.argv[2] === "spotify-this-song") {
  spotifyfunction();
} else if (process.argv[2] === "do-what-it-says") {
  randomfunction();
} else if (process.argv[2] === "movie-this") {
  moviefunction();
} else if (process.argv[2] === "concert-this") {
  concertfunction();
} else {
  console.log(
    "Bruh, Enter a valid selection - here are your choices: [movie-this] [do-what-it-says] [concert-this] [spotify-this-song]"
  );
  console.log(
    "Choose one to proceed"
  );
}

function spotifyfunction(x) {
  console.log("Spotify Function");
  var song = process.argv[3];

  if (selection1 != undefined) {
    song = selection1;
  }

  if (song === undefined && x === undefined) {
    console.log("No Selection");
    song = "Never Gonna Give You Up";
  } 
  

  spotify.search({ type: "track", query: song, limit: 1 }, function(
    err,
    data
  ) {
    if (err) {
      return console.log("Error occurred: " + err);
    } else {
      var result = data.tracks.items[0];
      var spotifySongName = result.name;
      var spotifyBandName = result.artists[0].name;
      var spotifyAlbumName = result.album.name;
      var spotifyPreviewUrl = result.preview_url;

      console.log("Begin Response");
      console.log("Song Name: " + spotifySongName);
      console.log("Band Name: " + spotifyBandName);
      console.log("Album Name: " + spotifyAlbumName);
      if (spotifyPreviewUrl === null) {
        console.log("Success!");
      } else {
        console.log("Preview URL: " + spotifyPreviewUrl);
      }
      console.log("End Response");
    }
  });
}

function randomfunction() {
  console.log("randomfunction");

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    var processChoice = dataArr[0].valueOf();
    selection1 = dataArr[1].valueOf();

    if (processChoice == "spotify-this-song") {
      spotifyfunction();
    }

    if (processChoice === "movie-this") {
      moviefunction();
    }

    if (processChoice === "concert-this") {
      concertfunction();
    }
  });
}

function moviefunction() {
  console.log("Movie Function");
  var movieSearchTerm = process.argv[3];

  if (movieSearchTerm === undefined) {
    console.log("No selection");
    movieSearchTerm = "Terminator";
  }

  axios
    .get(
      "http://www.omdbapi.com/?t=" +
        movieSearchTerm +
        "&y=&plot=short&apikey=" +
        keys.OMDB.id +
        ""
    )
    .then(function(response) {
      console.log("Begin Response");
      console.log("Title - " + response.data.Title);
      console.log("Release Year - " + response.data.Released);
      console.log("IMDB Rating - " + response.data.imdbRating);
      console.log("COO - " + response.data.Country);
      console.log("Language: " + response.data.Language);
      console.log("Plot - " + response.data.Plot);
      console.log("Actors: " + response.data.Actors);
      console.log("End Response");
    });
}

function concertfunction() {
  console.log("Concert Function");
  var bandSearchTerm = process.argv[3];

  if (bandSearchTerm === undefined) {
    console.log("No Selection");
    bandSearchTerm = "The Prodigy";
  }

  axios
    .get(
      "https://rest.bandsintown.com/artists/" +
        bandSearchTerm +
        "/events?app_id=" +
        keys.BandsInTown.id +
        "&date=upcoming"
    )
    .then(function(response) {
      var i;
      for (i = 0; i < response.data.length - 1; i++) {
        var inputDate = response.data[i].datetime;
        var dateFormatted = moment(inputDate).format("MM DD YYYY");
        console.log("Begin Response");
        console.log("Venue - " + response.data[i].venue.name);
        console.log("City - " + response.data[i].venue.city);
        console.log("Date - " + dateFormatted);
        console.log("End Reponse");
      }
    });
}