const express = require('express');
const router = express.Router();
const { logger } = require('./controllers/logController');

router.post('/api/login', (req, res) => {
    logger.info('User logged in.');
    res.sendStatus(200);
});
  
router.post('/api/register', (req, res) => {
    logger.info('User registered.');
    res.sendStatus(200);
});
  
router.put('/user/profile/update/:id', (req, res) => {
    logger.warn('User updated.');
    res.sendStatus(200);
});
  
router.patch('/user/delete/:id', (req, res) => {
    logger.warn('User deleted.');
    res.sendStatus(200);
});
  
router.post('/drone/add', (req, res) => {
    logger.warn('Drone added.');
    res.sendStatus(200);
});
  
router.put('/drone/update/:id', (req, res) => {
    logger.warn('Drone updated.');
    res.sendStatus(200);
});
  
router.patch('/drone/delete/:id', (req, res) => {
    logger.warn('Drone deleted.');
    res.sendStatus(200);
});
  
router.post('/droneBrand/add', (req, res) => {
    logger.warn('Drone Brand added.');
    res.sendStatus(200);
});
  
router.put('/droneBrand/update/:id', (req, res) => {
    logger.warn('Drone Brand updated.');
    res.sendStatus(200);
});
  
router.patch('/droneBrand/delete/:id', (req, res) => {
    logger.warn('Drone Brand deleted.');
    res.sendStatus(200);
});
  
router.post('/droneInfo/add', (req, res) => {
    logger.warn('Drone Info added.');
    res.sendStatus(200);
});
  
router.put('/droneInfo/update/:id', (req, res) => {
    logger.warn('Drone Info updated.');
    res.sendStatus(200);
});
  
router.patch('/droneInfo/delete/:id', (req, res) => {
    logger.warn('Drone Info deleted.');
    res.sendStatus(200);
});
  
router.post('/droneModel/add', (req, res) => {
    logger.warn('Drone Model added.');
    res.sendStatus(200);
});
  
router.put('/droneModel/update/:id', (req, res) => {
    logger.warn('Drone Model updated.');
    res.sendStatus(200);
});
  
router.patch('/droneModel/delete/:id', (req, res) => {
    logger.warn('Drone Model deleted.');
    res.sendStatus(200);
});
  
router.post('/droneType/add', (req, res) => {
    logger.warn('Drone Type added.');
    res.sendStatus(200);
});
  
router.put('/droneType/updated/:id', (req, res) => {
    logger.warn('Drone Type updated.');
    res.sendStatus(200);
});
  
router.patch('/droneType/delete/:id', (req, res) => {
    logger.warn('Drone Type deleted.');
    res.sendStatus(200);
});
  
router.post('/userRole/add', (req, res) => {
    logger.warn('User role added.');
    res.sendStatus(200);
});
  
router.put('/userRole/update/:id', (req, res) => {
    logger.warn('User role updated.');
    res.sendStatus(200);
});
  
router.patch('/userRole/delete/:id', (req, res) => {
    logger.warn('User role deleted.');
    res.sendStatus(200);
});
  
router.post('/flight/flight', (req, res) => {
    logger.warn('Flight added.');
    res.sendStatus(200);
});
  
router.put('/flight/flight/:flightId/coordinates', (req, res) => {
    logger.warn('Flight updated.');
    res.sendStatus(200);
});

module.exports = router;