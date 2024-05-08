const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const PilotCertificate = require('../models/PilotCertificate');

exports.getAll = catchAsyncErrors(async (req, res) => {
    try {
        const certificates = await PilotCertificate.findAll();

        if(certificates) {
            res.status(200).json({ success: true, data: certificates });
        } else {
            res.status(404).json({ success: false, data: 'Certificate not found!' });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
});

exports.getActiveAll = catchAsyncErrors(async (req, res) => {
    try {
        const activeCertificates = await PilotCertificate.findAll({
            where: { is_active: true },
            attributes: ['certificate_name']
        });

        const activeCertificateNames = activeCertificates.map(certificate => certificate.certificate_name)

        if(activeCertificates) {
            res.status(200).json({ success: true, data: activeCertificateNames });
        } else {
            res.status(404).json({ success: false, data: 'Active certificate not found!' });
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
});

exports.getCertificateById = catchAsyncErrors(async (req, res, next) => {
    try {
        const id = req.params.id;
        const certificate = await PilotCertificate.findByPk(id);

        if(certificate){
            res.status(200).json({ success: true, data: certificate.certificate_name })
        } else {
            res.status(404).json({ success: false, error: 'Certificate not found!' })
        }
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
}) 

exports.add = catchAsyncErrors(async(req, res, next) => {
    try {
        const { certificate_name } = req.body;

    if (!certificate_name) {
      return res.status(400).json({
        success: false,
        error: "Certificate name cannot be empty!"
      });
    }

    const _certificate = await PilotCertificate.findOne({ where: { certificate_name } });

    if (_certificate) {
      return res.status(400).json({
        success: false,
        error: "This certificate already exists!"
      });
    } else {
        const certificate = await PilotCertificate.create({
            certificate_name,
        });
    
        await certificate.save();
        res.status(201).json({ message: "Certificate successfully registered.", data: certificate });
    }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});

exports.update = catchAsyncErrors(async (req, res, next) => {
    try {
        const certificateId = req.params.id;
        const { certificate_name } = req.body;

        const certificateToUpdate = await PilotCertificate.findByPk(certificateId);

        if (!certificateToUpdate) {
            return res.status(404).json({ success: false, error: 'Certificate not found!' });
        }

        certificateToUpdate.certificate_name = certificate_name || certificateToUpdate.certificate_name;

        await certificateToUpdate.save();

        res.status(200).json({ success: true, data: certificateToUpdate });
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).json({ success: false, error: "Internal Server Error!" });
    }
});

exports.deleteCertificate = catchAsyncErrors(async (req, res)=> {
    try{
        const id = req.params.id;

        const certificateName = await PilotCertificate.update(
            { is_active: false },
            {where: { certificate_id: id }}
        );

        if(certificateName[0] === 0){
            return res.status(404).json({ success: false, message: 'Certificate not found!' });
        }

        res.status(200).json({success: true, message: 'Certificate deleted successfuly!' })
        
    } catch(error) {
        console.log(error);
        res.status(500).json({ success: false, error: 'Internal server error!' })
    }
})