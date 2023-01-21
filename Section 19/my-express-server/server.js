const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("<h1>Hello World :D</h1>");
});

app.get("/contact", (req, res) => {
    res.send("<h1>Contactme to victor@gmail.com</h1>");
});

app.get("/about", (req, res) => {
    res.send("<h1>Victor Estevez</h1><p>Hi, I Am Victor :D</p>");
});

app.get("/Hobbies", (req, res) => {
    res.send("<ul><li>Motos</li><li>Cars</li></ul>");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});