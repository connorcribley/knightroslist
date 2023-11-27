const mongoose = require('mongoose');
const Review = require ('./review');
const Schema = mongoose.Schema;

const UniversitySchema = new Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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