const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Pilot = require('../models/Pilot')
const User = require('../models/User')

exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        // tüm pilotlar
        const pilots = await Pilot.findAll()

        if(pilots) {
            res.status(200).json({ success: true, data: pilots })
        } else {
            res.status(404).json({ success: false, message: 'Pilot not found!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.getActiveAll = catchAsyncErrors( async (req, res) => {
    try {
        const pilots = await Pilot.findAll()

        const activePilots = pilots.filter(pilot => pilot.is_active === true)

        if(activePilots) {
            res.status(200).json({ success: true, data: activePilots })
        } else {
            res.status(404).json({ success: false, message: 'Active pilot not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.getPilotById = catchAsyncErrors(async (req, res) => {
    try {
        const pilot_id = req.params.pilot_id
        const pilot = await Pilot.findOne({ where: {pilot_id}})

        if(pilot && pilot.is_active===true) {
            res.status(200).json({ success: true, data: pilot })
        } else {
            res.status(404).json({ success: false, message: 'Pilot not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})//çalışmıyo

exports.getTotalPilotCount = catchAsyncErrors(async (req, res) => {
    try {
        const pilots = await Pilot.findAll()

        if(pilots.length > 0) {
            res.status(200).json({ success: true, message: pilots.length });
        } else {
            res.status(404).json({ success: false, message: 'Pilot not found!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.add = catchAsyncErrors(async (req, res) => {
    try {
        const { user_id, pilot_certificate } = req.body

        const user = await User.findByPk(user_id)

        if(!user) {
            res.status(404).json({ success: false, message: 'User not found!' })
        } else {
            const pilot = await Pilot.create({
                user_id: user.user_id,
                pilot_certificate: pilot_certificate,
                is_active: true
            })
            res.status(201).json({ success: true, message: pilot })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.update = catchAsyncErrors(async (req, res) => {
    try {
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})//boş

exports.deletePilot = catchAsyncErrors(async (req, res) => {
    try {
        const id = req.params.id

        const pilot = await Pilot.update(
            { is_active: false },
            { where: { pilot_id: id }}
        )

        if(pilot[0] === 0){
            res.status(404).json({ success: false, message: 'Pilot not found!' })
        } else {
            res.status(200).json({ success: true, message: 'Pilot deleted successfully!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})