//Routes for university pages
const express = require('express');
const router = express.Router();

//Models
const University = require('../models/university');

//Schemas
const { universitySchema } = require('../schemas.js');

//Middleware
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn } = require('../middleware');
const validateUniversity = (req, res, next) => {
    const { error } = universitySchema.validate(req.body);
    if (error) {
        const errorMsg = error.details.map(el => el.message).join(", ")
        throw new ExpressError(errorMsg, 400)
    } else {
        next();
    }
}

router.get('/', catchAsync(async (req, res) => {
    const universities = await University.find({});
    res.render('universities/index', { universities });
}));

router.get('/new', isLoggedIn, (req, res) => {
    res.render('universities/new');
});

router.post('/', isLoggedIn, validateUniversity, catchAsync(async (req, res, next) => {
    const university = new University(req.body.university);
    await university.save();
    req.flash('success', 'University has been added!');
    res.redirect(`universities/${university._id}`);
}));

router.get('/:id', catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id).populate('reviews');
    if (!university) {
        req.flash('error', 'University was not found!')
        return res.redirect('/universities')
    }
    res.render('universities/show', { university });
}));

router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
    const university = await University.findById(req.params.id);
    if (!university) {
        req.flash('error', 'University was not found!')
        return res.redirect('/universities')
    }
    res.render('universities/edit', { university });
}));

router.put('/:id', isLoggedIn, validateUniversity, catchAsync(async (req, res) => {
    const id = req.params.id;
    const university = await University.findByIdAndUpdate(id, { ...req.body.university })
    req.flash('success', 'University has been updated!');
    res.redirect(`/universities/${university._id}`);
}));


router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const id = req.params.id;
    await University.findByIdAndDelete(id);
    req.flash('success', 'University has been deleted!');
    res.redirect('/universities')
}));

module.exports = router;