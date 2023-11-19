const mongoose = require('mongoose');
const Review = require ('./review');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: String,
    image: String,
    ISTuition: Number,
    OOSTuition: Number,
    description: String,
    location: String,
    public: String,
    accreditation: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//Review Deletion Middleware (findByIdAndDelete triggers findOneAndDelete)
UniversitySchema.post('findOneAndDelete', async function (doc) {
    if(doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('University', UniversitySchema);