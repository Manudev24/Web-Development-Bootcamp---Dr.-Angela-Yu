const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true });

var favoriteFruit;
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name required. Please insert a name."]
    },
    rating: {
        type: String,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const test = new Fruit({
    rating: 7,
    review: "Pretty solid as a fruit."
});

// test.save();

const apple = new Fruit({
    name: "Apple",
    rating: 7,
    review: "Pretty solid as a fruit."
});

const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Pretty nice."
});

const orange = new Fruit({
    name: "Orage",
    rating: 8,
    review: "Like the color."
});

const banana = new Fruit({
    name: "Banana",
    rating: 9,
    review: "Nice"
});

// Fruit.insertMany([apple, kiwi, orange, banana], (err) => {
//     console.log(err ? err : 'Succesfully save all the fruits to the dataBase');
// });

// Fruit.updateOne({ _id: '63bc401b0a014eb99bc51ba2' }, { name: "Prueba" }, (err) => {
//     console.log(err ? err : "Succefully updated.");
// });

// Fruit.deleteOne({ _id: '63bc401b0a014eb99bc51ba2' }, (err) => {
//     console.log(err ? err : "Succefully deleted.");
// });



// Fruit.find((err, fruits) => {
//     if (err) {
//         console.log(err);
//     } else {
//         mongoose.connection.close();
//         fruits.forEach(fruit => {
//             console.log(fruit.name);
//         });
//     }
// });


const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruits: fruitSchema
});

const Person = mongoose.model("Person", personSchema);


// const pineapple = new Fruit({
//     name: "Pineapple",
//     rating: 9,
//     review: "Nice fruit."
// });


// Person.deleteMany({ name: 'Victor' }, (err) => {
//     console.log(err ? err : "Succefully deleted.");
// });

// Person.deleteMany({ name: 'Victor' });


const person = new Person({
    name: "Victor",
    age: 20,
});

console.log(favoriteFruit);

const fruit1 = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "Pretty nice."
});



Person.updateOne({ name: 'Victor' }, { favoriteFruits: fruit1 }, (err) => {
    console.log(err ? err : "Succefully updated.");
    //console.log(searchFruitById("Kiwi"));
});

// person.save();



// const findDocuments = function (db, callback) {
//     const collection = db.collection('fruits');
//     collection.find({}).toArray(function (err, fruits) {
//         assert.equal(err, null);
//         console.log("Found the following records");
//         console.log(fruits);
//         callback(fruits);
//     });
// };