const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const Pilot = require('../models/Pilot')
const User = require('../models/User')
const multer = require("multer")
const path = require('path')


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
        const pilot = await Pilot.findByPk(pilot_id)

        if(pilot && pilot.is_active===true) {
            res.status(200).json({ success: true, data: pilot })
        } else {
            res.status(404).json({ success: false, message: 'Pilot not found!'})
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})

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
        const { user_id, pilot_certificate } = req.body

        const user = await User.findByPk(user_id)

        if(!user) {
            res.status(404).json({ success: false, message: 'User not found!' })
        } else {

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

                const certificate_id  = req.params.certificate_id
                const _certificate_id = await PilotCertificate.findByPk(certificate_id)
                
                if(!_certificate_id) {
                    res.status(404).json({ success: false, message: 'Certificate not found!'})
                    return;
                } 
    
                const pilot = await Pilot.create({
                    user_id: user.user_id,
                    pilot_certificate: pilot_certificate,
                    certificate_file: filePath,
                    is_active: true
                })
    
                try {
                    const savedPilot = await pilot.save();
                    res.status(201).json({ success: true, message: savedPilot });
                } catch (error) {
                    console.error(error);
                    res.status(400).json({ success: false, message: 'Pilot error!' });
                }
            })

            
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