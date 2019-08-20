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
        answerUL = document.createElement("ul");
        answerArea = document.createElement("div");
        answerDiv.append(answerUL);
        answerDiv.append(answerArea);

        //sets up function to displays the list of albums
        let indexNum = 0;
        function displayAlbums(index) {
            //displays the i + 4 albums
            j = index + 4
            for (i = index; i < j; i++) {
                if (albumArray[i].name !== "(null)") {
                    // answerLI = document.createElement("li");
                    answerImg = document.createElement("img");

                    answerImg.setAttribute("src", albumArray[i].image[2]["#text"]);
                    answerImg.setAttribute("data-album", albumArray[i].name);
                    answerImg.setAttribute("data-artist", artist);
                    answerImg.classList.add("col", "s6");
                    answerArea.append(answerImg);

                    // answerLI.innerText = albumArray[i].name;
                    // answerLI.setAttribute("data-album", albumArray[i].name);
                    // answerLI.setAttribute("data-artist", artist);
                    // answerLI.classList.add("album")
                    // answerUL.append(answerLI);
                    answerImg.addEventListener("click", function (event) {
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
        const btnArea = document.createElement("div");
        btnArea.classList.add("col", "s12");
        nextBtn.innerText = ">";
        prevBtn.innerText = "<";
        nextBtn.addEventListener("click", function () {
            if (indexNum < 40) {
                indexNum = indexNum + 5;
                answerArea.innerHTML = "";
                displayAlbums(indexNum);
            }
        })
        prevBtn.addEventListener("click", function () {
            if (indexNum > 0) {
                indexNum = indexNum - 5;
                answerArea.innerHTML = "";
                displayAlbums(indexNum);
            }
        })
        answerDiv.append(btnArea);
        btnArea.append(prevBtn)
        btnArea.append(nextBtn);
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

        //displays the tracks on the page
        for (i = 0; i < trackArray.length; i++) {
            console.log(trackArray[i].name);
            answerLI = document.createElement("li");
            answerLI.innerText = trackArray[i].name + " - " + convertTime(trackArray[i].duration);
            answerUL.append(answerLI);
            trackTimes.push(parseInt(trackArray[i].duration));
        }
        console.log(trackTimes);
        console.log(trackTimes.reduce((a, b) => a + b, 0));
    })
}

function convertTime(time) {
    const hr = ~~(time / 3600);
    const min = ~~((time % 3600) / 60);
    const sec = time % 60;
    let sec_min = "";
    if (hr > 0) {
        sec_min += "" + hrs + ":" + (min < 10 ? "0" : "");
    }
    sec_min += "" + min + ":" + (sec < 10 ? "0" : "");
    sec_min += "" + sec;
    return sec_min;
}

//triggers the search
document.getElementById("submit-btn-artist").addEventListener("click", function () {
    const artistInput = document.getElementById("artist").value;
    console.log(artistInput);

    searchAlbums(artistInput);
})
