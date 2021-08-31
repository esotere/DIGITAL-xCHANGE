const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth.jsx");
require("../controllers/controller.js")

// Transactions Page
router.get("/transactions", ensureAuthenticated, (req, res) => {
    res.render("transactions", {
        transaction: req.transaction,
        transactionInfo: req.transactionInfo
        
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




