const { DataTypes } = require('sequelize');
const sequelize  = require('../config/db');
const DroneModel = require('./DroneModel');

const DroneBrand = sequelize.define("drone_brands", {
    brand_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
    }, { timestamps: false });

DroneBrand.belongsTo(DroneModel, {foreignKey: 'brand_id', targetKey: 'brand_id'});
module.exports = DroneBrand; 