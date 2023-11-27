//Models
const University = require('../models/university');

module.exports.index = async (req, res) => {
    const universities = await University.find({});
    res.json({universities});
}

module.exports.create = async (req, res, next) => {
    const university = new University(req.body.university);
    university.author = req.user._id;
    await university.save();
    req.flash('success', 'University has been added!');
    res.redirect(`universities/${university._id}`);
}

module.exports.show = async (req, res) => {
    const university = await University.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!university) {
        req.flash('error', 'University was not found!')
        return res.redirect('/universities')
    }
    res.json({ university });
}

module.exports.update = async (req, res) => {
    const id = req.params.id;
    const university = await University.findByIdAndUpdate(id, { ...req.body.university })
    req.flash('success', 'University has been updated!');
    res.redirect(`/universities/${university._id}`);
}

module.exports.delete = async (req, res) => {
    const id = req.params.id;
    await University.findByIdAndDelete(id);
    req.flash('success', 'University has been deleted!');
    res.redirect('/universities')
}