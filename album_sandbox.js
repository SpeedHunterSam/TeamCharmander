// function getAlbum(artist) {
//     let apiKey = "c7c92f78a10b96b8086988432a4f4cf5";

//     //GET ALBUMS FROM AN ARTIST
//     let queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + artist + "&api_key=" + apiKey + "&format=json";

//     let
//         fetch(queryURL).then(function (response) {
//             return response.json()
//         }).then(function (responseJson) {
//             console.log(responseJson);
//         })
// }

// function getTracks(artist, album) {
//     let apiKey = "c7c92f78a10b96b8086988432a4f4cf5"

//     let queryURL = "https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&api_key=" + 
// };

// getAlbum("cher");

//http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=c7c92f78a10b96b8086988432a4f4cf5&artist=Cher&album=Believe&format=json

function getTrackLength(artist, album) {

    let apiKey = "c7c92f78a10b96b8086988432a4f4cf5";

    let queryURL = "http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=" + apiKey + "&artist=" + artist + "&album=" + album + "&format=json";

    fetch(queryURL).then(function (response) {
        return response.json();
    }).then(function (responseJson) {
        console.log(responseJson);
        let albumArray = responseJson.album.tracks.track;
        let trackTimes = [];

        for (i = 0; i < albumArray.length; i++) {
            console.log(albumArray[i].name);
            trackTimes.push(albumArray[i].duration);
        }
        console.log(trackTimes);
    })

}

getTrackLength("cher", "believe");