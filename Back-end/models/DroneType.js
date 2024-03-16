const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const DroneType = sequelize.define("drone_types", {
    dronetype_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type_name: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = DroneType;    