const movieTitle = document.getElementById("movie-title").value
// Still need to create these divs!

// const movieYear = document.getElementById("movie-year").value

// If we need movie specificity==> Year would probably be easier to input for user vs. director, releaseDay, etc.

let flicTrekNum; //movie length at global scope for easy reference

function getMovieLength(movieTitle) {
    const apiKey = "d2c81adc"
    const queryURL = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movieTitle + "&type=movie";
    // If adding year specificity append the following==>| + "&y=" + movieYear|
    // Adding default specificity for movies only, can search shows, etc. by removing 'type' from queryURL
    console.log(queryURL);
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);
        const convertedMovieLength = ((parseInt(responseJson.Runtime))* 60);
        // convert string output to integer then convert from minutes to seconds
        flicTrekNum = Math.ceil(convertedDistanceTime / convertedMovieLength);
        console.log("running time: ", convertedMovieLength);
        // getMovieLength(movieTitle); //still need to output somewhere!! (but not here)
        document.getElementById("output").innerHTML = fromCity + " is " + flicTrekNum + " " + responseJson.title + "'s away from " + toCity + "!";
    })
}
// Create HTML elements for movie input
// Create and assign variables for user movie information input
// Use getElementById to pull needed information into function/regurgitate needed info into output