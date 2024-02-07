const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');

const DroneModel = sequelize.define("drone_models", {
    model_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      brand_id: {
        type: DataTypes.INTEGER,
      },
      model_name: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

module.exports = DroneModel;  