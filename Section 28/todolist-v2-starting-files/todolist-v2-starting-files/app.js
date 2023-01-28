//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3001;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://admin-victor:admin@cluster0.an0nvbl.mongodb.net/todolistDB", { useNewUrlParser: true });


const taskShema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  }
});

const Task = mongoose.model('Task', taskShema);

const task1 = new Task(
  {
    name: "This is a List app."
  }
);

const task2 = Task(
  {
    name: "<-- You can use this checkbox to delete the item."
  }
);

const task3 = new Task(
  {
    name: "You can use the + button to add a new item."
  }
);

const listSchema = {
  name: String,
  items: [taskShema]
};

const List = mongoose.model("List", listSchema);


app.get("/", function (req, res) {

  Task.find(function (err, tasks) {
    if (tasks.length === 0) {
      const defaultTasks = [task1, task2, task3];
      Task.insertMany(defaultTasks, err => {
        console.log(err ? err : "Successfully saved the defaults task");
      });

    }
    else {
      res.render("list", { listTitle: "Today", newListItems: tasks });
    }
  });
});

app.get("/:customListname", function (req, res) {
  const customListName = req.params.customListname;

  List.findOne({ name: customListName }, (err, list) => {
    if (!err) {
      if (!list) {
        const list = new List(
          {
            name: customListName,
            items: [task1, task2, task3]
          }
        );
        list.save();
        res.redirect(`/${customListName}`);

      } else {
        res.render("list", { listTitle: list.name, newListItems: list.items });
      }
    }
  });

  //   console.log(customListName);
});


app.post("/", function (req, res) {

  const item = req.body.newItem;
  const value = req.body.list;

  const newItem = new Task({
    name: item
  });


  if (value === "Today") {
    newItem.save();
    res.redirect("/");
  } else {
    List.findOne({ name: value }, (err, list) => {
      list.items.push(newItem);
      list.save();
      res.redirect(`/${value}`);
    })
  }

});

app.post("/delete", function (req, res) {

  const id = req.body.checkbox;
  const name = req.body.listName;

  if (name === "Today") {
    Task.findByIdAndDelete(id, (err) => {
      console.log(err ? err : "Deleted successfully");
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({ name: name }, { $pull: { items: { _id: id } } }, (err, result) => {
      if (!err) {
        res.redirect(`/${name}`);
      } else {
        console.log(err);
      }
    });
  }


});


app.get('/:param', function (req, res) {
  res.render("list", { listTitle: req.params.param.toLowerCase(), newListItems: [] });
});

app.get("/about", function (req, res) {
  res.render("about");
});

// app.listen(3000, function () {
//   console.log("Server started on port 3000");
//   console.log("http://localhost:3000/");
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
