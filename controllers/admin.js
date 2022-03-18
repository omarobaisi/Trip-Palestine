const ExpressError = require("../utils/ExpressError");
const JourneyRegister = require("../models/journeyRegister");
const CoordinatorRequest = require("../models/coordinatorRequest");
const User = require('../models/user');

//! Approve page
module.exports.getApproveRegistration = async (req, res, next) => {
    const foundRegister = await JourneyRegister.find();
    if(!foundRegister) {
        next(new ExpressError("Sorry, We couldn't find the data that your looking for", 404));
    }
    res.render('admin/approveRegistration', {registration: foundRegister});
}

//! Approve a user
module.exports.approveRegistration = async (req, res) => {
    const { id } = req.params;
    await JourneyRegister.findByIdAndUpdate(id, { approved: true }, { runValidators: true, new: true });
    req.flash('success', 'Successfully Approved');
    res.redirect('/admin/approveregistration');
}

//! Coordinator request page
module.exports.coordinatorRequestPage = (req, res) => {
    res.render('admin/makeCoordinatorRequest');
}

//! Send a coordinator request
module.exports.coordinatorRequest = async (req, res) => {
    const newRequest = new CoordinatorRequest(req.body.info);
    newRequest.user = req.user._id;
    await newRequest.save();
    req.flash('success', 'تم ارسال الطلب بنجاح سنتواصل معك باقرب وقت');
    res.redirect('/');
}

//! Coordinator request page
module.exports.getApproveCoordinator = async (req, res, next) => {
    const foundRequest = await CoordinatorRequest.find();
    if(!foundRequest) {
        next(new ExpressError("Sorry, We couldn't find the data that your looking for", 404));
    }
    res.render('admin/approvecoordinator', {Request: foundRequest});
}

//! Accept a coordinator
module.exports.approveCoordinator = async (req, res) => {
    const { id } = req.params;
    const foundRequest = await CoordinatorRequest.findById(id).populate('user');
    foundRequest.user.authorization = 'coordinator';
    await foundRequest.user.save();
    await CoordinatorRequest.findByIdAndDelete( id );
    req.flash('success', 'Successfully Approved :)');
    res.redirect('/admin/approvecoordinator');
}

//! Denie a coordinator
module.exports.denieRegistration = async (req, res) => {
    const { id } = req.params;
    await CoordinatorRequest.findByIdAndDelete( id );
    req.flash('success', 'Successfully Denied :(');
    res.redirect('/admin/approvecoordinator');
}

//! Remove a coordinator
module.exports.removeCoordinator = async (req, res, next) => {
    const { id } = req.body;
    const foundUser = await User.findById(id);
    foundUser.authorization = 'normal';
    await foundUser.save();
    req.flash('success', 'Successfully demotioned');
    res.redirect(`/user/${id}`);
}