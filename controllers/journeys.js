const Journey = require("../models/journey");
const JourneyRegister = require("../models/journeyRegister");
const ExpressError = require("../utils/ExpressError");
const { cloudinary } = require("../cloudinary");

//! Index
module.exports.index = async (req, res, next) => {
    const journeys = await Journey.find({})
    if(!journeys) {
        next(new ExpressError("Sorry, We couldn't find this", 404));
    }
    res.render('journey/journeyIndex', {journeys});
}

//! Create
module.exports.getCreate = async (req, res) => {
    res.render('journey/newJourney');
}

module.exports.postCreate = async (req, res, next) => {
    req.body.journey.routes = req.body.routes;
    const newJourney = new Journey(req.body.journey);
    newJourney.user = req.user._id
    // Make a new array with the image path and name (multer will give you req.files for image data)
    newJourney.images = req.files.map(f => ({ url: f.path, filename: f.filename}))
    await newJourney.save();
    console.log(newJourney);
    req.flash('success', 'Created a new journey');
    res.redirect(`/journey/${newJourney._id}`);
}

//! Read
module.exports.read = async (req, res, next) => {
    const { id } = req.params;
    const journey = await Journey.findById(id).populate('user');
    if(!journey) {
        next(new ExpressError("Sorry, We couldn't find the journey that your looking for", 404));
    }
    res.render('journey/journeyDetails', {journey});
}

//! Update
module.exports.getUpdate = async (req, res, next) => {
    const { id } = req.params;
    const journey = await Journey.findById(id);
    if(!journey) {
        next(new ExpressError("Sorry, We couldn't find the journey that you want to update", 404));
    }
    res.render('journey/editJourney', {journey});
}

module.exports.postUpdate = async (req, res, next) => {
    const { id } = req.params;
    req.body.journey.routes = req.body.routes;
    const updatedJourney = await Journey.findByIdAndUpdate(id, req.body.journey, { runValidators: true, new: true });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename}));
    updatedJourney.images.push(...imgs);
    await updatedJourney.save();
    // Delete selected images from the model and cloudinary
    if (req.body.deleteImages) {
        // Delete from cloudinary
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        // If a filename has the same name of a deleteImages pull it out from the images array
        await updatedJourney.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'The journey has been updated');
    res.redirect(`/journey/${updatedJourney._id}`);
}

//! Delete
module.exports.delete = async (req, res, next) => {
    const { id } = req.params;
    await Journey.findByIdAndDelete(id);
    
    req.flash('success', 'Journey Succesfuly Deleted');
    res.redirect('/');
}

//! Register
module.exports.getRegister = async (req, res) => {
    const { id } = req.params;
    const foundJourney = await Journey.findById(id);
    res.render('journey/journeyRegister', { journey: foundJourney })
}

module.exports.postRegister = async (req, res) => {
    const newRegister = new JourneyRegister(req.body.info);

    // no payment
    newRegister.approved = false;

    // paypal payment
    // newRegister.approved = true;

    await newRegister.save();
    req.flash('success', 'تم التسجيل بالرحلة بنجاح');
    res.redirect('/');
}