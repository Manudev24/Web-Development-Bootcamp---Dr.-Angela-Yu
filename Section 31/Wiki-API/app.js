const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true });

const articleShema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    }
});

const Article = mongoose.model('Article', articleShema);

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.route("/articles")

    .get(
        (req, res) => {
            Article.find({}, (err, article) => {
                res.send(err ? err : article);
            });
        }
    )

    .post(
        (req, res) => {
            let article = new Article({
                title: req.body.title,
                content: req.body.content
            });

            article.save(
                (err) => {
                    res.send(!err ? "Successfully added" : "Unsuccessfully added");
                }
            );
        }
    )

    .delete(
        (req, res) => {
            let article = new Article({
                title: req.body.title,
                content: req.body.content
            });

            article.save(
                (err) => {
                    res.send(!err ? "Successfully added" : "Unsuccessfully added");
                }
            );
        }
    );

app.route("/articles/:id")

    .get((req, res) => {
        const id = req.params.id;
        Article.findOne({ _id: id }, (err, article) => {
            res.send(err ? "There was an error in the search or item not found." : article);
        });
    })
    .put((req, res) => {
        const id = req.params.id;
        const title = req.body.title;
        const content = req.body.content;

        Article.updateOne(
            { _id: id },
            { title: title, content: content },
            (err) => {
                res.send(!err ? "Updated successfully" : "There was error.");
            }
        );
    })

    .patch((req, res) => {
        const id = req.params.id;

        Article.updateOne(
            { _id: id },
            { $set: req.body },
            (err) => {
                res.send(!err ? "Updated successfully" : "There was error.");
            }
        );
    })
    .delete((req, res) => {
        const id = req.params.id;
        Article.deleteOne({ _id: id }, (err) => {
            res.send(!err ? "Deleted successfully" : "There was error.");
        })
    });
;
//TODO

app.listen(3000, function () {
    console.log("Server started on port 3000");
    console.log("http://localhost:3000/");
});