// Get a reference to the element where we'll display the current time
const timeElem = document.getElementById("current_time");

// Make a GET request to the /current-time endpoint on the server
fetch("http://localhost:3000/current-time")
  .then((response) => {
    // Parse the response as JSON data
    return response.json();
  })
  .then((data) => {
    // Extract the current time from the response data
    const currentTime = data.currentTime;

    // Display the current time on the page
    timeElem.textContent = `Current Time: ${currentTime}`;
  })
  .catch((error) => {
    console.error(error);
  });
