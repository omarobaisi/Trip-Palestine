const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/user/login');
    }
    next();
}

module.exports.isAuthorized = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/user/login');
    } else if (req.user.authorization == 'normal') {
        throw new ExpressError("You Aren't Allowed To Do This", 401);
    } else {
        next();
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/user/login');
    } else if (req.user.authorization != 'admin') {
        throw new ExpressError("You Aren't Allowed To Do This", 401);
    } else {
        next();
    }
}

module.exports.isNormal = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/user/login');
    } else if (req.user.authorization != 'normal') {
        throw new ExpressError("You Aren't Allowed To Do This", 401);
    } else {
        next();
    }
}