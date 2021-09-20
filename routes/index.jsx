const express = require("express");
const router = express.Router();
// const multer = require("multer");
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
        user: req.user,
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
// External transfer/payment
router.get("/replenish", ensureAuthenticated, (req, res) => {
    res.render("replenish", {
        user: req.user
        
    });
});

// Payment/USSD 
// router.post("/replenish", ensureAuthenticated, (req, res) => {
//            user: req.user

//   let {productName, bankAccount, currencyCode, amount, narration, metadata} = req.body
//   if (text == '') {
//     // This is the first request. Note how we start the response with CON
//     let response = `CON What would you like to do?
//     1. Transfer Fund
//     2. Make Payment
//     3. Refill Coinz`
//     res.send(response)
//   } else if (text == "1" || text == "2") {
//     // Business logic for first level response
//     let currencyCode;
//     let response = `CON Enter account number and amount`
//     res.send(response)
//   } else if (text == "3") {
//     // Business logic for first level response
//     let currencyCode;
//     let productName = "Coinz"
//     let response = `CON Enter ${productName}, account number and amount`
//     res.send(response)
//   }  else {
//     res.status(400).send('Bad request!')
//   }

// });


module.exports = router;




