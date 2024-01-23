const { DataTypes } = require('sequelize');
const jwt = require('jsonwebtoken');
const sequelize  = require('../config/db');
const DroneType = require('../models/DroneType');

const DroneInformation = sequelize.define("drone_information", {
    droneinfo_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      dronetype_id: {
        type: DataTypes.INTEGER,
      },
      model_id: {
        type: DataTypes.INTEGER,
        defaultValue: 101,
      },
      battery_health: {
        type: DataTypes.DECIMAL(5,2)
      },
      size_height: {
        type: DataTypes.DECIMAL(5,2)
      },
      size_width: {
        type: DataTypes.DECIMAL(5,2)
      },
      size_dept: {
        type: DataTypes.DECIMAL(5,2)
      },
      weight: {
        type: DataTypes.DECIMAL(5,2)
      },
      airframe_name: {
        type: DataTypes.STRING
      },
      propeller_size: {
        type: DataTypes.STRING
      },
      material: {
        type: DataTypes.STRING
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = DroneInformation;    