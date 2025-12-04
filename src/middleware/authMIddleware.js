// user must be logged in
function ensureAuth(req, res, next) {
    if(req.session && req.session.userId) {
        return next();
    }
    return res.redirect("/login");
}

// user must be logged out (login page)
function ensureGuest(req, res, next) {
    if(req.session && req.session.userId) {
        return res.redirect("/dashboard");
    }
    return next();
}

module.exports = {ensureAuth, ensureGuest};