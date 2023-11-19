const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require ('connect-flash');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const localStrategy = require('passport-local');
const User = require('./models/user');

//Routes
const userRoutes = require('./routes/users')
const universityRoutes = require('./routes/universities')
const reviewRoutes = require('./routes/reviews')

//Connect to MongoDB via Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/yelpiversity')
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

//The Express application
const app = express();

//Set views engine, connect it to the 'views' directory
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Express middleware configurations
app.use(express.urlencoded({ extended: true }));

//Use methodOverride for "DELETE" requests
app.use(methodOverride('_method'));

//Our static files will be served by our 'public directory
app.use(express.static(path.join(__dirname, 'public')));

//Session Cookie Configurations
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
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



//Route directories
app.use('/', userRoutes);
app.use('/universities', universityRoutes)
app.use('/universities/:id/reviews', reviewRoutes)

//Homepage
app.get('/', (req, res) => {
    res.render('home');
});

//404 Error throw
app.all('*', (req, res, next) => {
    next(new ExpressError('Not Found', 404))
})

//Error handling and error page rendering
app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving port 3000');
});