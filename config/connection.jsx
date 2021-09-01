const mongoose = require("mongoose");
const uri = process.env.MongoURI


mongoose.connect("mongodb://localhost/coinzUsers" || uri, { useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => {
    console.log("Database Error: ", error);
});



module.exports = {
    url: "mongodb://localhost:27017/coinzUsers",
    MongoURI: uri
};