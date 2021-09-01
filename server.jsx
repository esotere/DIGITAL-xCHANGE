const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const routesIndex = require("./routes/index.jsx");
const routesUsers = require("./routes/users.jsx");
const path = require("path");

const app = express();

// Passport config
require("./config/passportConfig.js")(passport);

// Controllers
const routeController = require("./controllers/controller.js")


// Country Telephone Data
var countryTelData = require('country-telephone-data');

countryTelData.allCountries // has data as array of objects 
countryTelData.iso2Lookup // has data as a map (object) indexed by iso2 name of the country

require("dotenv").config();

// Port server is running on and process.env for when deployed
const port = process.env.PORT || 7779;

// DB Config
// const db = require("./config/connection.jsx");

// Mongoose connection for Database 
mongoose.connect("mongodb://localhost/coinzUsers", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch(err => console.log(err));







// EJS set view engine as ejs
app.use(expressLayouts);     // +==> must be above app.set or won't work
app.set("view engine", "ejs");

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'views', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'DIGITAL_XCHANGE', 'build', 'server.jsx'))
  });
  
}

app.use(express.static(path.resolve(__dirname + "/public/"))); 
// app.use(express.static(path.join(__dirname, "/public/")));
// Bodyparser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.raw({type:"application/x-www-form-urlencoded"}));

app.use(express.text({ type:"text/html"}));

app.use(express.json({type: "application/*+json"}));

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

// Routes 
app.use("/", routesIndex);
app.use("/users", routesUsers);
routeController(app);





app.listen(port, () => {
    console.log(`Server started successfully. App listening on ${port}!`);
});
