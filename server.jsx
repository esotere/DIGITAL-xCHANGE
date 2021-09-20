require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const routesIndex = require("./routes/index.jsx");
const routesUsers = require("./routes/users.jsx");
const routesPayments = require("./routes/payments.jsx");
const path = require("path");
const logger = require("morgan");
// const multer = require("multer");

const app = express();

// Passport config
require("./config/passportConfig.js")(passport);

// Controllers
const routeController = require("./controllers/controller.js")


// Country Telephone Data
var countryTelData = require('country-telephone-data');

countryTelData.allCountries // has data as array of objects 
countryTelData.iso2Lookup // has data as a map (object) indexed by iso2 name of the country


// Port server is running on and process.env for when deployed
const port = process.env.PORT || 7779;

// DB Config
// const db = require("./config/connection.jsx");

// Mongoose connection for Database 
mongoose.connect("mongodb://localhost/coinzUsers" || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));

    

// mongoose.connect("mongodb://localhost/coinzUsers", { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log("MongoDB connected..."))
//     .catch(err => console.log(err));




// EJS set view engine as ejs
app.use(expressLayouts);     // +==> must be above app.set or won't work
app.set("view engine", "ejs");

if(process.env.NODE_ENV === 'production') {
   app.use(express.static("build"));
      app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "public", "server.jsx"));
  });
  
}

app.use(express.static(path.resolve(__dirname + "/public/"))); 
// app.use(express.static(path.join(__dirname, "/public/")));
// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.raw({type:"application/x-www-form-urlencoded"}));

app.use(express.text({ type:"text/html"}));

app.use(express.json({ type: "application/*+json" }));

app.use(logger("dev"));

// Express session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Passport middleware must come after express-session middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Global variables (my middleware)
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.date_error = req.flash("date_error");
    next();
});



// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
 
// var upload = multer({ storage: storage });
 




// Routes 
app.use("/", routesIndex);
app.use("/users", routesUsers);
app.use("/replenish", routesPayments);
// app.use("/transactions", routesIndex);
routeController(app);




// // Set Port
// app.set("port", (process.env.PORT || 7779));




app.listen(port, () => {
    console.log(`Server started successfully. App listening on ${port}!`);
});