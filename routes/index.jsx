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

module.exports = router;




