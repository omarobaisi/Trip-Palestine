const express = require('express');
const router = express.Router();
const passport = require('passport');
const users = require('../controllers/users');
const catchAsync = require("../utils/catchAsync");
const authorization = require('../middleware/authorization');
const validation = require('../middleware/validation');

//! Register
router.route('/register')
    .get(users.getRegister)
    .post(users.postRegister);

//! Login
router.route('/login')
    .get(users.getLogin)
    .post(passport.authenticate('local', {failureFlash: true, failureRedirect: '/user/login'}), users.postLogin);

//! Logout
router.get('/logout', users.logout)

//! Password reset
router.get('/forgot', users.getForgot)
router.post('/forgot', users.postForgot)

//! Profile
router.get('/:id', catchAsync(users.profile));

//! Review
router.get('/:id/review/add', authorization.isLoggedIn, catchAsync(users.getReview));
router.post('/:id/review',authorization.isLoggedIn, validation.reviewValidation, catchAsync(users.postReview));

module.exports = router;