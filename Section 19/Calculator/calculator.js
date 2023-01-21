const express = require('express');
const bodyParse = require('body-parser');
const app = express();

app.use(bodyParse.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
});

app.get('/bmicalculator', (req, res) => {
    res.sendFile(`${__dirname}/bmiCalculator.html`)
});

app.post('/bmicalculator', (req, res) => {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight / (height * height);

    res.send(`The result is ${result}`);
});

app.post('/', (req, res) => {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send(`The result is ${result}`);
});



app.listen(3000, () => {
    console.log("The server is running on the port 3000.");
});