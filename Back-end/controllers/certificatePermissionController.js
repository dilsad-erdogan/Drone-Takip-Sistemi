const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const CertificatePermission = require("../models/CertificatePermission");
const Pilot = require('../models/Pilot');
const PilotCertificate = require('../models/PilotCertificate')

exports.getAll = catchAsyncErrors(async(req, res) => {
    try {
        const permissions = await CertificatePermission.findAll()

        if(permissions) {
            res.status(200).json({ success: true, data: permissions })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!' })
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        const activePermission = await CertificatePermission.findAll({ where: { is_active: true } });

        if (activePermission.length > 0) {
            res.status(200).json({ success: true, data: activePermission });
        } else {
            res.status(404).json({ success: false, message: 'Active permission not found!' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' });
    }
});

exports.getPermissionById = catchAsyncErrors(async (req, res) => {
    try {
        const id = req.params.id
        const permission = await CertificatePermission.findByPk(id)

        if(permission && permission.is_active===true) {
            res.status(200).json({ success: true, data: permission })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

// async function getPermissionByUserId(req, res) {
//     try {
//         const id = req.params.id

//         const permissionByOwnerId = await CertificatePermission.findByPk(id)

//         if(permissionByOwnerId) {
//             res.status(200).json({ success: true, message: permissionByOwnerId })
//         } else {
//             res.status(404).json({ success: false, message: 'Owner not found!' })
//         }
//     } catch(error) {
//         console.log(error);
//         res.status(500).json({ success: false, error: 'Internal server error!' })
//     }
// }

exports.getTotalPermissionCount = catchAsyncErrors(async (req, res) => {
    try {
        const permissionCount = await CertificatePermission.count()

        if(permissionCount > 0) {
            res.status(200).json({ success: true, message: permissionCount })
        } else {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

exports.add = catchAsyncErrors(async (req, res) => {
    try {
        const { pilot_id, certificate_id, permission_status } = req.body
        const _pilot = await Pilot.findByPk(pilot_id)
        const _certificate_id = await PilotCertificate.findByPk(certificate_id)

        if(!_pilot) {
            res.status(404).json({ success: false, message: 'Pilot not found!'})
        } else if(!_certificate_id) {
            res.status(404).json({ success: false, message: 'Certificate not found!'})
        } 

        const permission = new CertificatePermission({
            pilot_id: pilot_id,
            certificate_id: certificate_id,
            permission_status: permission_status,
            date_and_time: Date.now(),
            is_active: true
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
})

exports.update = catchAsyncErrors(async (req, res) => {
    try {
        const id = req.params.id
        const { pilot_id, certificate_id, permission_status } = req.body

        const permission = await CertificatePermission.findByPk(id)

        if(!permission) {
            res.status(404).json({ success: false, message: 'Permission not found!'})
        } else {
            permission.pilot_id = pilot_id || permission.pilot_id;
            permission.certificate_id = certificate_id || permission.certificate_id;
            permission.permission_status = permission_status || permission.permission_status;

            await permission.save()
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
})

exports.deletePermission = catchAsyncErrors(async (req, res) => {
    try {
        const id = req.params.id;

        const permission = await CertificatePermission.update(
            { is_active: false },
            { where: { permission_id: id }}
        )

        if(permission[0] === 0){
            return res.status(404).json({message: 'Permission not found!'});
        }

        res.status(200).json({ success: true, message: 'Permission deleted successfuly.' })
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
});