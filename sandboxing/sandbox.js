// Regarding Moving Information from Checkbox to Output

// Given for-loop-generated checkboxes with incrementing ID #s

// Will need an 'Add' button that when clicked runs a function to check state of checkboxes
// Function: if checkbox is active, save title and runtime to localStorage (index?)

// Create a div that will either need an additional 'Display' button that will show saved items when clicked
// OR items are constantly displayed in the HTML once added

// Back-End will need to have method set up to pull runtime from each saved song and Sum those values in a new variable ("track total," see below)

// Following this: begin work on output display

// ------------------------------------------------------------------------------------------------------------------------------------------------

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
let trackTotal = 0;
let progPercent = 0;
// Dummy function awaiting actual variables
function updateProg () {
progPercent = Math.floor((trackTotal / trackTreckNum) * 100);
document.getElementById("progBar").style.width = progPercent;
};
// HTML to be inserted
<div class="progress">
<div id="progBar" class="determinate" style="width: 0%"></div>
</div>


// ~Regarding Choice of Transportation

// Need to create input field in HTML for allowing user to select between types of transportation

<div class="input-field col s12">
<select id="travel-method">
  <option value="" disabled selected>Select Mode of Transport</option>
  <option value="AUTO">Automobile</option>
  <option value="WALKING">Walking</option>
  <option value="BICYCLE">Bicycle 3</option>
</select>
<label>Materialize Select</label>
</div>

// Need to create a new variable travelMethod that will store user input for type of transportation they've chosen

const travelMethod = document.getElementById("travel-method").value

// In queryURL const for the mapquest api we'll need to append a parameter for specifying the route type:
// Values can be: AUTO, WALKING, or BICYCLE
"&transportMode=" + travelMethod

