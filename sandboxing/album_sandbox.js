function searchAlbums(artist) {
    let apiKey = "c7c92f78a10b96b8086988432a4f4cf5";

    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=" + apiKey + "&artist=" + artist + "&format=json";

    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);

        const albumArray = responseJson.topalbums.album;

        const answerDiv = document.getElementById("answer");
        answerDiv.innerHTML = "";
        answerUL = document.createElement("Ul");
        answerDiv.append(answerUL);

        for (i = 0; i < albumArray.length; i++) {
            if (albumArray[i].name !== "(null)") {
                answerLI = document.createElement("li");
                answerLI.innerText = albumArray[i].name;
                answerLI.setAttribute("data-album", albumArray[i].name);
                answerLI.setAttribute("data-artist", artist);
                answerLI.classList.add("album")
                answerUL.append(answerLI);
                answerLI.addEventListener("click", function (event) {
                    albumSearch = event.target.getAttribute("data-album");
                    getTrackLength(artist, albumSearch);
                })
            }
        }
    })
}


function getTrackLength(artist, album) {

    let apiKey = "c7c92f78a10b96b8086988432a4f4cf5";

    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey + "&artist=" + artist + "&album=" + album + "&format=json";

    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);
        let trackArray = responseJson.album.tracks.track;

        let trackTimes = [];

        const answerDiv = document.getElementById("answer")
        answerDiv.innerHTML = "";
        answerUL = document.createElement("ul");
        answerDiv.append(answerUL);


        for (i = 0; i < trackArray.length; i++) {
            console.log(trackArray[i].name);
            answerLI = document.createElement("li");
            answerLI.innerText = trackArray[i].name + " : " + trackArray[i].duration;
            answerUL.append(answerLI);
            trackTimes.push(parseInt(trackArray[i].duration));
        }
        console.log(trackTimes);
        console.log(trackTimes.reduce((a, b) => a + b, 0));
    })
}

document.getElementById("submit").addEventListener("click", function () {
    const artistInput = document.getElementById("artist").value;
    console.log(artistInput);

    searchAlbums(artistInput);
})
