const ExpressError = require("../utils/ExpressError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'عليك تسجيل الدخول اولا !');
        return res.redirect('/user/login');
    }
    next();
}

module.exports.isAuthorized = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'عليك تسجيل الدخول اولا !');
        return res.redirect('/user/login');
    } else if (req.user.authorization == 'normal') {
        throw new ExpressError("ليس لديك الصلاحيات الكافيه للقيام بهذا", 401);
    } else {
        next();
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'عليك تسجيل الدخول اولا !');
        return res.redirect('/user/login');
    } else if (req.user.authorization != 'admin') {
        throw new ExpressError("ليس لديك الصلاحيات الكافيه للقيام بهذا", 401);
    } else {
        next();
    }
}

module.exports.isNormal = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'عليك تسجيل الدخول اولا !');
        return res.redirect('/user/login');
    } else if (req.user.authorization != 'normal') {
        throw new ExpressError("ليس لديك الصلاحيات للقيام بهذا", 401);
    } else {
        next();
    }
}