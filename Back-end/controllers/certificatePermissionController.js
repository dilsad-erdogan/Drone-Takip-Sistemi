const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const CertificatePermission = require("../models/CertificatePermission");
const Pilot = require('../models/Pilot');
const PilotCertificate = require('../models/PilotCertificate')
const fs = require('fs');
const multer = require("multer")
const path = require('path')

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

// Yüklenen dosyaların filtrelenmesi
const fileFilter = (req, file, cb) => {
    // Sadece PDF dosyalarını kabul et
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed!'), false);
    }
};

// Multer ayarlarını kullanarak dosya yükleme işlemi oluştur
const upload = multer({ storage: storage, fileFilter: fileFilter }).single('certificate_file');

exports.add = catchAsyncErrors(async (req, res) => {
    try {

        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                console.error(err);
                return res.status(400).json({ success: false, message: 'File upload error!' });
            } else if (err) {
                console.error(err);
                return res.status(400).json({ success: false, message: err.message });
            }

            // Dosya yüklendiğinde, dosyanın yolu `req.file.path` üzerinden erişilebilir
            const filePath = req.file.path;

            const  pilot_id = req.params.pilot_id 
            const certificate_id  = req.params.certificate_id
            const _pilot = await Pilot.findByPk(pilot_id)
            console.log(pilot_id)
            console.log(certificate_id)
            const _certificate_id = await PilotCertificate.findByPk(certificate_id)
    
            if(!_pilot) {
                res.status(404).json({ success: false, message: 'Pilot not found!'})
                return;
            } if(!_certificate_id) {
                res.status(404).json({ success: false, message: 'Certificate not found!'})
                return;
            } 

            const permission = new CertificatePermission({
                pilot_id: pilot_id,
                certificate_id: certificate_id,
                permission_status: false,
                date_and_time: Date.now(),
                is_active: true,
                certificate_file: filePath // PDF dosyasının yolu
            });

            try {
                const savedPermission = await permission.save();
                res.status(201).json({ success: true, message: savedPermission });
            } catch (error) {
                console.error(error);
                res.status(400).json({ success: false, message: 'Permission error!' });
            }
        })

    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error!' });
    }
});

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
            permission.is_active = false;

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