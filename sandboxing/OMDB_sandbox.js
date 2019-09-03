submitButtonSong.addEventListener("click", function() {
    //get values of inputs
    const startState = document.getElementById("starting-state2").value;
    const startCity = document.getElementById("starting-city2").value;
    const endState = document.getElementById("ending-state2").value;
    const endCity = document.getElementById("ending-city2").value;
  
    //get form id and reset
    const songForm = document.getElementById("song-form");
    songForm.reset();
  
    // converts distance into number of songs
    function convertTrecktoTrack(distanceTime, trackTime) {
      const convertedDistanceTime = distanceTime;
      const convertedTrackTime = trackTime / 1000;
      trackTreckNum = Math.ceil(convertedDistanceTime / convertedTrackTime);
      console.log("This is the number of " + trackName + ": " + trackTreckNum);
      return trackTreckNum;
    }
  
    function checkValues(artist, track) {
      if (artist.indexOf("#") !== -1 || track.indexOf("#") !== -1) {
        return false;
      } else {
        return true;
      }
    }
  
    function checkDirections(fromState, fromCity, toState, toCity) {
      if (
        fromState === "" ||
        fromCity === "" ||
        toState === "" ||
        toCity === ""
      ) {
        return false;
      } else {
        return true;
      }
    }
  
    //-----------------------------------------------------------------------sets up the function to get track length
    function getTrackLength(artist, track, distanceTime, cityStart, cityEnd) {
      const apiKey = "c7c92f78a10b96b8086988432a4f4cf5"; // api key for last.fm audioscrobbler
  
      const queryURL =
        "https://ws.audioscrobbler.com/2.0/?method=track.getInfo" +
        "&api_key=" +
        apiKey +
        "&artist=" +
        artist +
        "&track=" +
        track +
        "&format=json"; // queryURL to be used in fetch
      if (checkValues(artist, track)) {
        fetch(queryURL)
          .then(function(response) {
            return response.json();
          })
          .then(function(responseJson) {
            if (responseJson.error || responseJson.track.duration === "0") {
              console.log("Stop breaking our crap John.");
              console.log(responseJson);
            } else {
              console.log(responseJson); // console log json to check integrity
              const songLength = responseJson.track.duration; //this returns the song length
              console.log("song length:", songLength);
              convertTrecktoTrack(distanceTime, songLength);
              //writes the answer to output
              const output = document.getElementById("output");
              output.innerHTML = "";
              const outputDiv = document.createElement("div");
              outputDiv.classList.add("col", "s12");
              output.append(outputDiv);
              outputDiv.innerText =
                cityStart +
                " is " +
                trackTreckNum +
                " " +
                responseJson.track.name +
                "'s by " +
                artist +
                " away from " +
                cityEnd;
  
              //Get Album art url and save it to a variable
              document.getElementById("albums").innerHTML = "";
              const albumArtDiv = document.createElement("div");
              albumArtDiv.classList.add("col", "s6");
              const aArtURL = responseJson.track.album.image[1]["#text"];
              console.log(aArtURL);
              //Print album art img to screen
              const image = document.createElement("img"); //creaing image elements
              image.setAttribute("id", "aArt");
              image.setAttribute("src", aArtURL);
              image.classList.add("center-align");
              albumArtDiv.append(image);
              document.getElementById("albums").append(albumArtDiv);
            }
          });
      } else {
        console.log("Stop breaking our crap John.");
      }
    }
  
    function getDirectionInfo(fromState, fromCity, toState, toCity) {
      const apiKey = "1ar8EgSpyQGUCgm8HV9dyZhG7AWbPq7a";
      const queryURL =
        "https://www.mapquestapi.com/directions/v2/route?key=" +
        apiKey +
        "&from=" +
        fromCity +
        ", " +
        fromState +
        "&to=" +
        toCity +
        ", " +
        toState +
        "&unit=m";
      console.log(queryURL);
      if (checkDirections(fromState, fromCity, toState, toCity)) {
        fetch(queryURL)
          .then(function(response) {
            return response.json();
          })
          .then(function(responseJson) {
            if (
              !responseJson.route.distance ||
              responseJson.route.locations[0].adminArea3 !==
                fromState.toUpperCase() ||
              responseJson.route.locations[1].adminArea3 !==
                toState.toUpperCase() ||
              responseJson.route.locations[0].adminArea5 === "" ||
              responseJson.route.locations[1].adminArea5 === ""
            ) {
              console.log(responseJson);
              console.log("Stop breaking our crap John.");
            } else {
              console.log(responseJson);
              distanceInMiles = responseJson.route.distance;
              distanceInKm = distanceInMiles * 1.609344;
              driveTime = responseJson.route.time; //returns drive time in minutes
              driveTimeMin = driveTime / 60; //converting drive time to minutes from seconds
  
              console.log("drive time: ", driveTime);
              console.log("distance in miles: ", distanceInMiles);
              console.log("distance in km: ", distanceInKm.toFixed(2));
              getTrackLength(artistName, trackName, driveTime, fromCity, toCity); //runs the trackLength function
              const driveAndTime = document.getElementById("driveAndTime");
              driveAndTime.innerHTML = "";
              const driveAndTimeText = document.createElement("div");
              driveAndTimeText.classList.add("col", "s12");
              driveAndTimeText.innerHTML =
                "<br/>Drive time in minutes: " +
                driveTimeMin.toFixed(2) +
                "</br>Distance in miles: " +
                distanceInMiles.toFixed(2) +
                "<br/> Distance in km: " +
                distanceInKm.toFixed(2);
              driveAndTime.append(driveAndTimeText);
            }
          });
      } else {
        console.log("Stop breaking our crap John.");
      }
    }
    getDirectionInfo(startState, startCity, endState, endCity); //runs the get direction info
  });