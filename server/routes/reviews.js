//Routes for reviews
const express = require('express');
const router = express.Router({ mergeParams: true }); //Must use mergeParams to inherit id param from app.use('/universities/:id/reviews', reviews)

//Controller
const reviews = require('../controllers/reviews');

//Middleware
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, verifyReviewAuthor } = require('../middleware');


// Routes (can be found in /controllers/reviews.js)
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.create));

router.delete('/:reviewId', isLoggedIn, verifyReviewAuthor, catchAsync(reviews.delete))


module.exports = router;