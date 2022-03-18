if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

//! Requring modules
const passportLocalMongoose = require("passport-local-mongoose");   // Authentication
const LocalStrategy = require("passport-local");                    // Authentication
const passport = require("passport");                               // Authentication
const methodOverride = require("method-override")                   // Override (Let you use put and delete)
const session = require('express-session');
const bodyParser = require("body-parser");                          // Post
const flash = require('connect-flash');
const mongoose = require('mongoose');                               // DataBase
const ejsMate = require('ejs-mate');                                // ejs mate
const express = require('express');                                 // Express
const path = require('path');                                       // Put file path views/public
const app = express();                                              // Express

//! Routes

// Utils
const ExpressError = require("./utils/ExpressError");
const catchAsync = require("./utils/catchAsync");

// DataBase
const Journey = require("./models/journey");
const User = require("./models/user");

// Routes
const indexRoutes = require("./routes/indexes");
const journeyRoutes = require("./routes/journeys");
const userRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

//! Connecting to the dataBase
mongoose.connect('mongodb://localhost:27017/test')
    .then(() => {
        console.log('Mongo Connection Open');
    })
    .catch(err => {
        console.log('Mongo Connection Error');
        console.log(err);
    })

//! Set and use modules
app.set("view engine", "ejs");                          // ejs
app.engine('ejs', ejsMate);                             // ejs mate(layout)
app.set("views", path.join(__dirname, '/views'));       // Views
app.use(express.static(path.join(__dirname, 'public'))) // Use CSS/JS in public folder
app.use(bodyParser.urlencoded({extended: true}));       // Post
app.use(methodOverride("_method"));                     // Override
app.use(flash());                                       // Flash messages


app.use(session({
    secret: '#eatshitanddie',
    resave: false,
    saveUninitialized: false
}))

//! Authentication

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy({usernameField: 'email'},User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
	next();
});

//! Using routes
app.use('/', indexRoutes);
app.use('/user', userRoutes);
app.use('/journey', journeyRoutes);
app.use('/admin', adminRoutes);

// No page found
app.get('*', (req, res) => {
    throw new ExpressError('Page not found', 404)
})

//! Error Handling

const handleValidationError = err => {
    return new ExpressError(`Validation Failed ... ${err.message}`, 400)
}

const handleCastError = err => {
    return new ExpressError(`Cast Failed ... ${err.message}`, 400)
}

app.use((err, req, res, next) => {
    if(err.name === 'ValidationError') err = handleValidationError(err)
    if(err.name === 'CastError') err = handleCastError(err)
    next(err)
})

app.use((err, req, res, next) => {
    const { statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).render('error', {statusCode, message: err.message})
})

//! Start a host
app.listen(3000, () => {
    console.log('App listining on port 3000')
})