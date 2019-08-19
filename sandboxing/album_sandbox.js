function getTrackLength(artist, album) {

    let apiKey = "c7c92f78a10b96b8086988432a4f4cf5";

    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey + "&artist=" + artist + "&album=" + album + "&format=json";

    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);
        let albumArray = responseJson.album.tracks.track;

        let trackTimes = [];

        answerDiv = document.getElementById("answer")
        for (i = 0; i < albumArray.length; i++) {
            console.log(albumArray[i].name);
            answerUL = document.createElement("Ul");
            answerLI = document.createElement("li");
            answerLI.innerText = albumArray[i].name;
            answerUL.append(answerLI);
            answerDiv.append(answerUL);

            trackTimes.push(parseInt(albumArray[i].duration));
        }
        console.log(trackTimes);
        console.log(trackTimes.reduce((a, b) => a + b, 0));
    })
}


document.getElementById("submit").addEventListener("click", function () {
    const artistInput = document.getElementById("artist").value;
    const albumInput = document.getElementById("album").value;
    console.log(artistInput);
    console.log(albumInput);

    getTrackLength(artistInput, albumInput);
})
