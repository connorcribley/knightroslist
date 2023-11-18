const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: String,
    image: String,
    ISTuition: Number,
    OOSTuition: Number,
    description: String,
    location: String,
    public: String,
    accreditation: String
});

module.exports = mongoose.model('University', UniversitySchema);