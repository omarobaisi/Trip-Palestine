const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const indexes = require('../controllers/indexes');

//! Home page
router.get('/', catchAsync(indexes.home))

//! Search
router.get('/search', catchAsync(indexes.search))

module.exports = router;