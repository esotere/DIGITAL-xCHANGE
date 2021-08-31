const express = require("express");
const router = express.Router();
const bcrypt =require("bcryptjs")
const passport = require("passport");

require("../config/passportConfig.js")

// User model
const User = require("../models/Users.jsx");

// *******************************************************************
const { forwardAuthenticated } = require('../config/auth.jsx');


// Login Page
router.get("/login", forwardAuthenticated, (req, res) => {
            res.render("login");
        });

// Register Page
router.get("/register", forwardAuthenticated, (req, res) => {
            res.render("register");
        });
// *********************************************************************


// Login Page
// router.get("/login",  (req, res) => {
//             res.render("login");
//         });

// // Register Page
// router.get("/register",  (req, res) => {
//             res.render("register");
//         });
        

// // Test retrieving data
// router.get("/api/users", (req, res) => {
//         console.log(req.body);
//         User.find({}, (err, users) => {
//             if (err) {
//                 res.status(500).send({error: `Could Not Get Information Of All Users`});
//             } else {
//                 console.log(users);
//                 res.status(200).send(users);
//             }
//         })
//     });


// Register Handle
router.post("/api/users", (req, res) => {
    // console.log(req.body);
//     res.send(req.body);
// })
    const {
        title, 
        userName, 
        firstName, 
        lastName, 
        address, 
        countryCode, 
        phoneNumber, 
        email, 
        bank_name, 
        bank_account_number, 
        bvn, 
        system_account_number, 
        accountBalance, 
        password, 
        confirmPassword 
    } = req.body;

    console.log(req.body);


    let errors = [];

    // Check required fields
    if (!userName || !firstName || !lastName || !address || !countryCode || !phoneNumber || !email || !password || !confirmPassword) {
        errors.push({msg: "Please fill in required fields!"});
    }
    
    // Check passwords match
    if (password !== confirmPassword) {
        errors.push({ msg: "Passwords do NOT match!"});
    }

    // Check password length. Validation in HTML
    // Throws error "Typeerror cannot read property 'length' of undefined"
    // if (password.length < 6) {
    //     errors.push({msg: "Password must be at least 6 characters long!"});
    // }

    if (errors.length > 0) {
        res.render("register", {
            errors,
            title,
            userName,
            firstName,
            lastName,
            address,
            countryCode,
            phoneNumber,
            email,
            bank_name, 
            bank_account_number,
            bvn,
            system_account_number,
            accountBalance,
            password,
            confirmPassword
        })
    } else {
        // Validation passed
      User.findOne({ phoneNumber: phoneNumber })
        .then(user => {
            if (user) {
                // User exists
                errors.push({ msg: "Phone Number is already registered" })
                res.render("register", {
                    errors,
                    title,
                    userName,
                    firstName,
                    lastName,
                    address,
                    countryCode,
                    phoneNumber,
                    email,
                    bank_name,
                    bank_account_number,
                    bvn,
                    system_account_number,
                    accountBalance,
                    password,
                    confirmPassword
                });
            } else {
                const newUser = new User({
                    title,
                    userName,
                    firstName,
                    lastName,
                    address,
                    countryCode,
                    phoneNumber,
                    email,
                    bank_name,
                    bank_account_number,
                    bvn,
                    system_account_number,
                    accountBalance,
                    password
                });
                
                console.log(newUser);
              
                // Password encryption hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set password to hash
                        newUser.password = hash;
                        // Save user
                        newUser.save()
                            .then(user => {
                                req.flash("success_msg", "You are now registered and can log in.");
                                res.redirect("/users/login");
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });  
    }
});


// **********************************************************************
// // For debugging
// router.post('/login', function (req, res, next) {
//     console.log(req);
//     console.log(req.url);
//     console.log(req.userName);
//     console.log(req.password);
//     passport.authenticate('local', function(err, user, info) {
//         console.log("authenticate");
//         console.log(err);
//         console.log(user);
//         console.log(info);
//     })(req, res, next);
// });
// *****************************************************************************





// // Login Handle
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true
    })(req, res, next);
});

// Logout Handle
router.get("/logout", (req, res) => {
    req.logOut();
    req.flash("success_msg", "You are logged out")
    res.redirect("/users/login");
    });


module.exports = router;