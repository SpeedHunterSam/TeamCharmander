function getMovieLength(movieTitle) {
    const apiKey = "d2c81adc"
    const queryURL = "https://www.omdbapi.com/?apikey=" + apiKey + "&t=" + movieTitle;
    console.log(queryURL);
    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);
        const convertedMovieLength = ((responseJson.runtime) * 60);
        // convert output (minutes) to seconds
        trackTreckNum = Math.ceil(convertedDistanceTime / convertedMovieLength)
        console.log("running time: ", convertedMovieLength);
        getMovieLength(movieTitle); //still need to output somewhere!!
        document.getElementById("output").innerHTML = fromCity + " is " + trackTreckNum + " " + responseJson.title + "'s away from " + toCity + "!";
    })
}
// Create HTML elements for movie input
// Create and assign variables for user movie information input
// Use getElementById to pull needed information into function/regurgitate needed info into output