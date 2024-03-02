const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Drone = require('../models/Drone');
const Permission = require("../models/Permission");
const Pilot = require('../models/Pilot');
const User = require('../models/User')

async function getAll(req, res) {
    try {
        const permission = await Permission.find()

        if(permission) {
            res.status(200).json({ success: true, data: permission })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function getActiveAll(req, res) {
    try {
        const permissions = await Permission.find()

        const activePermission = permissions.filter(permission => permission.is_active === true)

        if(activePermission) {
            res.status(200).json({ success: true, data: activePermission })
        } else {
            res.status(404).json({ success: false, message: 'Active permission not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function getPermissionById(req, res) {
    try {
        const permission_id = req.params.id
        const permission = await Permission.findOne({ permission_id: permission_id })

        if(permission && permission.is_active===true) {
            res.status(200).json({ success: true, data: permission })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function getPermissionByUserId(req, res) {
    try {
        const user_id = req.params.id

        const permissionByOwnerId = Permission.findOne({ owner_id: user_id })

        if(permissionByOwnerId) {
            res.status(200).json({ success: true, message: permissionByOwnerId })
        } else {
            res.status(404).json({ success: false, message: 'Owner not found!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function getTotalPermissionCount(req, res)  {
    try {
        const permission = await Permission.find()

        if(permission.length > 0) {
            res.status(200).json({ success: true, message: permission.length })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function add(req, res) {
    try {
        const { user_id, pilot_id, drone_id, admin_id, coordinates, is_active } = req.body
        console.log(user_id)
        const owner = await User.findByPk(user_id)
        const pilot = await Pilot.findByPk(pilot_id)
        const drone = await Drone.findByPk(drone_id)
        
        if(!owner || !pilot || !drone) {
            res.status(400).json({ success: false, message: 'Required information could not be found!' })
        }
        const permission = new Permission({
            owner_id: owner.user_id,
            pilot_id: pilot.pilot_id,
            drone_id: drone.drone_id,
            admin_id: admin_id,
            date_and_time: Date.now(),
            coordinates: coordinates,
            is_active: is_active
        })

        const savedPermission = await permission.save()

        if(savedPermission){
            res.status(201).json({ success: true, message: savedPermission })
        } else {
            res.status(400).json({ success: false, message: 'Permission error!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function update(req, res) {
    try {
        const permission_id = req.params.id
        const permission_status = req.body.permission_status

        const permission = await Permission.findById(permission_id)

        if(!permission) {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        } else {
            const updateFields = {
                permission_status: permission_status,
                date_and_time: Date.now(),
                is_active: false,
            };

            await Permission.findByIdAndUpdate(permission_id, updateFields);

            // Duruma göre cevap verme
            if (permission_status === true) {
                res.status(200).json({ success: true, message: 'Flight permission granted!' });
            } else {
                res.status(200).json({ success: true, message: 'Flight denied!' });
            }
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function deletePermission(req, res) {
    try {
        const permission_id = req.params.id
        const permission = await Permission.findOne({ permission_id: permission_id })

        if(!permission){
            res.status(404).json({ success: false, message: 'Permission not found!'})
        } else {
            await Permission.updateOne({ permission_id: permission }, { is_active: false })
            res.status(200).json({ success: true, message: 'Permission deleted successfully.'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

module.exports = {
    getAll,
    getActiveAll,
    getPermissionById,
    getPermissionByUserId,
    getTotalPermissionCount,
    add,
    update,
    deletePermission
}