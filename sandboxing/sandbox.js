// ~Regarding Calculation of Total Playlist Duration Over Total Drive Time

// Initial conception is a progress bar that dynamically updates as the user adds songs to their custom playlist (forthcoming)
// Will need to research dynamic updating within progress bar itself OR having the user press a button to update via an outside function
// Likely outside function from what I can read?

// Math would take the sum duration of all selected tracks and divide by duration of travel (yielding a percentage)

// Need to create a variable storing sum duration of all selected tracks and a variable that contains the resulting quotient of Math
// This information accessible via JSON, but we may also may be able to leverage an already existing like the trackTimes variable Jackson created 
// (waiting to see format of playlist that is generated)

// Drivetime duration certainly already exists (trackTreckNum) and just needs to be pulled in without breaking anything

// Dummy variables awaiting actual content
let totalDuration = "";
let progPercent = "";
// Dummy function awaiting actual variables
function updateProg () {
let progSong = totalDuration;
let progTrip = driveTimeMin
progPercent = Math.round((progSong / progTrip * 60) * 100);
document.getElementById("progBar").style.width = progPercent + "%";
};
// HTML to be inserted
<div class="progress">
<div id="progBar" class="determinate" style="width: 0%"></div>
</div>

