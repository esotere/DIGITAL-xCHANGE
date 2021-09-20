const LocalStrategy = require("passport-local").Strategy;
// const mongoose = require("mongoose")
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../models/Users.jsx");


module.exports = (passport) => {
    passport.use( new LocalStrategy({ usernameField: "phoneNumber"}, (phoneNumber, password, done) => {
        // match user
        User.findOne({ phoneNumber: phoneNumber})
            .then(user => {
                if (!user) {
                    return done(null, false, {message: "That phone number is not registered."})
                }
                // match password
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;

                    if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: "Password Incorrect!"})
                    }
                });
            })
            .catch(err => console.log(err))
        })
    );

    // passport.use(new LocalStrategy({ usernameField: "firstName"}, (firstName, password, done) => {
    //     // match user
    //     User.findOne({ firstName: firstName})
    //         .then(user => {
    //             if (!user) {
    //                 return done(null, false, {message: "That first name is not registered"})
    //             }
    //             // match password
    //             bcrypt.compare(password, user.password, (err, isMatch) => {
    //                 if (err) throw err;

    //                 if (isMatch) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(null, false, {message: "Password Incorrect!"})
    //                 }
    //             });
    //         })
    //         .catch(err => console.log(err))
    //     })
    // );

    // passport.use(new LocalStrategy({ usernameField: "userName"}, (userName, password, done) => {
    //     // match user
    //     User.findOne({ userName: userName})
    //         .then(user => {
    //             if (!user) {
    //                 return done(null, false, {message: "That username is not registered"})
    //             }
    //             // match password
    //             bcrypt.compare(password, user.password, (err, isMatch) => {
    //                 if (err) throw err;

    //                 if (isMatch) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(null, false, {message: "Password Incorrect!"})
    //                 }
    //             });
    //         })
    //         .catch(err => console.log(err))
    //     })
    // );

    // passport.use(new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
    //     // match user
    //     User.findOne({ email: email})
    //         .then(user => {
    //             if (!user) {
    //                 return done(null, false, {message: "That email is not registered"})
    //             }
    //             // match password
    //             bcrypt.compare(password, user.password, (err, isMatch) => {
    //                 if (err) throw err;

    //                 if (isMatch) {
    //                     return done(null, user);
    //                 } else {
    //                     return done(null, false, {message: "Password Incorrect!"})
    //                 }
    //             });
    //         })
    //         .catch(err => console.log(err))
    //     })
    // );

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });

};