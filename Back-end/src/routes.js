const { Router } = require('express');
const userController = require('./userController');
const droneController = require('./droneController');

const router = Router();

router.get('/users', userController.getUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUsersById);
router.delete("/users/:id", userController.removeUser);
router.put("/users/:id", userController.updateUser);
router.patch("/users/:id", userController.updateUserIsActive);

router.get('/drones', droneController.getDrones);
router.post("/drones", droneController.addDrone);
router.get("/drones/:id", droneController.getDroneById);
router.delete("/drones/:id", droneController.removeDrone);
router.put("/drones/:id", droneController.updateDrone);
router.patch("/drones/:id", droneController.updateDroneIsActive);

module.exports = router;