const {Schema, model, Types} = require('mongoose');

const schemaItinerary = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min:1,
        required: true
    },
    duration: {
        type: Number,
        min:1,
        required: true
    },
    likes: {
        type: Number,
        default: 0,
        min: 0,
        required: true,
    },
    hashtags: [{
        type: String,
        required: true
    }],
    city: {
        type: Types.ObjectId,
        ref: "City"
    }
})

const Itinerary = model("Itinerary", schemaItinerary)

module.exports = Itinerary 

