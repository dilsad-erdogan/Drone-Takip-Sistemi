const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize = require('../config/db');
const DroneInformation = require('./DroneInformation');

const Drone = sequelize.define('drones', {
    drone_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      droneinfo_id: {
        type: DataTypes.INTEGER,
      },
      owner_id: {
        type: DataTypes.INTEGER,
      },
      serial_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
      
    }, { timestamps: false });
    
    Drone.prototype.getJwtToken = function () {
      return jwt.sign({ drone_id: this.drone_id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION,
      });
    };

Drone.belongsTo(DroneInformation, {foreignKey: 'droneinfo_id', targetKey: 'droneinfo_id'})    

module.exports = Drone;    