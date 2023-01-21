const express = require('express');
const bodyParse = require('body-parser');

const app = express();
var items = [];
var itemsWorks = [];
app.set('view engine', 'ejs');
app.use(bodyParse.urlencoded({ extended: true }));;
app.use(express.static('public'));


app.get('/', (req, res) => {
    let day = new Date();

    const options = {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    };

    let currentDateString = day.toLocaleDateString('en-US', options);

    res.render("list", { listTitle: currentDateString, itemList: items });
});

app.get('/work', (req, res) => {
    res.render("list", { listTitle: "Works", itemList: itemsWorks });
});

app.post('/', (req, res) => {
    let newItem = req.body.item;
    if (req.body.kindOfButton === "Works") {
        itemsWorks.push(newItem);
        res.redirect("/work");
    } else {
        items.push(newItem);
        res.redirect("/");
    }


});

app.listen(3000, () => {
    console.log('The server is running on port 3000.');
});