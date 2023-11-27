const express = require('express');
const router = express.Router();
const passport = require('passport')
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const { storeReturnTo } = require('../middleware');
const users = require('../controllers/users')


// Routes (can be found in /controllers/users.js)

router.post('/register', catchAsync(users.create));


router.post('/login', storeReturnTo, passport.authenticate('local', { failureRedirect: '/login' }), users.login)

router.post('/logout', users.logout);

module.exports = router;