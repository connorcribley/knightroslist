const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');

//Account Registration Page
router.get('/register', (req, res) => {
    res.render('users/register');
})

//Account Registration
router.post('/register', catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelpiversity!');
            res.redirect('/universities')
        });
    }
    //Catch registration-related errors (i.e. username already taken) and flash them to the registration screen 
    catch (e) {
        req.flash('error', e.message);
        res.redirect('register');
    }
}))

//Login Page
router.get('/login', (req, res) => {
    res.render('users/login');
})

//Login
router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    const username = req.body.username;
    req.flash('success', `Welcome back, ${username}!`);
    var redirectUrl = res.locals.returnTo || '/universities';
    if (redirectUrl.includes('/reviews')) redirectUrl = '/universities'
    res.redirect(redirectUrl);
})

//Logout
router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have logged out. Goodbye!');
        res.redirect('/universities')
    });
})

module.exports = router;