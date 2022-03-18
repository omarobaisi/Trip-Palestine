const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const validation = require('../middleware/validation');
const authorization = require('../middleware/authorization');
const journeys = require('../controllers/journeys');

const multer = require('multer');                               // Parse multipart/form-data
const { storage }  = require('../cloudinary')                   // it will look for index.js so you don't need to write it
const upload = multer({ storage })                              // Upload the image into the cloudinary storage

//! Index & postCreate
router.route('/')
    .get(catchAsync(journeys.index))
    .post(authorization.isAuthorized, upload.array('image'), validation.journeyValidation, catchAsync(journeys.postCreate));      // multer will give you req.files which will give you the image data

//! getCreate
router.get('/new', authorization.isAuthorized, journeys.getCreate);

//! Read & postUpdate & Delete, postRegister
router.route('/:id')
    .get(catchAsync(journeys.read))
    .put(authorization.isAuthorized, upload.array('image'), validation.journeyValidation, catchAsync(journeys.postUpdate))
    .delete(authorization.isAuthorized, catchAsync(journeys.delete))
    .post(catchAsync(journeys.postRegister));

//! getUpdate
router.get('/:id/edit', authorization.isAuthorized, catchAsync(journeys.getUpdate));

//! getRegister
router.get('/:id/register', catchAsync(journeys.getRegister));

module.exports = router;