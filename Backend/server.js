const express = require("express");
const moment = require("moment-timezone");

const app = express();

// Middleware to parse incoming request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// GET route to return the list of time zones
app.get("/timezones", (req, res) => {
  const timeZones = moment.tz.names();
  res.send({ timeZones });
});

// GET route to handle current time request
app.get("/current-time", (req, res) => {
  // Get the current time in the server's local time zone
  const currentTime = moment();

  // Send the current time back to the client
  res.send({
    currentTime: currentTime.format("dddd, MMMM Do YYYY, h:mm:ss a"),
  });
});

// POST route to handle time zone conversion requests
app.post("/convert", (req, res) => {
  // Get the current time in the user's local time zone
  const currentTime = moment();
  console.log("Test");
  // Get the time zone selected by the user from the request body
  const { timeZone } = req.body;
  // Convert the current time to the selected time zone
  const convertedTime = currentTime
    .tz(timeZone)
    .format("dddd, MMMM Do YYYY, h:mm:ss a");
  // Print the received time zone to the console
  console.log(`Received time zone: ${timeZone}`);
  // Send the converted time back to the client
  res.send({ convertedTime });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
