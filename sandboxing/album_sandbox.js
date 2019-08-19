//gets top album from an artist
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

        let indexNum = 0;
        //displays the list of albums
        function displayAlbums(index) {
            j = index + 9
            for (i = index; i < j; i++) {
                if (albumArray[i].name !== "(null)") {
                    answerLI = document.createElement("li");
                    answerLI.innerText = albumArray[i].name;
                    answerLI.setAttribute("data-album", albumArray[i].name);
                    answerLI.setAttribute("data-artist", artist);
                    answerLI.classList.add("album")
                    answerUL.append(answerLI);
                    answerLI.addEventListener("click", function (event) {
                        albumSearch = event.target.getAttribute("data-album");
                        //runs the get track length function
                        getTrackLength(artist, albumSearch);
                    })
                }
            }
        }
        displayAlbums(indexNum);
        const nextBtn = document.createElement("button");
        const prevBtn = document.createElement("button");
        nextBtn.innerText = ">";
        prevBtn.innerText = "<"
        nextBtn.addEventListener("click", function () {
            if (indexNum < 40) {
                indexNum = indexNum + 10;
                answerUL.innerHTML = "";
                displayAlbums(indexNum);
            }
        })
        prevBtn.addEventListener("click", function () {
            if (indexNum > 0) {
                indexNum = indexNum - 10;
                answerUL.innerHTML = "";
                displayAlbums(indexNum);
            }
        })
        answerDiv.append(prevBtn);
        answerDiv.append(nextBtn);
    })
}

//gets list of tracks in an album and their lengths
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

        //displays the info on the page
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
