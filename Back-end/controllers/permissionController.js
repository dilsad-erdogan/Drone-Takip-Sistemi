const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Permission = require("../models/Permission");

async function getAll(req, res) {
    try {
        // tüm pilotlar
        const permission = await Permission.find()

        if(permission) {
            res.status(200).json({ success: true, data: permission })
        } else {
            res.status(404).json({ success: false, message: 'Pilot not found!' })
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
        const { user_id, drone_id, admin_id, permission_status, is_active } = req.body

        const permission = new Permission({
            user_id: user_id,
            drone_id: drone_id,
            admin_id: admin_id,
            permission_status: permission_status,
            date_and_time: Date.now(),
            is_active: is_active
        })

        const savedPermission = await permission.save()

        if(savedPermission){
            res.status(201).json({ success: true, message: savedPermission })
        } else {
            res.status(400).json({ success: false, message: 'Permission error'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}

async function update(req, res) {
    try {

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
    getTotalPermissionCount,
    add,
    update,
    deletePermission
}