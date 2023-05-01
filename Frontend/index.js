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

// Get a reference to the timezone dropdown element
const timezoneSelect = document.getElementById("timezone");

// Make a GET request to the /timezones endpoint on the server
fetch("http://localhost:3000/timezones")
  .then((response) => {
    // Parse the response as JSON data
    return response.json();
  })
  .then((data) => {
    // Extract the time zone names from the response data
    const timeZones = data.timeZones;

    // Create an option element for each time zone and add it to the dropdown
    timeZones.forEach((timeZone) => {
      const optionElem = document.createElement("option");
      optionElem.value = timeZone;
      optionElem.text = timeZone;
      timezoneSelect.add(optionElem);
    });
  })
  .catch((error) => {
    console.error(error);
  });

// Make a POST request to the /convert endpoint on the server
// Get a reference to the form element
const formElem = document.querySelector("form");

// Attach an event listener to the form's submit event
formElem.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get the selected time zone from the form
  const timeZone = document.getElementById("timezone").value;

  // Make a POST request to the /convert endpoint on the server
  fetch("http://localhost:3000/convert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ timeZone }),
  })
    .then((response) => {
      // Parse the response as JSON data
      return response.json();
    })
    .then((data) => {
      // Extract the converted time from the response data
      const convertedTime = data.convertedTime;

      // Display the converted time on the page
      const timeElem = document.getElementById("converted_time");
      timeElem.textContent = `Converted Time: ${convertedTime}`;
    })
    .catch((error) => {
      console.error(error);
    });
});
