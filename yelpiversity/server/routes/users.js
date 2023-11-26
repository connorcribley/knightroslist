const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users')


// Routes (can be found in /controllers/users.js)
router.get('/register', users.renderNew);

router.post('/register', catchAsync(users.create));

router.get('/login', users.renderLogin);

router.post('/login', storeReturnTo, passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.post('/logout', users.logout);

module.exports = router;