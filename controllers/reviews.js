//Models
const University = require('../models/university');
const Review = require('../models/review');

module.exports.create = async (req, res) => {
    const university = await University.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    university.reviews.push(review);
    await review.save();
    await university.save();
    req.flash('success', 'Review has been added!');
    res.redirect(`/universities/${university._id}`);
}

module.exports.delete = async (req, res, next) => {
    const { id, reviewId } = req.params;
    await University.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review has been deleted!');
    res.redirect(`/universities/${id}`);
}