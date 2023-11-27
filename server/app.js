const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require ('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');
const catchAsync = require('./utils/catchAsync');

// Host name and port number
const hostname = 'localhost';
const port = 5000;

//Routes
const userRoutes = require('./routes/users')
const universityRoutes = require('./routes/universities')
const reviewRoutes = require('./routes/reviews')

//Connect to MongoDB via Mongoose
mongoose.connect('mongodb://admin:cebd3ddacba44d1cf6e0fe1b4267e62b96b1f1f0b92e4f47@127.0.0.1:27017')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//The Express application
const app = express();

//Express middleware configurations
app.use(express.urlencoded({ extended: true }));

//Use methodOverride for "DELETE" requests
app.use(methodOverride('_method'));

//Our static files will be served by our 'public directory
app.use(express.static(path.join(__dirname, '../client/build')));

//Session Cookie Configurations
const sessionConfig = {
    name: 'session',
    secret: 'thisisasecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7 
    }
}

//Create Session Cookie
app.use(session(sessionConfig))

//Flash
app.use(flash());

//Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

//User Serialization
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    //Current User Middleware
    res.locals.currentUser = req.user;

    //Flash Middleware
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// Express route to check user authentication status
app.get('/api/check-authentication', (req, res) => {
    // Check if user is authenticated (this is just a sample, adjust based on your authentication logic)
    if (req.user) {
      // If user is authenticated, send a response indicating isLoggedIn as true
      res.json({ isLoggedIn: true, user: req.user }); // Adjust req.user to match your authentication logic
    } else {
      // If user is not authenticated, send a response indicating isLoggedIn as false
      res.json({ isLoggedIn: false });
    }
  });

//Route directories
app.use('/', userRoutes);
app.use('/universities', universityRoutes)
app.use('/universities/:id/reviews', reviewRoutes)

app.use('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });

//Error handling and error page rendering
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.status(statusCode).json({ err })
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});