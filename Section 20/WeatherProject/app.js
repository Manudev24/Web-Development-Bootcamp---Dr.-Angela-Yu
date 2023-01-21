const { response, json } = require("express");
const bodyParse = require('body-parser');
const express = require("express");
const https = require("https");
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", (req, res) => {
    console.log(req.body.cityName);


    let query = req.body.cityName;
    const url = `https://api.openweathermap.org/data/2.5/weather?&q=${query}&units=metric&appid=c8495051c676e8d92385cb893bf72ce9`;
    https.get(url, (response) => {
        let weatherData = '';
        response.on("data", (data) => {
            weatherData = JSON.parse(data);
        })

        response.on('end', () => {
            let descripcion = weatherData.weather[0].description;
            let cityName = weatherData.name;
            let temp = weatherData.main.temp;
            let iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;

            res.write(`<h1>The temperature in ${cityName} is ${temp}</h1>`);
            res.write(`<h1>The current weather in ${cityName} is ${descripcion}</h1>`);
            res.write(`<img src=${iconUrl}>`);
            res.send();
        })
    })
})




app.listen(3000, () => {
    console.log("Server is running on port 3000.")
});