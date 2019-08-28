// Still need to create these divs!

// const movieYear = document.getElementById("movie-year").value

// If we need movie specificity==> Year would probably be easier to input for user vs. director, releaseDay, etc.
const submitButton = document.getElementById("submit-btn");
const outputDisplayP = document.getElementById("output");
let flicTrekNum; //movie length at global scope for easy reference
M.Tabs.init(document.querySelector('.tabs'))





submitButton.addEventListener("click", function () {

    const startState = document.getElementById("starting-state").value;
    const startCity = document.getElementById("starting-city").value;
    const endState = document.getElementById("ending-state").value;
    const endCity = document.getElementById("ending-city").value;
    const movieTitle = document.getElementById("movie-name").value


    function convertTrecktoTrack(distanceTime, trackTime) {
        const convertedDistanceTime = distanceTime;
        const convertedTrackTime = trackTime / 1000;
        trackTreckNum = Math.ceil(convertedDistanceTime / convertedTrackTime);
        console.log("This is the number of " + trackName + ": " + trackTreckNum);
        return trackTreckNum;
    }

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
            const convertedMovieLength = ((parseInt(responseJson.Runtime)) * 60);
            // convert string output to integer then convert from minutes to seconds
            flicTrekNum = Math.ceil(convertedDistanceTime / convertedMovieLength);
            console.log("running time: ", convertedMovieLength);
            // getMovieLength(movieTitle); //still need to output somewhere!! (but not here)
            document.getElementById("output").innerHTML = fromCity + " is " + flicTrekNum + " " + responseJson.title + "'s away from " + toCity + "!";
        })
    }

    function getDirectionInfo(fromState, fromCity, toState, toCity) {
        const apiKey = "1ar8EgSpyQGUCgm8HV9dyZhG7AWbPq7a"
        const queryURL = "https://www.mapquestapi.com/directions/v2/route?key=" + apiKey + "&from=" + fromCity + ", " + fromState + "&to=" + toCity + ", " + toState + "&unit=m";
        console.log(queryURL);
        fetch(queryURL).then(function (response) {
            return response.json();
        }).then(function (responseJson) {
            console.log(responseJson);
            distanceInMiles = responseJson.route.distance;
            distanceInKm = distanceInMiles * 1.609344;
            driveTime = responseJson.route.time; //returns drive time in Seconds
            driveTimeMin = driveTime / 60; //converting drive time to minutes from seconds

            console.log("drive time in minutes: ", driveTime);
            console.log("distance in miles: ", distanceInMiles);
            console.log("distance in km: ", distanceInKm);

            getTrackLength(artistName, trackName, driveTime, fromCity, toCity); //runs the trackLength function
           
    
            // Adding the new paragraph to the viewport in HTML
            document.getElementById("driveAndTime").innerHTML = "<br/>Drive Time in Minutes: " + driveTimeMin + "</br>Distance in Miles: " + distanceInMiles + "<br/> Distance in km: " + distanceInKm;


        })
}

getDirectionInfo(startState, startCity, endState, endCity); //runs the get direction info


})
// Create HTML elements for movie input
// Create and assign variables for user movie information input
// Use getElementById to pull needed information into function/regurgitate needed info into output