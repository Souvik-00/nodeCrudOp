const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {ensureAuth, ensureGuest} = require("../middleware/authMIddleware");

// Login Page
router.get("/login", ensureGuest, (req, res) => {
    res.render("auth/login");
});

// After login to the dashboard 
router.post("/login", ensureGuest, async (req, res) => {
    const {email, password} = req.body;

    try {
        // find user
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).send("Invalid email or password");
        }

        // store user in the session
        req.session.userId = user._id;
        req.session.userName = user.name;

        return res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
});


// Get dashboard protected
router.get("/dashboard", ensureAuth,  (req, res) => {
    res.render("dashboard/index", {title: "Dashboard", userName: req.session.userName || "User", });
});

// Logout
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});

// root route redirect
router.get("/", (req, res) => {
    if(req.session || req.session.userId) {
        res.redirect("/dashboard");
    }
    return res.redirect("/login");
});

module.exports = router;
