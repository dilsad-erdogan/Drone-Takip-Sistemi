const mongoose = require("mongoose")

const flightSchema = new mongoose.Schema({
    flight_number: {
        type: String,
        required: true,
        unique: true,
    },
    owner_id: {
        type: Number,
        required: true,
    },
    pilot_id: {
        type: Number,
        required: true
    },
    drone_id: {
      type: Number,  
    },
    startPoint: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    endPoint: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    date_and_time: {
        type: Date,
        default: Date.now,
    },
    coordinates: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    is_active: {
        type: Boolean
    }
}, { timestamps: true });

flightSchema.index({ coordinates: "2dsphere" });

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;