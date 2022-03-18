const User = require('../models/user');
const Review = require("../models/review");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");

const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


module.exports.getRegister = (req, res) => {
    res.render('user/register');
}

module.exports.postRegister = async (req, res, next) => {
    try {
        const { password } = req.body;
        const user = new User(req.body.user);
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome back');
            res.redirect(`/user/${registeredUser._id}`);
        })
    } catch(e) {
        req.flash('error', e.message);
        res.redirect('/user/register');
    }
}

module.exports.getLogin = (req, res) => {
    res.render('user/login');
}

module.exports.postLogin = (req, res) => {
    req.flash('success', 'Welcome back');
    const redirectUrl = req.session.returnTo || `/user/${req.user._id}`;
    delete req.session.returnTo;
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Successfully signed out");
    res.redirect('/');
}

module.exports.profile = async (req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }
    });
    if(!foundUser) {
        next(new ExpressError("Sorry, We couldn't find the User that your looking for", 404));
    }
    res.render('user/profile', { user: foundUser });
}

//! Review
module.exports.getReview = async (req, res, next) => {
    const { id } = req.params;
    // You can't review yourself
    if(req.user._id != id) {
        const foundUser = await User.findById(id);
        if(!foundUser) {
            next(new ExpressError("Sorry, We couldn't find the User that you want to review", 404));
        }
        res.render('user/review', { user: foundUser });
    } else {
        req.flash('error', "You Can't Review Yourself");
        res.redirect(`/user/${foundUser._id}`);
    }
}

module.exports.postReview = async (req, res, next) => {
    const { id } = req.params;
    // You can't review yourself
    if(req.user._id != id) {
        const foundUser = await User.findById(id);
        const newReview = new Review(req.body.review);
        newReview.user = req.user._id;
        foundUser.reviews.push(newReview);
        await newReview.save();
        await foundUser.save();
        req.flash('success', 'Succesfuly Added a Review');
        res.redirect(`/user/${foundUser._id}`);
    } else {
        req.flash('error', "You Can't Review Yourself");
        res.redirect(`/user/${foundUser._id}`);
    }
}

//! Password reset

// Forgot

module.exports.getForgot = (req, res) => {
    res.render('user/forgot');
}

module.exports.postForgot = async (req, res, next) => {
    async.waterfall([
        (done) => {
            crypto.randomBytes(20, (err, buf) => {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        (token, done) => {
            User.findOne({ email: req.body.email })
            .then(foundUser => {
                if (!foundUser) {
                    req.flash('error', 'لا يوجد لدينا حساب بهذا البريد الالكتروني');
                    return res.redirect('/user/forgot');
                }
                foundUser.resetPasswordToken = token;
                foundUser.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                foundUser.save((err) => {
                    done(err, token, foundUser);
                });
            })
        },
        (token, user, done) => {
            let smtpTransport = nodemailer.createTransport({
            service: 'Gmail', 
            auth: {
                user: 'trippalestine@gmail.com',
                pass: process.env.GMAILPASSWORD
            }
            });
            var mailOptions = {
            to: user.email,
            from: 'trippalestine@gmail.com',
            subject: 'اعادة تعيين كلمة السر',
            text: `
                اعادة تعيين كلمة السر الخاص بحسابك
                لاعادة التعيين اضغط على الرابط التالي
                http://${req.headers.host}/reset/${token}
                اذا لم تقم بهذا الطلب فتجاهل هذه الرسالة
            `
            };
            smtpTransport.sendMail(mailOptions, (err) => {
                console.log('mail sent');
                req.flash('success', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
                done(err, 'done');
            });
        }
    ], (err) => {
      if (err) return next(err);
      res.redirect('/user/forgot');
    });
}