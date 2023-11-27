const { universitySchema, reviewSchema } = require('./schemas');
const ExpressError = require('./utils/ExpressError');
const University = require('./models/university');
const Review = require('./models/review');


// Checks to see if a user is logged in
module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be logged in!');
        return res.redirect('/login');
    }
    next();
}

// Stores the page to return to after logging in
module.exports.storeReturnTo = (req, res, next) => {
    if (req.session.returnTo) {
        res.locals.returnTo = req.session.returnTo;
    }
    next();
}

//Validates the university using Joi
module.exports.validateUniversity = (req, res, next) => {
    const { error } = universitySchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}

//Validates the review using Joi
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}

//Verifies the university author
module.exports.verifyAuthor = async (req, res, next) => {
    const id = req.params.id;
    const university = await University.findById(id);
    if (!university.author.equals(req.user._id)) {
        req.flash('error', 'Access Denied!');
        return res.redirect(`/universities/${id}`);
    }
    next();
}

//Verifies the review author
module.exports.verifyReviewAuthor = async (req, res, next) => {
    const id = req.params.id;
    const reviewId = req.params.reviewId;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'Access Denied!');
        return res.redirect(`/universities/${id}`);
    }
    next();
}


