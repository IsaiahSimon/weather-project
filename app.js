require("dotenv").config();
const express = require("express");
const https = require("https"); // native node module

const app = express();

app.get("/", function(req, res){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=New York City&appid=${process.env.API_KEY}&units=imperial`;
  https.get(url, function(response) {
    console.log(response.statusCode); // output HTTP response code

    // Get data
    response.on("data", function(data) {
      // console.log(weatherData);
      // console.log(temp);
      // console.log(description);
      const weatherData = JSON.parse(data) // convert hex data into JSON
      const weatherTemp = weatherData.main.temp // access the temp within weatherData object
      const weatherDescription = weatherData.weather[0].description // access the weather description
      const weatherIcon = weatherData.weather[0].icon
      const weatherIconURL = `http://openweathermap.org/img/wn/${weatherIcon}@2x.png`
      res.write(`<p>The weather is currently ${weatherDescription}.</p>`)
      res.write(`<h1>The temperature in New York is ${weatherTemp} degrees Farenheit.</h1>`)
      res.write(`<img src="${weatherIconURL}">`)
      res.send()
    })
  })

  // Send result back to client
  //es.send("Server is up and running.")
})

// code...

app.listen(process.env.PORT, function() {
  console.log("Server is running on port 3000.")
})