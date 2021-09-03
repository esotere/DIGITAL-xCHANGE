const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI


mongoose.connect(uri || "mongodb://localhost/coinzUsers" , { useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => {
    console.log("Database Error: ", error);
});



module.exports = {
    url: "mongodb://localhost:27017/coinzUsers",
    MongoURI: uri
};


// const { MongoClient } = require('mongodb');
// const uri = "mongodb+srv://esotere:<password>@cluster0.b6y1i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
