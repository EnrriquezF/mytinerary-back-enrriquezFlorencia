const {Schema, model, Types } = require('mongoose');

const schemaCity = new Schema({
    name: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    itineraries : [{
        type: Types.ObjectId,
        ref:"Itinerary"
    }]
});

const City = model("City", schemaCity)

module.exports = City