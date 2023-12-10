const { Router } = require('express');
const userController = require('./userController');
const droneController = require('./droneController');

const router = Router();

router.get('/users', userController.getUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUsersById);
router.put("/users/:id", userController.updateActiveUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.removeUser);

router.get('/drones', droneController.getDrones);
router.post('/drones', droneController.addDrone);
router.get('/drones/:id', droneController.getDroneById);
router.delete('/drones/:id', droneController.removeDrone);

module.exports = router;