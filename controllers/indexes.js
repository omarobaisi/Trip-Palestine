const Journey = require("../models/journey");
const ExpressError = require("../utils/ExpressError");

module.exports.home = async (req, res, next) => {
    const journeys = await Journey.find({})
    if(!journeys) {
        next(new ExpressError('No journeys found', 404));
    }

    // Index of the last 12 journeys of they exist
    let journeysLength = 0;
    if(journeys.length < 12) {
        journeysLength = journeys.length-journeys.length;
    } else {
        journeysLength = journeys.length-12;
    }

    res.render('index', {journeys, journeysLength});
}

module.exports.search = async (req, res) => {
    const { search } = req.query;
    if(search) {
        const regex = new RegExp(escapeRegex(search), 'gi');

        const foundJourney = await Journey.find({ 
            $or:[ { "routes.city": regex }, {name: regex} ] 
        })
        if(!foundJourney) {
            next(new ExpressError("Sorry, We couldn't find this", 404));
        }
        req.flash('success', 'Search Success');
        res.render('searchResult', {results: foundJourney});

    } else {
        req.flash('success', 'You need to type something to search');
        res.redirect('/')
    }
}

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}