const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const Drone = require('../models/Drone');
const Flight = require('../models/Flight');
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

        const permissionByOwnerId = await Permission.find({ owner_id: user_id })

        console.log(permissionByOwnerId)
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

// koordinalt için flight tablosundan start point end point bilgilerii al
async function add(req, res) {
    try {
        const { user_id, pilot_id, drone_id, date_and_time, startPoint, endPoint, is_active } = req.body
        console.log(user_id)
        const _owner = await User.findByPk(user_id)
        const _pilot = await Pilot.findByPk(pilot_id)
        const _drone = await Drone.findByPk(drone_id)

        if(!_owner) {
            res.status(404).json({ success: false, message: 'User not found!'})
        } else if(!_pilot) {
            res.status(404).json({ success: false, message: 'Pilot not found!'})
        } else if(!_drone) {
            res.status(404).json({ success: false, message: 'Drone not found!'})
        } 

        const permission = new Permission({
            owner_id: _owner.user_id,
            pilot_id: _pilot.pilot_id,
            drone_id: _drone.drone_id,
            date_and_time: date_and_time,
            startPoint: startPoint,
            endPoint: endPoint,
            date_and_time: Date.now(),
            permission_status: false,
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
        const { admin_id, permission_status } = req.body

        const permission = await Permission.findById(permission_id)

        if(!permission) {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        } else {
            const updateFields = {
                admin_id: admin_id, 
                permission_status: permission_status,
                date_and_time: Date.now(),
                is_active: false
            };

            await Permission.findByIdAndUpdate(permission_id, updateFields);

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