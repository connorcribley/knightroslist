//Routes for university pages
const express = require('express');
const router = express.Router();

//Controller
const universities = require('../controllers/universities');

//Middleware
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateUniversity, verifyAuthor } = require('../middleware');

// Routes (can be found in /controllers/universities.js)
router.get('/', catchAsync(universities.index));

router.get('/new', isLoggedIn, universities.renderNew);

router.post('/', isLoggedIn, validateUniversity, catchAsync(universities.create));

router.get('/:id', catchAsync(universities.show));

router.get('/:id/edit', isLoggedIn, verifyAuthor, catchAsync(universities.renderEdit));

router.put('/:id', isLoggedIn, verifyAuthor, validateUniversity, catchAsync(universities.update));

router.delete('/:id', isLoggedIn, catchAsync(universities.delete));

module.exports = router;