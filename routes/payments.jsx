const express = require("express");
const router = express.Router();

// Get authentication secrets from a file
// const credentials = require("../config/ussd.jsx"); // throws error [object object]

// const AfricasTalking = require("africastalking")(credentials.TEST_ACCOUNT);
// const AfricasTalking = require("africastalking")(credentials); // throws error [object object]
const AfricasTalking = require("africastalking")({
    apiKey: process.env.AFRICAS_TALKING_API_KEY,
    username: "esotere",
    format: "json"
});


const payments = AfricasTalking.PAYMENTS;

router.post("/replenish", (req, res) => {
    const {
        productName,
        phoneNumber,
        currencyCode,
        amount
    } = req.body;
    let metadata = { "Joe": "Biden", "id": "Pres" }

    let options = {
        productName,
        phoneNumber,
        currencyCode,
        amount: Number(amount),
        metadata
    }

    payments.mobileCheckout(options)
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error.toString());
        });
});

router.post("/mobile-b2c", (req, res) => {
    const productName = "Coinz";
    const {
        // productName,
        bankAccount, 
        currencyCode, 
        amount, 
        narration, 
        metadata,
        
        // phoneNumber,
        // currencyCode,
        // amount
    } = req.body;

    let recipient = {
        productName,
        bankAccount, 
        currencyCode, 
        amount: Number(amount), 
        narration, 
        metadata: { "foo": "bar" },
        
        // phoneNumber,
        // currencyCode,
        // amount: Number(amount),
        // metadata: { "foo": "bar" },
        // reason: payments.REASON.SALARY
    }

    let options = {
        productName,
        bankAccount, 
        currencyCode, 
        amount: Number(amount),
        // recipient,
        narration, 
        metadata: { "foo": "bar" }

        // productName,
        // recipients: [
        //     firstRecipient,
        //     // more recipients
        // ]
    }

    payments.bankCheckoutCharge(options)
        .then(response => {
            console.log(response);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.json(error.toString());
        });
});

module.exports = router;