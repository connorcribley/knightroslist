//Routes for reviews
const express = require('express');
const router = express.Router({ mergeParams: true }); //Must use mergeParams to inherit id param from app.use('/universities/:id/reviews', reviews)

//Models
const University = require('../models/university');
const Review = require('../models/review');

//Schemas
const { reviewSchema } = require('../schemas.js');

//Middleware
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware');
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}


router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id);
    const review = new Review(req.body.review);
    university.reviews.push(review);
    await review.save();
    await university.save();
    req.flash('success', 'Review has been added!');
    res.redirect(`/universities/${university._id}`);
}))

router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await University.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review has been deleted!');
    res.redirect(`/universities/${id}`);
}))


module.exports = router;