const express = require('express');
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const admin = require('../controllers/admin');
const authorization = require('../middleware/authorization');

//! Registration

// Registration request page
router.get('/approveregistration', authorization.isAdmin, catchAsync(admin.getApproveRegistration))
// Accept a registration
router.get('/:id/approveregistration', authorization.isAdmin, catchAsync(admin.approveRegistration))

//! Coordinator

// coordinator request page
router.get('/becoordinator', authorization.isNormal, catchAsync(admin.coordinatorRequestPage))

// Send a coordinator request
router.post('/becoordinator', authorization.isNormal, catchAsync(admin.coordinatorRequest))

// Coordinator request page
router.get('/approvecoordinator', authorization.isAdmin, catchAsync(admin.getApproveCoordinator))

// Accept a coordinator
router.get('/:id/approvecoordinator', authorization.isAdmin, catchAsync(admin.approveCoordinator))

// Denie a coordinator
router.get('/:id/deniecoordinator', authorization.isAdmin, catchAsync(admin.denieRegistration))

// Remove a coordinator
router.post('/removecoordinator', authorization.isAdmin, catchAsync(admin.removeCoordinator))

module.exports = router;