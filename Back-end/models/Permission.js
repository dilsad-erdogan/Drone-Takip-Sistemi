const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    // permission_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     unique: true,
    // },
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
        required: true, 
    },
    admin_id: {
        type: Number
    },
    permission_status: {
        type: Boolean,
        //default: false,
    },
    date_and_time: {
        type: Date,
        default: Date.now,
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
    is_active: {
        type: Boolean,
    },
}, { timestamps: true });

//permissionSchema.plugin(AutoIncrement, {inc_field: 'permission_id'});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;