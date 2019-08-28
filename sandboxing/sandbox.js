// Regarding Choice of Transportation

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

