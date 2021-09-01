const mongoose = require("mongoose");
const uri = "mongodb+srv://esotere:learning2823@cluster0.b6y1i.mongodb.net/coinzUsers?retryWrites=true&w=majority"


mongoose.connect("mongodb://localhost/coinzUsers", { useNewUrlParser: true});

const db = mongoose.connection;

db.on("error", error => {
    console.log("Database Error: ", error);
});



module.exports = {
    url: "mongodb://localhost:27017/coinzUsers",
    MongoURI: uri
};