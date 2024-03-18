const express = require('express');

const {
    getAll,
    getActiveAll,
    getCertificateById,
    add,
    update,
    deleteCertificate
} = require('../controllers/pilotCertificateController');

const router = express.Router();

router.route('/all').get(getAll);
router.route('/activeAll').get(getActiveAll)
router.route('/:id').get(getCertificateById);
router.route('/add').post(add);
router.route('/update/:id').put(update);
router.route('/delete/:id').patch(deleteCertificate);

module.exports = router;