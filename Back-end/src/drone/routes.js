const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/', controller.getDrones);
router.post('/', controller.addDrone);
router.get('/:id', controller.getDroneById);
router.delete('/:id', controller.removeDrone);

module.exports = router;