//Routes for university pages
const express = require('express');
const router = express.Router();

//Controller
const universities = require('../controllers/universities');

//Middleware
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateUniversity, verifyAuthor } = require('../middleware');

// Routes (can be found in /controllers/universities.js)
router.get('/api', catchAsync(universities.index));

router.post('/', isLoggedIn, validateUniversity, catchAsync(universities.create));

router.get('/:id/api', catchAsync(universities.show));

router.put('/:id', isLoggedIn, verifyAuthor, validateUniversity, catchAsync(universities.update));

router.delete('/:id', isLoggedIn, catchAsync(universities.delete));

module.exports = router;