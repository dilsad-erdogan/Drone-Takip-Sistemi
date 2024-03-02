const { Router } = require('express');
const droneController = require('../controllers/drone.js');
const router = Router();

router.get('/drones', droneController.getDrones);
router.post("/drones", droneController.addDrone);
router.get("/drones/:id", droneController.getDroneById);
router.delete("/drones/:id", droneController.removeDrone);
router.put("/drones/:id", droneController.updateDrone);
router.patch("/drones/:id", droneController.updateDroneIsActive);

module.exports = router;