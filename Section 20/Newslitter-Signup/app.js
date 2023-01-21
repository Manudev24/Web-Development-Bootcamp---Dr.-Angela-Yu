const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const { response } = require('express');

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`);
});

app.get('/success', (req, res) => {
    res.sendFile(`${__dirname}/success.html`);
});

app.get('/failure', (req, res) => {
    res.sendFile(`${__dirname}/failure.html`);
});

app.post('/failure', (req, res) => {
    res.redirect('/');
});

app.post('/', (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/2661dd937e'

    const options = {
        method: "POST",
        auth: "manuel2407:c22209b5eb008ea19a58008cb5d882bc-us21"
    }
    const request = https.request(url, options, (response) => {

        response.on("data", (data) => {
            console.log(JSON.parse(data));
            if (JSON.parse(data).errors.length === 0) {
                res.sendFile(`${__dirname}/success.html`);
            } else {
                res.sendFile(`${__dirname}/failure.html`);
            }
        })
    })

    request.write(jsonData);
    request.end();
});



app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

//Api key
//c22209b5eb008ea19a58008cb5d882bc-us21

//Audience ID
//2661dd937e