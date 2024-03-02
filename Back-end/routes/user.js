const { Router } = require('express');
const router = Router();
const userController = require('../controllers/user.js');

router.get('/users', userController.getUsers);
router.post("/users", userController.addUser);
router.get("/users/:id", userController.getUsersById);
router.delete("/users/:id", userController.removeUser);
router.put("/users/:id", userController.updateUser);
router.patch("/users/:id", userController.updateUserIsActive);
router.post('/users/login', userController.loginUser);

module.exports = router;