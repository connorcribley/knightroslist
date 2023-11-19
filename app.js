const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const Joi = require('joi');
const { universitySchema, reviewSchema } = require('./schemas.js')
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');
const methodOverride = require('method-override');
const University = require('./models/university');
const Review = require('./models/review');
const university = require('./models/university');

mongoose.connect('mongodb://127.0.0.1:27017/yelpiversity')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const validateUniversity = (req, res, next) => {
    const { error } = universitySchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}

const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/universities', catchAsync(async (req, res) => {
    const universities = await University.find({});
    res.render('universities/index', { universities });
}));

app.get('/universities/new', (req, res) => {
    res.render('universities/new');
});

app.post('/universities', validateUniversity, catchAsync(async (req, res, next) => {
    const university = new University(req.body.university);
    await university.save();
    res.redirect(`universities/${university._id}`);
}));

app.get('/universities/:id', catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id).populate('reviews');
    res.render('universities/show', { university });
}));

app.get('/universities/:id/edit', catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id);
    res.render('universities/edit', { university });
}));

app.put('/universities/:id', validateUniversity, catchAsync(async (req, res) => {
    const id = req.params.id;
    const university = await University.findByIdAndUpdate(id, { ...req.body.university })
    res.redirect(`/universities/${university._id}`);
}));


app.delete('/universities/:id', catchAsync(async (req, res) => {
    const id = req.params.id;
    await University.findByIdAndDelete(id);
    res.redirect('/universities')
}));

app.post('/universities/:id/reviews', validateReview, catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id);
    const review = new Review(req.body.review);
    university.reviews.push(review);
    await review.save();
    await university.save();
    res.redirect(`/universities/${university._id}`);
}))

app.delete('/universities/:id/reviews/:reviewId', catchAsync(async (req, res, next) => {
    const { id, reviewId } = req.params;
    await University.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/universities/${id}`);
}))

app.all('*', (req, res, next) => {
    next(new ExpressError('Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500, message = 'Internal Server Error' } = err;
    res.status(statusCode).render('error', { err })
})

app.listen(3000, () => {
    console.log('Serving port 3000');
});