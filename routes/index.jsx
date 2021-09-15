const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth.jsx");
require("../controllers/controller.js")


// Profile Page
router.get("/profile", ensureAuthenticated, (req, res) => {
    res.render("profile", {
        user: req.user
        
    });
});


// Transactions Page
router.get("/transactions", ensureAuthenticated, (req, res) => {
    res.render("transactions", {
        // transaction: req.transaction,
        // transactionInfo: req.transaction.transactionInfo,
         transactionInfo: req.transaction !== undefined ? req.transaction.transactionInfo : ""
        
    });
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
    res.render("dashboard", {
        user: req.user,
        name: req.user.firstName
    });
});

// Payment/USSD 
router.get("/replenish", ensureAuthenticated, (req, res) => {
    res.render("replenish", {
        user: req.user

    });
});

// //  Routes for USSD
// router.post("/replenish", ensureAuthenticated, (req, res) => {
//     let { sessionId, serviceCode, phoneNumber, test } = req.body;
//     if (text === '') {
//         // This is the first request. Note how we start the response with CON
//         let response = `CON What would you want to check
//     1. My Account
//     2. My phone number
//     3. Make Payment`
//         res.send(response)
//     } else if (text === '1') {
//         // Business logic for first level response
//         let response = `CON Choose account information you want to view
//     1. Account number
//     2. Account balance`
//         res.send(response)
//     } else if (text === '2') {
//         // Business logic for first level response
//         let response = `END Your phone number is ${phoneNumber}`
//         res.send(response)
//     } else if (text === '1*1') {
//         // Business logic for first level response
//         let accountNumber = 'ACC1001'
//         // This is a terminal request. Note how we start the response with END
//         let response = `END Your account number is ${accountNumber}`
//         res.send(response)
//     } else if (text === '1*2') {
//         // This is a second level response where the user selected 1 in the first instance
//         let balance = 'NGN 10,000'
//         // This is a terminal request. Note how we start the response with END
//         let response = `END Your balance is ${balance}`
//         res.send(response)
//     } else {
//         res.status(400).send('Bad request!')
//     }
// });

module.exports = router;




